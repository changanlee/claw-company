---
name: compliance-check
description: "合規檢查流程：載入草案 → 逐項驗證 → 標記問題 → 產出報告"
type: semi-automatic
agent: cao
approval: green
---

# 合規檢查流程

## 概述

CAO 審查 CHRO 草擬的政策草案或其他待審查文件，逐項驗證是否與 company-rules.md 合規，產出合規審查報告。

## 前置條件

- 待審查的政策草案（由 CHRO 或其他 Agent 提交）
- `{{INSTALL_DIR}}/shared/company-rules.md`（合規基準）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 載入草案 | 載入待審查的政策草案 | — |
| 02 | 逐項驗證 | 逐項驗證合規性（與 company-rules.md 對照） | — |
| 03 | 標記問題 | 標記問題（合規/需修改/違規） | — |
| 04 | 產出報告 | 產出合規審查報告 | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-load.md
```
