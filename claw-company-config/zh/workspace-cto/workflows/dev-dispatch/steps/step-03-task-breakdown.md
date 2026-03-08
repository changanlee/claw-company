---
name: task-breakdown
description: "任務拆解：依流程規模拆解為可執行任務"
next-step: ./step-04-dispatch.md
output-file: output/planning/task-breakdown.md
template: null
---

# 步驟 3：任務拆解

**進度：步驟 3 / 共 5 步**

## 目標

將技術設計方案拆解為具體可執行的開發任務。精簡流程由 Atlas 直接拆解；完整流程透過 PM 產出 PRD、架構師產出技術規格後再拆解。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 精簡流程

Atlas 根據腦力激盪結果，直接拆為具體可執行任務。每個任務包含：

- **描述**：任務目標與範圍
- **驗收標準**：明確的完成條件
- **預期產出**：具體的交付物

### 完整流程

#### 1. Spawn PM 工程師

- 讀取 `engineers/roster.md` 確認 PM 工程師定義。
- Spawn PM 工程師（`engineers/pm.md`）。
- 任務：根據腦力激盪的技術設計文件撰寫 PRD。
- 產出：結構化 PRD，包含用戶故事、驗收標準、優先級。
- **核決閘門（黃燈）**：PRD 完成後送交 CEO 審核。CEO 批准後才繼續。

#### 2. Spawn 架構師工程師

- 讀取 `engineers/roster.md` 確認架構師工程師定義。
- Spawn 架構師工程師（`engineers/architect.md`）。
- 任務：根據 PRD 產出技術規格與架構方案。
- 產出：技術規格文件、架構決策記錄、元件分解。
- **核決閘門（黃燈）**：架構方案完成後送交 CEO 審核。CEO 批准後才繼續。

#### 3. Atlas 拆 Epic

- 根據 PRD 和技術規格，拆解為可獨立執行的 Epic 和任務。
- 必要時 spawn Scrum Master 工程師（`engineers/scrum-master.md`）協助拆解。
- 讀取 `engineers/roster.md` 為每個任務配對適合的工程師角色。

## 完成標準

- [ ] 精簡：任務已拆解，每個任務含描述、驗收標準、預期產出
- [ ] 完整：PRD 已產出並通過 CEO 審核（黃燈）
- [ ] 完整：架構方案已產出並通過 CEO 審核（黃燈）
- [ ] 完整：Epic 和任務已拆解完成
- [ ] 所有任務已配對適合的工程師角色

## 下一步

👉 前往 [步驟 4：開發派發](./step-04-dispatch.md)
