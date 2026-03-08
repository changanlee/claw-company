---
name: step-02-generate
description: "為每個驗收標準生成測試代碼"
next-step: ./step-03-verify.md
output-file: null
template: null
---

# 步驟 2：生成驗收測試

**進度：步驟 2 / 共 3 步** — 下一步：運行測試確認失敗

## 目標

為每個驗收標準生成預期失敗的驗收測試代碼。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 確定測試框架

根據專案的測試框架配置，確認驗收測試使用的工具和語法。

### 2. 逐一生成測試代碼

對每個驗收標準（AC），生成對應的測試代碼：

- **測試名稱**：直接對應場景名稱（如 `should allow user to register when providing valid email`）
- **Arrange**：根據 Given 建立前置條件
- **Act**：根據 When 執行觸發動作
- **Assert**：根據 Then 撰寫斷言

### 3. 處理邊界場景

為每個 AC 考慮邊界情境的測試：

- 無效輸入場景
- 權限不足場景
- 資料不存在場景
- 併發操作場景（如適用）

### 4. 組織測試結構

- 按 feature/story 分組（describe blocks）
- 測試檔案命名遵循專案慣例
- 共用的 setup/teardown 提取為 helper
- 測試資料使用 fixtures 或 factories

### 5. 標記為 ATDD 測試

在測試檔案中加入標記，表明這些是 ATDD 生成的驗收測試：

- 檔案頂部加入註釋說明來源 story
- 每個測試標記對應的 AC 編號

## 完成條件

- ✅ 每個驗收標準都有對應的測試代碼
- ✅ 邊界場景測試已生成
- ✅ 測試結構清晰，命名規範
- ✅ ATDD 標記已加入

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-verify.md`
