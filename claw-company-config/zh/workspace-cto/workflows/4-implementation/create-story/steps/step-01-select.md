---
name: step-01-select
description: "從 sprint-status 選擇下一個 backlog story"
next-step: ./step-02-write.md
output-file: null
template: null
---

# 步驟 1：選擇 Story

**進度：步驟 1 / 共 3 步** — 下一步：撰寫完整 story file

## 目標

從 sprint-status 中選擇下一個應該建立的 backlog story。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入 Sprint Status

讀取 CTO 提供的 sprint-status 文件路徑，載入當前 Sprint 狀態。

### 2. 識別可建立的 Story

篩選狀態為 `backlog` 且尚未有 story file 的 Story：

- 檢查是否已存在對應的 story file
- 排除已有 story file 的項目

### 3. 選擇目標 Story

如果 CTO 指定了特定 story，直接選擇該 story。否則按以下優先級選擇：

- 被其他 story 依賴的（優先解除阻塞）
- 優先級最高的
- 無依賴或依賴已完成的

### 4. 載入 Epic 上下文

讀取該 Story 所屬的 Epic 文件，獲取：

- Story 在 Epic 中的原始描述
- 架構設計相關資訊
- 與其他 Story 的關聯

## 完成條件

- ✅ Sprint status 已載入
- ✅ 目標 story 已選定
- ✅ Epic 上下文已載入

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-write.md`
