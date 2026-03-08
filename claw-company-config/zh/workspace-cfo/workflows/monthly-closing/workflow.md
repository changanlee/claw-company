---
name: monthly-closing
description: "月結：匯整記錄 → 分類統計 → 趨勢分析 → 月度摘要"
type: semi-automatic
agent: cfo
sub-agent: null
approval: green
output-dir: output/reports/
---

# CFO 月結流程

## 概述

CFO（Sage）於每月初匯整上月所有消費記錄，按分類統計並分析趨勢，產出月度財務摘要。

## 前置條件

- 上月所有消費記錄（memory/）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 匯整記錄 | 匯整本月所有消費記錄 | — |
| 02 | 分類統計 | 按分類統計，對比預算 | — |
| 03 | 趨勢分析 | 趨勢分析、異常標記 | — |
| 04 | 月度摘要 | 產出月度財務摘要 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-aggregate.md
```
