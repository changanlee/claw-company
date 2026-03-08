---
name: step-01-load-story
description: "載入 story 並準備開發環境"
next-step: ./step-02-execute-tasks.md
output-file: null
template: null
---

# 步驟 1：載入 Story

**進度：步驟 1 / 共 3 步** — 下一步：逐任務執行 TDD 開發

## 目標

載入 story file，解析所有開發資訊，確認開發環境就緒。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 接收 Story File

接收 CTO spawn 時提供的 story file 路徑，讀取 story file。

### 2. 解析 Story 內容

從 story file 中解析以下資訊：

- **Story 描述**：功能需求的完整描述
- **驗收標準**：必須逐項滿足的條件
- **任務清單**：開發任務的有序列表
- **開發備註**：架構師或 PM 留下的技術提示

### 3. 檢測中斷恢復

檢查是否有前次開發記錄（continuation detection）：

- 檢查 story file 中是否有已標記 `[x]` 的任務
- 如有，從上次未完成的任務繼續，不重複已完成的工作
- 記錄恢復點到 Dev Agent Record

### 4. 更新 Sprint 狀態

如有 sprint-status 檔案：將此 story 狀態更新為 `in-progress`。

### 5. 確認開發環境

- 確認當前 git branch 正確
- 確認依賴已安裝（執行專案的依賴安裝指令）
- 確認測試框架可正常運行

## 完成條件

- ✅ Story file 已讀取，所有欄位已解析
- ✅ 任務清單已確認（含中斷恢復檢測）
- ✅ 開發環境就緒（git branch、依賴、測試框架）

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-execute-tasks.md`
