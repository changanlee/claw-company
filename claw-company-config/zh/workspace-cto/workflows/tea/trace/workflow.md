---
name: trace
description: "需求到測試的追溯矩陣"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 需求追溯矩陣

## 概述

QA 工程師建立需求到測試的追溯矩陣，識別未覆蓋需求和孤立測試，確保所有需求都有對應的測試驗證。

## 前置條件

- PRD（含需求 ID）
- 現有測試代碼庫
- CTO spawn 時提供相關文件路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-map.md | 提取需求 ID 和測試案例 |
| 2 | steps/step-02-link.md | 建立需求與測試對應矩陣 |
| 3 | steps/step-03-report.md | 產出追溯報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-map.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 追溯矩陣報告 | 綠燈 | QA 自行完成，回報 CTO |
