---
name: portfolio-monitor
description: "持倉監控：查詢價格 → 評估警報 → 通知或靜默"
type: automatic
agent: cio
sub-agent: null
approval: green
output-dir: output/portfolios/
---

# CIO 持倉監控流程

## 概述

CIO（Orion）查詢持倉標的當前價格，與買入價和前次檢查比較，判斷是否觸發三級警報。

## 前置條件

- 持倉資料（memory/）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 查詢價格 | 查詢持倉標的當前價格 | — |
| 02 | 評估警報 | 與買入價/前次比較，判斷三級警報 | — |
| 03 | 通知 | 有警報則通知 CEO；無異常則靜默 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-check.md
```
