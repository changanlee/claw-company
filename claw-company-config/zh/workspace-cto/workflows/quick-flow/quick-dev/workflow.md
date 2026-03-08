---
name: quick-dev
description: "根據 quick-spec 快速實作小型功能"
type: execution
agent: cto
sub-agent: solo-dev
phase: implementation
approval: green
output-dir: output/implementation/
---

# 快速開發

## 概述

獨立開發工程師根據 quick-spec 快速實作小型功能。適用於小型獨立功能，從規格到交付的完整 TDD 開發流程。

## 前置條件

- quick-spec 文件或明確的直接指令

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-setup.md | 準備開發環境 |
| 2 | steps/step-02-implement.md | TDD 實作 |
| 3 | steps/step-03-test.md | 全面測試 |
| 4 | steps/step-04-deliver.md | 交付 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-setup.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 功能實作 | 綠燈 | Solo-Dev 自行完成，回報 CTO |
