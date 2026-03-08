---
name: budget-alert
description: "預算警報：偵測異常 → 分析原因 → 通知 CEO"
type: automatic
agent: cfo
sub-agent: null
approval: green
---

# CFO 預算警報流程

## 概述

CFO（Sage）偵測到異常支出時自動觸發，分析原因後通知 CEO。

## 前置條件

- 由 record-expense 或 heartbeat 觸發

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 偵測 | 偵測異常支出（超日均2倍） | — |
| 02 | 分析 | 分析原因和影響 | — |
| 03 | 通知 | sessions_send 通知 CEO | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-detect.md
```
