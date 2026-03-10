---
name: scan
description: "掃描各 Agent MEMORY.md 使用量（行數、更新頻率、最後更新時間）"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# 步驟 1：掃描使用量

**進度：步驟 1 / 共 3 步**

## 目標

掃描各 Agent MEMORY.md 的使用量指標。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 讀取各 Agent MEMORY.md

逐一讀取所有 Agent（含 CHRO 自己）的 MEMORY.md：

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-chro/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cao/MEMORY.md`

### 2. 收集使用量指標

每個 MEMORY.md 記錄以下：

- **行數**：目前使用行數（上限 200 行）
- **使用率**：行數 / 200
- **最後更新時間**：最近一次修改的日期
- **更新頻率**：過去 30 天內更新次數（從 memory/ 日誌推估）

### 3. 掃描 memory/ 目錄

檢查各 Agent 的 memory/ 目錄：

- 檔案總數
- 最舊檔案日期
- 最新檔案日期
- 總容量

### 4. 掃描 LanceDB 冷層統計

- 執行 `memory stats` 取得各 Agent 的冷層記憶數量
- 記錄最近寫入時間與總條目數
- 記錄 autoRecall 最近 30 天的觸發次數

### 5. 整理掃描結果

| Agent | MEMORY.md 行數 | 使用率 | 最後更新 | 月更新次數 | memory/ 檔案數 |
|-------|---------------|--------|---------|-----------|---------------|
| CEO | /200 | % | | | |
| CFO | /200 | % | | | |
| CIO | /200 | % | | | |
| COO | /200 | % | | | |
| CTO | /200 | % | | | |
| CHRO | /200 | % | | | |
| CAO | /200 | % | | | |

## 完成標準

- [ ] 所有 Agent MEMORY.md 已掃描
- [ ] memory/ 目錄已掃描
- [ ] LanceDB 冷層已掃描
- [ ] 掃描結果已整理為表格

## 下一步

👉 前往 [步驟 2：評估健康度](./step-02-evaluate.md)
