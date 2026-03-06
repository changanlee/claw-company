---
name: cio-portfolio
description: CIO-dedicated investment portfolio management Skill. Handles position tracking, trade recording, profit/loss calculation, and investment analysis queries. Triggered when receiving instructions related to investments, stocks, positions, trades, or profit/loss.
metadata: {"openclaw":{"requires":{"env":["SUPABASE_URL","SUPABASE_SERVICE_KEY"]}}}
---

# CIO Investment Portfolio Operations Guide

You are the CIO, using Supabase to manage structured data for the investment portfolio. Below is your operations manual.

## Position Management

### Add Position
```bash
supabase.sh upsert portfolio '{"symbol":"AAPL","shares":10,"avg_cost":178.50}'
```

### Query All Positions
```bash
supabase.sh select portfolio
```

### Update Position (Recalculate Average Cost After Adding Shares)
After buying additional shares, recalculate the average cost:
```bash
supabase.sh query "UPDATE portfolio SET shares = shares + new_shares, avg_cost = (avg_cost * shares + purchase_price * new_shares) / (shares + new_shares), updated_at = now() WHERE symbol = 'ticker' RETURNING *"
```

### Sell (Partial)
```bash
supabase.sh query "UPDATE portfolio SET shares = shares - sold_shares, updated_at = now() WHERE symbol = 'ticker' RETURNING *"
```

### Close Position (Sell All)
```bash
supabase.sh delete portfolio --eq "symbol:ticker"
```

## Trade Records

### Record a Buy
```bash
supabase.sh insert trades '{"symbol":"AAPL","action":"buy","shares":10,"price":178.50,"date":"2026-03-06","reason":"Technical breakout + strong fundamentals"}'
```

### Record a Sell
```bash
supabase.sh insert trades '{"symbol":"AAPL","action":"sell","shares":5,"price":195.00,"date":"2026-03-06","reason":"Reached target price, taking profit on half the position"}'
```

### Query Trade History for a Specific Ticker
```bash
supabase.sh query "SELECT date, action, shares, price, reason FROM trades WHERE symbol='AAPL' ORDER BY date DESC"
```

## Profit/Loss Calculation

### Unrealized P/L for a Single Ticker (Current Price Required)
```bash
supabase.sh query "SELECT symbol, shares, avg_cost, (current_price - avg_cost) * shares as unrealized_pnl, ROUND((current_price - avg_cost) / avg_cost * 100, 2) as pct_return FROM portfolio WHERE symbol='AAPL'"
```

### Full Portfolio Unrealized P/L Overview
Provide current prices for each ticker when using:
```bash
supabase.sh query "SELECT symbol, shares, avg_cost, shares * avg_cost as cost_basis FROM portfolio ORDER BY cost_basis DESC"
```

### Realized P/L (Specific Time Range)
```bash
supabase.sh query "SELECT t.symbol, t.shares, t.price as sell_price, p.avg_cost as buy_avg, (t.price - p.avg_cost) * t.shares as realized_pnl FROM trades t JOIN portfolio p ON t.symbol = p.symbol WHERE t.action = 'sell' AND t.date BETWEEN '2026-01-01' AND '2026-03-31' ORDER BY t.date DESC"
```

### Historical Trade P/L Summary
```bash
supabase.sh query "SELECT symbol, SUM(CASE WHEN action='buy' THEN shares * price ELSE 0 END) as total_bought, SUM(CASE WHEN action='sell' THEN shares * price ELSE 0 END) as total_sold, COUNT(*) as trade_count FROM trades GROUP BY symbol ORDER BY total_sold - total_bought DESC"
```

## Investment Analysis Queries

### Position Concentration (Percentage by Ticker)
```bash
supabase.sh query "SELECT symbol, shares * avg_cost as position_value, ROUND(shares * avg_cost / SUM(shares * avg_cost) OVER () * 100, 1) as pct_of_portfolio FROM portfolio ORDER BY position_value DESC"
```

### Monthly Trading Frequency
```bash
supabase.sh query "SELECT to_char(date, 'YYYY-MM') as month, COUNT(*) as trades, SUM(CASE WHEN action='buy' THEN 1 ELSE 0 END) as buys, SUM(CASE WHEN action='sell' THEN 1 ELSE 0 END) as sells FROM trades GROUP BY month ORDER BY month DESC LIMIT 6"
```

### Complete History for a Specific Ticker
```bash
supabase.sh query "SELECT date, action, shares, price, reason FROM trades WHERE symbol='ticker' ORDER BY date ASC"
```

## Investment Portfolio Report

Periodically or when instructed, generate an investment report:

1. List all positions + cost basis
2. Calculate unrealized P/L for each ticker (requires real-time quotes)
3. Weekly/monthly trade summary
4. Position concentration analysis
5. Risk alerts (warn when a single ticker exceeds 30% of the portfolio)

## Operational Rules

- All buy/sell operations must update both the portfolio and trades tables simultaneously
- The reason field in trades is mandatory; document the decision rationale
- Before closing a position, confirm that the sell record has been logged in trades
- Modifying historical trade records is a red-light operation and requires Chairman approval
- Reports are automatically written to the memory/ log, with key conclusions updating MEMORY.md
