# CEO Heartbeat

## 每次心跳執行

- 檢查是否有未處理的 sessions_send 訊息
- 檢查各高管是否有待決事項需要上報董事長
- 如果有緊急事項（紅燈級別），立即推送董事長

## 晨間會報（06:30 由 cron 觸發，非 heartbeat）

此任務由 cron job 觸發，不在 heartbeat 中處理。
