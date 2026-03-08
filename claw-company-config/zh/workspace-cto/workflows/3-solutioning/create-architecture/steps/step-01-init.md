---
name: step-01-init
description: "載入 PRD 和相關文件，確認非功能性需求"
next-step: ./step-02-design.md
output-file: "output/planning/architecture.md"
template: "../../../templates/architecture.md"
---

# 步驟 1：初始化

**進度：步驟 1 / 共 5 步** — 下一步：系統架構設計

## 目標

載入 PRD 和所有相關文件，確認非功能性需求，建立架構文件。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 檢查產出檔案是否存在

檢查 `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md` 是否已存在。

### 2. 中斷恢復判斷

- **檔案已存在**：讀取其 frontmatter 的 `steps-completed`，跳到最後完成步驟的下一步繼續執行
- **檔案不存在**：進入下一步，建立新的架構文件

### 3. 載入 PRD

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`，提取：

- 功能需求清單
- 非功能性需求（效能、安全、可擴展性）
- 技術約束與偏好
- 整合需求

### 4. 載入相關文件

- `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md`（如存在）— 頁面結構、資料流需求
- `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md`（如存在）— 技術建議
- `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md`（如存在）— 產品背景

### 5. 確認非功能性需求

整理並與 CTO 確認非功能性需求基準：

- **效能**：回應時間、吞吐量、延遲目標
- **可擴展性**：預期負載、成長預測
- **可用性**：SLA 目標、容錯需求
- **安全性**：認證、授權、資料加密需求
- **維護性**：程式碼品質標準、技術債容忍度

### 6. 建立架構文件

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/architecture.md` 建立新的架構文件，寫入初始 frontmatter：

```yaml
---
type: architecture
status: draft
created: {today}
agent: cto
workflow: create-architecture
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 7. 更新 frontmatter

將 `step-01-init` 加入 `steps-completed`。

## 完成條件

- ✅ PRD 已載入並理解
- ✅ 相關文件已載入
- ✅ 非功能性需求已確認
- ✅ 架構文件已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-design.md`
