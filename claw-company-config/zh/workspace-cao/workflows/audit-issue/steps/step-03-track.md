---
name: track
description: "追蹤：追蹤修正進度"
next-step: ./step-04-verify.md
output-file: null
template: null
---

# 步驟 3：追蹤

**進度：步驟 3 / 共 5 步**

## 目標

持續追蹤責任 Agent 的修正進度，確保在期限內完成。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 定期檢查

在 heartbeat 巡檢時檢查 issues.md 中所有 Open/Notified 狀態的議題：
- 檢查是否已過修正期限
- 檢查責任 Agent 是否有回報進度

### 2. 進度催促

若議題接近期限（剩餘 25% 時間）且無進度回報：

使用 `sessions_send` 催促責任 Agent：

> 「[Agent 名稱]，稽核議題 [AUD-YYYY-NNN] 修正期限將至（[剩餘時間]），請回報進度。」

### 3. 逾期處理

若議題已過修正期限：
- 更新 issues.md 狀態為「Overdue」
- 通知 CEO 議題逾期
- Critical/High 逾期 → 直接推送董事長

### 4. 進度記錄

收到責任 Agent 回報時：
- 記錄修正進度到 issues.md
- 若責任 Agent 回報已修正 → 進入驗證步驟

## 完成標準

- [ ] 已確認議題修正進度
- [ ] 逾期議題已催促/上報（如適用）
- [ ] 責任 Agent 回報已修正 → 進入驗證

## 下一步

👉 前往 [步驟 4：驗證](./step-04-verify.md)
