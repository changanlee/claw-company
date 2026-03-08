---
name: emergency-brake
description: "緊急煞車流程：偵測異常 → 凍結 → 上報（CAO 獨立權限）"
type: automatic
agent: cao
approval: green
---

# 緊急煞車流程

## 概述

CAO 偵測到 Token 消耗異常或異常 spawn 行為時，立即採取凍結行動並上報。此為 CAO 獨立權限，無需事先核決。

## 前置條件

- Token 消耗異常觸發或 heartbeat 偵測
- issues.md（記錄異常事件）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 異常偵測 | 偵測異常（單Agent日消耗>月預算10%、全公司>5%、異常spawn） | — |
| 02 | 凍結 | 立即凍結可疑 Agent spawn 權限，記錄 issues.md | 綠燈（CAO 獨立權限） |
| 03 | 上報 | sessions_send CEO；30分鐘無回應→直接推送董事長 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-detect.md
```
