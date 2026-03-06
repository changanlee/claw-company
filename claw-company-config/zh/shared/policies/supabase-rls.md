# Supabase Row Level Security（RLS）政策

本文件定義各 Agent 對 Supabase 資料表的存取權限，透過 PostgreSQL Row Level Security 實現。

---

## 設計原則

1. **最小權限原則**：每個 Agent 只能存取其職責所需的資料
2. **寫入隔離**：Agent 只能寫入自己負責的表
3. **稽核可見性**：CAO 對所有表擁有唯讀存取權
4. **Service Key 分級**：業務 Agent 用 Service Key，CAO 用受限的 Anon Key + RLS

---

## Agent 角色定義

在 Supabase SQL Editor 中建立角色標識：

```sql
-- 建立 Agent 角色識別函數
-- 透過 JWT claim 中的 agent_id 識別呼叫者
CREATE OR REPLACE FUNCTION auth.agent_id()
RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::json->>'agent_id',
    'anonymous'
  );
$$ LANGUAGE sql STABLE;
```

---

## 啟用 RLS

```sql
-- 對所有表啟用 RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
```

---

## 存取政策

### transactions（CFO 管理）

```sql
-- CFO：完整讀寫
CREATE POLICY "cfo_full_access" ON transactions
  FOR ALL USING (auth.agent_id() = 'cfo')
  WITH CHECK (auth.agent_id() = 'cfo');

-- CEO：唯讀（查看財務報表）
CREATE POLICY "ceo_read_transactions" ON transactions
  FOR SELECT USING (auth.agent_id() = 'ceo');

-- CAO：唯讀（稽核用途）
CREATE POLICY "cao_read_transactions" ON transactions
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### budgets（CFO 管理）

```sql
-- CFO：完整讀寫
CREATE POLICY "cfo_full_budgets" ON budgets
  FOR ALL USING (auth.agent_id() = 'cfo')
  WITH CHECK (auth.agent_id() = 'cfo');

-- COO：唯讀（查詢餐飲預算餘額）
CREATE POLICY "coo_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'coo');

-- CEO / CAO：唯讀
CREATE POLICY "ceo_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'ceo');

CREATE POLICY "cao_read_budgets" ON budgets
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### portfolio（CIO 管理）

```sql
-- CIO：完整讀寫
CREATE POLICY "cio_full_portfolio" ON portfolio
  FOR ALL USING (auth.agent_id() = 'cio')
  WITH CHECK (auth.agent_id() = 'cio');

-- CEO：唯讀（查看投資狀況）
CREATE POLICY "ceo_read_portfolio" ON portfolio
  FOR SELECT USING (auth.agent_id() = 'ceo');

-- CAO：唯讀（稽核）
CREATE POLICY "cao_read_portfolio" ON portfolio
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### trades（CIO 管理）

```sql
-- CIO：完整讀寫
CREATE POLICY "cio_full_trades" ON trades
  FOR ALL USING (auth.agent_id() = 'cio')
  WITH CHECK (auth.agent_id() = 'cio');

-- CEO / CAO：唯讀
CREATE POLICY "ceo_read_trades" ON trades
  FOR SELECT USING (auth.agent_id() = 'ceo');

CREATE POLICY "cao_read_trades" ON trades
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### events（COO 管理）

```sql
-- COO：完整讀寫
CREATE POLICY "coo_full_events" ON events
  FOR ALL USING (auth.agent_id() = 'coo')
  WITH CHECK (auth.agent_id() = 'coo');

-- CEO：唯讀（查看行程安排）
CREATE POLICY "ceo_read_events" ON events
  FOR SELECT USING (auth.agent_id() = 'ceo');

-- CAO：唯讀
CREATE POLICY "cao_read_events" ON events
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### token_usage（CFO 管理，全體可讀）

```sql
-- CFO：完整讀寫
CREATE POLICY "cfo_full_token_usage" ON token_usage
  FOR ALL USING (auth.agent_id() = 'cfo')
  WITH CHECK (auth.agent_id() = 'cfo');

-- 所有 Agent：可讀取自己的 Token 用量
CREATE POLICY "agent_read_own_usage" ON token_usage
  FOR SELECT USING (agent_id = auth.agent_id());

-- CEO / CAO：讀取所有人的用量
CREATE POLICY "ceo_read_all_usage" ON token_usage
  FOR SELECT USING (auth.agent_id() = 'ceo');

CREATE POLICY "cao_read_all_usage" ON token_usage
  FOR SELECT USING (auth.agent_id() = 'cao');
```

### audit_log（CAO 管理）

```sql
-- CAO：完整讀寫
CREATE POLICY "cao_full_audit" ON audit_log
  FOR ALL USING (auth.agent_id() = 'cao')
  WITH CHECK (auth.agent_id() = 'cao');

-- CEO：唯讀
CREATE POLICY "ceo_read_audit" ON audit_log
  FOR SELECT USING (auth.agent_id() = 'ceo');

-- 被稽核 Agent：只能讀取與自己相關的記錄
CREATE POLICY "agent_read_own_audit" ON audit_log
  FOR SELECT USING (agent_id = auth.agent_id());
```

---

## Service Key vs Anon Key 分級

| Agent | Key 類型 | 說明 |
|-------|---------|------|
| CFO | Service Key | 需寫入 transactions、budgets、token_usage |
| CIO | Service Key | 需寫入 portfolio、trades |
| COO | Service Key | 需寫入 events |
| CEO | Anon Key + RLS | 唯讀所有表，不直接寫入 |
| CAO | Anon Key + RLS | 唯讀所有表 + 寫入 audit_log |
| CTO | 不需要 | 不直接操作業務資料 |
| CHRO | 不需要 | 不直接操作業務資料 |

---

## 核決等級

- 建立 / 修改 RLS 政策：黃燈（CAO 審查 + CEO 審批）
- 新增 Agent 的資料表存取權：黃燈（CAO 審查 + CEO 審批）
- 停用 RLS：紅燈（需董事長核決，屬重大安全變更）
