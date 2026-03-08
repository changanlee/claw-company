---
name: dispatch
description: "開發派發：組合 spawn 指令，選擇工程師，派發任務"
next-step: ./step-05-review.md
output-file: null
template: null
---

# 步驟 4：開發派發

**進度：步驟 4 / 共 5 步**

## 目標

根據任務拆解結果，為每個任務判斷類型、選擇適用規則、從 roster 選擇工程師，組合完整的 spawn 指令並派發執行。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 判斷任務類型

為每個任務判斷類型，決定適用的鐵律規則：

| 任務類型 | 適用規則 |
|---------|---------|
| 新功能開發 | `rules/tdd-iron-law.md` + `rules/verification.md` |
| Bug 修復 | `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md` |
| 重構 | `rules/tdd-iron-law.md` + `rules/verification.md` |

### 2. 組合 Spawn 指令

每個 spawn 任務包含以下內容：

1. **任務描述**：清晰的目標和範圍。
2. **約束條件**：技術棧、檔案範圍、不可變更的區域。
3. **預期產出**：具體的交付物清單。
4. **回報格式**：統一回報格式（見工程師定義檔案）。
5. **適用鐵律**：根據任務類型，將對應的 `rules/*.md` 內容完整貼入 spawn 指令。
6. **工作流路徑**：指定 Sub-Agent 應遵循的工作流（例如 `workflows/4-implementation/dev-story/workflow.md`）。

### 3. 選擇工程師

讀取 `engineers/roster.md`，根據任務性質選擇適合的工程師：

| 任務性質 | 工程師選擇 |
|---------|-----------|
| 一般開發任務 | 開發工程師（`engineers/dev.md`） |
| 小型獨立任務 | 獨立開發工程師（`engineers/solo-dev.md`） |
| 面向用戶的功能 | 先 UX 設計師（`engineers/ux-designer.md`）出設計規格，再開發工程師實作 |
| 需要文件更新 | 技術文件工程師（`engineers/tech-writer.md`） |
| 需要分析支持 | 分析師（`engineers/analyst.md`） |

### 4. 派發執行

逐一 spawn 工程師執行任務，等待回報。

## 完成標準

- [ ] 每個任務已判斷類型並對應適用規則
- [ ] 每個任務已組合完整的 spawn 指令（含任務描述、約束、產出、回報格式、鐵律、工作流路徑）
- [ ] 每個任務已從 roster.md 選擇適合的工程師
- [ ] 所有任務已派發並等待/收到回報

## 下一步

👉 前往 [步驟 5：審查](./step-05-review.md)
