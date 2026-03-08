---
name: collect
description: "收集各 Agent 本週 Token 消耗數據"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# 步驟 1：收集數據

**進度：步驟 1 / 共 4 步**

## 目標

收集各 Agent 本週的 Token 消耗數據。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 收集消耗數據

從系統日誌中收集每個 Agent 的：

- 總 Token 使用量（輸入 + 輸出）
- 按日拆分的使用量
- 使用的模型（smart / fast）

### 2. 整理為表格

| Agent | 輸入 Token | 輸出 Token | 總計 | 模型 | 預估成本 |
|-------|-----------|-----------|------|------|---------|
| CEO | | | | | |
| CFO | | | | | |
| ... | | | | | |

## 完成標準

- [ ] 所有 Agent 數據已收集
- [ ] 數據已整理為表格

## 下一步

👉 前往 [步驟 2：分析對比](./step-02-analyze.md)
