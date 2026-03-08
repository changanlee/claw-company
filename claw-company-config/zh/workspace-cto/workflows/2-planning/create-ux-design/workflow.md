---
name: create-ux-design
description: "UX 設計規格建立"
type: execution
agent: cto
sub-agent: ux-designer
phase: planning
approval: yellow
output-dir: output/planning/
---

# UX 設計規格建立工作流程

## 概述

UX 設計師根據 PRD 或產品簡介，建立完整的 UX 設計規格文件，涵蓋用戶旅程、資訊架構與 UI 元件規格。

## 前置條件

- PRD 或產品簡介
- 目標用戶已明確

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-init.md | 載入 PRD，確認目標用戶與核心功能 |
| 2 | steps/step-02-flow.md | 設計用戶旅程和資訊架構 |
| 3 | steps/step-03-spec.md | UI 元件規格與互動模式 |
| 4 | steps/step-04-complete.md | 最終產出與送審 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-init.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| UX 設計文件 | 黃燈 | 送交 CTO 審核 → CEO 核決 |
