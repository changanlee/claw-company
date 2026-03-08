---
name: create-story
description: "建立實作用的 Story 檔案"
type: execution
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# 建立 Story 檔案

## 概述

Scrum Master 從 sprint-status 中選擇下一個 backlog story，撰寫完整的 story file（描述、驗收標準、任務清單、開發備註），確認可開發後更新 sprint-status。

## 前置條件

- 已建立的 sprint-status 文件
- CTO spawn 時指定要建立的 story（或由 Scrum Master 從 backlog 選擇）
- Story 模板：`../../templates/story.md`

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-select.md | 從 sprint-status 選擇下一個 backlog story |
| 2 | steps/step-02-write.md | 撰寫完整 story file |
| 3 | steps/step-03-ready.md | 確認 story 可開發，更新 sprint-status |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-select.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| Story 檔案 | 綠燈 | Scrum Master 自行完成，回報 CTO |
