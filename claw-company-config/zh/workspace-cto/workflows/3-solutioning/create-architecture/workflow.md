---
name: create-architecture
description: "系統架構設計與 ADR"
type: execution
agent: cto
sub-agent: architect
phase: solutioning
approval: yellow
output-dir: output/planning/
---

# 系統架構設計工作流程

## 概述

架構師根據 PRD 與 UX 設計（如有），設計完整的系統架構，包含元件分解、通訊協議、資料流、基礎設施策略，並以 ADR 記錄關鍵架構決策。

## 前置條件

- PRD（必要）
- UX 設計文件（如有）
- 研究報告中的技術建議（如有）

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-init.md | 載入 PRD 和相關文件，確認非功能性需求 |
| 2 | steps/step-02-design.md | 系統架構設計 |
| 3 | steps/step-03-adr.md | 架構決策記錄 |
| 4 | steps/step-04-infra.md | 基礎設施與部署策略 |
| 5 | steps/step-05-complete.md | 產出架構文件與送審 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-init.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 架構文件 | 黃燈 | 送交 CTO 審核 → CEO 核決 |
