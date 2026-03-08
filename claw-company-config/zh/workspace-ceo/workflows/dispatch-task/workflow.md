---
name: dispatch-task
description: "任務分派：分析董事長指令 → 路由對象 → 發送追蹤"
type: interactive
agent: ceo
sub-agent: null
approval: green
---

# CEO 任務分派流程

## 概述

CEO（Nova）收到董事長指令後，分析指令類型與急迫度，根據分派原則路由至對應高管，並建立追蹤記錄。

## 前置條件

- 董事長的指令或需求
- `{{INSTALL_DIR}}/shared/company-rules.md`（分派原則）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 分析指令 | 解析類型、急迫度、涉及部門 | — |
| 02 | 路由對象 | 根據分派原則選擇對象 | — |
| 03 | 發送追蹤 | 組合指令並記錄 | — |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-analyze.md
```
