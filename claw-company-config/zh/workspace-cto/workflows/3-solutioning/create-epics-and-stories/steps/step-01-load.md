---
name: step-01-load
description: "載入 PRD 和架構文件"
next-step: ./step-02-epics.md
---

# 步驟 1：載入文件

**進度：步驟 1 / 共 4 步** — 下一步：拆解 Epic

## 目標

載入 PRD 和架構文件，理解功能需求與技術約束，為拆解做準備。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 載入 PRD

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`，提取：

- 功能需求清單
- 用戶故事（如已有初步版本）
- 驗收標準
- 優先級資訊

### 2. 載入架構文件

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md`，提取：

- 元件分解結構
- 技術約束與依賴關係
- 資料模型
- 非功能性需求對實作的影響

### 3. 載入 UX 設計（如有）

讀取 `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md`（如存在），提取：

- 頁面清單與流程
- 互動規格

### 4. 建立功能地圖

整理所有功能需求，建立功能地圖（按用戶旅程或功能模組分組），標記：

- 核心功能 vs 輔助功能
- 前端 vs 後端 vs 全端
- 依賴關係（A 必須先完成才能做 B）

## 完成條件

- ✅ PRD 已載入並理解
- ✅ 架構文件已載入並理解
- ✅ 功能地圖已建立
- ✅ 依賴關係已標記

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-epics.md`
