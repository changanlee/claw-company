---
name: ci
description: "搭建 CI/CD 品質管線"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: yellow
output-dir: output/implementation/
---

# CI/CD 品質管線

## 概述

QA 工程師設計並搭建 CI/CD 品質管線，包含 PR、Staging、Production 各階段的品質閘門，確保代碼品質自動化把關。

## 前置條件

- 專案 CI/CD 環境資訊（GitHub Actions / GitLab CI 等）
- 測試框架已初始化
- CTO spawn 時提供專案路徑

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-design.md | 設計品質閘門 |
| 2 | steps/step-02-implement.md | 建立 CI 配置 |
| 3 | steps/step-03-verify.md | 驗證管線運作 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-design.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| CI/CD 管線配置 | 黃燈 | QA 完成後提交 CEO 審批 |
