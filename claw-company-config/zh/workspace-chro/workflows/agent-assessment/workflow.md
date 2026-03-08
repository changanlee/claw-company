---
name: agent-assessment
description: "Agent 能力評估：收集數據 → 評估適配度 → 識別缺口 → 產出報告"
type: semi-automatic
agent: chro
sub-agent: null
approval: green
output-dir: output/assessments/
---

# CHRO Agent 能力評估流程

## 概述

CHRO（Harper）收集各 Agent 的 MEMORY.md 摘要和近期表現數據，評估能力適配度與任務完成率，識別能力缺口並提出改善建議，最終產出評估報告。

## 前置條件

- 各 Agent 的 MEMORY.md
- 近期任務完成紀錄
- 各 Agent 的模型配置（smart / fast）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 收集數據 | 收集各 Agent MEMORY.md 摘要和近期表現數據 | — |
| 02 | 評估適配度 | 評估能力適配度、任務完成率、模型匹配度 | — |
| 03 | 識別缺口 | 識別能力缺口，提出改善建議 | — |
| 04 | 產出報告 | 產出 Agent 能力評估報告 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-collect.md
```
