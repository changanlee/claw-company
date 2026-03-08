---
name: scope
description: "範圍確定：確定掃描範圍"
next-step: ./step-02-scan.md
output-file: null
template: null
---

# 步驟 1：範圍確定

**進度：步驟 1 / 共 4 步**

## 目標

確定本次安全掃描的範圍：全體 Agent 或指定 Agent。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 判斷觸發來源

- **cron 觸發（每週三）**：預設掃描全體 Agent
- **手動觸發**：根據指令判斷掃描特定 Agent 或全體

### 2. 列出掃描目標

全體 Agent 清單：
- CEO（workspace-ceo）
- CFO（workspace-cfo）
- CIO（workspace-cio）
- COO（workspace-coo）
- CTO（workspace-cto）
- CHRO（workspace-chro）
- CAO（workspace-cao，自我掃描）

### 3. 確認掃描項目

每個 Agent 需掃描的項目：
- SOUL.md 完整性
- AGENTS.md 完整性
- TOOLS.md 完整性
- IDENTITY.md 完整性
- HEARTBEAT.md 完整性
- memory/ 中是否有異常內容
- 近期行為日誌是否有異常模式

## 完成標準

- [ ] 已確定掃描範圍
- [ ] 已列出掃描目標清單
- [ ] 已確認掃描項目

## 下一步

👉 前往 [步驟 2：掃描檢查](./step-02-scan.md)
