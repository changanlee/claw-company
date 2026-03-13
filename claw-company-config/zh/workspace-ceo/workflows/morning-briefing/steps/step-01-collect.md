---
name: collect
description: "讀取各高管 MEMORY.md 及 output/ 收集狀態"
next-step: ./step-02-compile.md
output-file: null
template: null
---

# 步驟 1：收集狀態

**進度：步驟 1 / 共 4 步**

## 目標

讀取各高管的 MEMORY.md 和近期 output/ 檔案，收集最新狀態資訊。

> **注意**：此流程由 cron 觸發。使用 exec dispatch 分派（write 寫檔 → bash {{INSTALL_DIR}}/shared/dispatch.sh）。Cron 環境下 exec 可用。此流程直接讀取各高管的檔案收集資訊。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步
- 直接讀取檔案收集資訊（如需跨 Agent 通訊可用 exec dispatch）

## 執行指令

### 1. 讀取各高管狀態

依序讀取以下檔案，提取各高管的最新狀態：

| 高管 | 讀取來源 | 提取內容 |
|------|---------|---------|
| CFO | MEMORY.md + output/reports/ 最新檔案 | 支出摘要、預算使用率、異常項目 |
| CIO | MEMORY.md + output/alerts/ 最新檔案 | 持倉變化、市場警報、投資機會 |
| COO | MEMORY.md | 今日行程、天氣概況、待辦提醒 |
| CTO | MEMORY.md | 開發進度、阻塞項目、技術議題 |
| CHRO | MEMORY.md + output/reports/ 最新檔案 | Agent 狀態、政策待辦、組織議題 |
| CAO | MEMORY.md + output/scans/ 最新檔案 | 安全狀態、未結稽核議題、合規警報 |

**路徑格式**：`{{INSTALL_DIR}}/workspace-{角色}/MEMORY.md` 和 `{{INSTALL_DIR}}/workspace-{角色}/output/`

### 2. 記錄收集結果

- 記錄成功讀取和無資料的高管。
- 若某高管 output/ 為空，改用 MEMORY.md 中的資訊。

## 完成標準

- [ ] 已讀取所有高管的 MEMORY.md
- [ ] 已檢查各高管的 output/ 最新檔案
- [ ] 已整理收集到的狀態資訊

## 下一步

👉 前往 [步驟 2：匯整排序](./step-02-compile.md)
