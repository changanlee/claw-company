---
name: channel
description: "通道審計：審計獨立通道操作的記錄完整性與 CEO 知會"
next-step: ./step-05-report.md
output-file: null
template: null
---

# 步驟 4：通道審計

**進度：步驟 4 / 共 5 步**

## 目標

審計有獨立通道的 Agent（CTO、COO、CAO）的操作記錄完整性，確認是否遵循核決流程與 CEO 知會機制。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 讀取通道治理政策

讀取 `{{INSTALL_DIR}}/shared/policies/channel-governance.md`，確認有通道 Agent 的核決流程。

### 2. 檢查記錄完整性

對 CTO 和 COO 的 MEMORY.md 和 output/，逐項檢查：

- [ ] 所有操作是否有記錄（綠燈寫 MEMORY.md、紅燈有知會記錄）
- [ ] 任務來源是否有標記（`[來源: CEO dispatch]` / `[來源: 董事長直接]` / `[來源: cron]`）
- [ ] 董事長直接指派的紅燈操作是否有 dispatch CEO 知會

### 3. 檢查 CEO 知會接收

讀取 CEO 的 MEMORY.md，確認是否有對應的 `[董事長直接指派 — 紅燈知會]` 記錄。

若 CTO/COO 有紅燈知會但 CEO 無對應記錄 → 紅旗（知會未送達或 CEO 未歸檔）。

### 4. 記錄發現

| Agent | 檢查項 | 結果 | 備註 |
|-------|--------|------|------|

## 完成標準

- [ ] 已檢查所有有通道 Agent 的記錄完整性
- [ ] 已交叉比對 CEO 知會記錄
- [ ] 已記錄所有發現

## 下一步

👉 前往 [步驟 5：產出報告](./step-05-report.md)
