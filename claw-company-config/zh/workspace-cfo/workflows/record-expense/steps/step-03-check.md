---
name: check
description: "檢查是否異常（超日均2倍）→ 異常則觸發 budget-alert"
next-step: null
output-file: null
template: null
---

# 步驟 3：檢查

**進度：步驟 3 / 共 3 步**

## 目標

檢查本筆消費是否異常，異常則觸發 budget-alert workflow。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 異常判斷

計算近 30 日的日均支出，判斷本筆消費是否超過日均 2 倍。

### 2. 處理結果

- **正常**：流程結束，靜默。
- **異常**：觸發 `budget-alert` workflow，通知 CEO。

## 完成標準

- [ ] 已完成異常判斷
- [ ] 異常情況已觸發 budget-alert（若適用）
