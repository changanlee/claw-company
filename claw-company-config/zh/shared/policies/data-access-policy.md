# 資料存取治理政策

本政策規範各 Agent 對 Supabase 結構化資料的存取權限與操作規則。

---

## 存取權限矩陣

| 資料表 | 擁有者 | 可讀取 | 可寫入 | 說明 |
|--------|--------|--------|--------|------|
| transactions | CFO | CEO, CAO, COO(預算查詢) | CFO | 收支記錄 |
| budgets | CFO | CEO, CAO, COO | CFO | 預算設定與追蹤 |
| portfolio | CIO | CEO, CAO | CIO | 投資持倉 |
| trades | CIO | CEO, CAO | CIO | 交易紀錄 |
| events | COO | CEO, CAO | COO | 行程安排 |
| token_usage | CFO | CEO, CAO, 各自己 | CFO | Token 消耗追蹤 |
| audit_log | CAO | CEO, 被稽核者(限自己) | CAO | 稽核記錄 |

---

## 操作分級

### 綠燈（自動執行，不需審批）

- 新增資料（INSERT）到自己負責的表
- 查詢資料（SELECT）在權限範圍內的表
- 更新自己剛建立的記錄（同日修正）

### 黃燈（需 CEO 審批）

- 更新超過 24 小時的歷史記錄
- 批次刪除資料（超過 10 筆）
- 修改表結構（ALTER TABLE）
- 新增或修改 RLS 政策

### 紅燈（需董事長核決）

- 刪除整張資料表（DROP TABLE）
- 停用 RLS 安全政策
- 修改歷史交易記錄（trades 表）
- 匯出全量資料到外部
- 變更 Service Key

---

## 跨 Agent 資料存取規則

### CFO 向 COO 查詢
- **場景**：COO 的飲食推薦需要查詢餐飲預算剩餘
- **方式**：COO 透過 `exec dispatch` 請求 CFO 查詢，或直接讀取 budgets 表（唯讀）
- **不得**：COO 直接修改 budgets 或 transactions

### CAO 稽核存取
- **場景**：CAO 需要交叉驗證 CFO 的帳務記錄
- **方式**：CAO 對所有表擁有唯讀存取
- **不得**：CAO 修改任何業務表的資料
- **記錄**：CAO 的稽核查詢行為記錄在 audit_log

### CEO 報表存取
- **場景**：CEO 彙整晨間簡報需要各部門數據
- **方式**：CEO 對所有表擁有唯讀存取
- **不得**：CEO 直接修改任何業務表（應指派責任 Agent 操作）

---

## 資料保留政策

| 資料表 | 保留期限 | 到期處理 |
|--------|---------|---------|
| transactions | 永久 | 不刪除，可歸檔到年度備份 |
| budgets | 永久 | 歷史預算保留供對比分析 |
| portfolio | 永久 | 清倉標的保留歷史記錄 |
| trades | 永久 | 交易記錄永不刪除 |
| events | 1 年 | 超過 1 年的已完成/取消行程可歸檔 |
| token_usage | 6 個月 | 超過 6 個月的明細可聚合為月度摘要 |
| audit_log | 永久 | 稽核記錄永不刪除 |

### 歸檔流程

1. CTO 建立歸檔 Cron Job（每季執行）
2. 將到期資料匯出為 CSV 備份
3. 確認備份完整後刪除原始明細
4. 歸檔操作屬黃燈，需 CEO 審批

---

## 異常行為偵測

CAO 應監控以下異常資料存取模式：

- Agent 查詢非職責範圍的資料表（RLS 會阻擋，但應記錄嘗試）
- 單次查詢回傳超過 1000 筆資料
- 短時間內大量 DELETE 操作
- 非工作時段的異常寫入

偵測到異常時，CAO 記錄到 audit_log 並通知 CEO。

---

## 技術實現

- 存取控制由 Supabase RLS 強制執行（詳見 `supabase-rls.md`）
- Agent 身份透過 JWT claim 中的 `agent_id` 識別
- Service Key 只分配給需要寫入的 Agent（CFO、CIO、COO、CAO）
- CEO、CTO、CHRO 使用 Anon Key + RLS 限制
