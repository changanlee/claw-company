---
name: generate-project-context
description: "生成專案上下文摘要供 AI Agent 使用"
type: execution
agent: cto
sub-agent: tech-writer
phase: operations
approval: green
output-dir: output/implementation/
---

# 生成專案上下文

## 概述

Tech Writer 掃描專案結構、技術棧和關鍵檔案，生成 project-context.md，供 AI Agent 快速理解專案全貌。

## 前置條件

- CTO spawn 時提供專案路徑
- 可存取專案代碼庫

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-scan.md | 掃描專案結構與技術棧 |
| 2 | steps/step-02-generate.md | 生成 project-context.md |
| 3 | steps/step-03-validate.md | 驗證上下文準確性 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-scan.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| project-context.md | 綠燈 | Tech Writer 自行完成，回報 CTO |
