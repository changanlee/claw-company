---
name: investment-analysis
description: "投資分析：確認標的 → 收集數據 → 分析 → 產出建議"
type: interactive
agent: cio
sub-agent: null
approval: yellow
output-dir: output/analysis/
---

# CIO 投資分析流程

## 概述

CIO（Orion）對指定投資標的進行全面分析，從基本面、技術面和市場情緒等角度評估，產出投資建議。

## 前置條件

- CEO 轉達的投資分析請求

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 確認標的 | 確認分析標的 | — |
| 02 | 收集數據 | 收集基本面、技術面、情緒數據 | — |
| 03 | 分析 | SWOT、估值、風險評估 | — |
| 04 | 產出建議 | 買/賣/持建議附信心水準 | 黃燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-target.md
```
