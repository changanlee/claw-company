---
name: operations-audit
description: "操作稽核：讀取全 Agent 記錄 → 交叉比對 → 燈號覆核 → 通道審計 → 產出報告"
type: automatic
agent: cao
sub-agent: null
approval: green
---

# CAO 操作稽核流程

## 概述

CAO 定期審閱所有 Agent 的操作記錄，交叉比對 session 數量與記錄筆數，覆核燈號判斷正確性，審計獨立通道操作是否有完整記錄與 CEO 知會。

## 前置條件

- 各 Agent MEMORY.md 可讀取
- 各 Agent output/ 目錄可讀取
- 通道治理政策：`{{INSTALL_DIR}}/shared/policies/channel-governance.md`

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 收集記錄 | 讀取所有 Agent 的 MEMORY.md 和 output/ | — |
| 02 | 交叉比對 | session 數量 vs 記錄筆數，偵測缺失 | — |
| 03 | 燈號覆核 | 覆核記錄中的操作燈號是否正確 | — |
| 04 | 通道審計 | 審計獨立通道操作的記錄完整性 | — |
| 05 | 產出報告 | 產出稽核報告，dispatch CEO | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-collect.md
```
