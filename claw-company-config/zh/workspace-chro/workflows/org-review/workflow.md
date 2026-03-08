---
name: org-review
description: "組織健康週報：掃描活動 → 分析指標 → 產出週報"
type: automatic
agent: chro
sub-agent: null
approval: green
---

# CHRO 組織健康週報流程

## 概述

CHRO（Harper）每週掃描各 Agent 的 MEMORY.md 和近期活動，分析組織健康指標，產出組織健康週報。由 cron 排程 `weekly-org-review`（週一 08:00）自動觸發。

## 前置條件

- 各 Agent MEMORY.md 可讀取
- 各 Agent memory/ 目錄近期日誌

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 掃描活動 | 掃描各 Agent MEMORY.md 和近期活動 | — |
| 02 | 分析指標 | 分析負載均衡、協調頻率、能力缺口 | — |
| 03 | 產出週報 | 產出組織健康週報 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-scan.md
```
