# OpenClaw One-Person Company / OpenClaw 一人公司

Multi-Agent architecture for managing a one-person company with AI agents.
以 AI 代理人多代理人架構管理一人公司。

---

## Language / 語言

This project supports **English** and **繁體中文**. Choose your version:
本專案支援**英文**和**繁體中文**。請選擇你的版本：

| | English | 繁體中文 |
|---|---------|----------|
| Directory / 目錄 | [`en/`](./en/) | [`zh/`](./zh/) |
| Config | `en/openclaw.json` | `zh/openclaw.json` |
| Workspaces | `en/workspace-*` | `zh/workspace-*` |
| Policies | `en/shared/policies/` | `zh/shared/policies/` |

## Quick Start / 快速開始

```bash
chmod +x setup.sh
./setup.sh
```

The setup script will prompt you to choose a language. All configuration files, agent personalities, policies, and documentation will be deployed in your selected language.

部署腳本會提示你選擇語言。所有配置文件、Agent 人格設定、政策文件和說明文件都會以你選擇的語言部署。

## Architecture / 架構總覽

```
Chairman
  ↕ Telegram / WhatsApp / Discord
CEO — Coordination, dispatch, refined reporting / 統籌、分派、精煉回報
  ├── CFO — Finance, budgets, cost auditing / 記帳、預算、成本審計
  ├── CIO — Investment portfolio, market analysis / 投資組合監控、市場分析
  ├── COO — Schedule, meals, travel, life management / 行程、飲食、出行、生活管理
  ├── CTO — Product development, sub-agent management / 產品開發、工兵管理
  └── CHRO — Agent evaluation, policy writing / Agent 能力評估、政策撰寫

CAO — Independent audit, reports directly to Chairman / 獨立監督，直接向董事長報告
```

## File Structure / 文件結構

```
claw-company-config/
├── setup.sh                    # Bilingual deployment script / 雙語部署腳本
├── README.md                   # This file / 本文件
├── en/                         # English version / 英文版
│   ├── openclaw.json
│   ├── shared/
│   │   ├── AGENTS.md
│   │   ├── USER.md
│   │   ├── policies/
│   │   └── setup-guides/
│   ├── workspace-{agent}/
│   │   ├── SOUL.md
│   │   ├── MEMORY.md
│   │   └── HEARTBEAT.md
│   └── skills/
└── zh/                         # Chinese version / 中文版
    ├── openclaw.json
    ├── shared/
    │   ├── AGENTS.md
    │   ├── USER.md
    │   ├── policies/
    │   └── setup-guides/
    ├── workspace-{agent}/
    │   ├── SOUL.md
    │   ├── MEMORY.md
    │   └── HEARTBEAT.md
    └── skills/
```

## Prerequisites / 前置條件

- OpenClaw installed / 已安裝 OpenClaw（https://github.com/openclaw/openclaw）
- At least one LLM API Key configured in OpenClaw / 至少一組已在 OpenClaw 中配置的 LLM API Key
- A messaging platform Bot Token (Telegram recommended) / 一組通訊平台 Bot Token（推薦 Telegram）

## Setup Steps / 部署步驟

### 1. Configure Tokens / 配置 Token

Edit `{en|zh}/openclaw.json` and replace the placeholders:
編輯 `{en|zh}/openclaw.json`，替換佔位符：

- `YOUR_CEO_BOT_TOKEN` — CEO Telegram Bot Token
- `YOUR_CAO_BOT_TOKEN` — CAO Telegram Bot Token (optional / 可選)
- `YOUR_TELEGRAM_ID` — Your Telegram User ID
- `YOUR_DISCORD_BOT_TOKEN` — Discord Bot Token
- `YOUR_GATEWAY_TOKEN` — Gateway auth token (set your own secure string / 自行設定安全字串)

### 2. Run Setup / 執行部署

```bash
chmod +x setup.sh
./setup.sh
```

### 3. Register Agents and Cron / 註冊 Agent 和排程

Copy and run the commands printed by the setup script.
複製並執行 setup.sh 輸出的指令。

### 4. Start / 啟動

```bash
openclaw gateway start
```

### 5. Test / 測試

Send a message to the CEO Bot via your configured messaging platform (Telegram, Discord, or WhatsApp).
透過你設定的通訊平台（Telegram、Discord 或 WhatsApp）向 CEO Bot 發送訊息測試。

## Design Principles / 設計原則

| Principle / 原則 | Description / 說明 |
|---|---|
| Three-tier Approval / 三級核決 | Green (auto) → Yellow (CEO review) → Red (Chairman approval) |
| Three-way Checks / 三方制衡 | CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy) |
| Layered Memory / 記憶分層 | MEMORY.md (hot) → memory/ logs (warm) → LanceDB (cold, future) |
| Layered Governance / 治理分層 | AGENTS.md (index) → SOUL.md (role) → policies/ (details) |
| On-demand Loading / 按需載入 | Policies loaded only when triggered, saving tokens |
| Refined Reporting / 精煉回報 | Layer-by-layer refinement; Chairman receives summaries only |

## Agent Model Configuration / Agent 模型配置

The setup script reads available models from your existing OpenClaw configuration and lets you assign them to two aliases:
部署腳本會從你現有的 OpenClaw 配置中讀取可用模型，讓你指定兩個別名：

- **smart** — High capability model for agents that need strong reasoning / 高能力模型，適合需要強推理的角色
- **fast** — Lightweight model for frequent but simple tasks / 輕量模型，適合頻繁但簡單的任務

You can then assign each agent to either `smart` or `fast`. Default assignment:
你可以為每個角色選擇 `smart` 或 `fast`。預設配置：

| Agent | Default Tier / 預設等級 | Rationale / 理由 |
|-------|----------|----------|
| CEO | smart | Core coordinator, needs strong reasoning / 核心協調，需強推理 |
| CFO | smart | Financial accuracy matters / 財務準確性重要 |
| CIO | smart | Investment analysis needs depth / 投資分析需要深度 |
| COO | fast | Frequent but simple tasks, saves tokens / 頻繁但簡單，省 Token |
| CTO | smart | Technical decisions need precision / 技術決策需要精確 |
| CTO sub | fast | CTO's subagents for execution tasks / CTO 子代理執行任務 |
| CHRO | fast | Periodic policy tasks, not complex / 週期性，不複雜 |
| CAO | smart | Auditing needs independent strong reasoning / 稽核需要獨立強推理 |

## Cron Schedule / 排程總覽

| Name | Agent | Schedule / 時間 | Purpose / 用途 |
|------|-------|------|------|
| morning-briefing | CEO | Daily 06:30 | Morning briefing / 晨間會報 |
| investment-monitor | CIO | Mon-Fri 09-16 hourly | Portfolio monitoring / 投資監控 |
| memory-cleanup | CHRO | 1st of month 03:00 | Memory health review / 記憶審視 |
| weekly-org-review | CHRO | Monday 08:00 | Org health report / 組織健康週報 |
| security-scan | CAO | Wednesday 02:00 | Security scan / 安全掃描 |
