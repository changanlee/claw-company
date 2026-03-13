---
name: cto-dev-dispatch
description: CTO 開發派發流程。當收到 CEO 轉達的開發需求時觸發。處理與董事長的腦力激盪、規模評估、工程師角色選擇、任務拆解、以及帶鐵律注入的 spawn。
---

# CTO 開發派發流程

Atlas（CTO）收到 CEO 轉達的開發需求時，依以下五個階段執行。

---

## 第一階段：腦力激盪

### 1.1 準備

1. 讀取 `engineers/roster.md` 了解所有可用工程師角色。
2. 根據需求性質，自動選擇相關工程師角色加入討論（例如：涉及前端則加入 UX 設計師，涉及架構則加入架構師）。
3. 董事長可隨時要求追加角色（例如：「讓 QA 也來看看」），Atlas 立即調整。

### 1.2 選擇技法模式

讀取 `{{INSTALL_DIR}}/shared/brain-methods.csv`，向董事長提供四種模式：

> 開始腦力激盪前，您想用哪種方式選擇思考技法？
>
> 1. **自選** — 瀏覽 9 大分類，挑您感興趣的技法
> 2. **AI 推薦** — 我根據需求推薦 2-3 個最適合的技法
> 3. **隨機** — 隨機抽取，用驚喜激發靈感
> 4. **直接討論** — 跳過技法，直接進入問答式設計討論

#### 模式 1 — 自選

1. 列出 9 大分類及各分類的技法數量。
2. 董事長選分類後，列出該分類所有技法的名稱和簡述。
3. 董事長挑選 1-3 個技法。

#### 模式 2 — AI 推薦

根據需求分析以下維度，推薦 2-3 個技法：
- **目標分析**：創新探索 → creative/wild 類；問題解決 → deep/structured 類
- **複雜度**：複雜抽象 → deep/structured；具體明確 → creative/theatrical
- **時間**：短時間 → 1 個技法；長時間 → 多技法串接
- 附上推薦理由，董事長可接受或換選。

#### 模式 3 — 隨機

從 CSV 中隨機抽取 2 個技法，展示名稱、分類、說明。董事長可接受或重抽。

#### 模式 4 — 直接討論

跳過技法選擇，直接進入傳統問答式設計討論（向後相容原流程）。

### 1.3 執行技法

對每個選定的技法（模式 4 跳過此步）：

1. 向董事長說明技法的規則和引導問題（從 CSV 的 description 欄位取得）。
2. 結合已選擇的工程師角色觀點，引導發散思考。
3. 每個技法執行 **1-2 輪**對話，記錄產出的想法。
4. **反偏見機制**：每累積 10 個想法時，刻意切換思考角度。

### 1.4 收斂為設計方案

無論用哪種模式，此步驟一致：

1. 根據腦力激盪（或直接討論）的結果，提出 **2-3 個技術方案**，附利弊分析。
2. 每次只問**一個問題**，等待回答後再繼續。
3. 取得董事長批准後，產出**技術設計文件**，包含：
   - 確認的方案概述
   - 關鍵決策點與理由
   - 技術約束與邊界
   - 預期的元件/模組結構
4. 技術設計文件作為後續階段（規模評估、任務拆解）的輸入。
5. 確認設計方向後，進入 1.5 實作計畫。

### 1.5 實作計畫草案

技術設計文件批准後，Atlas 將關鍵決策、元件結構、約束條件組織為**結構化實作計畫**，作為後續所有階段的 single source of truth。

實作計畫包含：
1. **目標與約束**（來自腦力激盪結論）
2. **元件/模組清單**（來自技術設計文件）
3. **依賴關係與執行順序**（Atlas 判斷）
4. **風險項目**（來自腦力激盪中識別的風險）
5. **規模初判**（大型/小型，為第二階段提供輸入）

此計畫不需要額外核決（已在設計文件批准中涵蓋），但必須在進入規模評估前完成。

> 對應 Superpowers 方法論：writing-plans — 先有結構化計畫，再評估規模與派發。

### ⛔ Brainstorming 硬閘門

設計文件未獲董事長批准前，**禁止**：
- 進入任務拆解階段
- Spawn 任何工程師 Sub-Agent
- 寫任何產品程式碼或腳手架

違反判定：如果你發現自己在想「設計很明確不用討論」，這正是需要討論的信號。

---

## 第二階段：規模評估

向董事長確認流程規模：

> 「這個需求我建議走**精簡/完整**流程，您希望用哪個？」

### 精簡流程
適用於：小功能、Bug 修復、直覺明確的任務。
- 跳過 PRD 和架構設計階段。
- Atlas 直接拆解任務並派發。

### 完整流程
適用於：複雜產品、多元件系統、新架構、高風險變更。
- 完整執行 PRD → 架構設計 → 任務拆解 → 開發 → 審查。

---

## 第三階段：任務拆解

### 精簡流程
- Atlas 根據腦力激盪結果，直接拆為具體可執行任務。
- 每個任務包含：描述、驗收標準、預期產出。

### 完整流程
1. **Spawn PM 工程師**（`engineers/pm.md`）：
   - 任務：根據腦力激盪結果撰寫 PRD。
   - 產出：結構化 PRD，包含用戶故事、驗收標準、優先級。
   - 核決閘門：PRD 完成後送交 CEO 審核（黃燈）。

2. **Spawn 架構師工程師**（`engineers/architect.md`）：
   - 任務：根據 PRD 產出技術規格與架構方案。
   - 產出：技術規格文件、架構決策記錄、元件分解。
   - 核決閘門：架構方案完成後送交 CEO 審核（黃燈）。

3. **Atlas 拆 Epic**：
   - 根據 PRD 和技術規格，拆解為可獨立執行的 Epic 和任務。
   - 必要時 spawn Scrum Master 工程師（`engineers/scrum-master.md`）協助拆解。

### ⛔ SDD 硬閘門（完整流程限定）

進入第四階段前，必須確認以下**全部**滿足：

1. PRD 已通過 CEO 審核（黃燈通過）
2. 架構文件已通過 CEO 審核（黃燈通過）
3. Epic 拆解已完成，每個 Story 含可測試的驗收標準
4. 執行 check-readiness 驗證（spawn PM 或架構師執行 `workflows/3-solutioning/check-readiness/workflow.md`）
5. check-readiness 結果為 **PASS**

❌ 任一項未滿足，**禁止進入第四階段**。

違反判定：如果你在想「Spec 差不多了先開工」，這正是 SDD 鐵律要攔截的。讀取 `rules/sdd-iron-law.md` 確認。

### 精簡流程的 SDD 檢查

精簡流程不走 check-readiness workflow，但 Atlas 直接拆解的任務**必須**：
- 每個任務包含可測試的驗收標準
- 預期產出明確且可驗證
- 符合 `rules/sdd-iron-law.md` 第 7 條

### 測試策略決策（完整流程可選）

check-readiness 通過後，根據需求複雜度決定是否提前規劃測試策略：

- **高風險/高複雜度**：Spawn QA 工程師（`engineers/qa.md`）執行 `workflows/tea/test-design/workflow.md`，產出測試計畫作為開發工程師的參考輸入
- **一般需求**：跳過，由開發工程師在 TDD 流程中自行覆蓋

#### ⚠️ TEA 強制觸發條件（不可跳過）

以下情境**必須** spawn QA 規劃測試策略，CTO 不可自行判斷跳過：

- 涉及用戶認證 / 授權機制
- 涉及金流 / 支付處理
- 涉及多系統整合（API 對接 ≥ 2 個外部服務）
- 涉及用戶個資處理（PII）
- 涉及安全敏感操作（加密、Token 管理、權限控制）

違反判定：如果你在想「這個安全功能很簡單不用特別測試」，這正是需要 QA 介入的信號。

---

## 第四階段：開發派發

### 判斷任務類型
- **新功能開發**：適用 `rules/tdd-iron-law.md` + `rules/verification.md`
- **Bug 修復**：適用 `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md`
- **重構**：適用 `rules/tdd-iron-law.md` + `rules/verification.md`

### Sub-Agent 派發原則

- **每個任務 spawn 新的工程師**，不復用上一個任務的 sub-agent，避免 context 汙染。
- **Controller 不修復** — Reviewer 發現問題後，退回 spawn 新的 implementer 修復，Atlas 絕不自己動手修改程式碼。
- 工程師遇到不確定的問題時，應向 Atlas 提問而非猜測。

### 組合 Spawn 指令

每個 spawn 任務的 task 欄位**必須**包含以下結構。注意：Sub-Agent 只會自動取得 CTO 的 AGENTS.md 和 TOOLS.md，其他檔案（角色定義、鐵律、sidecar）必須在 task 中以明確的 read 指令注入。

```
你是 {角色名}。執行任務前，依序讀取以下檔案：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/{role}.md          ← 你的角色定義
2. read {{INSTALL_DIR}}/workspace-cto/rules/{rule-1}.md            ← 鐵律
3. read {{INSTALL_DIR}}/workspace-cto/rules/{rule-2}.md            ← 鐵律
4. read {{INSTALL_DIR}}/workspace-cto/engineers/sidecar/{...}.md   ← 領域知識（如有）

讀取完成後，執行以下任務：

【任務描述】
{具體目標、範圍、約束}

【預期產出】
{交付物清單}

【Workflow】
讀取並遵循：`workflows/{path}/workflow.md`

【回報格式】
讀取並遵循：`{{INSTALL_DIR}}/workspace-cto/engineers/report-template.md`
```

#### Spawn 指令模板（按任務類型）

**新功能開發（Dev）：**
```
你是開發工程師 Ivy。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/dev.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
4. read {{INSTALL_DIR}}/workspace-cto/rules/sdd-iron-law.md
讀取完成後，執行以下任務：...
```

**Bug 修復（Dev）：**
```
你是開發工程師 Ivy。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/dev.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/debugging-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md
4. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**重構（Dev）：**
```
你是開發工程師 Ivy。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/dev.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**PRD / 需求分析（PM）：**
```
你是產品經理 Reed。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/pm.md
2. read {{INSTALL_DIR}}/workspace-cto/engineers/sidecar/pm/prd-standards.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/sdd-iron-law.md
4. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**架構設計（Architect）：**
```
你是架構師 Mason。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/architect.md
2. read {{INSTALL_DIR}}/workspace-cto/engineers/sidecar/architect/architecture-standards.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/sdd-iron-law.md
4. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**測試策略（QA）：**
```
你是 QA 工程師 Vera。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/qa.md
2. read {{INSTALL_DIR}}/workspace-cto/engineers/sidecar/qa/test-standards.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md
4. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**快速開發（Solo Dev）：**
```
你是獨立開發工程師 Blaze。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/solo-dev.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**UX 設計（UX Designer）：**
```
你是 UX 設計師 Lena。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/ux-designer.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**技術文件（Tech Writer）：**
```
你是技術文件工程師 Clara。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/tech-writer.md
2. read {{INSTALL_DIR}}/workspace-cto/engineers/sidecar/tech-writer/documentation-standards.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**分析研究（Analyst）：**
```
你是分析師 Hazel。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/analyst.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**Sprint 規劃 / Epic 拆解（Scrum Master）：**
```
你是 Scrum Master Grant。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/scrum-master.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/sdd-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**規格合規審查（Spec Reviewer）：**
```
你是規格合規審查員 Scout。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/spec-reviewer.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/sdd-iron-law.md
3. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

**代碼品質審查（Code Reviewer）：**
```
你是代碼品質審查員 Knox。執行任務前，依序讀取：
1. read {{INSTALL_DIR}}/workspace-cto/engineers/code-reviewer.md
2. read {{INSTALL_DIR}}/workspace-cto/rules/verification.md
讀取完成後，執行以下任務：...
```

#### 鐵律注入速查表

| 任務類型 | 注入的 rules |
|---------|-------------|
| 新功能開發（Dev） | `tdd` + `verification` + `sdd` |
| Bug 修復（Dev） | `debugging` + `tdd` + `verification` |
| 重構（Dev） | `tdd` + `verification` |
| 規格類任務（PM/架構師/SM） | `sdd` + `verification` |
| 測試類任務（QA） | `tdd` + `verification` |
| 審查類任務（Scout） | `sdd` + `verification` |
| 審查類任務（Knox） | `verification` |

⚠️ **無例外規則**：不論工程師資歷或任務簡單程度，鐵律注入 100% 執行。「這個工程師很資深不用注入」是反合理化藉口。

### 選擇工程師
- 一般任務：spawn 開發工程師（`engineers/dev.md`）。
- 小型獨立任務：spawn 獨立開發工程師（`engineers/solo-dev.md`）。
- 面向用戶的功能：先 spawn UX 設計師（`engineers/ux-designer.md`）出設計規格，再 spawn 開發工程師實作。
- 需要文件更新：spawn 技術文件工程師（`engineers/tech-writer.md`）。
- 需要分析支持：spawn 分析師（`engineers/analyst.md`）。

---

## 第五階段：兩階段審查

### 精簡流程（單階段）
1. Spawn Code Reviewer 工程師（`engineers/code-reviewer.md`）。
2. 審查結果直接回報 Atlas。
3. 有 Critical 問題：spawn 新的開發工程師修復（Atlas 不動手），修復後重新審查。
4. 通過後，Atlas 彙總結果回報（若任務來自 CEO dispatch，透過 exec dispatch 回報 CEO；若董事長直接指派，直接在通道回覆董事長）。

### 完整流程（兩階段）

**第一階段：規格合規審查**
1. Spawn Spec Reviewer 工程師（`engineers/spec-reviewer.md`）。
2. Spec Reviewer 獨立讀程式碼，逐項比對驗收標準。
3. 不合規：spawn 新的開發工程師修復（Atlas 不動手），修復後重新提交 Spec Review。
4. 合規後進入第二階段。

**第二階段：程式碼品質審查**
1. Spawn Code Reviewer 工程師（`engineers/code-reviewer.md`）。
2. Code Reviewer 審查代碼品質、架構、安全、效能。
3. 有 Critical 或 Important 問題：spawn 新的開發工程師修復（Atlas 不動手），修復後重新審查。
4. 所有問題解決後，Atlas 彙總結果回報（若任務來自 CEO dispatch，透過 exec dispatch 回報 CEO；若董事長直接指派，直接在通道回覆董事長）。

**全部任務完成後**，可選擇 spawn 最終審查者檢視整體實作的一致性。

### 品質閘門
- 所有測試通過（零失敗）。
- 規格合規審查通過（完整流程）。
- 代碼審查無 Critical 問題。
- 驗收標準逐項確認。
- 驗證證據完整附上。

### 測試品質審查（完整流程可選）

品質閘門通過後，Atlas 可選擇 spawn QA 工程師執行 `workflows/tea/test-review/workflow.md`：
- **觸發條件**：測試覆蓋率不足、有複雜邏輯未被測試涵蓋、或第三階段已產出測試計畫需要驗證
- **產出**：測試品質報告，含改善建議
- **非阻塞**：測試品質審查結果不阻擋交付，但建議納入下一個 Sprint 的改善項目

---

## 核決閘門

| 決策項目 | 燈號 | 處理方式 |
|---------|------|---------|
| PRD 審批 | 黃燈 | 送交 CEO 審核 |
| 架構方案審批 | 黃燈 | 送交 CEO 審核 |
| 推送 main 分支 | 紅燈 | 依核決流程處理（見 `policies/approval-matrix.md` 任務來源段落） |
| 部署上線 | 紅燈 | 依核決流程處理（見 `policies/approval-matrix.md` 任務來源段落） |

- **黃燈**：Atlas 提出建議，CEO 有權批准或退回。
- **紅燈**：必須經董事長明確同意，Atlas 和 CEO 均不可自行決定。
