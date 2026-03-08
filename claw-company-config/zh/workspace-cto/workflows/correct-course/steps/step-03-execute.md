---
name: step-03-execute
description: "執行變更"
next-step: null
output-file: null
template: null
---

# 步驟 3：執行變更

**進度：步驟 3 / 共 3 步** — 最後一步

## 目標

按照已批准的修正方案執行變更，更新所有相關文件，通知相關 Agent。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 更新 Sprint Status

按照修正方案更新 sprint-status 文件：

- 新增的 story 加入清單
- 移除的 story 標記為 `cancelled`
- 修改的 story 更新描述
- 重新排序的 story 調整順序

### 2. 更新 Story Files

- 需要修改的 story file：更新驗收標準和任務清單
- 需要移除的 story file：標記為 `cancelled`，保留記錄
- 新增的 story：排入建立佇列

### 3. 通知相關 Agent

透過 `sessions_send` 通知：

- 正在開發受影響 story 的工程師：暫停/調整指令
- CEO：航向修正已執行的確認
- 受影響的其他 Agent（如有）

### 4. 記錄決策

在 CTO MEMORY.md 記錄：

- 航向修正的原因
- 變更內容摘要
- 學到的教訓（避免未來重複）

## 完成條件

- ✅ Sprint status 已更新
- ✅ 受影響的 story file 已更新
- ✅ 相關 Agent 已通知
- ✅ 決策已記錄

## 下一步

此為最後一步。航向修正已完成，Sprint 繼續執行。
