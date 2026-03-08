---
name: create-product-brief
description: "產品簡介建立：從願景到核心價值主張"
type: execution
agent: cto
sub-agent: analyst
phase: analysis
approval: yellow
output-dir: output/planning/
---

# 產品簡介建立工作流程

## 概述

分析師根據腦力激盪結果或初始構想，建立結構化的產品簡介文件，涵蓋願景、目標用戶、核心價值主張與差異化策略。

## 前置條件

- 腦力激盪結果或初始構想
- 研究報告（如有）

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-init.md | 初始化，發現輸入文件 |
| 2 | steps/step-02-discovery.md | 問題探索，與 CTO 互動 |
| 3 | steps/step-03-draft.md | 撰寫產品簡介 |
| 4 | steps/step-04-complete.md | 最終審查與送審 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-init.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 產品簡介文件 | 黃燈 | 送交 CTO 審核 → CEO 核決 |
