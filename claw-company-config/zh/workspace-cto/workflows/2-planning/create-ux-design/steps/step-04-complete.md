---
name: step-04-complete
description: "最終產出 UX 設計文件，送 CTO 審核"
next-step: null
output-file: "output/planning/ux-design.md"
template: "../../../templates/ux-design.md"
---

# 步驟 4：最終產出與送審

**進度：步驟 4 / 共 4 步** — 最後一步

## 目標

編譯最終 UX 設計文件，確保完整性，送交 CTO 審核。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 編譯最終 UX 設計文件

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/ux-design.md` 的結構，確認所有區段已填寫完整：

- 用戶旅程地圖（步驟 2）
- 資訊架構（步驟 2）
- UI 元件規格（步驟 3）
- 互動模式（步驟 3）
- 響應式設計策略（步驟 3）
- 無障礙標準（步驟 3）

### 2. 一致性檢查

- UI 元件是否覆蓋所有用戶旅程中的頁面？
- 互動模式是否與資訊架構一致？
- 響應式設計是否覆蓋所有核心流程？
- 無障礙設計是否影響 UI 元件規格？

### 3. 更新 frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-flow
  - step-03-spec
  - step-04-complete
```

### 4. 寫入產出目錄

將最終 UX 設計文件寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md`。

### 5. 送交審核

透過 `sessions_send` 將完成的 UX 設計文件送交 CTO 審核：

- 附上設計摘要（頁面數量、核心流程數、元件數量）
- 說明已完成所有 4 個步驟
- 等待 CTO 審核 → CEO 黃燈核決

## 完成條件

- ✅ UX 設計文件所有區段完整
- ✅ 一致性檢查通過
- ✅ Frontmatter 狀態為 `in-review`
- ✅ 檔案已寫入產出目錄
- ✅ 已送交 CTO 審核

## 下一步

此為最後一步，UX 設計流程完成。等待 CTO 審核結果。
