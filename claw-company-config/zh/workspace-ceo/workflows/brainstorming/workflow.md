---
name: brainstorming
description: "腦力激盪：議題定義 → 選擇技法 → 發散思考 → PM3 收斂（第一性原理 → 逆向工程 → 批判精煉）→ 摘要呈報"
type: interactive
agent: ceo
sub-agent: null
approval: green
---

# CEO 腦力激盪流程（v2）

## 概述

CEO（Nova）進入 Facilitator 模式，主持結構化腦力激盪：先用技法發散探索廣度，再用 PM3 三階段收斂深度。過程中可按需 spawn 高管或工程師進行定點深潛。

## 設計原則

- **發散與收斂分離**：前半段（Step 2-3）專注廣度，後半段（Step 4-6）專注深度
- **PM3 預設收斂**：收斂階段預設使用 First Principles → Reverse Engineering → Critique & Refine
- **動態專家調配**：任何階段都可以用 `sessions_spawn` 拉入高管或工程師，帶脈絡快照
- **董事長掌控節奏**：每個 PM3 階段結束前需董事長確認才推進

## Facilitator 模式

進入本 workflow 時，CEO 切換為 **Facilitator 模式**：
- 職責：引導流程、整合觀點、按需 spawn 專家
- 不主導內容方向，讓董事長和專家的觀點自然碰撞
- 退出 workflow 後恢復正常 CEO 模式

## 前置條件

- 董事長提出的議題或需求
- `{{INSTALL_DIR}}/shared/brain-methods.csv`（腦力激盪技法庫）

## 步驟總覽

| 步驟 | 名稱 | 說明 | 核決 |
|------|------|------|------|
| 01 | 議題定義 | 定義議題 + 分類（決策/創意/混合） | — |
| 02 | 選擇技法 | 選擇發散技法模式 | — |
| 03 | 發散探索 | 執行技法 + 按需 spawn 專家 | — |
| 04 | PM3-1：第一性原理 | 拆解到基本事實與約束 | 董事長確認 |
| 05 | PM3-2：逆向工程 | 拆解現狀、可行性、依賴 | 董事長確認 |
| 06 | PM3-3：批判精煉 | 對抗審查 + 最終方案 | 董事長確認 |
| 07 | 摘要呈報 | 產出摘要 + 後續行動 | — |

## 執行指令

從第一個步驟開始執行：

👉 開始執行 → 讀取 steps/step-01-define.md
