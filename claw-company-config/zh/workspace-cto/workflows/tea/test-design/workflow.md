---
name: test-design
description: "設計系統級或 Epic 級測試策略與計畫"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 測試策略設計

## 概述

QA 工程師根據 PRD、架構文件和 Epic 需求，設計完整的測試策略與計畫，涵蓋測試金字塔比例、框架選擇和覆蓋策略。

## 前置條件

- PRD 或 Epic 文件（含需求規格）
- 架構設計文件（如有）
- CTO spawn 時提供相關文件路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-analyze.md | 載入文件，分析測試範圍與風險 |
| 2 | steps/step-02-design.md | 設計測試架構與覆蓋策略 |
| 3 | steps/step-03-document.md | 產出測試計畫文件 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-analyze.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 測試策略計畫 | 綠燈 | QA 自行完成，回報 CTO |
