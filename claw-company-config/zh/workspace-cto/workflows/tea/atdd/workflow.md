---
name: atdd
description: "驗收測試驅動開發：生成失敗的驗收測試"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 驗收測試驅動開發

## 概述

QA 工程師根據 story 驗收標準（Given/When/Then），生成預期失敗的驗收測試代碼，交由開發工程師實作通過。

## 前置條件

- Story file（含驗收標準，Given/When/Then 格式）
- CTO spawn 時提供 story file 路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-parse.md | 載入 story 驗收標準 |
| 2 | steps/step-02-generate.md | 生成驗收測試代碼 |
| 3 | steps/step-03-verify.md | 運行測試確認全部失敗 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-parse.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 驗收測試代碼 | 綠燈 | QA 自行完成，回報 CTO |
