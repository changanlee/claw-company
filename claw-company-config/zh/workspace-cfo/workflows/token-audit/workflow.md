---
name: token-audit
description: "Token 審計：收集消耗 → 分析對比 → 預算計算 → 產出報表"
type: automatic
agent: cfo
sub-agent: null
approval: green
output-dir: output/reports/
---

# CFO Token 審計流程

## 概述

CFO（Sage）收集各 Agent 的 Token 消耗數據，與歷史對比分析，產出「API 薪資報表」。

## 前置條件

- 各 Agent Token 消耗數據

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 收集數據 | 收集各 Agent 本週 Token 消耗 | — |
| 02 | 分析對比 | 與上週對比，標記異常 | — |
| 03 | 預算計算 | 月累計 vs 月預算 | — |
| 04 | 產出報表 | API 薪資報表 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-collect.md
```
