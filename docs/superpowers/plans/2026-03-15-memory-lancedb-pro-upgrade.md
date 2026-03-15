# memory-lancedb-pro Phase 1 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade memory-lancedb-pro from v1.0.32 to v1.1.0-beta.8 with Smart Extraction disabled, gaining Tier system, improved retrieval, and embedding cache for free.

**Architecture:** Modify install.js version constant and plugin config block. Update memory-policy.md to document new Tier system. No schema migration needed — LanceDB data is fully backward compatible.

**Tech Stack:** Node.js (install.js), LanceDB, Jina AI (embedding + rerank)

**Spec:** `docs/superpowers/specs/2026-03-15-memory-lancedb-pro-upgrade.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `claw-company-config/install.js` | Modify | Version constant + plugin config block |
| `claw-company-config/zh/shared/policies/memory-policy.md` | Modify | Add Tier system documentation |
| `claw-company-config/en/shared/policies/memory-policy.md` | Modify | English version of above |

---

## Chunk 1: install.js Changes + memory-policy.md Update

### Task 1: Update version constant

**Files:**
- Modify: `claw-company-config/install.js` — find `const MEMORY_PLUGIN_VERSION`

- [ ] **Step 1: Change version constant**

Find and replace:
```javascript
const MEMORY_PLUGIN_VERSION = 'v1.0.32';
```
With:
```javascript
const MEMORY_PLUGIN_VERSION = 'v1.1.0-beta.8';
```

> **Note:** The `v` prefix is needed for `git clone --branch`. The npm fallback path (`npm install memory-lancedb-pro@${VERSION}`) has a pre-existing issue where npm doesn't recognize the `v` prefix. This is a pre-existing bug — do not fix it in this task; it works because the git clone path succeeds first.

- [ ] **Step 2: Verify no other version references need updating**

Run: `grep -n 'v1.0.32' claw-company-config/install.js`
Expected: No matches

- [ ] **Step 3: Commit**

```bash
git add claw-company-config/install.js
git commit -m "chore: bump memory-lancedb-pro to v1.1.0-beta.8"
```

### Task 2: Update plugin config block

**Files:**
- Modify: `claw-company-config/install.js` — find the `injection.plugins = {` block (contains `'memory-lancedb-pro'` config)

- [ ] **Step 1: Update the embedding block — add taskQuery/taskPassage**

Find:
```javascript
            embedding: {
              apiKey: '${JINA_API_KEY}',
              model: 'jina-embeddings-v5-text-small',
              baseURL: 'https://api.jina.ai/v1',
            },
```
Replace with:
```javascript
            embedding: {
              apiKey: '${JINA_API_KEY}',
              model: 'jina-embeddings-v5-text-small',
              baseURL: 'https://api.jina.ai/v1',
              taskQuery: 'retrieval.query',
              taskPassage: 'retrieval.passage',
            },
```

- [ ] **Step 2: Update the retrieval block — add new parameters**

Find:
```javascript
            retrieval: {
              rerank: 'cross-encoder',
              rerankProvider: 'jina',
              rerankApiKey: '${JINA_API_KEY}',
            },
```
Replace with:
```javascript
            retrieval: {
              mode: 'hybrid',
              vectorWeight: 0.7,
              bm25Weight: 0.3,
              rerank: 'cross-encoder',
              rerankProvider: 'jina',
              rerankApiKey: '${JINA_API_KEY}',
              candidatePoolSize: 20,
              hardMinScore: 0.35,
              timeDecayHalfLifeDays: 60,
              lengthNormAnchor: 500,
              reinforcementFactor: 0.5,
              maxHalfLifeMultiplier: 3,
            },
```

- [ ] **Step 3: Add new top-level config keys between `autoRecallMinLength` and `scopes`**

Find:
```javascript
            autoRecallMinLength: 8,
            scopes: {
```
Replace with:
```javascript
            autoRecallMinLength: 8,
            autoRecallMinRepeated: 2,
            smartExtraction: false,
            selfImprovement: { enabled: false },
            sessionStrategy: 'none',
            scopes: {
```

- [ ] **Step 4: Verify the complete config block looks correct**

Read the full block from `injection.plugins = {` to the closing `};` and confirm it matches the spec. The final config should have:
- `embedding` with `taskQuery` and `taskPassage`
- `retrieval` with 12 keys (mode, vectorWeight, bm25Weight, rerank, rerankProvider, rerankApiKey, candidatePoolSize, hardMinScore, timeDecayHalfLifeDays, lengthNormAnchor, reinforcementFactor, maxHalfLifeMultiplier)
- `autoRecallMinRepeated: 2`
- `smartExtraction: false`
- `selfImprovement: { enabled: false }`
- `sessionStrategy: 'none'`
- NO `llm` block
- NO `decay` block
- `scopes` block unchanged

- [ ] **Step 5: Commit**

```bash
git add claw-company-config/install.js
git commit -m "feat: upgrade memory-lancedb-pro config for v1.1.0-beta.8

- Add embedding taskQuery/taskPassage for Jina v5
- Add retrieval: hybrid mode, hardMinScore, timeDecay, lengthNorm, reinforcement
- Add autoRecallMinRepeated: 2 to reduce noise
- Explicitly disable smartExtraction and selfImprovement (Phase 1)
- Set sessionStrategy: none (Phase 3 will enable memoryReflection)"
```

### Task 3: Update memory-policy.md (zh)

**Files:**
- Modify: `claw-company-config/zh/shared/policies/memory-policy.md` — find `### 第三層：LanceDB`

- [ ] **Step 1: Update the cold memory layer description**

Find the entire `### 第三層：LanceDB（冷記憶）` section (from `### 第三層` to the line before `## 寫入規則`). Replace with:

```markdown
### 第三層：LanceDB（冷記憶）— memory-lancedb-pro 插件
- **載入時機**：autoRecall 在 session 開始時自動注入相關記憶（最多 3 條）
- **寫入者**：autoCapture 在 agent_end 自動沉澱，Agent 不需手動操作
- **沉澱粒度**：每次 session 結束時，插件自動擷取對話中的關鍵摘要（決策、錯誤與解法、重要發現），而非整段對話原文。沉澱由插件內建的摘要機制處理，Agent 無需介入
- **內容**：對話語境、錯誤與解法、討論脈絡、歷史經驗
- **角色**：自動沉澱池（補充層，非 source of truth）
- **容量**：無限制
- **Tier 系統**：三層生命週期管理
  - `peripheral`（外圍）→ `working`（工作）→ `core`（核心）
  - 常用記憶自動晉升 core（Weibull 衰減極慢，β=0.8）
  - 不常用記憶降級 peripheral（加速淘汰，β=1.3）
  - 晉升條件：access ≥ 3 + composite ≥ 0.4（→ working）；access ≥ 10 + composite ≥ 0.7（→ core）
- **過濾機制**：噪音過濾 + Time Decay（60 天半衰期）+ 存取強化（常被檢索的記憶延壽，最多 3 倍）+ MMR 去重（cosine > 0.85 降權）+ BM25 Floor 保護（精確關鍵字匹配不被低估）+ Length Normalization（長文降分）
- **隔離**：Multi-Scope 隔離（每個 Agent 有私有 scope，cc-* 共享 project:claw-company scope，main 完全隔離）
- **建置指南**：參閱 shared/setup-guides/database-setup.md
- **未來擴展**：
  - Phase 2：Smart Extraction（6 類別 LLM 智能提取，需額外 LLM API key）
  - Phase 3：Memory Reflection（session 反省 + 跨 session 規則繼承）
```

- [ ] **Step 2: Commit**

```bash
git add claw-company-config/zh/shared/policies/memory-policy.md
git commit -m "docs: update memory-policy.md with Tier system for v1.1.0"
```

### Task 4: Update memory-policy.md (en)

**Files:**
- Modify: `claw-company-config/en/shared/policies/memory-policy.md` — find `### Layer 3: LanceDB`

- [ ] **Step 1: Update the cold memory layer description**

Find the entire `### Layer 3: LanceDB (Cold Memory)` section (from `### Layer 3` to the line before `## Write Rules`). Replace with:

```markdown
### Layer 3: LanceDB (Cold Memory) — memory-lancedb-pro Plugin
- **Load timing**: autoRecall automatically injects relevant memories at session start (up to 3 entries)
- **Writer**: autoCapture automatically captures and settles memories at agent_end; Agents do not need to write manually
- **Settling granularity**: At each session end, the plugin automatically extracts key summaries (decisions, errors and solutions, important discoveries) from the conversation, not the raw conversation transcript. Settling is handled by the plugin's built-in summarization mechanism; Agents do not need to intervene
- **Content**: Conversation context, errors and solutions, discussion threads, historical experience
- **Role**: Automatic settling pool (supplementary layer, not source of truth)
- **Capacity**: Unlimited
- **Tier system**: Three-tier lifecycle management
  - `peripheral` → `working` → `core`
  - Frequently accessed memories auto-promote to core (Weibull decay very slow, β=0.8)
  - Rarely accessed memories demote to peripheral (accelerated decay, β=1.3)
  - Promotion thresholds: access ≥ 3 + composite ≥ 0.4 (→ working); access ≥ 10 + composite ≥ 0.7 (→ core)
- **Filtering**: Noise filtering + Time Decay (60-day half-life) + access reinforcement (frequently retrieved memories get extended lifespan, up to 3x) + MMR deduplication (cosine > 0.85 downranked) + BM25 Floor protection (exact keyword matches not underscored) + Length Normalization (long entries penalized)
- **Isolation**: Multi-Scope isolation (each Agent has a private scope, cc-* shares the project:claw-company scope, main is fully isolated)
- **Setup guide**: See shared/setup-guides/database-setup.md
- **Future expansion**:
  - Phase 2: Smart Extraction (6-category LLM-powered extraction, requires additional LLM API key)
  - Phase 3: Memory Reflection (session post-mortem + cross-session rule inheritance)
```

- [ ] **Step 2: Commit**

```bash
git add claw-company-config/en/shared/policies/memory-policy.md
git commit -m "docs: update English memory-policy.md with Tier system for v1.1.0"
```

### Task 5: Final verification

- [ ] **Step 1: Verify install.js has no syntax errors**

Run: `node -c claw-company-config/install.js`
Expected: No errors

- [ ] **Step 2: Verify version constant is correct**

Run: `grep 'MEMORY_PLUGIN_VERSION' claw-company-config/install.js`
Expected: `const MEMORY_PLUGIN_VERSION = 'v1.1.0-beta.8';`

- [ ] **Step 3: Verify smartExtraction is disabled**

Run: `grep 'smartExtraction' claw-company-config/install.js`
Expected: `smartExtraction: false,`

- [ ] **Step 4: Verify no llm block exists in plugin config**

Run: `grep -n "llm:" claw-company-config/install.js`
Expected: No matches inside the plugin config block (any matches should be in unrelated code, not in the `injection.plugins` block)

---

## VPS Deployment Notes (not automated — manual steps)

After merging to `derek` remote:

1. SSH to VPS
2. `cd /home/admin_derek/.openclaw/`
3. `git pull` the claw-company repo
4. Run `node install.js` (full install — plugin version changed)
5. Clear sessions: `rm -rf agents/cc-*/sessions/*`
6. Restart gateway: `pkill -f openclaw; sleep 3 && openclaw gateway`
7. Run verification checklist from spec (7 items)
