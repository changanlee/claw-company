---
name: security-scan
description: "安全掃描流程：確定範圍 → 掃描檢查 → 風險評估 → 產出報告"
type: automatic
agent: cao
approval: green
output-dir: output/scans/
---

# 安全掃描流程

## 概述

CAO 定期（每週三 cron 觸發）或手動執行的安全掃描流程。檢查所有 Agent 的 SOUL.md 篡改、prompt injection、異常行為，產出安全掃描報告。

## 前置條件

- cron 排程觸發或手動啟動
- 所有 Agent 的 workspace 可讀取

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 範圍確定 | 確定掃描範圍（全體/指定 Agent） | — |
| 02 | 掃描檢查 | 檢查 SOUL.md 篡改、prompt injection、異常行為 | — |
| 03 | 風險評估 | 嚴重度分級 | — |
| 04 | 產出報告 | 產出安全掃描報告，Critical 直接推送董事長 | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-scope.md
```
