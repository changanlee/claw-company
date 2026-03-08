---
name: morning-briefing
description: "晨間簡報：收集高管狀態 → 匯整排序 → 格式化 → 推送董事長"
type: automatic
agent: ceo
sub-agent: null
approval: green
output-dir: output/briefings/
---

# CEO 晨間簡報流程

## 概述

CEO（Nova）於每日清晨自動收集各高管狀態摘要，匯整後以結構化格式推送給董事長，讓董事長快速掌握全局。

## 前置條件

- 晨間 cron 觸發（每日 06:30）
- `{{INSTALL_DIR}}/shared/company-rules.md`（報告格式規範）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 收集狀態 | sessions_send 各高管請求摘要 | — |
| 02 | 匯整排序 | 匯整回覆，按緊急度排序 | — |
| 03 | 格式化 | 使用 briefing template 格式化 | — |
| 04 | 推送 | 推送董事長 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-collect.md
```
