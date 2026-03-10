# Skill 開發與審批流程

## 什麼是 Skill

Skill 是 Agent 的可執行能力模組（定義在 skills/ 目錄下的 SKILL.md），讓 Agent 能處理特定任務類型。例如：CFO 的記帳 Skill、CIO 的投資組合監控 Skill。

Skill 分為兩類：
- **工具型 Skill**：封裝外部 CLI 或 API（如 Gog 操作 Gmail、Github 操作 PR），需安裝外部工具和帳號憑證
- **行為型 Skill**：純 prompt 方法論（如自我改善、文字潤飾準則），無外部依賴

## Skill 可見性與隔離

每個 cc-* Agent 透過 openclaw.json 的 per-agent `skills` allowlist 控制 Skill 可見性：

- **省略 `skills` 欄位** → 所有 Skill 全部載入（預設，不建議用於 cc-* Agent）
- **`skills: ["gog", "summarize"]`** → 只載入指定的 Skill
- **`skills: []`** → 完全封鎖，零 Skill

Allowlist 配置存放在 `skill-allowlist.json`，由 install.js 讀取注入 openclaw.json。變更 allowlist 需走本流程的審批。

## 新增 Skill 提案

### 觸發來源

- CHRO 週度巡視發現能力缺口（任務反覆失敗或無專責 Skill 處理）
- CAO 稽核發現流程缺陷，需新 Skill 補強
- CEO 根據董事長指示提出需求
- 董事長直接要求
- CAO 掃描發現未登記的全局 Skill（`~/.openclaw/skills/` 中存在但未在 allowlist 中登記）

### 提案格式

```
Skill 名稱：<skill-name>
目標 Agent：<agent-id>
類型：工具型 / 行為型
來源：自建 / 外部（附來源連結）
解決的問題：<描述能力缺口或需求>
功能描述：<Skill 做什麼、怎麼觸發>
輸入/輸出：<預期的輸入格式與輸出結果>
依賴：<需要哪些工具、API 或帳號憑證>
預估 Token 成本影響：<每次執行的預估消耗>
```

## 發現（CTO 負責）

CTO 可使用 `npx skills find <關鍵字>` 搜尋 OpenClaw 社群 Skill Registry，或瀏覽 https://skills.sh/ 分類索引。

發現候選 Skill 後，進入安全審查階段。**禁止直接安裝，必須先通過安全審查。**

## 安全審查（CTO 負責）

<!-- Source: Skill Vetter v1.0.0 | Absorbed: 2026-03-10 -->

### 第一步：來源查核

- 作者可信度（官方 OpenClaw > 高 Star repo > 已知作者 > 未知來源）
- 下載量 / Stars / 最後更新時間
- 是否開源可審計

### 第二步：14 紅旗掃描

逐項檢查 SKILL.md 及附帶的 scripts/、hooks/ 等檔案：

| # | 紅旗 | 嚴重度 |
|---|------|--------|
| 1 | curl/wget 到未知 URL | HIGH |
| 2 | 向外部伺服器傳送資料 | HIGH |
| 3 | 要求使用者提供 API Key 或密碼 | MEDIUM |
| 4 | 讀取 MEMORY.md / USER.md / SOUL.md | HIGH |
| 5 | base64 decode 後執行 | EXTREME |
| 6 | eval / exec 外部輸入 | EXTREME |
| 7 | 修改系統檔案（openclaw.json、AGENTS.md 等） | HIGH |
| 8 | 使用 IP 位址而非域名的網路呼叫 | HIGH |
| 9 | 混淆或壓縮過的程式碼 | HIGH |
| 10 | 要求 sudo 權限 | EXTREME |
| 11 | 讀取 ~/.ssh 或其他憑證目錄 | EXTREME |
| 12 | 寫入 .bashrc / .zshrc / .profile | HIGH |
| 13 | 安裝未知套件作為依賴 | MEDIUM |
| 14 | 停用或繞過安全檢查 | EXTREME |

### 第三步：權限範圍評估

- 需讀/寫哪些檔案
- 需執行哪些 CLI 指令
- 需連接哪些外部 API 或服務

### 第四步：風險分級與處置

| 風險等級 | 條件 | 處置 |
|---------|------|------|
| LOW | 無紅旗，僅讀取操作 | 正常審批流程 |
| MEDIUM | 1-2 個 MEDIUM 紅旗 | 加強審查 + 正常審批 |
| HIGH | 任何 HIGH 紅旗 | 需董事長特別核決 |
| EXTREME | 任何 EXTREME 紅旗 | **直接拒絕，不予安裝** |

### 審查報告格式

```
Skill 名稱：<name>
審查日期：<date>
審查者：CTO
紅旗發現：<列出所有紅旗，或「無」>
權限範圍：<讀/寫/執行/網路>
風險等級：LOW / MEDIUM / HIGH / EXTREME
結論：通過 / 需加強審查 / 需董事長特別核決 / 拒絕
```

## 分類與路由（行為型 Skill 額外步驟）

安全審查通過後，行為型 Skill 需進一步評估是否內化：

<!-- Source: Self Improving Agent v3.0.0 — Promotion mechanism | Absorbed: 2026-03-10 -->

### 重疊度評估

比對 Skill 內容與現有 company-rules.md、policies/、rules/、principles/：

| 重疊度 | 新價值量 | 判定 |
|--------|---------|------|
| > 70% | ≤ 3 條新概念 | **ABSORB** — 精煉後寫入現有檔案 |
| < 30% | 體量大 | **KEEP AS SKILL** — 保留為獨立 Skill |
| — | ≈ 0 | **SKIP** — 不安裝 |
| 邊界情況 | — | 董事長裁決 |

### ABSORB 執行規則

1. 精煉新價值，用公司既有的用語和格式寫入目標檔案
2. 在目標檔案中標記來源：`<!-- Source: <Skill 名稱> v<版本> | Absorbed: <日期> -->`
3. 在 changelog.md 的「已內化 Skill 追蹤表」中登記
4. CHRO 月度記憶審計時檢查上游是否有新版

## 審批流程

| 階段 | 負責人 | 說明 |
|------|--------|------|
| 提案 | CHRO / CAO / CEO | 提出 Skill 需求與規格 |
| 發現 | CTO | 搜尋社群 Registry 或檢視已下載 Skill |
| 安全審查 | CTO | 來源查核 + 14 紅旗 + 權限範圍 + 風險分級 |
| 合規覆核 | CAO | 確認 Skill 不違反安全紅線或核決權限 |
| 分類 | CTO + CHRO | 工具型→路由 / 行為型→重疊度評估 |
| 審批 | CEO | 黃燈核決（一般 Skill） |
| 最終核決 | 董事長 | 紅燈核決（所有外部 Skill 均為紅燈） |

## 部署

### 工具型 Skill / KEEP AS SKILL

1. 安裝到 `~/.openclaw/skills/`（全局）
2. 更新 `skill-allowlist.json` — 加入目標 Agent 的 allowlist
3. 執行 `node install.js --update-skills` 將 allowlist 注入 openclaw.json
4. 通知目標 Agent 新 Skill 已就緒
5. 記錄到 policies/changelog.md（第二級通知）

### ABSORB（行為型 Skill 內化）

1. 精煉寫入目標檔案（附來源標記）
2. 記錄到 policies/changelog.md 的「已內化 Skill 追蹤表」
3. 第三級通知

## 修改現有 Skill

- 修改已部署的 Skill 需走與新增相同的審批流程
- 例外：純文字修訂（不影響功能邏輯）由 CHRO 直接修改，第三級通知
- 修改 allowlist 路由（變更哪些 Agent 可使用某 Skill）視同修改 Skill

## 停用 / 移除 Skill

- CHRO 在週度巡視中發現某 Skill 長期未被使用（超過 30 天）
- 提出停用建議 → CEO 審批 → 從 allowlist 移除 → 歸檔 SKILL.md → 記錄到 changelog.md

## 已內化 Skill 追蹤表

CHRO 月度記憶審計時檢查此表，比對上游版本是否有值得再吸收的更新。

| 來源 Skill | 版本 | 內化日期 | 寫入檔案 | 上次檢查上游 |
|-----------|------|---------|---------|------------|
| Proactive Agent | v3.1.0 | 2026-03-10 | memory-policy.md | — |
| Self Improving Agent | v3.0.0 | 2026-03-10 | memory-policy.md, skill-development.md | — |
| Humanizer | v1.0.0 | 2026-03-10 | editorial-prose.md | — |
| Skill Vetter | v1.0.0 | 2026-03-10 | skill-development.md | — |
| Find Skills | v0.1.0 | 2026-03-10 | skill-development.md, CTO TOOLS.md | — |
