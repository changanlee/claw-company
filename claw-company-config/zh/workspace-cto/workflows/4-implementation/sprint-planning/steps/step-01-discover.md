---
name: step-01-discover
description: "發現並載入所有 Epic 文件"
next-step: ./step-02-parse.md
output-file: null
template: null
---

# 步驟 1：發現 Epic 文件

**進度：步驟 1 / 共 4 步** — 下一步：解析 Epic → Story

## 目標

發現並載入所有相關的 Epic 文件，確認 Sprint 規劃的輸入完整。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 接收 Epic 路徑

接收 CTO spawn 時提供的 Epic 文件路徑或目錄。

### 2. 掃描 Epic 文件

- 如果提供的是目錄，掃描目錄下所有 Epic 文件
- 如果提供的是單一文件，直接載入
- 記錄發現的 Epic 文件清單

### 3. 載入 Epic 內容

逐一讀取每個 Epic 文件，確認：

- 文件格式正確（含 Story 拆解段落）
- Epic 名稱與描述完整
- Story 列表存在且非空

### 4. 建立 Epic 索引

整理所有發現的 Epic，建立索引：

- Epic 名稱
- Story 數量
- 檔案路徑

## 完成條件

- ✅ 所有 Epic 文件已發現並載入
- ✅ 每個 Epic 的格式已驗證
- ✅ Epic 索引已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-parse.md`
