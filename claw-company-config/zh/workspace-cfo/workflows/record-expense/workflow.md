---
name: record-expense
description: "消費記錄：解析消費資訊 → 結構化記錄 → 異常檢查"
type: execution
agent: cfo
sub-agent: null
approval: green
output-dir: output/expenses/
---

# CFO 消費記錄流程

## 概述

CFO（Sage）收到消費資訊後，解析並結構化記錄到 memory/ 日誌，同時檢查是否有異常支出。

## 前置條件

- CEO 轉達的消費資訊

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 解析消費 | 解析日期、金額、分類、備註 | — |
| 02 | 記錄 | 結構化記錄到 memory/ | — |
| 03 | 檢查 | 檢查異常，必要時觸發 budget-alert | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-parse.md
```
