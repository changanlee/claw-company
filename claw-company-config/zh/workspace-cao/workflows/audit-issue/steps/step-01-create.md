---
name: create
description: "建立議題：建立稽核議題記錄"
next-step: ./step-02-notify.md
output-file: null
template: ../../templates/audit-report.md
---

# 步驟 1：建立議題

**進度：步驟 1 / 共 5 步**

## 目標

為發現的問題建立正式的稽核議題記錄，包含完整的議題資訊。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 分配議題 ID

讀取 `{{INSTALL_DIR}}/workspace-cao/issues.md`，根據現有議題編號分配新 ID：
- 格式：`AUD-YYYY-NNN`（例如 AUD-2026-001）
- 序號遞增

### 2. 填寫議題記錄

建立議題記錄，包含：
- **議題 ID**：AUD-YYYY-NNN
- **發現日期**：建立日期
- **來源**：安全掃描 / 合規檢查 / 日常巡檢 / 舉報
- **描述**：問題的詳細描述
- **嚴重度**：Critical / High / Medium / Low
- **責任 Agent**：需要修正的 Agent
- **修正期限**：根據嚴重度設定
  - Critical：24 小時
  - High：3 天
  - Medium：7 天
  - Low：14 天
- **狀態**：Open

### 3. 寫入 issues.md

將議題記錄寫入 `{{INSTALL_DIR}}/workspace-cao/issues.md`。

### 4. 產出議題報告

讀取 `{{INSTALL_DIR}}/workspace-cao/templates/audit-report.md`，按模板格式產出議題報告存檔到 `output/issues/`。

## 完成標準

- [ ] 已分配議題 ID
- [ ] 已填寫完整議題記錄
- [ ] 已寫入 issues.md
- [ ] 已產出議題報告

## 下一步

👉 前往 [步驟 2：通知](./step-02-notify.md)
