---
name: step-01-init
description: "判斷研究類型，載入相關背景"
next-step: null
output-file: "output/planning/research-report.md"
template: "../../../templates/research-report.md"
---

# 步驟 1：初始化與類型判斷

**進度：步驟 1 / 共 3 步** — 下一步：依類型分支

## 目標

判斷研究類型（market / domain / technical），載入相關背景資料，建立研究報告檔案。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 分析研究任務

根據 CTO 指派的任務描述，判斷研究類型：

- **market（市場研究）**：涉及競品、市場規模、趨勢、用戶需求
- **domain（領域研究）**：涉及產業知識、法規、最佳實踐
- **technical（技術研究）**：涉及技術選型、架構、PoC 可行性

### 2. 建立研究報告檔案

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/research-report.md` 建立新的研究報告，寫入初始 frontmatter：

```yaml
---
type: research-report
status: draft
created: {today}
agent: cto
workflow: research
research-type: {market|domain|technical}
steps-completed: []
related: []
tags: []
---
```

### 3. 載入背景資料

掃描以下位置，載入與研究主題相關的文件：

- `{{INSTALL_DIR}}/workspace-cto/output/` — 現有報告或簡介
- CTO 任務描述中提及的任何文件
- CTO MEMORY.md 中相關的歷史決策

### 4. 更新 frontmatter

將 `step-01-init` 加入 `steps-completed`。

## 完成條件

- ✅ 研究類型已判斷
- ✅ 研究報告檔案已建立
- ✅ 相關背景資料已載入

## 下一步

根據研究類型，讀取並遵循對應的步驟：

- **market** → `./step-02-market.md`
- **domain** → `./step-02-domain.md`
- **technical** → `./step-02-technical.md`
