---
name: step-01-collect
description: "讀取 sprint-status，收集各 story 狀態"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# 步驟 1：收集狀態資料

**進度：步驟 1 / 共 3 步** — 下一步：分析進度與風險

## 目標

讀取 sprint-status 文件，收集所有 story 的當前狀態。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入 Sprint Status

讀取 CTO 提供的 sprint-status 文件。

### 2. 收集 Story 狀態

逐一記錄每個 story 的當前狀態：

| 狀態 | 說明 |
|------|------|
| `backlog` | 尚未開始 |
| `ready` | Story file 已建立，可開發 |
| `in-progress` | 開發中 |
| `review` | 等待審查 |
| `done` | 已完成 |

### 3. 收集補充資訊

如有可用的 story file，讀取補充資訊：

- 任務完成比例（已標記 `[x]` / 總任務數）
- 開發備註中的問題記錄
- 阻塞事項

### 4. 建立狀態快照

整理所有收集的資料，建立當前時間點的狀態快照。

## 完成條件

- ✅ Sprint status 已載入
- ✅ 所有 story 狀態已收集
- ✅ 補充資訊已收集（如有）
- ✅ 狀態快照已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-analyze.md`
