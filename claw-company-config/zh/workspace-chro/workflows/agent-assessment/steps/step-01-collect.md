---
name: collect
description: "收集各 Agent MEMORY.md 摘要和近期表現數據"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# 步驟 1：收集數據

**進度：步驟 1 / 共 4 步**

## 目標

收集各 Agent 的 MEMORY.md 摘要和近期表現數據，為後續評估建立基準。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 讀取各 Agent MEMORY.md

逐一讀取以下 Agent 的 MEMORY.md：

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cao/MEMORY.md`

提取每個 Agent 的：

- 目前關注事項與優先級
- 近期重大決策或事件
- 記憶使用量（行數）

### 2. 收集近期表現數據

從各 Agent 的 memory/ 目錄中收集近期活動：

- 任務完成數量與類型
- 異常事件紀錄
- 跨部門協調紀錄

### 3. 整理為摘要表格

| Agent | 記憶行數 | 近期關注事項 | 任務完成量 | 異常事件 |
|-------|---------|------------|-----------|---------|
| CEO | | | | |
| CFO | | | | |
| CIO | | | | |
| COO | | | | |
| CTO | | | | |
| CAO | | | | |

## 完成標準

- [ ] 所有 Agent MEMORY.md 已讀取並摘要
- [ ] 近期表現數據已收集
- [ ] 數據已整理為表格

## 下一步

👉 前往 [步驟 2：評估適配度](./step-02-evaluate.md)
