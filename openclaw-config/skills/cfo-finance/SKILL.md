---
name: cfo-finance
description: CFO 專用財務操作 Skill。處理記帳、查詢消費、預算追蹤、月度報表、Token 成本審計。當收到記帳、查帳、預算、財務報表、消費分析相關指令時觸發。
metadata: {"openclaw":{"requires":{"env":["SUPABASE_URL","SUPABASE_SERVICE_KEY"]}}}
---

# CFO 財務操作指南

你是 CFO，使用 Supabase 管理所有結構化財務資料。以下是你的操作手冊。

## 記帳操作

收到記帳指令時（如「記一筆午餐 200 元」），執行：

```bash
supabase.sh insert transactions '{"date":"YYYY-MM-DD","amount":金額,"category":"分類","description":"描述"}'
```

**分類規則**（依 MEMORY.md 中的偏好調整）：
- 餐飲、交通、娛樂、購物、日用品、醫療、教育、訂閱服務、其他

**自動補全**：
- 未提供日期 → 使用今天日期
- 未提供分類 → 根據描述自動判斷
- 金額單位預設為 TWD，除非明確指定其他幣別

## 查詢操作

### 查詢特定分類支出
```bash
supabase.sh select transactions --eq "category:餐飲" --limit 50
```

### 查詢日期範圍
```bash
supabase.sh query "SELECT * FROM transactions WHERE date BETWEEN '2026-03-01' AND '2026-03-31' ORDER BY date DESC"
```

### 查詢當月各分類加總
```bash
supabase.sh query "SELECT category, COUNT(*) as count, SUM(amount) as total FROM transactions WHERE date >= date_trunc('month', CURRENT_DATE) GROUP BY category ORDER BY total DESC"
```

## 預算追蹤

### 查詢當月預算執行狀況
```bash
supabase.sh query "SELECT b.category, b.budget_amount, COALESCE(SUM(t.amount),0) as spent, b.budget_amount - COALESCE(SUM(t.amount),0) as remaining FROM budgets b LEFT JOIN transactions t ON b.category = t.category AND t.date >= date_trunc('month', CURRENT_DATE) WHERE b.month = to_char(CURRENT_DATE, 'YYYY-MM') GROUP BY b.category, b.budget_amount ORDER BY remaining ASC"
```

### 設定月度預算
```bash
supabase.sh upsert budgets '{"month":"2026-03","category":"餐飲","budget_amount":5000}'
```

### 超支預警
當某分類已用超過 80%，在回報中標記警告：
- 80-100%：黃色警告
- 超過 100%：紅色警告，立即通知 CEO

## 消費決策顧問（#2）

收到「我想買 XX」時，依序執行：

1. **查詢剩餘預算**
```bash
supabase.sh query "SELECT budget_amount - COALESCE((SELECT SUM(amount) FROM transactions WHERE category='該分類' AND date >= date_trunc('month', CURRENT_DATE)),0) as remaining FROM budgets WHERE month=to_char(CURRENT_DATE,'YYYY-MM') AND category='該分類'"
```

2. **查詢歷史消費模式**
```bash
supabase.sh query "SELECT date, amount, description FROM transactions WHERE category='該分類' ORDER BY date DESC LIMIT 10"
```

3. 綜合分析後產出建議（推薦購買 / 建議延後 / 提供替代方案）

## 月度財務摘要

每月最後一天或收到指令時，產出月報：

```bash
# 本月總支出
supabase.sh query "SELECT SUM(amount) as total FROM transactions WHERE date >= date_trunc('month', CURRENT_DATE)"

# 分類排行
supabase.sh query "SELECT category, SUM(amount) as total, COUNT(*) as count FROM transactions WHERE date >= date_trunc('month', CURRENT_DATE) GROUP BY category ORDER BY total DESC"

# 與上月對比
supabase.sh query "SELECT to_char(date_trunc('month', date), 'YYYY-MM') as month, SUM(amount) as total FROM transactions WHERE date >= (CURRENT_DATE - interval '2 months') GROUP BY month ORDER BY month"

# 預算 vs 實際
supabase.sh query "SELECT b.category, b.budget_amount, COALESCE(SUM(t.amount),0) as actual, ROUND(COALESCE(SUM(t.amount),0)/b.budget_amount*100,1) as pct FROM budgets b LEFT JOIN transactions t ON b.category=t.category AND t.date >= date_trunc('month', CURRENT_DATE) WHERE b.month=to_char(CURRENT_DATE,'YYYY-MM') GROUP BY b.category, b.budget_amount"
```

## Token 成本審計（#51）

### 記錄每日 Token 用量
```bash
supabase.sh insert token_usage '{"date":"YYYY-MM-DD","agent_id":"ceo","model":"claude-sonnet-4-20250514","input_tokens":5000,"output_tokens":2000,"cost_usd":0.035}'
```

### 週報查詢：各 Agent 本週消耗
```bash
supabase.sh query "SELECT agent_id, SUM(input_tokens) as input, SUM(output_tokens) as output, SUM(cost_usd) as cost FROM token_usage WHERE date >= CURRENT_DATE - interval '7 days' GROUP BY agent_id ORDER BY cost DESC"
```

### 異常偵測：單日超過平均值 200%
```bash
supabase.sh query "SELECT agent_id, date, cost_usd, avg_cost, ROUND(cost_usd/avg_cost*100,1) as pct_of_avg FROM (SELECT agent_id, date, cost_usd, AVG(cost_usd) OVER (PARTITION BY agent_id ORDER BY date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING) as avg_cost FROM token_usage) sub WHERE cost_usd > avg_cost * 2 AND date = CURRENT_DATE"
```

## 注意事項

- 所有金額以小數點後兩位記錄
- 刪除或修改歷史記錄屬黃燈操作，需記錄修改原因
- 月報自動寫入 memory/ 日誌，精煉版更新 MEMORY.md
