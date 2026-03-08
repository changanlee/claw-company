---
name: dev-story
description: "根據 story file 執行功能開發，嚴格遵循 TDD"
type: execution
agent: cto
sub-agent: dev
phase: implementation
approval: green
output-dir: output/implementation/
---

# Story 功能開發

## 概述

開發工程師根據 story file 的驗收標準逐步實作功能。嚴格遵循 TDD（測試驅動開發）流程，確保每個任務都經過 RED → GREEN → REFACTOR 循環。

## 前置條件

- 已建立的 story file（含驗收標準和任務清單）
- sprint-status（如有）
- CTO spawn 時提供 story file 路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-load-story.md | 載入 story 並準備開發環境 |
| 2 | steps/step-02-execute-tasks.md | 逐任務執行 TDD 開發 |
| 3 | steps/step-03-verify.md | 最終驗證與交付 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-load-story.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 功能實作 | 綠燈 | Dev 自行完成，回報 CTO |
