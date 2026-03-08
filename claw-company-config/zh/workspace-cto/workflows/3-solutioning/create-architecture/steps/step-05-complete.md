---
name: step-05-complete
description: "產出架構文件，送 CTO 審核"
next-step: null
output-file: "output/planning/architecture.md"
template: "../../../templates/architecture.md"
---

# 步驟 5：最終產出與送審

**進度：步驟 5 / 共 5 步** — 最後一步

## 目標

編譯最終架構文件，確保完整性與一致性，送交 CTO 審核。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 編譯最終架構文件

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/architecture.md` 的結構，確認所有區段已填寫完整：

- 系統架構設計（步驟 2）
- 架構決策記錄（步驟 3）
- 基礎設施與部署策略（步驟 4）

### 2. 一致性檢查

- 架構設計是否滿足所有非功能性需求？
- ADR 決策是否與設計一致？
- 基礎設施是否支援所選的架構風格？
- 安全策略是否覆蓋所有敏感資料流？
- 效能策略是否針對瓶頸？

### 3. 更新 frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-design
  - step-03-adr
  - step-04-infra
  - step-05-complete
```

### 4. 寫入產出目錄

將最終架構文件寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md`。

### 5. 送交審核

透過 `sessions_send` 將完成的架構文件送交 CTO 審核：

- 附上架構摘要（架構風格、核心元件數量、ADR 數量）
- 標註需要 CTO 特別關注的決策
- 說明已完成所有 5 個步驟
- 等待 CTO 審核 → CEO 黃燈核決

## 完成條件

- ✅ 架構文件所有區段完整
- ✅ 一致性檢查通過
- ✅ Frontmatter 狀態為 `in-review`
- ✅ 檔案已寫入產出目錄
- ✅ 已送交 CTO 審核

## 下一步

此為最後一步，架構設計流程完成。等待 CTO 審核結果。
