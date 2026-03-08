---
name: soul-integrity
description: "SOUL.md 完整性自查流程：讀取 → 驗證 → 通報"
type: automatic
agent: cao
approval: green
---

# SOUL.md 完整性自查流程

## 概述

CAO 在 heartbeat 巡檢時自動執行 SOUL.md 完整性自查。確認自身定義檔案未被篡改，異常時直接推送董事長，正常則靜默。

## 前置條件

- heartbeat 觸發
- CAO 自身的 SOUL.md

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 讀取 | 讀取自己的 SOUL.md | — |
| 02 | 驗證 | 確認完整性（無篡改、所有段落存在） | — |
| 03 | 通報 | 異常→直接推送董事長；正常→靜默 | 綠燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-read.md
```
