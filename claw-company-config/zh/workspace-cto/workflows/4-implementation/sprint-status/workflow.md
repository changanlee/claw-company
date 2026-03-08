---
name: sprint-status
description: "Sprint 狀態摘要與風險報告"
type: automatic
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# Sprint 狀態報告

## 概述

Scrum Master 讀取 sprint-status 文件，收集各 story 狀態，分析進度與風險，產出 Sprint 狀態摘要。

## 前置條件

- 已建立的 sprint-status 文件
- CTO spawn 時提供 sprint-status 文件路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-collect.md | 讀取 sprint-status，收集各 story 狀態 |
| 2 | steps/step-02-analyze.md | 分析進度、識別阻塞和風險 |
| 3 | steps/step-03-report.md | 產出 Sprint 狀態摘要 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-collect.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 狀態摘要 | 綠燈 | Scrum Master 自行完成，回報 CTO |
