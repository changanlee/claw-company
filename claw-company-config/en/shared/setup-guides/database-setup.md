# Database Setup Guide

When data volume grows beyond what Markdown files can effectively manage, CTO leads the setup of the following database layers.

---

## Layer 2: Supabase (Structured Data)

### Use Cases
- CFO's accounting records (income/expenses, categories, timestamps)
- CIO's investment portfolio (holdings, trade records, P&L)
- COO's schedule data (dates, locations, participants)

### Setup Steps

1. **Create a Supabase project**
   - Go to https://supabase.com and create a free project
   - Record the Project URL and API Key

2. **Create data tables**
   ```sql
   -- CFO Accounting
   CREATE TABLE transactions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     date DATE NOT NULL,
     amount DECIMAL(10,2) NOT NULL,
     category TEXT NOT NULL,
     description TEXT,
     created_by TEXT DEFAULT 'cfo',
     created_at TIMESTAMPTZ DEFAULT now()
   );

   -- CIO Investment Portfolio
   CREATE TABLE portfolio (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     symbol TEXT NOT NULL,
     shares DECIMAL(10,4),
     avg_cost DECIMAL(10,2),
     updated_at TIMESTAMPTZ DEFAULT now()
   );

   CREATE TABLE trades (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     symbol TEXT NOT NULL,
     action TEXT NOT NULL, -- buy/sell
     shares DECIMAL(10,4),
     price DECIMAL(10,2),
     date DATE NOT NULL,
     reason TEXT
   );

   -- COO Schedule
   CREATE TABLE events (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     date DATE NOT NULL,
     time TIME,
     location TEXT,
     notes TEXT,
     status TEXT DEFAULT 'scheduled'
   );
   ```

3. **Install Supabase Skill**
   ```bash
   openclaw add @stopmoclay/supabase
   ```

4. **Install Agent-specific Skills**
   - CFO: `skills/cfo-finance/SKILL.md` — Bookkeeping, queries, monthly reports, token auditing
   - CIO: `skills/cio-portfolio/SKILL.md` — Portfolio CRUD + P&L calculation
   - COO: `skills/coo-schedule/SKILL.md` — Schedule CRUD + conflict detection

5. **Configure environment variables and openclaw.json**
   - See `shared/setup-guides/supabase-setup.md` (complete installation guide)

6. **Configure Row Level Security**
   - See `shared/policies/supabase-rls.md` (Agent access permissions)
   - See `shared/policies/data-access-policy.md` (data governance rules)

7. **Migrate existing data**
   - CFO imports historical accounting data from memory/ into the transactions table
   - CIO imports holdings data from MEMORY.md into the portfolio table

### Additional Tables (Operations Monitoring)

```sql
-- CFO Budget Tracking
CREATE TABLE budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(month, category)
);

-- CFO Token Usage Tracking
CREATE TABLE token_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  agent_id TEXT NOT NULL,
  model TEXT,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd DECIMAL(10,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CAO Audit Log
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id TEXT,
  severity TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  finding TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  resolution TEXT,
  created_by TEXT DEFAULT 'cao',
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

### Approval Levels
- Setting up Supabase: Red Light (Chairman approval required; involves external services and costs)
- Installing Skills / configuring RLS: Yellow Light (CTO proposes + CEO approves)
- Routine read/write operations: Green Light (auto-execute)

---

## Layer 3: LanceDB Memory Enhancement (memory-lancedb-pro plugin) — Active

**Using [memory-lancedb-pro](https://github.com/win4r/memory-lancedb-pro) v1.0.32 open-source plugin**, replacing OpenClaw's built-in memory system. Automatically installed and configured by install.js.

### Plugin Advantages (vs Built-in Memory)

| Feature | Built-in Memory | memory-lancedb-pro |
|---------|----------------|-------------------|
| Retrieval method | Basic vector search | 7-layer hybrid retrieval (vector + BM25 + rerank) |
| Deduplication | None | MMR diversity dedup (cosine > 0.85 downweighted) |
| Noise filtering | None | Adaptive retrieval + noise interception |
| Isolation | None | Multi-scope isolation (inter-Agent memory privacy) |
| Embedding model | Fixed | Supports Jina / OpenAI / Gemini / Ollama local models |
| Time decay | None | Exponential decay + spaced repetition reinforcement |

### Use Cases
- Long-term knowledge consolidation for all Agents
- Cross-session experience retrieval ("How did we solve that issue last time?")
- Continuous learning of Chairman's preferences
- Semantic search over archived historical logs

### Installation Steps

#### 1. Obtain an Embedding Model API Key

Recommended: **Jina AI** (free tier is sufficient for initial use):
- Go to https://jina.ai and register an account
- Obtain an API Key
- Set environment variable: `export JINA_API_KEY=your_key_here`

Other supported embedding models:

| Provider | Model | Base URL | Dimensions |
|----------|-------|----------|-----------|
| Jina AI (recommended) | jina-embeddings-v5-text-small | https://api.jina.ai/v1 | 1024 |
| OpenAI | text-embedding-3-small | https://api.openai.com/v1 | 1536 |
| Google Gemini | gemini-embedding-001 | https://generativelanguage.googleapis.com/v1beta/openai/ | 3072 |
| Ollama (local) | nomic-embed-text | http://localhost:11434/v1 | Model-dependent |

#### 2. Install the Plugin

```bash
cd ~/.openclaw
git clone https://github.com/win4r/memory-lancedb-pro.git plugins/memory-lancedb-pro
cd plugins/memory-lancedb-pro
npm install
```

#### 3. Configuration (Handled automatically by install.js)

install.js automatically injects the following configuration into `openclaw.json`:

```json
{
  "plugins": {
    "load": { "paths": ["plugins/memory-lancedb-pro"] },
    "slots": { "memory": "memory-lancedb-pro" },
    "entries": {
      "memory-lancedb-pro": {
        "enabled": true,
        "config": {
          "embedding": {
            "apiKey": "${JINA_API_KEY}",
            "model": "jina-embeddings-v5-text-small",
            "baseURL": "https://api.jina.ai/v1"
          },
          "retrieval": {
            "rerank": "cross-encoder",
            "rerankProvider": "jina",
            "rerankApiKey": "${JINA_API_KEY}"
          },
          "autoCapture": true,
          "autoRecall": true,
          "autoRecallMinLength": 8,
          "scopes": {
            "definitions": {
              "agent:main": { "description": "OpenClaw default agent" },
              "project:claw-company": { "description": "Claw Company shared" },
              "agent:cc-ceo": { "description": "CEO private" },
              "agent:cc-cfo": { "description": "CFO private" },
              "agent:cc-cio": { "description": "CIO private" },
              "agent:cc-coo": { "description": "COO private" },
              "agent:cc-cto": { "description": "CTO private" },
              "agent:cc-chro": { "description": "CHRO private" },
              "agent:cc-cao": { "description": "CAO private" }
            },
            "agentAccess": {
              "main": ["agent:main"],
              "cc-ceo": ["project:claw-company", "agent:cc-ceo"],
              "cc-cfo": ["project:claw-company", "agent:cc-cfo"],
              "cc-cio": ["project:claw-company", "agent:cc-cio"],
              "cc-coo": ["project:claw-company", "agent:cc-coo"],
              "cc-cto": ["project:claw-company", "agent:cc-cto"],
              "cc-chro": ["project:claw-company", "agent:cc-chro"],
              "cc-cao": ["project:claw-company", "agent:cc-cao"]
            }
          }
        }
      }
    }
  }
}
```

**Scope isolation design**:
- `main` (OpenClaw default Agent) fully isolated — can only see its own memory
- `cc-*` (Claw Company Agents) share company-level memory via `project:claw-company`
- Each Agent has a private `agent:cc-xxx` scope
- **No `global` scope used** — ensures zero cross-contamination between main and cc-*

**Rerank strategy**: Defaults to Jina cross-encoder (10M tokens free), automatically falls back to local cosine similarity (lightweight) on API failure, ensuring retrieval never breaks.

#### 4. Restart Gateway

```bash
openclaw gateway restart
```

### 7-Layer Hybrid Retrieval Pipeline

The plugin's retrieval flow:

```
Query input
  |
1. Dual-path search: Vector embedding search + BM25 full-text search (simultaneous)
  |
2. RRF fusion: Vector score as baseline, BM25 hits add 15% weight
  |
3. Cross-Encoder Rerank: 60% cross-encoder score + 40% original fusion score
  |
4. Recency weighting: Exponential decay exp(-ageDays / halfLife) * weight
  |
5. Importance weighting: Score x (0.7 + 0.3 x importance)
  |
6. Length normalization: Prevent long entries from dominating results
  |
7. MMR diversity: Downweight results with cosine similarity > 0.85
  |
Filter: Discard results below hardMinScore
```

### Available Agent Tools

| Tool | Function |
|------|----------|
| `memory_recall` | Retrieve relevant memories |
| `memory_store` | Store new memories |
| `memory_forget` | Delete specific memories |
| `memory_stats` | Show database statistics |
| `memory_list` | Browse stored memories |

### CLI Management Commands

```bash
memory list          # Browse memory entries
memory search        # Search memories
memory stats         # Show statistics
memory delete        # Delete single entry
memory delete-bulk   # Bulk delete
memory export        # Export data
memory import        # Import data
memory reembed       # Regenerate embedding vectors
memory migrate       # Migrate from built-in plugin
```

### Auto-Capture and Auto-Recall

**Auto-Capture** (agent_end hook):
- Automatically extracts up to 3 memories at the end of each conversation (preferences, facts, decisions, entities)
- Automatic deduplication; skips administrative prompts

**Auto-Recall** (before_agent_start hook):
- Automatically injects relevant memories at the start of each conversation (up to 3 entries)
- Injected into context using `<relevant-memories>` XML format
- Can be disabled via `"autoRecall": false`

### Adaptive Retrieval

The plugin automatically skips queries that don't need memory:
- Simple greetings (hi, hello, HEARTBEAT)
- Slash commands
- Single emoji
- Simple confirmation replies
- Forced retrieval trigger words: "remember," "before," "last time," and other memory-related keywords
- CJK awareness: 6-character threshold (vs 15 characters for English)

### Three-Layer Memory Separation Principle

| Layer | Writer | Content | Role |
|-------|--------|---------|------|
| MEMORY.md (hot) | Agent actively | Distilled principles, preferences | Source of Truth |
| memory/*.md (warm) | Agent actively | Event logs, execution results | Timeline record |
| LanceDB (cold) | autoCapture automatically | Conversation context, errors & solutions | Auto-sedimentation pool |

**Agents do not need to manually write to LanceDB.** autoCapture automatically extracts memories (preferences, facts, decisions, entities) at agent_end; autoRecall automatically injects relevant cold memories at session start. The three layers have different granularity — they are not duplicates.

### Approval Levels
- Installing memory-lancedb-pro: Yellow Light (CTO proposes + CEO approves; local deployment)
- Setting up Jina AI API Key: Yellow Light (free tier, but involves external service)
- Routine memory access: Green Light (auto-execute)

### Contingency & Rollback

| Scenario | Action |
|----------|--------|
| Revert to built-in memory | Remove `plugins` section from openclaw.json, restart gateway |
| LanceDB data preserved | Data is not deleted on revert; can re-enable anytime |
| Hot/warm layers unaffected | MEMORY.md and memory/*.md work normally regardless of plugin state |
| Jina API failure | Rerank auto-degrades to lightweight (local cosine); embedding failure affects cold layer only, not hot/warm |

### References
- Plugin GitHub: https://github.com/win4r/memory-lancedb-pro
- Locked version: v1.0.32 (stable)
- Tutorial video: https://www.youtube.com/watch?v=MtukF1C8epQ

---

## Setup Order

| Phase | Timing | What to Build | Status |
|-------|--------|--------------|--------|
| **Phase 1** | Handled by install.js | memory-lancedb-pro plugin | ✅ Active |
| Phase 2 | CFO accounting records exceed 200 entries | Supabase structured accounting | Pending |
| Phase 3 | CIO needs precise trade history queries | Supabase investment portfolio tables | Pending |

## Supabase Trigger Conditions

When any Agent notices the following situations, they should recommend to CEO that Supabase setup be initiated:
- Structured queries across time ranges are needed (e.g., "dining expense trend over the past three months")
- CFO accounting records exceed what memory/*.md can effectively manage
