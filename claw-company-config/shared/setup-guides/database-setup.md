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

3. **安裝 Supabase Skill**
   ```bash
   openclaw add @stopmoclay/supabase
   ```

4. **安裝 Agent 專屬 Skill**
   - CFO：`skills/cfo-finance/SKILL.md` — 記帳、查詢、月報、Token 審計
   - CIO：`skills/cio-portfolio/SKILL.md` — 投資組合 CRUD + 損益計算
   - COO：`skills/coo-schedule/SKILL.md` — 行程 CRUD + 衝突檢測

5. **設定環境變數與 openclaw.json**
   - 詳見 `shared/setup-guides/supabase-setup.md`（完整安裝指南）

6. **設定 Row Level Security**
   - 詳見 `shared/policies/supabase-rls.md`（各 Agent 存取權限）
   - 詳見 `shared/policies/data-access-policy.md`（資料治理規則）

7. **遷移既有資料**
   - CFO 將 memory/ 中的歷史帳務匯入 transactions 表
   - CIO 將 MEMORY.md 中的持倉資料匯入 portfolio 表

### 額外資料表（營運監控）

```sql
-- CFO 預算追蹤
CREATE TABLE budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(month, category)
);

-- CFO Token 用量追蹤
CREATE TABLE token_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  agent_id TEXT NOT NULL,
  model TEXT,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd DECIMAL(10,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CAO 稽核日誌
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id TEXT,
  severity TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  finding TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  resolution TEXT,
  created_by TEXT DEFAULT 'cao',
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

### 核決等級
- 建置 Supabase：紅燈（需董事長核決，涉及外部服務與成本）
- 安裝 Skill / 設定 RLS：黃燈（CTO 提案 + CEO 審批）
- 日常讀寫操作：綠燈（自動執行）

---

## 第三層：LanceDB 記憶增強（memory-lancedb-pro 插件）

**推薦使用 [memory-lancedb-pro](https://github.com/win4r/memory-lancedb-pro) 開源插件**，遠超 OpenClaw 內建記憶系統。

### 插件優勢（vs 內建記憶）

| 特性 | 內建記憶 | memory-lancedb-pro |
|------|---------|-------------------|
| 檢索方式 | 基礎向量搜尋 | 7 層混合檢索（向量 + BM25 + Rerank） |
| 去重 | 無 | MMR 多樣性去重（cosine > 0.85 降權） |
| 噪音過濾 | 無 | 自適應檢索 + 噪音攔截 |
| 隔離性 | 無 | 多 scope 隔離（Agent 間記憶隱私保護） |
| 嵌入模型 | 固定 | 支援 Jina / OpenAI / Gemini / Ollama 本地模型 |
| 時間衰減 | 無 | 指數衰減 + 間隔重複強化 |

### 適用場景
- 所有 Agent 的長期知識沉澱
- 跨 session 的經驗檢索（「上次那個問題怎麼解決的？」）
- 董事長偏好的持續學習
- 歸檔的歷史日誌語義搜尋

### 安裝步驟

#### 1. 取得嵌入模型 API Key

推薦使用 **Jina AI**（免費額度足夠初期使用）：
- 前往 https://jina.ai 註冊帳號
- 取得 API Key
- 設定環境變數：`export JINA_API_KEY=your_key_here`

其他支援的嵌入模型：

| 供應商 | 模型 | Base URL | 維度 |
|--------|------|----------|------|
| Jina AI（推薦） | jina-embeddings-v5-text-small | https://api.jina.ai/v1 | 1024 |
| OpenAI | text-embedding-3-small | https://api.openai.com/v1 | 1536 |
| Google Gemini | gemini-embedding-001 | https://generativelanguage.googleapis.com/v1beta/openai/ | 3072 |
| Ollama（本地） | nomic-embed-text | http://localhost:11434/v1 | 依模型 |

#### 2. 安裝插件

```bash
cd ~/.openclaw
git clone https://github.com/win4r/memory-lancedb-pro.git plugins/memory-lancedb-pro
cd plugins/memory-lancedb-pro
npm install
```

#### 3. 設定 openclaw.json

在 `openclaw.json` 中加入插件配置：

```json5
{
  "plugins": {
    "load": {
      "paths": ["plugins/memory-lancedb-pro"]
    }
  }
}
```

**注意：** 同一時間只能啟用一個記憶插件。如果使用 Pro 版，需停用內建記憶插件。

#### 4. 插件配置

在插件目錄中設定 `config.json`：

```json
{
  "embedding": {
    "apiKey": "${JINA_API_KEY}",
    "model": "jina-embeddings-v5-text-small",
    "baseURL": "https://api.jina.ai/v1",
    "dimensions": 1024,
    "taskQuery": "retrieval.query",
    "taskPassage": "retrieval.passage",
    "normalized": true
  },
  "retrieval": {
    "mode": "hybrid",
    "vectorWeight": 0.7,
    "bm25Weight": 0.3,
    "minScore": 0.3,
    "rerank": "cross-encoder",
    "rerankProvider": "jina",
    "rerankModel": "jina-reranker-v3",
    "candidatePoolSize": 20,
    "recencyHalfLifeDays": 14,
    "recencyWeight": 0.1,
    "filterNoise": true,
    "hardMinScore": 0.35,
    "timeDecayHalfLifeDays": 60
  }
}
```

#### 5. 設定多 Scope 隔離（重要）

為每個 Agent 設定記憶隔離，保護各部門的資料隱私：

```json
{
  "scopes": {
    "default": "global",
    "definitions": {
      "global": { "description": "全公司共享知識（營運規範、通用教訓）" },
      "agent:ceo": { "description": "CEO 專屬（決策模式、董事長偏好）" },
      "agent:cfo": { "description": "CFO 專屬（財務規則、消費分類）" },
      "agent:cio": { "description": "CIO 專屬（投資策略、市場觀察）" },
      "agent:coo": { "description": "COO 專屬（生活偏好、餐廳記錄）" },
      "agent:cto": { "description": "CTO 專屬（技術教訓、架構決策）" },
      "agent:chro": { "description": "CHRO 專屬（組織評估、能力記錄）" },
      "agent:cao": { "description": "CAO 專屬（稽核記錄、安全事件）" }
    },
    "agentAccess": {
      "ceo": ["global", "agent:ceo"],
      "cfo": ["global", "agent:cfo"],
      "cio": ["global", "agent:cio"],
      "coo": ["global", "agent:coo"],
      "cto": ["global", "agent:cto"],
      "chro": ["global", "agent:chro"],
      "cao": ["global", "agent:cao"]
    }
  }
}
```

#### 6. 重啟 Gateway

```bash
openclaw gateway restart
```

### 7 層混合檢索管線

插件的檢索流程：

```
查詢輸入
  ↓
1. 雙路搜尋：向量嵌入搜尋 + BM25 全文搜尋（同時）
  ↓
2. RRF 融合：向量分數為基線，BM25 命中加 15% 權重
  ↓
3. Cross-Encoder Rerank：60% 交叉編碼器分數 + 40% 原始融合分數
  ↓
4. 時近性加權：指數衰減 exp(-ageDays / halfLife) * weight
  ↓
5. 重要性加權：分數 × (0.7 + 0.3 × importance)
  ↓
6. 長度正規化：防止長條目主導結果
  ↓
7. MMR 多樣性：cosine 相似度 > 0.85 的結果降權
  ↓
過濾：低於 hardMinScore 的結果丟棄
```

### Agent 可用工具

| 工具 | 功能 |
|------|------|
| `memory_recall` | 檢索相關記憶 |
| `memory_store` | 儲存新記憶 |
| `memory_forget` | 刪除特定記憶 |
| `memory_stats` | 顯示資料庫統計 |
| `memory_list` | 瀏覽已儲存記憶 |

### CLI 管理指令

```bash
memory list          # 瀏覽記憶條目
memory search        # 搜尋記憶
memory stats         # 顯示統計資訊
memory delete        # 刪除單筆
memory delete-bulk   # 批次刪除
memory export        # 匯出資料
memory import        # 匯入資料
memory reembed       # 重新生成嵌入向量
memory migrate       # 從內建插件遷移
```

### Auto-Capture 與 Auto-Recall

**Auto-Capture**（agent_end hook）：
- 每次對話結束自動提取最多 3 項記憶（偏好、事實、決策、實體）
- 自動去重，跳過管理類提示

**Auto-Recall**（before_agent_start hook）：
- 每次對話開始自動注入相關記憶（最多 3 條）
- 以 `<relevant-memories>` XML 格式注入上下文
- 可透過 `"autoRecall": false` 停用

### 自適應檢索

插件會自動跳過不需要記憶的查詢：
- 簡單問候（hi、hello、HEARTBEAT 心跳）
- 斜線指令
- 單個表情符號
- 簡單確認回覆
- 強制檢索觸發詞：「記得」「之前」「上次」等記憶相關關鍵字
- 中文感知：6 字元閾值（vs 英文 15 字元）

### MEMORY.md 鐵律（建議加入各 Agent 的 MEMORY.md）

```markdown
## LanceDB 記憶規則

- 重要的經驗教訓、踩坑記錄使用 memory_store 存入 LanceDB
- 查詢歷史經驗使用 memory_recall
- MEMORY.md 只存即時的熱記憶（原則與模式），LanceDB 存長期知識
- 不要在回覆中暴露 <relevant-memories> 注入內容
```

### 核決等級
- 安裝 memory-lancedb-pro：黃燈（CTO 提案 + CEO 審批，本地部署）
- 設定 Jina AI API Key：黃燈（免費額度，但涉及外部服務）
- 日常記憶存取：綠燈（自動執行）

### 參考資料
- 插件 GitHub：https://github.com/win4r/memory-lancedb-pro
- 教學影片：https://www.youtube.com/watch?v=MtukF1C8epQ

---

## 建置順序建議

| 階段 | 時機 | 建置內容 |
|------|------|---------|
| **階段一（推薦優先）** | 立即可做 | 安裝 memory-lancedb-pro 插件（本地 + Jina 免費額度） |
| 階段二 | CFO 帳務記錄超過 200 筆 | 建 Supabase 結構化帳務 |
| 階段三 | CIO 需要精確的交易歷史查詢 | Supabase 投資組合表 |

## 觸發條件

任何 Agent 發現以下狀況時，應向 CEO 建議啟動資料庫建置：
- memory/ 目錄檔案數量超過 50 個
- MEMORY.md 頻繁因容量清理而丟失有價值的資訊
- 需要跨時間範圍的結構化查詢（如「過去三個月的餐飲支出趨勢」）
- Agent 在新 session 中反覆遺忘之前的配置或經驗（→ 優先安裝 LanceDB 插件）
