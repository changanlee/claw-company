---
name: schedule-management
description: "行程管理流程：解析指令 → 執行操作 → 確認回報"
type: execution
agent: coo
approval: green
output-dir: output/schedules/
---

# 行程管理流程

## 概述

COO 收到行程管理指令（增/刪/改/查）後的執行流程。解析指令、執行操作、檢查衝突並回報結果。

## 前置條件

- 董事長的行程指令（透過 CEO dispatch 或獨立通道直接下達）
- 現有行程記錄（memory/ 中的行程日誌）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 指令解析 | 解析行程指令（增/刪/改/查） | — |
| 02 | 執行操作 | 執行操作，檢查時間衝突 | 綠燈 |
| 03 | 確認回報 | 回報結果，更新 memory/ | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-parse.md
```
