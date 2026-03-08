---
name: predictive-management
description: "預測式生活管理流程：分析模式 → 產生預測 → 整合推送（v2.0）"
type: automatic
agent: coo
approval: green
version: "2.0"
---

# 預測式生活管理流程（v2.0）

## 概述

COO 從「反應式助理」進化為「預測式管家」。分析近 7 天的 memory/ 日誌，找出可預測模式，產生主動提醒並整合到晨間簡報或即時推送。

## 前置條件

- memory/ 中至少 7 天的日誌數據
- heartbeat 或 cron 觸發

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 模式分析 | 分析近 7 天 memory/ 日誌，找可預測模式 | — |
| 02 | 預測生成 | 產生預測提醒 | — |
| 03 | 整合推送 | 整合到晨間簡報或即時推送 | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-analyze.md
```
