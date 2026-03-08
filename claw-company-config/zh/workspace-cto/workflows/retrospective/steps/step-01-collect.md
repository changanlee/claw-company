---
name: step-01-collect
description: "收集回顧資料"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# 步驟 1：收集資料

**進度：步驟 1 / 共 3 步** — 下一步：分析與歸納

## 目標

收集 Sprint 或 Epic 執行過程中的所有資料，為分析做準備。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 收集完成的 Story

讀取 sprint-status 文件，整理：

- 所有 story 的最終狀態
- 計畫內完成的 story
- 計畫外新增的 story（如有航向修正）
- 未完成的 story 及原因

### 2. 收集問題記錄

從以下來源收集問題：

- Story file 中的 Dev Agent Record
- Code Review 報告中的問題
- 航向修正記錄（如有）
- CTO MEMORY.md 中的相關記錄

### 3. 收集時間線

整理關鍵事件的時間線：

- Sprint 開始與結束
- 各 story 的開始和完成時間（如有記錄）
- 重大問題發生的時間點
- 航向修正的時間點（如有）

### 4. 收集指標

統計以下指標：

- 完成率：完成的 story 數 / 計畫的 story 數
- 審查退回率：退回次數 / 審查次數
- 阻塞次數
- 範圍變更次數

## 完成條件

- ✅ 所有 story 最終狀態已整理
- ✅ 問題記錄已收集
- ✅ 時間線已建立
- ✅ 指標已統計

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-analyze.md`
