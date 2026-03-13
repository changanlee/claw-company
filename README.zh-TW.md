# Claw Company

**一人公司也能有完整的 C-suite。**
7 個 AI 高管，有層級、有制度、有紀律——不只是聊天機器人。

[English](README.md) · 基於 [OpenClaw](https://github.com/nicekid1/OpenClaw) · [MIT License](LICENSE)

---

## 為什麼？

經營一人公司意味著你同時是 CEO、CFO、COO 和 CTO。總有事情會漏掉：

- 寫程式寫到一半，忘了回覆重要訊息
- 記帳記了三天就斷掉，月底才發現超支
- 投資組合放著沒看，等到大跌才發現
- 想做一個 side project，但需求、設計、開發、測試全部自己來，光規劃就耗盡動力

你需要的不是另一個 AI 工具。**你需要一個組織**——有分工、有核決鏈、有制度記憶、有權力制衡。Claw Company 就是這樣的東西：一個全年無休的高管團隊，在 Telegram、WhatsApp 或 Discord 上跟你對話，你專注重要的事就好。

**你是董事長——不是什麼都要自己來的個體戶。**

---

## 實際使用

```
👤 你（CEO 通道）：  幫我記午餐 $15
🤵 CEO：     → 分派給 CFO
💰 CFO→CEO： 已記帳。本月餐飲累計 $280，預算剩餘 $120
🤵 CEO：     午餐 $15 已記錄，本月餐飲剩 $120 額度
```

```
👤 你（CEO 通道）：  我想做一個 habit tracker app
🤵 CEO：     → 分派給 CTO
🔧 CTO→CEO： 已啟動開發流程。先跑腦力激盪，收斂後做規模評估和任務拆解
              預計 3 階段，每階段結束向您報告
🤵 CEO：     CTO 已啟動，第一步是腦力激盪，完成後會跟你確認方向
```

```
👤 你（CTO 通道）：  把新 API 部署到 staging
🔧 CTO：     staging 部署需要 CEO 核決（黃燈）
              → 分派給 CEO 審查
🤵 CEO：     CTO 請求部署 staging。核決通過 ✓
🔧 CTO：     部署中… 完成。3 個端點已驗證
```

```
👤 你（CTO 通道）：  刪掉測試資料庫
🔧 CTO：     確認範圍：test-db-2026Q1，3 張表，240 筆資料。確定？
👤 你：       確定
🔧 CTO：     已刪除 ✓ → 已通知 CEO [紅燈知會]
```

```
🔍 CAO → 你（獨立通道）：
    安全掃描完成。發現 1 項中風險：CTO 上週 spawn 的工程師未在完成後清理 session
    建議：執行 session 清理。需要我追蹤改善嗎？
```

**4 個 Agent 擁有獨立通道與 Bot** — CEO（主通道）、CTO（技術）、COO（營運）、CAO（稽核）。其餘 3 個（CFO、CIO、CHRO）走 CEO 路由。背後的分工、執行、回報全由 exec dispatch 自動完成。CAO 不經 CEO，獨立監督。

---

## 快速開始

### 前置條件

- 已安裝 [OpenClaw](https://github.com/nicekid1/OpenClaw) >= 2026.3.8
- 至少一組 LLM API Key — **務必使用 Sonnet 4.5 以上模型**（exec dispatch 依賴 write + exec 工具鏈；較弱模型無法可靠執行）
- 一組通訊平台 Bot Token（Telegram、WhatsApp 或 Discord — Discord 支援多 Bot 路由）
- [Node.js](https://nodejs.org/) >= 18

### 安裝

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company/claw-company-config

# 先編輯你的董事長資料
# vi {en|zh}/shared/USER.md

node install.js        # 互動式安裝——語言、模型、通道、排程、記憶、Skill
openclaw gateway start # 啟動
```

### 驗證

向 CEO Bot 發送訊息：*「你好，請自我介紹。」*

---

## 架構

```
董事長（你）— 唯一人類
  ↕ Telegram / WhatsApp / Discord
  ┌──────────────────────────────────────────────────┐
  │ CEO 通道  ←→  CEO（總經理）— 統籌分派             │  ← 主通道
  │ CTO 通道  ←→  CTO（技術長）— 產品開發             │  ← 獨立通道
  │ COO 通道  ←→  COO（營運長）— 行程飲食             │  ← 獨立通道
  │ CAO 通道  ←→  CAO（稽核長）— 獨立監督             │  ← 獨立通道
  └──────────────────────────────────────────────────┘
         CEO 內部分派（exec dispatch）
         ├── CFO（財務長）— 記帳、預算、Token 成本審計
         ├── CIO（投資長）— 投資組合監控、市場分析、週報
         └── CHRO（人資長）— Agent 能力評估、政策撰寫、模型評估

CTO 可按需 spawn 11 位工程師子代理：
  PM、架構師、開發、QA、UX、技術文件、分析師、
  Scrum Master、獨立開發、規格審查、程式碼審查
```

- **4 個獨立通道** — CEO（主通道）、CTO、COO、CAO 各有自己的 Bot
- **3 個 Agent 走 CEO 路由** — CFO、CIO、CHRO 不需獨立通道
- **通道與核決正交** — 有自己的通道不代表權限更大，三級核決制度一律適用
- **CTO 是唯一可以 spawn 子代理的角色** — 按需組建完整工程團隊
- **三方制衡**：CEO（執行）↔ CAO（監督）↔ CHRO（政策）

---

## 如何保持可靠

### 三級核決

沒有適當授權，Agent 不會擅自行動——從金額 × 可逆性 × 代理 × 時效四維度評估。

- **綠燈** — 自動執行：資料收集、內部記錄、心跳巡檢
- **黃燈** — CEO 核決：花費提案、投資建議、開發方案
- **紅燈** — 你來核決：花費 >$50、推送 main、對外通訊、定義檔案修改

紅燈行為依任務來源而異：

- **董事長直接指派**（透過 Agent 自己的通道）— 視為已核決，確認範圍後執行，再 dispatch CEO 紅燈知會
- **CEO 分派** — dispatch 回 CEO 審查，由 CEO 呈報董事長
- **其他來源** — dispatch CEO 審查核決

<details>
<summary>核決細節</summary>

四維度取最高燈號。紅燈保護的定義檔案：SOUL.md、HEARTBEAT.md、IDENTITY.md、AGENTS.md、TOOLS.md、tools-policy.md、engineers/*.md、rules/*.md、openclaw.json。

紅燈破壞性操作（刪除、drop、force-push）必須先與董事長確認精確範圍才能執行——不可自行假設。

</details>

### 全角色領域鐵律

每個 Agent 都有針對其領域的鐵律——不只是工程，財務、投資、生活、稽核、人資和決策都有。任何 Agent 都不可繞過或合理化跳過。

- **CTO**：TDD、方案設計文件、系統性除錯、完成前驗證
- **CEO**：核決不可跳、彙報不刪減、分派附脈絡
- **CFO**：記錄先於分析、數字不記憶、異常警報
- **CIO**：觀察不交易、風險先於報酬、持倉不美化
- **COO**：建議不執行、偏好先查、確認即執行
- **CAO**：證據鏈完整、獨立不妥協、發現即記錄
- **CHRO**：政策必有依據、評估必有數據、模型評估雙盲

<details>
<summary>反合理化體系</summary>

三層防線，防止 Agent 繞過自己的規則：

1. **全公司層** — company-rules.md 共用藉口 vs 事實對照表
2. **角色層** — 各角色領域的對照表（CEO、CTO、CAO 各 5+ 條）
3. **鐵律層** — 每條鐵律自帶紅旗清單

*「覺得不需要遵守規則」本身就是最大的紅旗。*

</details>

### 記憶分層

Agent 不會在對話結束後遺忘一切。三層記憶，各捕捉不同粒度：

- **熱**（MEMORY.md）— 精煉原則，200 行上限，每次 session 自動載入
- **溫**（memory/*.md）— 當日事件，分類標籤，今天+昨天自動載入
- **冷**（LanceDB）— `autoCapture` session 結束時自動萃取，`autoRecall` session 開始時注入。向量 + BM25 混合檢索、cross-encoder rerank、多重 Scope 隔離

<details>
<summary>記憶細節</summary>

冷層由 [memory-lancedb-pro](https://github.com/nicekid1/memory-lancedb-pro) 驅動：每個 Agent 有私有 scope，所有 `cc-*` Agent 共享公司 scope。Post-Compaction 記憶存活確保啟動必讀和安全紅線在 context 壓縮後自動重注入——長對話中不會丟失核心身份。

</details>

### 58 個結構化工作流程

涵蓋從分析到實作的完整生命週期，支援透過 YAML frontmatter 中斷續接。

- **CTO**（27）：腦力激盪 → 規模評估 → 任務拆分 → 子代理派發 → 兩階段審查
- **CEO**（5）：任務分派、晨間會報、腦力激盪、諮詢委員會
- **CFO**（5）：記帳、採購分析、Token 成本審計、月結
- **CIO**（4）：投資組合監控、投資分析、週報
- **COO**（5）：飲食建議、出行規劃、行程管理
- **CHRO**（7）：Agent 評估、政策撰寫、記憶審計、新 Agent 建立
- **CAO**（5）：安全掃描、合規檢查、緊急煞車、SOUL 完整性

### 跨 Agent 分派

Agent 之間透過 **exec dispatch** 通訊——安全的檔案式分派機制，取代了已棄用的 `sessions_send`。

1. 發送方將任務寫入暫存檔
2. `dispatch.sh` 驗證目標 Agent（白名單）、標記來源（`[來源: CTO dispatch]`）、呼叫 `openclaw agent`
3. 接收方處理並回覆；發送方等待完整回覆後才繼續

這確保了**一問一答紀律**——不會在 Agent 之間產生失控的 token 迴圈。

<details>
<summary>分派細節</summary>

- 透過檔案傳遞訊息，防止 shell injection
- Agent 白名單：`cc-ceo`、`cc-cfo`、`cc-cio`、`cc-coo`、`cc-cto`、`cc-chro`、`cc-cao`
- 繞過 `autoCapture`/`autoRecall`——分派回覆不會污染冷記憶
- 適用於：主 session、cron、獨立通道
- cron 任務可使用 exec dispatch（不受 cron 隔離限制）

</details>

### 通道治理

不是每個 Agent 都需要獨立通道。開通條件：高頻互動、治理獨立性、或多輪討論需求。模型還須通過**通道能力測試**——紅綠燈辨識、任務來源辨識、黃燈分派流程、壓力情境。

<details>
<summary>治理細節</summary>

- **4 個活躍通道**：CEO（主通道）、CTO（技術）、COO（營運）、CAO（稽核）
- **3 個 Agent 走 CEO 路由**：CFO、CIO、CHRO
- 每季使用量覆核；模型更換觸發能力重測
- 關閉條件：使用量下降、模型降級失敗、或董事長要求（7 天緩衝期）

</details>

### Skill 存取控制

各 Agent 擁有獨立 Skill 白名單。政策敏感角色（CHRO、CAO）完全封鎖。新 Skill 需經：CTO 安全審查（14 紅旗）→ CAO 合規覆核 → 董事長核決。

---

<details>
<summary><strong>參考</strong></summary>

### Agent ID

所有 Agent 使用 `cc-` 前綴，避免命名衝突。

| 角色 | ID | 模型等級 | 通道 |
|------|----|---------|------|
| CEO 總經理 | `cc-ceo` | smart | 獨立（主通道） |
| CFO 財務長 | `cc-cfo` | smart | 走 CEO |
| CIO 投資長 | `cc-cio` | smart | 走 CEO |
| COO 營運長 | `cc-coo` | fast | 獨立 |
| CTO 技術長 | `cc-cto` | smart | 獨立 |
| CHRO 人資長 | `cc-chro` | fast | 走 CEO |
| CAO 稽核長 | `cc-cao` | smart | 獨立（稽核） |
| CTO 子代理 | — | fast | — |

### 排程總覽

| 名稱 | 角色 | 時間 | 用途 |
|------|------|------|------|
| morning-briefing | CEO | 每日 06:30 | 晨間會報 |
| investment-monitor | CIO | 週一至五 09-16 每小時 | 投資監控 |
| memory-cleanup | CHRO | 每月 1 日 03:00 | 記憶審視 |
| weekly-org-review | CHRO | 週一 08:00 | 組織健康週報 |
| security-scan | CAO | 週三 02:00 | 安全掃描 |
| cto-memory-cleanup | CTO | 週日 03:00 | CTO 記憶自清理 |

### 升級與移除

```bash
node install.js                  # 升級（自動保留 MEMORY.md、output/、auth-profiles.json）
node install.js --update-channels # 僅更新通道綁定與 Discord Bot 路由
node install.js --update-skills   # 僅更新 Skill 白名單
node install.js --uninstall       # 移除已安裝檔案
```

### 專案結構

```
claw-company-config/
├── install.js                 # 跨平台部署腳本
├── skill-allowlist.json       # 各 Agent Skill 存取控制
├── {en,zh}/
│   ├── shared/                # 全公司共用政策、規範、範本、標準
│   │   ├── dispatch.sh        # 安全跨 Agent 分派（白名單 + 來源標記）
│   │   └── policies/          # 核決矩陣、通道治理、安全規則
│   └── workspace-{agent}/     # 各 Agent：AGENTS.md、SOUL.md、IDENTITY.md、
│                              #   TOOLS.md、HEARTBEAT.md、MEMORY.md、
│                              #   rules/、workflows/、templates/、output/
```

</details>

---

## 致謝

Built on [OpenClaw](https://github.com/nicekid1/OpenClaw). Workflow architecture inspired by [BMAD Method](https://github.com/bmad-method/bmad-method). Engineering discipline informed by [Superpowers](https://github.com/nicolecomputer/superpowers).

## 授權

[MIT](LICENSE)
