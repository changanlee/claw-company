---
name: scan
description: "掃描各 Agent MEMORY.md 和近期活動"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# 步驟 1：掃描活動

**進度：步驟 1 / 共 3 步**

## 目標

掃描各 Agent 的 MEMORY.md 和近期活動紀錄，收集組織健康原始數據。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 掃描各 Agent MEMORY.md

逐一讀取所有 Agent 的 MEMORY.md：

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cao/MEMORY.md`

摘錄：
- 本週新增/更新的條目
- 記憶使用量（行數 / 200 行上限）
- 最後更新時間

### 2. 掃描近期活動

檢查各 Agent 的 memory/ 目錄，收集本週活動：

- 處理的任務數量與類型
- 跨部門協調紀錄（`sessions_send` 對象與頻率）
- 異常事件或升級紀錄

### 3. 整理原始數據

| Agent | 記憶用量 | 本週任務數 | 跨部門協調次數 | 異常事件 |
|-------|---------|-----------|-------------|---------|
| CEO | /200 | | | |
| CFO | /200 | | | |
| CIO | /200 | | | |
| COO | /200 | | | |
| CTO | /200 | | | |
| CAO | /200 | | | |

## 完成標準

- [ ] 所有 Agent MEMORY.md 已掃描
- [ ] 近期活動已收集
- [ ] 原始數據已整理為表格

## 下一步

👉 前往 [步驟 2：分析指標](./step-02-analyze.md)
