---
name: step-08-complete
description: "完成與產出"
next-step: null
output-file: "output/planning/prd.md"
template: "../../templates/prd.md"
---

# 步驟 8：完成與產出

**進度：步驟 8 / 共 8 步** — 最後一步

## 目標

編譯最終 PRD 文件，更新狀態，送交審核。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 編譯最終 PRD

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/prd.md` 的結構，確認所有區段已填寫完整：

- 專案概述（步驟 2）
- 功能需求（步驟 3）
- 用戶故事與驗收標準（步驟 4-5）
- 非功能性需求（步驟 6）
- 邊界條件與風險（步驟 7）

### 2. 更新 PRD frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-classify
  - step-03-requirements
  - step-04-user-stories
  - step-05-acceptance
  - step-06-nfr
  - step-07-edge-cases
  - step-08-complete
```

### 3. 寫入產出目錄

將最終 PRD 寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`。

### 4. 送交審核

透過 `sessions_send` 將完成的 PRD 送交 CTO 審核：

- 附上 PRD 摘要（專案類型、需求數量、風險數量）
- 說明已完成所有 8 個步驟
- 等待 CTO 審核 → CEO 黃燈核決

## 完成條件

- ✅ PRD 所有區段完整
- ✅ Frontmatter 狀態為 `in-review`
- ✅ 檔案已寫入產出目錄
- ✅ 已送交 CTO 審核

## 下一步

此為最後一步，PRD 建立流程完成。等待 CTO 審核結果。
