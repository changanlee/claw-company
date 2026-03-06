# Supabase Installation and Configuration Guide

When data volume grows beyond what Markdown files can effectively manage, follow this guide to set up the Supabase structured data layer.

---

## Step 1: Install Supabase Skill

The OpenClaw community provides a ready-made Supabase Skill. Once installed, all Agents can operate the database.

```bash
openclaw add @stopmoclay/supabase
```

### Commands Provided by the Skill

| Command | Function | Example |
|---------|----------|---------|
| `query` | Execute raw SQL | `query "SELECT * FROM transactions LIMIT 10"` |
| `select` | Query with filters | `select transactions --eq "category:dining" --limit 20` |
| `insert` | Insert data | `insert transactions '{"date":"2026-03-06","amount":150,"category":"dining"}'` |
| `update` | Update data | `update transactions '{"category":"transportation"}' --eq "id:abc123"` |
| `upsert` | Insert or update | `upsert portfolio '{"symbol":"AAPL","shares":10}'` |
| `delete` | Delete data | `delete events --eq "id:abc123"` |
| `tables` | List all tables | `tables` |
| `describe` | View table schema | `describe transactions` |
| `rpc` | Call stored procedure | `rpc monthly_summary '{"month":"2026-03"}'` |
| `vector-search` | pgvector search | `vector-search documents "query text" --limit 5` |

---

## Step 2: Create a Supabase Project

1. Go to https://supabase.com and create a free project
2. Record the following information:
   - **Project URL**: `https://yourproject.supabase.co`
   - **Service Role Key**: Found on the Settings -> API page
   - **Anon Key** (optional): For public access

---

## Step 3: Set Environment Variables

```bash
# Add to your shell configuration file (~/.zshrc or ~/.bashrc)
export SUPABASE_URL="https://yourproject.supabase.co"
export SUPABASE_SERVICE_KEY="your-service-role-key-here"
```

**Security notes:**
- The Service Key has full database access; never write it into any Markdown file
- Do not commit to Git (.env* is already excluded in .gitignore)
- Using OpenClaw's environment variable management is recommended over plaintext configuration

---

## Step 4: Create Data Tables

Connect to the Supabase SQL Editor and execute the following SQL:

### Core Business Tables

```sql
-- CFO Accounting Records
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_by TEXT DEFAULT 'cfo',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CFO Budget Tracking
CREATE TABLE budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,           -- Format: YYYY-MM
  category TEXT NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(month, category)
);

-- CIO Investment Portfolio
CREATE TABLE portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  shares DECIMAL(10,4),
  avg_cost DECIMAL(10,2),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CIO Trade Records
CREATE TABLE trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  action TEXT NOT NULL,           -- buy / sell
  shares DECIMAL(10,4),
  price DECIMAL(10,2),
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- COO Schedule
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME,
  end_time TIME,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled / completed / cancelled
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Operations Monitoring Tables

```sql
-- CFO Token Usage Tracking
CREATE TABLE token_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  agent_id TEXT NOT NULL,          -- ceo / cfo / cio / coo / cto / chro / cao
  model TEXT,                      -- Model name used
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd DECIMAL(10,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CAO Audit Log
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id TEXT,                   -- Corresponds to issues.md issue ID
  severity TEXT NOT NULL,          -- critical / high / medium / low
  agent_id TEXT NOT NULL,          -- Audited Agent
  finding TEXT NOT NULL,
  status TEXT DEFAULT 'open',      -- open / in_progress / resolved / closed
  resolution TEXT,
  created_by TEXT DEFAULT 'cao',
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

### Create Indexes (Improve Query Performance)

```sql
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_trades_symbol ON trades(symbol);
CREATE INDEX idx_trades_date ON trades(date);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_token_usage_date_agent ON token_usage(date, agent_id);
CREATE INDEX idx_audit_log_status ON audit_log(status);
```

---

## Step 5: Configure openclaw.json

### Option A: Global Skill (Shared by All Agents)

```json
{
  "skills": {
    "installed": ["@stopmoclay/supabase"]
  }
}
```

### Option B: Per-Agent MCP Server (Fine-Grained Control)

Configure different access permissions for different Agents:

```json
{
  "agents": {
    "list": [
      {
        "id": "cfo",
        "workspace": "~/.openclaw/workspace-cfo",
        "mcpServers": {
          "supabase": {
            "command": "npx",
            "args": ["-y", "@supabase/mcp-server"],
            "env": {
              "SUPABASE_URL": "${SUPABASE_URL}",
              "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
            }
          }
        }
      },
      {
        "id": "cio",
        "workspace": "~/.openclaw/workspace-cio",
        "mcpServers": {
          "supabase": {
            "command": "npx",
            "args": ["-y", "@supabase/mcp-server"],
            "env": {
              "SUPABASE_URL": "${SUPABASE_URL}",
              "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
            }
          }
        }
      },
      {
        "id": "coo",
        "workspace": "~/.openclaw/workspace-coo",
        "mcpServers": {
          "supabase": {
            "command": "npx",
            "args": ["-y", "@supabase/mcp-server"],
            "env": {
              "SUPABASE_URL": "${SUPABASE_URL}",
              "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
            }
          }
        }
      },
      {
        "id": "cao",
        "workspace": "~/.openclaw/workspace-cao",
        "mcpServers": {
          "supabase": {
            "command": "npx",
            "args": ["-y", "@supabase/mcp-server"],
            "env": {
              "SUPABASE_URL": "${SUPABASE_URL}",
              "SUPABASE_SERVICE_KEY": "${SUPABASE_ANON_KEY}"
            }
          }
        }
      }
    ]
  }
}
```

> **Note**: CAO uses `SUPABASE_ANON_KEY` with RLS policies, restricting access to read-only.
> See `shared/policies/supabase-rls.md` for details.

---

## Step 6: Install Custom Skills

Copy the Agent-specific Skills provided by this project to OpenClaw:

```bash
# Copy CFO / CIO / COO specific Skills
cp -r claw-company-config/skills/cfo-finance ~/.openclaw/skills/cfo-finance
cp -r claw-company-config/skills/cio-portfolio ~/.openclaw/skills/cio-portfolio
cp -r claw-company-config/skills/coo-schedule ~/.openclaw/skills/coo-schedule
```

These Skills encapsulate each Agent's specialized operational workflows, providing more precision than the generic Supabase Skill.

---

## Step 7: Migrate Existing Data

### CFO Accounting Migration

```sql
-- Example: Batch import historical accounting data from memory/
INSERT INTO transactions (date, amount, category, description) VALUES
  ('2026-01-15', 150.00, 'dining', 'Dinner with friends'),
  ('2026-01-16', 35.00, 'transportation', 'Taxi');
-- CFO extracts historical records from memory/ logs and inserts them individually or in batches
```

### CIO Holdings Migration

```sql
-- Import holdings data from MEMORY.md
INSERT INTO portfolio (symbol, shares, avg_cost) VALUES
  ('AAPL', 10.0000, 178.50),
  ('TSLA', 5.0000, 245.00);
```

---

## Step 8: Restart Gateway

```bash
openclaw gateway restart
```

---

## Approval Levels

| Operation | Approval Level | Description |
|-----------|---------------|-------------|
| Creating a Supabase project | Red Light | Involves external services and potential costs; Chairman approval required |
| Creating tables / schema changes | Yellow Light | CTO proposes + CEO approves |
| Installing Supabase Skill | Yellow Light | CTO executes + CEO approves |
| Configuring RLS security policies | Yellow Light | CAO reviews + CEO approves |
| Routine read/write operations | Green Light | Auto-execute |
| Dropping tables / bulk data deletion | Red Light | Chairman approval required |

---

## Verification Checklist

After installation, CTO performs the following verifications:

- [ ] `openclaw` can successfully connect to Supabase (`tables` command lists all tables)
- [ ] CFO can insert and query transactions
- [ ] CIO can insert and query portfolio / trades
- [ ] COO can insert and query events
- [ ] CAO can read audit_log but cannot modify other tables (RLS verification)
- [ ] Environment variables are not exposed in any Markdown or Git files
