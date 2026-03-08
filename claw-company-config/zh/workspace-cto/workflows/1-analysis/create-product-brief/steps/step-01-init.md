---
name: step-01-init
description: "初始化，發現輸入文件"
next-step: ./step-02-discovery.md
output-file: "output/planning/product-brief.md"
template: "../../../templates/product-brief.md"
---

# 步驟 1：初始化

**進度：步驟 1 / 共 4 步** — 下一步：問題探索

## 目標

檢測是否有未完成的產品簡介（中斷恢復），發現並載入所有輸入文件（腦力激盪結果、研究報告），建立產出文件。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 檢查產出檔案是否存在

檢查 `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` 是否已存在。

### 2. 中斷恢復判斷

- **檔案已存在**：讀取其 frontmatter 的 `steps-completed`，跳到最後完成步驟的下一步繼續執行
- **檔案不存在**：進入下一步，建立新的產品簡介

### 3. 建立新產品簡介

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/product-brief.md` 建立新的產品簡介檔案，寫入初始 frontmatter：

```yaml
---
type: product-brief
status: draft
created: {today}
agent: cto
workflow: create-product-brief
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 4. 發現輸入文件

掃描以下位置，發現可用的輸入文件：

- `{{INSTALL_DIR}}/workspace-cto/output/` — 腦力激盪結果
- `{{INSTALL_DIR}}/workspace-cto/output/analysis/` — 研究報告
- CTO 任務描述中提及的任何文件

### 5. 載入所有發現的輸入

讀取所有發現的輸入文件，理解產品構想背景。

## 完成條件

- ✅ 產品簡介檔案已建立（或已從中斷點恢復）
- ✅ 所有可用輸入文件已載入並理解

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-discovery.md`
