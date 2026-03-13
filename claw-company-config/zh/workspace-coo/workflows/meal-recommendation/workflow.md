---
name: meal-recommendation
description: "飲食推薦流程：確認情境 → 查歷史 → 確認預算 → 產出推薦"
type: interactive
agent: coo
approval: green
output-dir: output/meals/
---

# 飲食推薦流程

## 概述

COO 在用餐時段或董事長詢問時，綜合時段、位置、天氣、歷史用餐記錄與預算，產出 2-3 個飲食推薦選項。

## 前置條件

- 董事長的飲食偏好（記錄在 MEMORY.md）
- `memory/` 近 3 天用餐日誌
- CFO 可回覆餐飲預算查詢

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 情境確認 | 確認時段、位置、天氣 | — |
| 02 | 歷史查詢 | 查 memory/ 近 3 天用餐記錄避免重複 | — |
| 03 | 預算確認 | exec dispatch CFO 確認餐飲預算 | — |
| 04 | 產出推薦 | 產出 2-3 個推薦（附理由和預估花費） | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-context.md
```
