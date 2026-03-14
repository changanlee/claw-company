# memory-lancedb-pro 升級設計：v1.0.32 → v1.1.0-beta.8

建立日期：2026-03-15

## 背景與動機

目前 Claw Company 使用 memory-lancedb-pro v1.0.32 作為冷記憶層（第三層）。升級到 v1.1.0-beta.8 的三個動機：

1. **記憶品質** — autoRecall 召回精度不足、噪音問題、重要記憶衰減過快
2. **Compaction 遺失** — CEO 長對話後 compaction 導致安全規則遺失（API Key 洩漏事件）
3. **長期準備** — Tier 系統、Temporal Versioning 等新功能有長期價值

## 分階段策略

| 階段 | 內容 | 需要的 Key | 解決的痛點 |
|------|------|-----------|-----------|
| **Phase 1**（本次） | 升級 + `smartExtraction: false` | Jina（現有） | 記憶品質部分改善 |
| **Phase 2**（未來） | 開啟 Smart Extraction | Jina + 新增 LLM key | 記憶品質完整解決 + 長期準備 |
| **Phase 3**（未來） | 開啟 Memory Reflection | 同上 | Compaction 遺失問題 |

## Phase 1 免費收益

升級後立即獲得（不需額外 API key）：

- **Tier 系統**：三層 peripheral → working → core，常用記憶自動晉升（衰減極慢），不常用加速淘汰
- **Weibull 衰減**：取代簡單指數衰減，core 記憶 β=0.8（極慢）、peripheral β=1.3（快速淘汰）
- **BM25 Floor 保護**：BM25 ≥ 0.75 時有 floor，保護精確關鍵字匹配（API key、ticket number）
- **Length Normalization**：超過 500 字的記憶降分，避免長文霸佔排名
- **MMR Diversity**：cosine > 0.85 的重複結果被延後，保障召回多樣性
- **Access Reinforcement**：常用記憶 halfLife 自動延長，最多 3 倍
- **Ghost Entry 驗證**：BM25-only 結果做 hasId() 驗證，防止 FTS 幽靈記錄
- **Embedding LRU Cache**：256 entries，30 分鐘 TTL，減少 Jina API 呼叫
- **Query/Passage 分離**：embedQuery vs embedPassage 傳不同 task hint，提升精度
- **增量去重**：不再重複沉澱同一 session 的訊息
- **「記住」指令**：用戶說「記住」自動展開前一輪上下文
- **autoRecallMinRepeated**：同一記憶至少間隔 N 輪才重複注入

## Section 1：install.js 配置變更

### 版本常數

```javascript
// 變更前
const MEMORY_PLUGIN_VERSION = 'v1.0.32';

// 變更後
const MEMORY_PLUGIN_VERSION = 'v1.1.0-beta.8';
```

### Plugin Config

```json
{
  "enabled": true,
  "config": {
    "embedding": {
      "apiKey": "${JINA_API_KEY}",
      "model": "jina-embeddings-v5-text-small",
      "baseURL": "https://api.jina.ai/v1",
      "taskQuery": "retrieval.query",
      "taskPassage": "retrieval.passage"
    },
    "retrieval": {
      "mode": "hybrid",
      "vectorWeight": 0.7,
      "bm25Weight": 0.3,
      "rerank": "cross-encoder",
      "rerankProvider": "jina",
      "rerankApiKey": "${JINA_API_KEY}",
      "candidatePoolSize": 20,
      "hardMinScore": 0.35,
      "timeDecayHalfLifeDays": 60,
      "lengthNormAnchor": 500,
      "reinforcementFactor": 0.5,
      "maxHalfLifeMultiplier": 3
    },
    "autoCapture": true,
    "autoRecall": true,
    "autoRecallMinLength": 8,
    "autoRecallMinRepeated": 2,
    "smartExtraction": false,
    "selfImprovement": { "enabled": false },
    "sessionStrategy": "none",
    "scopes": {
      "default": "project:claw-company",
      "definitions": {
        "agent:main": { "description": "OpenClaw default agent" },
        "project:claw-company": { "description": "Claw Company shared" },
        "agent:cc-ceo": { "description": "CEO private" },
        "agent:cc-cfo": { "description": "CFO private" },
        "agent:cc-cio": { "description": "CIO private" },
        "agent:cc-coo": { "description": "COO private" },
        "agent:cc-cto": { "description": "CTO private" },
        "agent:cc-chro": { "description": "CHRO private" },
        "agent:cc-cao": { "description": "CAO private" }
      },
      "agentAccess": {
        "main": ["agent:main"],
        "cc-ceo": ["project:claw-company", "agent:cc-ceo"],
        "cc-cfo": ["project:claw-company", "agent:cc-cfo"],
        "cc-cio": ["project:claw-company", "agent:cc-cio"],
        "cc-coo": ["project:claw-company", "agent:cc-coo"],
        "cc-cto": ["project:claw-company", "agent:cc-cto"],
        "cc-chro": ["project:claw-company", "agent:cc-chro"],
        "cc-cao": ["project:claw-company", "agent:cc-cao"]
      }
    }
  }
}
```

### 新增/變更項目說明

| 項目 | 值 | 理由 |
|------|-----|------|
| `taskQuery` / `taskPassage` | Jina 任務 hint | 新版支援 query/passage 分離，Jina v5 本身支援，白送的精度提升 |
| `retrieval.mode` | `"hybrid"` | 明確聲明，防止未來預設值改變 |
| `candidatePoolSize` | `20` | 明確聲明預設值 |
| `hardMinScore` | `0.35` | 低品質記憶直接丟棄 |
| `autoRecallMinRepeated` | `2` | 同一記憶間隔 2 輪才重複注入，減少噪音 |
| `smartExtraction` | `false` | Phase 1 關鍵：關閉 LLM 提取 |
| `selfImprovement.enabled` | `false` | Phase 1 關閉，避免在 agent workspace 產生未預期的 .learnings 檔案 |
| `sessionStrategy` | `"none"` | Phase 3 改為 `"memoryReflection"` |
| `retrieval.timeDecayHalfLifeDays` | `60` | 與 memory-policy.md 一致（注意：屬於 retrieval，非 decay） |
| `retrieval.lengthNormAnchor` | `500` | 超過 500 字的記憶降分 |
| `retrieval.reinforcementFactor` | `0.5` | 常用記憶 halfLife 延長因子 |
| `retrieval.maxHalfLifeMultiplier` | `3` | halfLife 最多延長 3 倍 |

### Phase 1 不含 `llm` 區塊

Phase 1 的 config **不包含 `llm` 區塊**。原因：
- `smartExtraction: false` 時 LLM client 不會被初始化
- 但 `resolveEnvVars()` 可能在 config parse 階段就嘗試解析 `${LLM_API_KEY}`，導致缺 env var 時拋錯
- Phase 2 啟用時再加入 `llm` 區塊：

```json
"llm": {
  "apiKey": "${LLM_API_KEY}",
  "model": "gpt-4o-mini",
  "baseURL": "https://api.openai.com/v1"
}
```

## Section 2：安裝流程

- **安裝方式不變**：`git clone --branch ${VERSION} --depth 1`，失敗 fallback 到 `npm install`
- 新版多了 `openai` SDK v6 + `@sinclair/typebox` 依賴 → npm install 自動處理
- **VPS 部署屬於大改**（plugin 版本變更）→ 需跑完整 `install.js`，不能用 `git pull + cp`
- **部署後必清 session**：`rm -rf agents/cc-*/sessions/*`（舊 session context 可能有不相容的注入格式）

## Section 3：memory-policy.md 更新

更新冷記憶層描述，反映 v1.1.0 新能力：

1. 加入 Tier 系統說明（peripheral → working → core）
2. Scope 隔離說明不變（行為一致）
3. 新增 Phase 2/3 預告段落（Smart Extraction + Reflection，待啟用）

不改的部分：
- 記憶金字塔結構（熱/溫/冷三層）
- 寫入規則、WAL、Working Buffer、Reverse Prompting
- 清理規則（CHRO 月度審計）

## Section 4：Agent SOUL.md

**不改。** Tier 晉升、增量去重、embedding cache 都是 plugin 內部邏輯，Agent 層面完全透明。

## Section 5：驗證計畫

升級後在 VPS 上的驗證：

| # | 驗證項 | 方法 | 通過標準 |
|---|--------|------|----------|
| 1 | Plugin 載入 | `openclaw doctor` | 無 error |
| 2 | 舊記憶可讀 | `openclaw memory-pro search "董事長"` | 返回既有記憶 |
| 3 | autoCapture 正常 | 跟 CEO 對話一輪，結束後查 LanceDB | 新記憶寫入 |
| 4 | autoRecall 正常 | 觸發一次 recall（問一個舊話題） | 注入 `<relevant-memories>` |
| 5 | smartExtraction 未觸發 | 觀察 agent_end log | 無 LLM timeout、無 30s 延遲 |
| 6 | Tier 系統運作 | 用 `memory-pro search` CLI 手動查詢同一記憶 3+ 次後查 metadata（注意：auto-recall 不計入 access_count，需用手動查詢） | tier 從 peripheral → working |
| 7 | autoRecallMinRepeated | 連續 2 輪問相同問題 | 第 2 輪不重複注入同一記憶 |

驗證順序：1→2（不破壞既有）→ 3→4（核心功能）→ 5→6→7（新功能）

## 相容性確認

| 面向 | 結果 |
|------|------|
| LanceDB 資料 | 零遷移，新欄位全存在 metadata JSON，表結構不變 |
| 現有 config | 完全相容，新參數均有預設值 |
| Scope 隔離 | 行為一致，每 agent 獨立 scope |
| Jina embedding | jina-embeddings-v5-text-small 在新版 dimension table 有對應 |
| Jina rerank | rerankProvider: "jina" 完全支援 |
| OpenClaw hooks | 4 個新 hook（`agent:bootstrap`、`after_tool_call`、`before_prompt_build`、`session_end`）都是 opt-in，Phase 1 不觸發 |
| `openai` SDK | 新版依賴 `openai@^6.21.0`，若 VPS 有其他 plugin 依賴舊版可能衝突 |
| `selfImprovement` | 預設 enabled，Phase 1 明確關閉避免產生未預期的 .learnings 檔案 |

## 風險與回退

- **回退方案**：install.js 版本改回 v1.0.32，重跑安裝即可
- **LanceDB 資料安全**：新版寫入的記憶包含更豐富的 metadata JSON，但舊版讀取時忽略不認識的欄位，不會崩潰
- **Beta 風險**：Phase 1 只用到 retrieval/tier/cache 等成熟演算法部分，風險低

## Phase 2/3 啟用路徑（備忘）

### Phase 2：Smart Extraction

1. 取得 LLM API key（OpenAI / Groq / 任何 OpenAI-compatible）
2. `~/.openclaw/.env` 加 `LLM_API_KEY=sk-...`
3. install.js 改 `smartExtraction: true`
4. 重跑 install.js + 驗證

### Phase 2 同時啟用

- `selfImprovement: { enabled: true }` — 可與 Smart Extraction 一起開啟

### Phase 3：Memory Reflection

1. install.js 改 `sessionStrategy: "memoryReflection"`
2. 重跑 install.js + 驗證
3. 確認 VPS 上的 OpenClaw 版本支援 `after_tool_call`、`before_prompt_build`、`session_end` hook 類型（這是 OpenClaw 平台版本限制，非 plugin 問題）
