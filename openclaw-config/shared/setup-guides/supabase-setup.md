# Supabase 安裝與配置指南

當資料量增長到 Markdown 檔案無法有效管理時，依照本指南建置 Supabase 結構化資料層。

---

## 第一步：安裝 Supabase Skill

OpenClaw 社群提供現成的 Supabase Skill，安裝後所有 Agent 即可操作資料庫。

```bash
openclaw add @stopmoclay/supabase
```

### Skill 提供的指令

| 指令 | 功能 | 範例 |
|------|------|------|
| `query` | 執行原生 SQL | `query "SELECT * FROM transactions LIMIT 10"` |
| `select` | 帶過濾條件查詢 | `select transactions --eq "category:餐飲" --limit 20` |
| `insert` | 新增資料 | `insert transactions '{"date":"2026-03-06","amount":150,"category":"餐飲"}'` |
| `update` | 更新資料 | `update transactions '{"category":"交通"}' --eq "id:abc123"` |
| `upsert` | 新增或更新 | `upsert portfolio '{"symbol":"AAPL","shares":10}'` |
| `delete` | 刪除資料 | `delete events --eq "id:abc123"` |
| `tables` | 列出所有表 | `tables` |
| `describe` | 查看表結構 | `describe transactions` |
| `rpc` | 呼叫 stored procedure | `rpc monthly_summary '{"month":"2026-03"}'` |
| `vector-search` | pgvector 向量搜尋 | `vector-search documents "查詢文字" --limit 5` |

---

## 第二步：建立 Supabase 專案

1. 前往 https://supabase.com 建立免費專案
2. 記錄以下資訊：
   - **Project URL**：`https://yourproject.supabase.co`
   - **Service Role Key**：在 Settings → API 頁面取得
   - **Anon Key**（選用）：公開存取用

---

## 第三步：設定環境變數

```bash
# 加入 shell 設定檔（~/.zshrc 或 ~/.bashrc）
export SUPABASE_URL="https://yourproject.supabase.co"
export SUPABASE_SERVICE_KEY="your-service-role-key-here"
```

**安全注意事項：**
- Service Key 擁有完整資料庫存取權限，絕對不要寫入任何 Markdown 檔案
- 不要提交到 Git（已在 .gitignore 排除 .env*）
- 建議使用 OpenClaw 的環境變數管理而非明文設定

---

## 第四步：建立資料表

連線到 Supabase SQL Editor，執行以下 SQL：

### 核心業務表

```sql
-- CFO 帳務記錄
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_by TEXT DEFAULT 'cfo',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CFO 預算追蹤
CREATE TABLE budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,           -- 格式：YYYY-MM
  category TEXT NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(month, category)
);

-- CIO 投資組合
CREATE TABLE portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  shares DECIMAL(10,4),
  avg_cost DECIMAL(10,2),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CIO 交易紀錄
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

-- COO 行程
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

### 營運監控表

```sql
-- CFO Token 用量追蹤
CREATE TABLE token_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  agent_id TEXT NOT NULL,          -- ceo / cfo / cio / coo / cto / chro / cao
  model TEXT,                      -- 使用的模型名稱
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd DECIMAL(10,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CAO 稽核日誌
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id TEXT,                   -- 對應 issues.md 的議題 ID
  severity TEXT NOT NULL,          -- critical / high / medium / low
  agent_id TEXT NOT NULL,          -- 被稽核的 Agent
  finding TEXT NOT NULL,
  status TEXT DEFAULT 'open',      -- open / in_progress / resolved / closed
  resolution TEXT,
  created_by TEXT DEFAULT 'cao',
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

### 建立索引（提升查詢效能）

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

## 第五步：配置 openclaw.json

### 方式 A：全域 Skill（所有 Agent 共用）

```json
{
  "skills": {
    "installed": ["@stopmoclay/supabase"]
  }
}
```

### 方式 B：Per-Agent MCP Server（精細控制）

為不同 Agent 配置不同的存取權限：

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

> **注意**：CAO 使用 `SUPABASE_ANON_KEY` 搭配 RLS 政策，限制為唯讀存取。
> 詳見 `shared/policies/supabase-rls.md`。

---

## 第六步：安裝自定義 Skill

將本專案提供的 Agent 專屬 Skill 複製到 OpenClaw：

```bash
# 複製 CFO / CIO / COO 專屬 Skill
cp -r openclaw-config/skills/cfo-finance ~/.openclaw/skills/cfo-finance
cp -r openclaw-config/skills/cio-portfolio ~/.openclaw/skills/cio-portfolio
cp -r openclaw-config/skills/coo-schedule ~/.openclaw/skills/coo-schedule
```

這些 Skill 封裝了各 Agent 的專屬操作流程，比通用 Supabase Skill 更精確。

---

## 第七步：遷移既有資料

### CFO 帳務遷移

```sql
-- 範例：將 memory/ 中的歷史帳務批次匯入
INSERT INTO transactions (date, amount, category, description) VALUES
  ('2026-01-15', 150.00, '餐飲', '與朋友聚餐'),
  ('2026-01-16', 35.00, '交通', '計程車');
-- CFO 從 memory/ 日誌中提取歷史記錄，逐筆或批次插入
```

### CIO 持倉遷移

```sql
-- 將 MEMORY.md 中的持倉資料匯入
INSERT INTO portfolio (symbol, shares, avg_cost) VALUES
  ('AAPL', 10.0000, 178.50),
  ('TSLA', 5.0000, 245.00);
```

---

## 第八步：重啟 Gateway

```bash
openclaw gateway restart
```

---

## 核決等級

| 操作 | 核決等級 | 說明 |
|------|---------|------|
| 建立 Supabase 專案 | 紅燈 | 涉及外部服務與潛在成本，需董事長核決 |
| 建立資料表 / Schema 變更 | 黃燈 | CTO 提案 + CEO 審批 |
| 安裝 Supabase Skill | 黃燈 | CTO 執行 + CEO 審批 |
| 設定 RLS 安全政策 | 黃燈 | CAO 審查 + CEO 審批 |
| 日常讀寫操作 | 綠燈 | 自動執行 |
| 刪除資料表 / 大量刪除資料 | 紅燈 | 需董事長核決 |

---

## 驗證清單

安裝完成後，由 CTO 執行以下驗證：

- [ ] `openclaw` 能成功連線 Supabase（`tables` 指令列出所有表）
- [ ] CFO 能插入和查詢 transactions
- [ ] CIO 能插入和查詢 portfolio / trades
- [ ] COO 能插入和查詢 events
- [ ] CAO 能讀取 audit_log 但無法修改其他表（RLS 驗證）
- [ ] 環境變數未暴露在任何 Markdown 或 Git 檔案中
