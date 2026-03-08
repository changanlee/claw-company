---
name: notify
description: "通知：sessions_send 通知責任 Agent 和 CEO"
next-step: ./step-03-track.md
output-file: null
template: null
---

# 步驟 2：通知

**進度：步驟 2 / 共 5 步**

## 目標

透過 sessions_send 通知責任 Agent 和 CEO，確保相關方知悉問題並開始處理。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 通知責任 Agent

使用 `sessions_send` 向責任 Agent 發送通知：

> 「[Agent 名稱]，稽核議題通知：
> - 議題 ID：[AUD-YYYY-NNN]
> - 嚴重度：[等級]
> - 問題描述：[描述]
> - 修正期限：[日期]
> 請在期限內完成修正並回報。」

### 2. 通知 CEO

使用 `sessions_send` 向 CEO 發送通知：

> 「CEO，新稽核議題 [AUD-YYYY-NNN]（[嚴重度]）：
> - 問題：[描述]
> - 責任 Agent：[名稱]
> - 期限：[日期]」

### 3. Critical 特殊處理

若嚴重度為 Critical：
- 透過 CAO 獨立通道直接推送董事長
- 在通知中標明「立即處理」

### 4. 記錄通知

記錄通知發送時間和接收方，更新 issues.md 中的議題狀態為「Notified」。

## 完成標準

- [ ] 已通知責任 Agent
- [ ] 已通知 CEO
- [ ] Critical 已推送董事長（如適用）
- [ ] 已更新議題狀態

## 下一步

👉 前往 [步驟 3：追蹤](./step-03-track.md)
