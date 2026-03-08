---
name: step-03-stories
description: "為每個 Epic 拆解 Story（INVEST 原則）"
next-step: ./step-04-complete.md
---

# 步驟 3：拆解用戶故事

**進度：步驟 3 / 共 4 步** — 下一步：最終產出

## 目標

為每個 Epic 拆解用戶故事，遵循 INVEST 原則，定義驗收標準。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. INVEST 原則檢查

每個 Story 必須滿足 INVEST 原則：

- **I**ndependent — 可獨立開發與交付
- **N**egotiable — 細節可討論調整
- **V**aluable — 為用戶或業務帶來價值
- **E**stimable — 可估算工作量
- **S**mall — 足夠小（1 個 Sprint 內完成）
- **T**estable — 有明確的驗收測試

### 2. 撰寫用戶故事

為每個 Epic 的每個 Story 使用以下格式：

```markdown
### Story-{Epic序號}.{Story序號}：{名稱}

**用戶故事**：
作為 {角色}，我想要 {功能}，以便 {價值}

**驗收標準**：
- [ ] Given {前提}，When {動作}，Then {結果}
- [ ] Given {前提}，When {動作}，Then {結果}

**任務拆解**：
1. {技術任務 1}
2. {技術任務 2}
3. {技術任務 3}

**估算**：{Story Point 或時間}
**依賴**：{前置 Story 或無}
```

### 3. Story 品質檢查

逐 Story 檢查：

- 用戶故事是否從用戶角度撰寫？
- 驗收標準是否使用 Given-When-Then 格式？
- 驗收標準是否可自動化測試？
- 任務拆解是否涵蓋前端 + 後端 + 測試？
- 估算是否合理（不超過 1 個 Sprint）？

### 4. 交叉驗證

- 所有 Story 的驗收標準加總是否覆蓋 PRD 的所有需求？
- 是否有 PRD 需求未被任何 Story 覆蓋？
- 架構文件中的每個元件是否至少有一個 Story 涉及？

## 完成條件

- ✅ 每個 Epic 都有對應的 Story
- ✅ 所有 Story 滿足 INVEST 原則
- ✅ 驗收標準使用 Given-When-Then 格式
- ✅ PRD 需求已完全覆蓋

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-04-complete.md`
