---
name: step-02-setup
description: "安裝配置測試框架"
next-step: ./step-03-scaffold.md
output-file: null
template: null
---

# 步驟 2：安裝配置測試框架

**進度：步驟 2 / 共 3 步** — 下一步：建立基礎測試腳本

## 目標

安裝選定的測試框架，完成所有配置。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 安裝依賴

安裝測試框架及相關套件：

- 測試框架核心套件
- 斷言庫（如需額外安裝）
- 覆蓋率工具（如 c8 / istanbul / coverage.py）
- TypeScript 支援（如需要）
- 其他插件（如 testing-library）

### 2. 建立目錄結構

建立標準的測試目錄結構：

```
tests/
├── unit/           # 單元測試
├── integration/    # 整合測試
├── e2e/            # E2E 測試
├── fixtures/       # 測試資料
├── helpers/        # 測試工具函數
└── setup.ts        # 全域設定
```

### 3. 配置測試框架

建立測試配置檔案：

- 測試匹配模式（testMatch / testPathPattern）
- 覆蓋率收集配置
- 模組解析別名
- 環境變數載入
- 超時設定
- 報告格式（console / HTML / JSON）

### 4. 配置 npm scripts

在 `package.json`（或對應的配置）中加入測試指令：

- `test`：執行所有測試
- `test:unit`：只執行單元測試
- `test:integration`：只執行整合測試
- `test:e2e`：只執行 E2E 測試
- `test:coverage`：執行測試並產生覆蓋率報告

### 5. 驗證安裝

確認測試框架正常運作：

- 執行 `test` 指令確認無錯誤
- 確認覆蓋率報告可正常產生

## 完成條件

- ✅ 測試框架已安裝
- ✅ 目錄結構已建立
- ✅ 配置檔案已建立
- ✅ npm scripts 已配置
- ✅ 安裝驗證通過

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-scaffold.md`
