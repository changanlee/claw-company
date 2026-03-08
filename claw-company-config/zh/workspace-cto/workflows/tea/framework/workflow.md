---
name: framework
description: "初始化測試框架（Playwright/Cypress/Jest）"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# 測試框架初始化

## 概述

QA 工程師根據專案技術棧選擇合適的測試框架，完成安裝配置並建立基礎測試腳本範例。

## 前置條件

- 專案技術棧資訊（語言、框架、建構工具）
- CTO spawn 時提供專案路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-select.md | 根據技術棧選擇測試框架 |
| 2 | steps/step-02-setup.md | 安裝配置測試框架 |
| 3 | steps/step-03-scaffold.md | 建立基礎測試腳本和範例 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-select.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 測試框架配置 | 綠燈 | QA 自行完成，回報 CTO |
