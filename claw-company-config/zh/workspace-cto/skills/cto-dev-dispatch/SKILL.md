---
name: cto-dev-dispatch
description: CTO 開發派發流程。當收到 CEO 轉達的開發需求時觸發。處理與董事長的腦力激盪、規模評估、工兵角色選擇、任務拆解、以及帶鐵律注入的 spawn。
---

# CTO 開發派發流程

Atlas（CTO）收到 CEO 轉達的開發需求時，依以下五個階段執行。

---

## 第一階段：腦力激盪

1. 讀取 `engineers/roster.md` 了解所有可用工兵角色。
2. 根據需求性質，自動選擇相關工兵角色加入討論（例如：涉及前端則加入 UX 設計師，涉及架構則加入架構師）。
3. 與董事長（透過 CEO）進行腦力激盪：
   - 每次只問**一個問題**，等待回答後再繼續。
   - 針對關鍵決策點提出 **2-3 個方案**，附上各方案的利弊分析。
   - 取得董事長批准後才進入下一步。
4. 董事長可隨時要求追加角色（例如：「讓 QA 也來看看」），Atlas 立即調整。
5. 確認設計方向後，明確記錄決策要點，進入下一階段。

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
1. **Spawn PM 工兵**（`engineers/pm.md`）：
   - 任務：根據腦力激盪結果撰寫 PRD。
   - 產出：結構化 PRD，包含用戶故事、驗收標準、優先級。
   - 核決閘門：PRD 完成後送交 CEO 審核（黃燈）。

2. **Spawn 架構師工兵**（`engineers/architect.md`）：
   - 任務：根據 PRD 產出技術規格與架構方案。
   - 產出：技術規格文件、架構決策記錄、元件分解。
   - 核決閘門：架構方案完成後送交 CEO 審核（黃燈）。

3. **Atlas 拆 Epic**：
   - 根據 PRD 和技術規格，拆解為可獨立執行的 Epic 和任務。
   - 必要時 spawn Scrum Master 工兵（`engineers/scrum-master.md`）協助拆解。

---

## 第四階段：開發派發

### 判斷任務類型
- **新功能開發**：適用 `rules/tdd-iron-law.md` + `rules/verification.md`
- **Bug 修復**：適用 `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md`
- **重構**：適用 `rules/tdd-iron-law.md` + `rules/verification.md`

### 組合 Spawn 指令
每個 spawn 任務包含以下內容：
1. **任務描述**：清晰的目標和範圍。
2. **約束條件**：技術棧、檔案範圍、不可變更的區域。
3. **預期產出**：具體的交付物清單。
4. **回報格式**：統一回報格式（見工兵定義檔案）。
5. **適用鐵律**：根據任務類型，將對應的 `rules/*.md` 內容完整貼入 spawn 指令。

### 選擇工兵
- 一般任務：spawn 開發工兵（`engineers/dev.md`）。
- 小型獨立任務：spawn 獨立開發工兵（`engineers/solo-dev.md`）。
- 面向用戶的功能：先 spawn UX 設計師（`engineers/ux-designer.md`）出設計規格，再 spawn 開發工兵實作。
- 需要文件更新：spawn 技術文件工兵（`engineers/tech-writer.md`）。
- 需要分析支持：spawn 分析師（`engineers/analyst.md`）。

---

## 第五階段：審查

### 精簡流程
1. Spawn Code Reviewer 工兵（`engineers/code-reviewer.md`）。
2. 審查結果直接回報 Atlas。
3. 有 Critical 問題：退回開發工兵修復後重新審查。
4. 通過後，Atlas 彙總結果回報 CEO。

### 完整流程
1. Spawn Code Reviewer 工兵（`engineers/code-reviewer.md`）進行一次審查。
2. Atlas 進行**二次審核**：對照 PRD 和技術規格，確認完整性。
3. 有任何 Critical 或 Important 問題：退回修復，修復後重新審查。
4. 所有問題解決後，Atlas 彙總結果回報 CEO。

### 品質閘門
- 所有測試通過（零失敗）。
- 代碼審查無 Critical 問題。
- 驗收標準逐項確認。
- 驗證證據完整附上。

---

## 核決閘門

| 決策項目 | 燈號 | 處理方式 |
|---------|------|---------|
| PRD 審批 | 黃燈 | 送交 CEO 審核 |
| 架構方案審批 | 黃燈 | 送交 CEO 審核 |
| 推送 main 分支 | 紅燈 | 透過 CEO 呈報董事長核決 |
| 部署上線 | 紅燈 | 透過 CEO 呈報董事長核決 |

- **黃燈**：Atlas 提出建議，CEO 有權批准或退回。
- **紅燈**：必須經董事長明確同意，Atlas 和 CEO 均不可自行決定。
