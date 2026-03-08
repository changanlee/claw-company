---
name: nfr
description: "非功能性需求測試評估"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 非功能性需求測試評估

## 概述

QA 工程師從 PRD 和架構文件識別非功能性需求（效能、安全、可靠性、可擴展性），評估測試策略並產出 NFR 測試計畫。

## 前置條件

- PRD 或架構文件（含 NFR 相關描述）
- CTO spawn 時提供相關文件路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-identify.md | 識別非功能性需求 |
| 2 | steps/step-02-assess.md | 評估測試策略與工具需求 |
| 3 | steps/step-03-plan.md | 產出 NFR 測試計畫 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-identify.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| NFR 測試計畫 | 綠燈 | QA 自行完成，回報 CTO |
