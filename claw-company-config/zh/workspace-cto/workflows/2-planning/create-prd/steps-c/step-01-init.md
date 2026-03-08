---
name: step-01-init
description: "初始化與狀態檢測"
next-step: ./step-02-classify.md
output-file: "output/planning/prd.md"
template: "../../templates/prd.md"
---

# 步驟 1：初始化與狀態檢測

**進度：步驟 1 / 共 8 步** — 下一步：專案分類

## 目標

檢測是否有未完成的 PRD（中斷恢復），或建立新的 PRD 檔案；發現並載入所有輸入文件。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 檢查產出檔案是否存在

檢查 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` 是否已存在。

### 2. 中斷恢復判斷

- **檔案已存在**：讀取其 frontmatter 的 `steps-completed`，跳到最後完成步驟的下一步繼續執行
- **檔案不存在**：進入下一步，建立新的 PRD

### 3. 建立新 PRD

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/prd.md` 建立新的 PRD 檔案，寫入初始 frontmatter：

```yaml
---
type: prd
status: draft
created: {today}
agent: cto
workflow: create-prd
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 4. 發現輸入文件

掃描以下位置，發現可用的輸入文件：

- `{{INSTALL_DIR}}/workspace-cto/output/analysis/` — 產品簡介（product-brief）
- `{{INSTALL_DIR}}/workspace-cto/output/` — 腦力激盪結果、研究報告
- CTO 任務描述中提及的任何文件

### 5. 載入所有發現的輸入

讀取所有發現的輸入文件，理解需求背景。

## 完成條件

- ✅ PRD 檔案已建立（或已從中斷點恢復）
- ✅ 所有可用輸入文件已載入並理解

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-classify.md`
