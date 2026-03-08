---
name: memory-audit
description: "記憶健康審計：掃描使用量 → 評估健康度 → 產出建議"
type: automatic
agent: chro
sub-agent: null
approval: green
---

# CHRO 記憶健康審計流程

## 概述

CHRO（Harper）掃描各 Agent MEMORY.md 的使用量與健康度，評估過期條目、容量使用率和結構清晰度，產出記憶健康報告與清理建議。由 cron 排程 `memory-cleanup`（每月 1 日 03:00）自動觸發。

## 前置條件

- 各 Agent MEMORY.md 可讀取
- 各 Agent memory/ 目錄可掃描

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 掃描使用量 | 掃描各 Agent MEMORY.md 使用量 | — |
| 02 | 評估健康度 | 評估過期條目、容量、結構 | — |
| 03 | 產出建議 | 產出記憶健康報告與清理建議 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-scan.md
```
