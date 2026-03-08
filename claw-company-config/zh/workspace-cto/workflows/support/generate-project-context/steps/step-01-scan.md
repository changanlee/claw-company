---
name: step-01-scan
description: "掃描專案結構、技術棧、關鍵檔案"
next-step: ./step-02-generate.md
output-file: null
template: null
---

# 步驟 1：掃描專案

**進度：步驟 1 / 共 3 步** — 下一步：生成 project-context.md

## 目標

全面掃描專案，收集架構、技術棧、慣例等資訊。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 掃描專案結構

- 列出頂層目錄結構
- 識別主要模組和元件
- 記錄目錄組織模式（按功能/按層級/其他）

### 2. 識別技術棧

- **語言**：主要語言和版本
- **框架**：使用的框架和版本
- **套件管理**：package.json / requirements.txt / go.mod 等
- **建構工具**：webpack / vite / make 等
- **測試框架**：jest / pytest / go test 等
- **CI/CD**：GitHub Actions / GitLab CI 等

### 3. 掃描關鍵檔案

讀取以下檔案（如存在）：

- 設定檔（package.json, tsconfig.json, etc.）
- 入口檔案（main.ts, app.py, cmd/main.go, etc.）
- 環境設定（.env.example, docker-compose.yml）
- CI 設定（.github/workflows/）

### 4. 識別架構模式

- 應用架構（MVC / 微服務 / Serverless / Monorepo）
- 資料流模式
- 狀態管理方式
- API 風格（REST / GraphQL / gRPC）

### 5. 識別慣例

- 命名慣例（檔案、變數、函式）
- 代碼風格（ESLint / Prettier 設定）
- Git 慣例（分支策略、commit message 風格）
- 目錄慣例

## 完成條件

- ✅ 專案結構已掃描
- ✅ 技術棧已識別
- ✅ 關鍵檔案已讀取
- ✅ 架構模式已識別
- ✅ 慣例已識別

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-generate.md`
