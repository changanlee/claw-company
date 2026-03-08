---
name: quick-spec
description: "快速建立小型功能的實作規格"
type: execution
agent: cto
sub-agent: solo-dev
phase: planning
approval: green
output-dir: output/planning/
---

# 快速規格

## 概述

小型功能或變更的快速規格流程。不需完整 PRD，直接從需求到可實作的技術規格。適用於範圍明確、影響可控的小型開發任務。

## 前置條件

- 明確的小型功能需求

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-understand.md | 理解需求範圍 |
| 2 | steps/step-02-investigate.md | 深入調查代碼影響 |
| 3 | steps/step-03-generate.md | 產生完整技術規格 |
| 4 | steps/step-04-review.md | 審查與確認 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-understand.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| quick-spec 文件 | 綠燈 | Solo-Dev 自行完成，回報 CTO |
