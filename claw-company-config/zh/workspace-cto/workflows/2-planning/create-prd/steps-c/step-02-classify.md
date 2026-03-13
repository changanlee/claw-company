---
name: step-02-classify
description: "專案分類"
next-step: ./step-03-requirements.md
---

# 步驟 2：專案分類

**進度：步驟 2 / 共 8 步** — 下一步：核心需求

## 目標

分析輸入資料，對專案進行分類，確定開發方向。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 分析輸入並分類

根據輸入資料分析以下維度：

- **專案類型**：Web 應用 / 行動應用 / API 服務 / CLI 工具 / 資料管線 / 其他
- **領域**：FinTech / 生活管理 / 開發工具 / 其他
- **複雜度**：低（1-2 週）/ 中（2-4 週）/ 高（4+ 週）

### 2. 判斷 Greenfield vs Brownfield

- **Greenfield（全新專案）**：從零開始建設
- **Brownfield（既有系統）**：在現有系統上擴展或修改

### 3. 確認分類結果

將分類結果寫入 PRD 的「專案概述」區段，並透過 `announce` 向 CTO 確認分類是否正確。

等待 CTO 回覆確認後再繼續。

### 4. 更新 PRD frontmatter

將 `step-02-classify` 加入 `steps-completed`。

## 完成條件

- ✅ 專案類型、領域、複雜度已分類
- ✅ Greenfield / Brownfield 已判斷
- ✅ CTO 已確認分類結果
- ✅ PRD frontmatter 已更新

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-requirements.md`
