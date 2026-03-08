---
name: automate
description: "擴展測試自動化覆蓋"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 測試自動化擴展

## 概述

QA 工程師分析現有自動化覆蓋缺口，按風險優先級編寫自動化測試腳本，提升測試自動化覆蓋率。

## 前置條件

- 現有測試代碼庫
- 測試策略文件（如有）
- CTO spawn 時提供專案路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-assess.md | 分析現有自動化覆蓋，識別缺口 |
| 2 | steps/step-02-implement.md | 編寫自動化測試腳本 |
| 3 | steps/step-03-summary.md | 產出自動化摘要 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-assess.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 自動化測試腳本 | 綠燈 | QA 自行完成，回報 CTO |
