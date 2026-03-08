---
name: backup
description: "備份受影響 Agent 的 MEMORY.md 和近期 memory/ 日誌"
next-step: ./step-02-switch.md
output-file: null
template: null
---

# 步驟 1：備份

**進度：步驟 1 / 共 4 步**

## 目標

在模型切換前，完整備份受影響 Agent 的記憶和日誌。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 確認受影響 Agent

從 model-evaluation 提案中確認：

- 需要切換模型的 Agent 清單
- 當前模型 → 目標模型

### 2. 備份 MEMORY.md

對每個受影響 Agent：

- 讀取 `{{INSTALL_DIR}}/workspace-{agent}/MEMORY.md`
- 複製為 `{{INSTALL_DIR}}/workspace-{agent}/memory/backup-MEMORY-{日期}.md`

### 3. 備份近期日誌

對每個受影響 Agent：

- 列出 `{{INSTALL_DIR}}/workspace-{agent}/memory/` 目錄下的近期檔案
- 記錄檔案清單（作為回滾時的參照點）

### 4. 記錄備份清單

| Agent | MEMORY.md 備份路徑 | 日誌檔案數 | 備份時間 |
|-------|-------------------|-----------|---------|
| | | | |

### 5. 確認備份完整

- 驗證備份檔案可讀取
- 確認內容與原始檔案一致

## 完成標準

- [ ] 所有受影響 Agent 的 MEMORY.md 已備份
- [ ] 近期日誌清單已記錄
- [ ] 備份完整性已驗證

## 下一步

👉 前往 [步驟 2：切換模型](./step-02-switch.md)
