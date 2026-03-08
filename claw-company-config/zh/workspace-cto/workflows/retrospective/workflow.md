---
name: retrospective
description: "Epic 或 Sprint 完成後的回顧"
type: interactive
agent: cto
sub-agent: null
phase: implementation
approval: green
output-dir: output/planning/
---

# 回顧會議

## 概述

CTO 在 Epic 或 Sprint 完成後進行回顧，分析做得好的、需改進的、行動項目和教訓，產出回顧報告並將教訓寫入 MEMORY.md。

## 前置條件

- 已完成的 Epic 或 Sprint
- sprint-status 文件（含所有 story 的最終狀態）
- 回顧模板：`../../templates/retrospective.md`

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-collect.md | 收集資料 |
| 2 | steps/step-02-analyze.md | 分析與歸納 |
| 3 | steps/step-03-document.md | 產出回顧報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-collect.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 回顧報告 | 綠燈 | CTO 自行完成 |
