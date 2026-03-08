---
name: test-review
description: "審查現有測試的覆蓋率與品質"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 測試品質審查

## 概述

QA 工程師掃描現有測試代碼，評估覆蓋率與品質，產出改善建議報告。

## 前置條件

- 現有測試代碼庫
- CTO spawn 時提供專案路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-scan.md | 掃描現有測試代碼，統計覆蓋率 |
| 2 | steps/step-02-evaluate.md | 評估測試品質 |
| 3 | steps/step-03-report.md | 產出測試品質報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-scan.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 測試品質報告 | 綠燈 | QA 自行完成，回報 CTO |
