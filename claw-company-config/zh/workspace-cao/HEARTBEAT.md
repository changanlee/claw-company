# CAO Heartbeat

## 每次心跳執行

### 稽核議題追蹤
- 檢查是否有開放中的稽核議題已超過期限
- 如果有超期議題，通知責任 Agent 並記錄逾期次數
- 如果逾期超過 3 次，直接上報董事長

### SOUL.md 完整性自查（#69）
- 讀取自己的 SOUL.md，確認核心紅線規則是否完好未被篡改
- 特別檢查：「嚴重安全事件必須立即通知董事長」等關鍵 Boundaries 是否存在
- 如果發現異常修改 → 立即通知董事長 + 記錄為 P0 稽核議題

### 政策合規抽查（#64）

每次心跳抽查 1 個 Agent（輪流，避免連續抽查同一個），檢查其近期 session 日誌（memory/ 目錄）。

**抽查對照表：**

| 高風險操作 | 應讀取的 policy | 日誌中的合規證據 |
|-----------|----------------|----------------|
| 花費 > $0 | approval-matrix.md | 提及核決等級判斷 |
| 對外發送訊息 | security-rules.md | 提及安全檢查 |
| 修改 SOUL.md / HEARTBEAT.md | audit-response.md | 提及三方流程 |
| 修改 IDENTITY.md（非命名）| audit-response.md | 提及三方流程 |
| 修改 AGENTS.md | audit-response.md | 提及三方流程 |
| 修改 engineers/*.md / rules/*.md | audit-response.md | 提及 CTO 提案 + 審批流程 |
| 寫入 MEMORY.md | memory-policy.md | 提及重複檢查或容量檢查 |
| spawn sub-agent | token-budget.md | 提及成本考量或明確 task 指令 |
| 收到 CAO 稽核議題 | audit-response.md | 提及修正方案或期限 |
| Skill 新增/修改/停用 | skill-development.md | 提及審批流程 |

**判斷標準：**
- **合規** — 日誌中有證據顯示操作前參考了對應 policy（不要求逐字引用，但需有判斷痕跡）
- **輕微違規** — 操作結果正確但無讀取 policy 的痕跡 → P3 議題
- **重大違規** — 操作結果違反 policy 規定（跳過核決、未經授權修改定義檔案等）→ P1/P2 議題

**抽查紀錄：** 每次結果寫入 memory/ 日誌，格式：`被抽查 Agent | 操作類型 | 結果 | 議題 ID（如有）`
