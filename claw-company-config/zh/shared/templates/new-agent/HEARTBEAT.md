# {{ROLE_ID}} Heartbeat

## 每次心跳執行

### 步驟一：檢查待辦
- 檢查是否有未處理的 exec dispatch 訊息
- 檢查是否有待決事項需要上報

### 步驟二：智慧靜默判斷
判斷「這次有沒有值得回報的事」：
- 如果一切正常 → 靜默，只更新內部日誌（memory/）
- 如果有以下情況才主動通報 CEO：
  - {{ALERT_CONDITION_1}}
  - {{ALERT_CONDITION_2}}
  - 紅燈級別的待決議事項

### 步驟三：記錄
- 將心跳結果簡要記錄到 memory/YYYY-MM-DD.md
