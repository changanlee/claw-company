---
name: step-04-complete
description: "最終審查與送審"
next-step: null
output-file: "output/planning/product-brief.md"
template: "../../../templates/product-brief.md"
---

# 步驟 4：最終審查與送審

**進度：步驟 4 / 共 4 步** — 最後一步

## 目標

對產品簡介進行最終審查，確保品質與完整性，寫入產出目錄並送交 CTO 審核。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 最終品質審查

逐項檢查產品簡介：

- 願景聲明是否清晰且具啟發性？
- 問題陳述是否具體且有說服力？
- 目標用戶是否明確且可驗證？
- 解決方案是否直接對應問題？
- 價值主張是否與差異化策略一致？
- 成功指標是否可量化？

### 2. 更新 frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-discovery
  - step-03-draft
  - step-04-complete
```

### 3. 寫入產出目錄

將最終產品簡介寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md`。

### 4. 送交審核

透過 `sessions_send` 將完成的產品簡介送交 CTO 審核：

- 附上產品簡介摘要（願景、目標用戶、核心價值主張）
- 說明已完成所有 4 個步驟
- 等待 CTO 審核 → CEO 黃燈核決

## 完成條件

- ✅ 產品簡介所有區段完整且品質達標
- ✅ Frontmatter 狀態為 `in-review`
- ✅ 檔案已寫入產出目錄
- ✅ 已送交 CTO 審核

## 下一步

此為最後一步，產品簡介建立流程完成。等待 CTO 審核結果。
