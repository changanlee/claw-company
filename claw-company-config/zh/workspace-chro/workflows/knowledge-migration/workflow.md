---
name: knowledge-migration
description: "知識遷移：備份 → 切換模型 → 適應期測試 → 評估結果"
type: execution
agent: chro
sub-agent: null
approval: yellow
---

# CHRO 知識遷移流程

## 概述

CHRO（Harper）在模型切換時執行知識遷移，包含備份、切換、適應期測試和結果評估。確保模型切換後 Agent 的知識和行為品質不受損。

## 前置條件

- model-evaluation 流程已通過核決
- 確認要切換的 Agent 和目標模型
- CFO 已確認成本預算

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 備份 | 備份受影響 Agent 的 MEMORY.md 和日誌 | — |
| 02 | 切換 | 切換模型，載入 workspace | — |
| 03 | 測試 | 適應期測試（歷史任務測試） | — |
| 04 | 評估 | 評估結果，確認或回滾 | 黃燈（CEO） |

## 核決閘門

| 決策項目 | 燈號 | 處理方式 |
|---------|------|---------|
| 確認切換完成 | 黃燈 | 送 CEO 確認 |
| 回滾決定 | 黃燈 | 送 CEO 確認 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-backup.md
```
