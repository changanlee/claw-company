# 資料庫建置指南

當資料量增長到 Markdown 檔案無法有效管理時，由 CTO 主導建置以下資料庫層。

---

## 第二層：Supabase（結構化資料）

### 適用場景
- CFO 的帳務記錄（收支、分類、時間戳）
- CIO 的投資組合（持倉、交易紀錄、損益）
- COO 的行程資料（日期、地點、參與者）

### 建置步驟

1. **建立 Supabase 專案**
   - 前往 https://supabase.com 建立免費專案
   - 記錄 Project URL 和 API Key

2. **建立資料表**
   ```sql
   -- CFO 帳務
   CREATE TABLE transactions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     date DATE NOT NULL,
     amount DECIMAL(10,2) NOT NULL,
     category TEXT NOT NULL,
     description TEXT,
     created_by TEXT DEFAULT 'cfo',
     created_at TIMESTAMPTZ DEFAULT now()
   );

   -- CIO 投資組合
   CREATE TABLE portfolio (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     symbol TEXT NOT NULL,
     shares DECIMAL(10,4),
     avg_cost DECIMAL(10,2),
     updated_at TIMESTAMPTZ DEFAULT now()
   );

   CREATE TABLE trades (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     symbol TEXT NOT NULL,
     action TEXT NOT NULL, -- buy/sell
     shares DECIMAL(10,4),
     price DECIMAL(10,2),
     date DATE NOT NULL,
     reason TEXT
   );

   -- COO 行程
   CREATE TABLE events (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     date DATE NOT NULL,
     time TIME,
     location TEXT,
     notes TEXT,
     status TEXT DEFAULT 'scheduled'
   );
   ```

3. **為各 Agent 建立 Skill**
   - CFO Skill：封裝 Supabase API，提供記帳、查詢、報表功能
   - CIO Skill：封裝投資組合 CRUD + 損益計算
   - COO Skill：封裝行程 CRUD + 衝突檢測

4. **設定環境變數**
   - `SUPABASE_URL` 和 `SUPABASE_KEY` 加入 OpenClaw 環境配置
   - 確保金鑰不寫入任何 Markdown 檔案

5. **遷移既有資料**
   - CFO 將 memory/ 中的歷史帳務匯入 transactions 表
   - CIO 將 MEMORY.md 中的持倉資料匯入 portfolio 表

### 核決等級
- 建置 Supabase：紅燈（需董事長核決，涉及外部服務與成本）
- 日常讀寫操作：綠燈（自動執行）

---

## 第三層：LanceDB（向量知識庫）

### 適用場景
- 歸檔的歷史日誌（語義搜尋）
- 會議決議與研究資料
- 董事長偏好的長期學習
- 「上個月我在吃飯上花了多少」這類自然語言查詢

### 建置步驟

1. **安裝 LanceDB**
   ```bash
   pip install lancedb
   # 或
   npm install vectordb
   ```

2. **初始化知識庫**
   ```python
   import lancedb

   db = lancedb.connect("~/.openclaw/knowledge")

   # 建立各 Agent 的知識表
   # 每條記錄：content, agent_id, date, category, embedding
   ```

3. **建立歸檔 Cron Job**
   ```bash
   openclaw cron add knowledge-archive \
     --agent cto \
     --cron "0 3 * * 0" \
     --task "將所有 Agent 超過 30 天的 memory/ 日誌向量化後存入 LanceDB，然後刪除原始日誌檔案"
   ```

4. **為各 Agent 建立查詢 Skill**
   - 封裝語義搜尋 API
   - Agent 可用自然語言查詢歷史知識
   - 查詢結果附上來源日期與原始 Agent

### 核決等級
- 建置 LanceDB：黃燈（CTO 提案 + CEO 審批，本地部署無外部成本）
- 日常查詢：綠燈（自動執行）

---

## 建置順序建議

| 階段 | 時機 | 建置內容 |
|------|------|---------|
| 階段一 | memory/ 日誌超過 50 個檔案 | 先建 LanceDB 歸檔（本地、免費） |
| 階段二 | CFO 帳務記錄超過 200 筆 | 建 Supabase 結構化帳務 |
| 階段三 | CIO 需要精確的交易歷史查詢 | Supabase 投資組合表 |

## 觸發條件

任何 Agent 發現以下狀況時，應向 CEO 建議啟動資料庫建置：
- memory/ 目錄檔案數量超過 50 個
- MEMORY.md 頻繁因容量清理而丟失有價值的資訊
- 需要跨時間範圍的結構化查詢（如「過去三個月的餐飲支出趨勢」）
