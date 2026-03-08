---
name: weekly-report
description: "投資週報：匯整變化 → 績效分析 → 產出週報"
type: automatic
agent: cio
sub-agent: null
approval: green
output-dir: output/portfolios/
---

# CIO 投資週報流程

## 概述

CIO（Orion）每週匯整持倉變化和市場動態，分析績效並產出投資週報。

## 前置條件

- 本週持倉監控記錄（memory/）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 匯整變化 | 匯整本週持倉變化、市場動態 | — |
| 02 | 績效分析 | 績效分析、與大盤對比 | — |
| 03 | 產出週報 | 投資週報 + 機會觀察 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-compile.md
```
