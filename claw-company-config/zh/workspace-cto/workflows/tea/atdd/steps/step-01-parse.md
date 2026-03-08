---
name: step-01-parse
description: "載入 story 驗收標準"
next-step: ./step-02-generate.md
output-file: null
template: null
---

# 步驟 1：解析驗收標準

**進度：步驟 1 / 共 3 步** — 下一步：生成驗收測試代碼

## 目標

載入 story file，解析所有 Given/When/Then 格式的驗收標準。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 接收 Story File

接收 CTO spawn 時提供的 story file 路徑，讀取 story file。

### 2. 提取驗收標準

從 story file 中提取所有驗收標準（Acceptance Criteria）：

- 識別 Given/When/Then 格式的場景
- 識別隱含的邊界條件和例外情境
- 記錄每個驗收標準的 ID 或編號

### 3. 結構化驗收標準

將每個驗收標準結構化為：

- **場景名稱**：描述性的場景標題
- **Given**：前置條件（初始狀態、測試資料）
- **When**：觸發動作（用戶操作、API 呼叫）
- **Then**：期望結果（狀態變更、回應內容、副作用）
- **And/But**：額外條件（如有）

### 4. 識別測試依賴

分析每個場景需要的：

- 測試資料（fixtures / factories）
- Mock 對象（外部 API、第三方服務）
- 環境準備（資料庫狀態、用戶認證）

## 完成條件

- ✅ Story file 已讀取
- ✅ 所有驗收標準已提取並結構化
- ✅ 測試依賴已識別

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-generate.md`
