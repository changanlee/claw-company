---
name: code-review
description: "代碼審查流程"
type: execution
agent: cto
sub-agent: code-reviewer
phase: implementation
approval: green
output-dir: output/implementation/
---

# 代碼審查

## 概述

Code Reviewer 收集審查資料，逐項審查代碼變更（架構、邏輯、測試、風格、安全），產出審查報告並判定通過或不通過。

## 前置條件

- 已完成開發的 story（狀態為 `review`）
- CTO spawn 時提供 story file 路徑和變更檔案資訊
- 審查報告模板：`../../templates/code-review-report.md`

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-prepare.md | 收集審查資料 |
| 2 | steps/step-02-review.md | 逐項審查 |
| 3 | steps/step-03-report.md | 產出審查報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-prepare.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 審查報告 | 綠燈 | Code Reviewer 自行完成，回報 CTO |
