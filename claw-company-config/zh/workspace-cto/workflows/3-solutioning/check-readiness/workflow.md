---
name: check-readiness
description: "檢查需求文件是否準備好進入開發"
type: execution
agent: cto
sub-agent: pm
phase: solutioning
approval: green
output-dir: output/planning/
---

# 開發就緒性檢查工作流程

## 概述

PM 工程師檢查所有需求文件是否完整，評估是否準備好進入開發階段。逐項驗證 PRD、UX 設計、架構文件與 Epic/Story 的完整性。

## 前置條件

- PRD（必要）
- UX 設計文件（必要）
- 架構文件（必要）
- Epic/Story 清單（必要）

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-collect.md | 收集所有必要文件 |
| 2 | steps/step-02-validate.md | 逐項驗證完整性 |
| 3 | steps/step-03-report.md | 產出就緒性報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-collect.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 就緒性報告 | 綠燈 | 回報 CTO |
