---
name: create-prd
description: "產品需求文件（PRD）建立、編輯、驗證"
type: execution
agent: cto
sub-agent: pm
phase: planning
approval: yellow
output-dir: output/planning/
---

# 產品需求文件（PRD）工作流程

## 概述

PM 工程師執行的 PRD 工作流程，支援三種執行模式：建立（Create）、編輯（Edit）、驗證（Validate）。根據 CTO 指派的任務類型自動判斷模式，產出結構化的產品需求文件。

## 前置條件

- 產品簡介（product-brief）或腦力激盪結果
- CTO 指派的任務描述（含模式指示或可推斷的上下文）

## 模式總覽

| 模式 | 目錄 | 步驟數 | 適用場景 |
|------|------|--------|---------|
| Create | steps-c/ | 8 步 | 從零建立新的 PRD |
| Edit | steps-e/ | 4 步 | 修改現有 PRD |
| Validate | steps-v/ | 3 步 | 驗證 PRD 品質與完整性 |

## 執行指令

根據任務判斷執行模式，讀取對應目錄的第一個步驟：

- **建立模式** → 讀取 `steps-c/step-01-init.md`
- **編輯模式** → 讀取 `steps-e/step-01-load.md`
- **驗證模式** → 讀取 `steps-v/step-01-check.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| PRD 文件 | 黃燈 | 送交 CTO 審核 → CEO 核決 |
