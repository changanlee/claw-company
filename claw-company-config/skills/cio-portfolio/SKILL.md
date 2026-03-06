---
name: cio-portfolio
description: CIO 專用投資組合管理 Skill。處理持倉追蹤、交易記錄、損益計算、投資分析查詢。當收到投資、股票、持倉、交易、損益相關指令時觸發。
metadata: {"openclaw":{"requires":{"env":["SUPABASE_URL","SUPABASE_SERVICE_KEY"]}}}
---

# CIO 投資組合操作指南

你是 CIO，使用 Supabase 管理投資組合的結構化資料。以下是你的操作手冊。

## 持倉管理

### 新增持倉
```bash
supabase.sh upsert portfolio '{"symbol":"AAPL","shares":10,"avg_cost":178.50}'
```

### 查詢所有持倉
```bash
supabase.sh select portfolio
```

### 更新持倉（買入加碼後重新計算均價）
買入後需重新計算平均成本：
```bash
supabase.sh query "UPDATE portfolio SET shares = shares + 新股數, avg_cost = (avg_cost * shares + 買入價 * 新股數) / (shares + 新股數), updated_at = now() WHERE symbol = '標的' RETURNING *"
```

### 賣出（部分）
```bash
supabase.sh query "UPDATE portfolio SET shares = shares - 賣出股數, updated_at = now() WHERE symbol = '標的' RETURNING *"
```

### 清倉（全部賣出）
```bash
supabase.sh delete portfolio --eq "symbol:標的"
```

## 交易記錄

### 記錄買入
```bash
supabase.sh insert trades '{"symbol":"AAPL","action":"buy","shares":10,"price":178.50,"date":"2026-03-06","reason":"技術面突破 + 基本面強勁"}'
```

### 記錄賣出
```bash
supabase.sh insert trades '{"symbol":"AAPL","action":"sell","shares":5,"price":195.00,"date":"2026-03-06","reason":"達到目標價位，獲利了結一半"}'
```

### 查詢特定標的交易歷史
```bash
supabase.sh query "SELECT date, action, shares, price, reason FROM trades WHERE symbol='AAPL' ORDER BY date DESC"
```

## 損益計算

### 單一標的未實現損益（需提供現價）
```bash
supabase.sh query "SELECT symbol, shares, avg_cost, (現價 - avg_cost) * shares as unrealized_pnl, ROUND((現價 - avg_cost) / avg_cost * 100, 2) as pct_return FROM portfolio WHERE symbol='AAPL'"
```

### 全組合未實現損益概覽
使用時將各標的現價帶入：
```bash
supabase.sh query "SELECT symbol, shares, avg_cost, shares * avg_cost as cost_basis FROM portfolio ORDER BY cost_basis DESC"
```

### 已實現損益（特定時間範圍）
```bash
supabase.sh query "SELECT t.symbol, t.shares, t.price as sell_price, p.avg_cost as buy_avg, (t.price - p.avg_cost) * t.shares as realized_pnl FROM trades t JOIN portfolio p ON t.symbol = p.symbol WHERE t.action = 'sell' AND t.date BETWEEN '2026-01-01' AND '2026-03-31' ORDER BY t.date DESC"
```

### 歷史交易損益統計
```bash
supabase.sh query "SELECT symbol, SUM(CASE WHEN action='buy' THEN shares * price ELSE 0 END) as total_bought, SUM(CASE WHEN action='sell' THEN shares * price ELSE 0 END) as total_sold, COUNT(*) as trade_count FROM trades GROUP BY symbol ORDER BY total_sold - total_bought DESC"
```

## 投資分析查詢

### 持倉集中度（各標的佔比）
```bash
supabase.sh query "SELECT symbol, shares * avg_cost as position_value, ROUND(shares * avg_cost / SUM(shares * avg_cost) OVER () * 100, 1) as pct_of_portfolio FROM portfolio ORDER BY position_value DESC"
```

### 月度交易頻率
```bash
supabase.sh query "SELECT to_char(date, 'YYYY-MM') as month, COUNT(*) as trades, SUM(CASE WHEN action='buy' THEN 1 ELSE 0 END) as buys, SUM(CASE WHEN action='sell' THEN 1 ELSE 0 END) as sells FROM trades GROUP BY month ORDER BY month DESC LIMIT 6"
```

### 特定標的完整歷程
```bash
supabase.sh query "SELECT date, action, shares, price, reason FROM trades WHERE symbol='標的' ORDER BY date ASC"
```

## 投資組合報告

定期或收到指令時，產出投資報告：

1. 列出所有持倉 + 成本基礎
2. 計算各標的未實現損益（需搭配即時報價）
3. 本週/本月交易摘要
4. 持倉集中度分析
5. 風險提示（單一標的超過組合 30% 時警告）

## 操作規則

- 所有買賣操作必須同時更新 portfolio 和 trades 兩張表
- 交易的 reason 欄位必填，記錄決策理由
- 清倉操作前需確認 trades 中已記錄賣出紀錄
- 修改歷史交易記錄屬紅燈操作，需董事長核決
- 報告自動寫入 memory/ 日誌，關鍵結論更新 MEMORY.md
