---
name: sprint-planning
description: "從 Epic 生成 Sprint 狀態追蹤"
type: execution
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# Sprint 規劃

## 概述

Scrum Master 從已建立的 Epic 文件中發現並解析所有 Story，生成 Sprint 狀態追蹤文件，建立完整的 Sprint backlog。

## 前置條件

- 已建立的 Epic 文件（含 Story 拆解）
- CTO spawn 時提供 Epic 文件路徑或所在目錄
- Sprint 狀態模板：`../../templates/sprint-status.md`

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-discover.md | 發現並載入所有 Epic 文件 |
| 2 | steps/step-02-parse.md | 解析 Epic → Story，建立完整清單 |
| 3 | steps/step-03-generate.md | 生成 Sprint 狀態文件 |
| 4 | steps/step-04-validate.md | 驗證完整性並產出報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-discover.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| Sprint 狀態文件 | 綠燈 | Scrum Master 自行完成，回報 CTO |
