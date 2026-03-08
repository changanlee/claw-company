---
name: create-epics-and-stories
description: "將 PRD 拆解為 Epic 和用戶故事"
type: execution
agent: cto
sub-agent: scrum-master
phase: solutioning
approval: green
output-dir: output/planning/
---

# Epic 與用戶故事拆解工作流程

## 概述

Scrum Master 根據 PRD 與架構文件，將需求拆解為可執行的 Epic 和用戶故事，遵循 INVEST 原則確保故事品質。

## 前置條件

- PRD（必要）
- 架構文件（必要）

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-load.md | 載入 PRD 和架構文件 |
| 2 | steps/step-02-epics.md | 拆解為 Epic |
| 3 | steps/step-03-stories.md | 為每個 Epic 拆解 Story |
| 4 | steps/step-04-complete.md | 產出清單，回報 CTO |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-load.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| Epic/Story 清單 | 綠燈 | 回報 CTO |
