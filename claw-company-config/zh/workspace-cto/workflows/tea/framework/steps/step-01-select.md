---
name: step-01-select
description: "根據技術棧選擇測試框架"
next-step: ./step-02-setup.md
output-file: null
template: null
---

# 步驟 1：選擇測試框架

**進度：步驟 1 / 共 3 步** — 下一步：安裝配置測試框架

## 目標

根據專案技術棧和需求，選擇最合適的測試框架。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 分析專案技術棧

識別以下資訊：

- **程式語言**：TypeScript / JavaScript / Python / Go 等
- **前端框架**：React / Vue / Svelte / Next.js 等
- **後端框架**：Express / NestJS / FastAPI / Gin 等
- **建構工具**：Vite / Webpack / esbuild 等
- **套件管理**：npm / pnpm / yarn / pip 等

### 2. 評估框架選項

根據技術棧列出候選框架：

**單元/整合測試：**
- Node.js：Jest / Vitest / Mocha + Chai
- Python：pytest / unittest
- Go：testing（標準庫）+ testify

**E2E 測試：**
- Web：Playwright / Cypress / Selenium
- API：Supertest / REST Assured / httpx

**效能測試（如需要）：**
- k6 / Artillery / Locust

### 3. 選擇決策

根據以下標準選擇框架：

- **技術契合度**：與專案技術棧的整合程度
- **社群支援**：文件品質、社群活躍度、更新頻率
- **學習曲線**：團隊（Agent）上手難度
- **功能完整性**：覆蓋率報告、watch 模式、平行執行
- **效能**：測試執行速度

### 4. 記錄決策

記錄選擇的框架及理由：

- 選擇的框架名稱和版本
- 選擇理由（優勢）
- 已知限制
- 備選方案

## 完成條件

- ✅ 專案技術棧已分析
- ✅ 框架候選已評估
- ✅ 最終框架已選定（含決策理由）

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-setup.md`
