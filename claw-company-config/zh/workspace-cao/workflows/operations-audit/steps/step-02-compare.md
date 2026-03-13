---
name: compare
description: "交叉比對：session 數量 vs 記錄筆數，偵測記錄缺失"
next-step: ./step-03-review.md
output-file: null
template: null
---

# 步驟 2：交叉比對

**進度：步驟 2 / 共 5 步**

## 目標

比對各 Agent 的 session 數量與 MEMORY.md/output/ 記錄筆數，偵測可能的記錄缺失。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 統計 session 數量

列出各 Agent 的 sessions/ 目錄（若可存取），統計近一週的 session 數量。

### 2. 比對

對每個 Agent，比較：

| Agent | Session 數 | 記錄筆數 | 差距 | 紅旗？ |
|-------|-----------|---------|------|--------|

**紅旗條件**：session 數量顯著大於記錄筆數（差距 > 50%），表示有操作未被記錄。

### 3. 記錄發現

將紅旗 Agent 列入稽核關注清單，供後續步驟深入審查。

## 完成標準

- [ ] 已統計所有 Agent session 數量
- [ ] 已完成比對
- [ ] 已標記紅旗 Agent

## 下一步

👉 前往 [步驟 3：燈號覆核](./step-03-review.md)
