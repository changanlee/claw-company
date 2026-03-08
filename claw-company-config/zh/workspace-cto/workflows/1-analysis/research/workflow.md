---
name: research
description: "統一研究入口：市場研究 / 領域研究 / 技術研究"
type: execution
agent: cto
sub-agent: analyst
phase: analysis
approval: green
output-dir: output/planning/
---

# 統一研究工作流程

## 概述

分析師執行的統一研究工作流程，支援三種研究模式：市場研究（Market）、領域研究（Domain）、技術研究（Technical）。根據研究主題自動判斷模式，產出結構化的研究報告。

## 前置條件

- 研究主題與方向
- CTO 指派的研究任務描述

## 模式總覽

| 模式 | 步驟 | 適用場景 |
|------|------|---------|
| Market | step-02-market.md | 競品分析、市場規模、趨勢、用戶需求 |
| Domain | step-02-domain.md | 產業深度、法規、最佳實踐 |
| Technical | step-02-technical.md | 技術選型、架構對比、PoC 可行性 |

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-init.md | 判斷研究類型，載入背景 |
| 2a | steps/step-02-market.md | 市場研究模式 |
| 2b | steps/step-02-domain.md | 領域研究模式 |
| 2c | steps/step-02-technical.md | 技術研究模式 |
| 3 | steps/step-03-compile.md | 編譯研究報告 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-init.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| 研究報告 | 綠燈 | 回報 CTO |
