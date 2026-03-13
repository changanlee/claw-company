---
name: collect
description: "收集記錄：讀取所有 Agent 的 MEMORY.md 和近期 output/"
next-step: ./step-02-compare.md
output-file: null
template: null
---

# 步驟 1：收集記錄

**進度：步驟 1 / 共 5 步**

## 目標

讀取所有 Agent 的 MEMORY.md 和 output/ 目錄中的近一週產出，建立審計基礎數據。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 讀取各 Agent MEMORY.md

逐一讀取以下路徑（掃描摘要，不需逐字記錄）：

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-chro/MEMORY.md`

### 2. 掃描各 Agent output/

列出各 Agent `output/` 目錄下近一週的檔案，記錄檔案名稱與日期。

### 3. 記錄基礎數據

彙整每個 Agent 的：
- MEMORY.md 近期記錄筆數
- output/ 近一週產出數量
- 最後活動時間

## 完成標準

- [ ] 已讀取所有 Agent 的 MEMORY.md
- [ ] 已掃描所有 Agent 的 output/
- [ ] 已記錄基礎數據

## 下一步

👉 前往 [步驟 2：交叉比對](./step-02-compare.md)
