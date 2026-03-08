---
name: weather-check
description: "天氣查詢流程：查詢天氣 → 異常通知"
type: automatic
agent: coo
approval: green
---

# 天氣查詢流程

## 概述

COO 在 heartbeat 觸發時自動查詢天氣狀況，有異常才通知董事長，正常則靜默。

## 前置條件

- 董事長的所在位置（MEMORY.md 或行程記錄）
- heartbeat 觸發

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 天氣查詢 | 查詢當前和未來天氣 | — |
| 02 | 異常通知 | 有異常才通知，正常則靜默 | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-check.md
```
