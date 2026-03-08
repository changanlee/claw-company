# Supabase Row Level Security (RLS) Policy

This document defines each Agent's access permissions to Supabase tables, implemented through PostgreSQL Row Level Security.

---

## Design Principles

1. **Least privilege principle**: Each Agent can only access data required for its responsibilities
2. **Write isolation**: Agents can only write to tables they are responsible for
3. **Audit visibility**: CAO has read-only access to all tables
4. **Service Key tiering**: Business Agents use Service Key; CAO uses restricted Anon Key + RLS

---

## Agent Role Definitions

Create role identifiers in the Supabase SQL Editor:

```sql
-- Create Agent role identification function
-- Identifies the caller via the agent_id in JWT claims
CREATE OR REPLACE FUNCTION auth.agent_id()
RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::json->>'agent_id',
    'anonymous'
  );
$$ LANGUAGE sql STABLE;
```

---

## Enable RLS

```sql
-- Enable RLS on all tables
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
```

---

## Access Policies

### transactions (Managed by CFO)

```sql
-- CFO: Full read/write access
CREATE POLICY "cfo_full_access" ON transactions
  FOR ALL USING (auth.agent_id() = 'cc-cfo')
  WITH CHECK (auth.agent_id() = 'cc-cfo');

-- CEO: Read-only (view financial reports)
CREATE POLICY "ceo_read_transactions" ON transactions
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

-- CAO: Read-only (audit purposes)
CREATE POLICY "cao_read_transactions" ON transactions
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### budgets (Managed by CFO)

```sql
-- CFO: Full read/write access
CREATE POLICY "cfo_full_budgets" ON budgets
  FOR ALL USING (auth.agent_id() = 'cc-cfo')
  WITH CHECK (auth.agent_id() = 'cc-cfo');

-- COO: Read-only (check dining budget balance)
CREATE POLICY "coo_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'cc-coo');

-- CEO / CAO: Read-only
CREATE POLICY "ceo_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

CREATE POLICY "cao_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### portfolio (Managed by CIO)

```sql
-- CIO: Full read/write access
CREATE POLICY "cio_full_portfolio" ON portfolio
  FOR ALL USING (auth.agent_id() = 'cc-cio')
  WITH CHECK (auth.agent_id() = 'cc-cio');

-- CEO: Read-only (view investment status)
CREATE POLICY "ceo_read_portfolio" ON portfolio
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

-- CAO: Read-only (audit)
CREATE POLICY "cao_read_portfolio" ON portfolio
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### trades (Managed by CIO)

```sql
-- CIO: Full read/write access
CREATE POLICY "cio_full_trades" ON trades
  FOR ALL USING (auth.agent_id() = 'cc-cio')
  WITH CHECK (auth.agent_id() = 'cc-cio');

-- CEO / CAO: Read-only
CREATE POLICY "ceo_read_trades" ON trades
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

CREATE POLICY "cao_read_trades" ON trades
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### events (Managed by COO)

```sql
-- COO: Full read/write access
CREATE POLICY "coo_full_events" ON events
  FOR ALL USING (auth.agent_id() = 'cc-coo')
  WITH CHECK (auth.agent_id() = 'cc-coo');

-- CEO: Read-only (view schedule)
CREATE POLICY "ceo_read_events" ON events
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

-- CAO: Read-only
CREATE POLICY "cao_read_events" ON events
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### token_usage (Managed by CFO, readable by all)

```sql
-- CFO: Full read/write access
CREATE POLICY "cfo_full_token_usage" ON token_usage
  FOR ALL USING (auth.agent_id() = 'cc-cfo')
  WITH CHECK (auth.agent_id() = 'cc-cfo');

-- All Agents: Can read their own token usage
CREATE POLICY "agent_read_own_usage" ON token_usage
  FOR SELECT USING (agent_id = auth.agent_id());

-- CEO / CAO: Read all Agents' usage
CREATE POLICY "ceo_read_all_usage" ON token_usage
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

CREATE POLICY "cao_read_all_usage" ON token_usage
  FOR SELECT USING (auth.agent_id() = 'cc-cao');
```

### audit_log (Managed by CAO)

```sql
-- CAO: Full read/write access
CREATE POLICY "cao_full_audit" ON audit_log
  FOR ALL USING (auth.agent_id() = 'cc-cao')
  WITH CHECK (auth.agent_id() = 'cc-cao');

-- CEO: Read-only
CREATE POLICY "ceo_read_audit" ON audit_log
  FOR SELECT USING (auth.agent_id() = 'cc-ceo');

-- Audited Agents: Can only read records related to themselves
CREATE POLICY "agent_read_own_audit" ON audit_log
  FOR SELECT USING (agent_id = auth.agent_id());
```

---

## Service Key vs Anon Key Tiering

| Agent | Key Type | Description |
|-------|---------|-------------|
| CFO | Service Key | Needs write access to transactions, budgets, token_usage |
| CIO | Service Key | Needs write access to portfolio, trades |
| COO | Service Key | Needs write access to events |
| CEO | Anon Key + RLS | Read-only on all tables, no direct writes |
| CAO | Anon Key + RLS | Read-only on all tables + write to audit_log |
| CTO | Not required | Does not directly operate on business data |
| CHRO | Not required | Does not directly operate on business data |

---

## Approval Levels

- Creating / modifying RLS policies: Yellow Light (CAO review + CEO approval)
- Adding data table access for an Agent: Yellow Light (CAO review + CEO approval)
- Disabling RLS: Red Light (Chairman approval required; classified as a major security change)
