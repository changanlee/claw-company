---
name: step-01-init
description: "載入 PRD，確認目標用戶與核心功能"
next-step: ./step-02-flow.md
output-file: "output/planning/ux-design.md"
template: "../../../templates/ux-design.md"
---

# 步驟 1：初始化

**進度：步驟 1 / 共 4 步** — 下一步：用戶旅程設計

## 目標

載入 PRD 與相關文件，確認目標用戶與核心功能清單，建立 UX 設計文件。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 檢查產出檔案是否存在

檢查 `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` 是否已存在。

### 2. 中斷恢復判斷

- **檔案已存在**：讀取其 frontmatter 的 `steps-completed`，跳到最後完成步驟的下一步繼續執行
- **檔案不存在**：進入下一步，建立新的 UX 設計文件

### 3. 載入 PRD

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`，提取：

- 目標用戶畫像
- 核心功能清單
- 用戶故事與驗收標準
- 非功能性需求（影響 UX 的部分）

### 4. 載入產品簡介（如有）

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md`（如存在），補充用戶痛點與價值主張資訊。

### 5. 建立 UX 設計文件

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/ux-design.md` 建立新的 UX 設計文件，寫入初始 frontmatter：

```yaml
---
type: ux-design
status: draft
created: {today}
agent: cto
workflow: create-ux-design
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 6. 更新 frontmatter

將 `step-01-init` 加入 `steps-completed`。

## 完成條件

- ✅ PRD 已載入並理解
- ✅ 目標用戶與核心功能已確認
- ✅ UX 設計文件已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-flow.md`
