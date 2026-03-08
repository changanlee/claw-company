---
name: document-project
description: "撰寫或更新專案技術文件"
type: execution
agent: cto
sub-agent: tech-writer
phase: operations
approval: green
output-dir: output/implementation/
---

# 專案文件撰寫

## 概述

Tech Writer 分析代碼庫和現有文件，識別文件缺口，按優先順序撰寫技術文件，並驗證文件的準確性。

## 前置條件

- CTO spawn 時提供專案路徑和文件需求
- 可存取專案代碼庫

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-analyze.md | 分析代碼庫和現有文件 |
| 2 | steps/step-02-write.md | 撰寫文件 |
| 3 | steps/step-03-verify.md | 驗證文件準確性 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-analyze.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 技術文件 | 綠燈 | Tech Writer 自行完成，回報 CTO |
