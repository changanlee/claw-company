---
name: dev-dispatch
description: "CTO 開發派發流程：腦力激盪 → 規模評估 → 任務拆解 → 工程師派發 → 審查"
type: interactive
agent: cto
sub-agent: null
phase: implementation
approval: yellow
output-dir: output/planning/
---

# CTO 開發派發流程

## 概述

CTO（Atlas）收到 CEO 轉達的開發需求後的完整處理流程。五個階段涵蓋從需求理解、腦力激盪、規模評估、任務拆解、工程師派發，到最終品質審查的完整生命週期。

## 前置條件

- CEO 轉達的開發需求（含需求描述與背景）
- `engineers/roster.md`（可用工程師角色清單）
- `{{INSTALL_DIR}}/shared/brain-methods.csv`（腦力激盪技法庫）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 腦力激盪 | 選擇思考技法，發散思考後收斂為 2-3 個技術方案 | 設計方向需董事長批准 |
| 01.5 | 實作計畫 | 將設計文件轉為結構化實作計畫（Superpowers writing-plans） | — |
| 02 | 規模評估 | 判斷精簡或完整流程 | — |
| 03 | 任務拆解 | 精簡：直接拆解；完整：PRD → 架構 → Epic | PRD 黃燈、架構黃燈 |
| 03.5 | 實作就緒檢查 | 完整流程：check-readiness 驗證（SDD 硬閘門） | check-readiness PASS |
| 04 | 開發派發 | 組合 spawn 指令，選擇工程師，派發任務 | — |
| 05 | 審查 | Code Review、品質閘門、回報 CEO | 推送 main 紅燈、部署紅燈 |

## 執行指令

從第一個步驟開始執行：

```
👉 開始執行 → 讀取 steps/step-01-brainstorm.md
```

## 核決閘門總覽

| 決策項目 | 燈號 | 處理方式 |
|---------|------|---------|
| PRD 審批 | 黃燈 | 送交 CEO 審核 |
| 架構方案審批 | 黃燈 | 送交 CEO 審核 |
| 推送 main 分支 | 紅燈 | 透過 CEO 呈報董事長核決 |
| 部署上線 | 紅燈 | 透過 CEO 呈報董事長核決 |

- **黃燈**：Atlas 提出建議，CEO 有權批准或退回。
- **紅燈**：必須經董事長明確同意，Atlas 和 CEO 均不可自行決定。
