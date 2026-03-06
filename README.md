# Claw Company — One-Person Company Multi-Agent Architecture

[繁體中文](#繁體中文) | [English](#english)

---

## English

### Overview

Claw Company is a **multi-agent AI architecture** designed for one-person companies. It uses [OpenClaw](https://github.com/openclaw/openclaw) to orchestrate multiple AI agents that function as a virtual C-suite, handling everything from daily life management to product development.

### Architecture

```
Chairman (Human)
  ↕ Telegram / WhatsApp / Discord
CEO (General Manager) — Coordination, delegation, refined reporting
  ├── CFO (Finance)    — Bookkeeping, budgeting, cost auditing
  ├── CIO (Investment) — Portfolio monitoring, market analysis
  ├── COO (Operations) — Scheduling, meals, travel, life management
  ├── CTO (Technology) — Product development, sub-agent management
  └── CHRO (HR)        — Agent capability assessment, policy writing

CAO (Auditor) — Independent oversight, reports directly to Chairman
```

### Project Structure

```
claw-company/
├── claw-company-config/   # OpenClaw deployment configuration
│   ├── openclaw.json      # Main config (JSON5) — agent definitions, channels, cron
│   ├── setup.sh           # One-click deployment script
│   ├── shared/            # Shared policies & rules across all agents
│   │   ├── AGENTS.md      # Company-wide operating rules
│   │   ├── USER.md        # Chairman profile (customize for yourself)
│   │   ├── policies/      # Approval matrix, security, memory, audit, data access policies
│   │   └── setup-guides/  # Database & plugin setup guides (Supabase, LanceDB)
│   ├── skills/            # Custom OpenClaw Skills per agent
│   │   ├── cfo-finance/   # CFO bookkeeping, budgets, reports (requires Supabase)
│   │   ├── cio-portfolio/ # CIO portfolio CRUD, P&L (requires Supabase)
│   │   └── coo-schedule/  # COO scheduling, conflict detection (requires Supabase)
│   └── workspace-{agent}/ # Per-agent workspace templates
│       ├── SOUL.md        # Role definition, responsibilities, boundaries
│       ├── MEMORY.md      # Hot memory (≤200 lines)
│       └── HEARTBEAT.md   # Heartbeat task definitions
├── README.md
└── LICENSE                # MIT
```

### Design Principles

| Principle | Description |
|-----------|-------------|
| Three-tier Approval | Green (auto) → Yellow (CEO review) → Red (Chairman approval) |
| Three-party Checks | CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy) |
| Layered Memory | Hot (MEMORY.md) → Warm (daily logs) → Cold (LanceDB, future) |
| Layered Governance | AGENTS.md (index) → SOUL.md (role) → policies/ (details) |
| On-demand Loading | Policies loaded only when triggered, saving tokens |
| Refined Reporting | Layer-by-layer refinement; Chairman receives summaries only |

### Getting Started

#### Prerequisites

- [OpenClaw](https://github.com/openclaw/openclaw) installed
- At least one LLM API Key (Anthropic recommended; any OpenClaw-supported model works)
- A messaging platform bot token (Telegram recommended; WhatsApp/Discord also supported)

#### Step 1 — Clone

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company
```

#### Step 2 — Configure Tokens

Edit `claw-company-config/openclaw.json` and replace the placeholders:

| Placeholder | Description |
|-------------|-------------|
| `YOUR_CEO_BOT_TOKEN` | Telegram Bot Token for CEO |
| `YOUR_CAO_BOT_TOKEN` | Telegram Bot Token for CAO (optional, for independent audit channel) |
| `YOUR_TELEGRAM_ID` | Your Telegram User ID |
| `YOUR_DISCORD_BOT_TOKEN` | Discord Bot Token (optional) |
| `YOUR_GATEWAY_TOKEN` | A secure string you create for gateway auth |

#### Step 3 — Customize Your Profile

Edit `claw-company-config/shared/USER.md` — replace the default Chairman profile with your own preferences (language, communication style, notification rules).

#### Step 4 — Deploy

```bash
cd claw-company-config
chmod +x setup.sh
./setup.sh
```

The script will:
- Copy `openclaw.json` to `~/.openclaw/`
- Create all 7 agent workspaces under `~/.openclaw/`
- Set up symlinks for shared policies
- Print the `openclaw agents add` and `openclaw cron add` commands

#### Step 5 — Register Agents & Cron

Copy and run the commands printed by `setup.sh` to register the 7 agents and 5 cron jobs.

#### Step 6 — Start

```bash
openclaw gateway start
```

#### Step 7 — Test

Send a message to your CEO Telegram Bot, e.g., "Hello, please introduce yourself."

### Agent Models

| Agent | Model | Reason |
|-------|-------|--------|
| CEO | claude-sonnet-4-6 | Core coordinator, needs strong reasoning |
| CFO | claude-sonnet-4-6 | Financial accuracy matters |
| CIO | claude-sonnet-4-6 | Investment analysis needs depth |
| COO | claude-haiku-4-5 | Life tasks are frequent but simple |
| CTO | claude-sonnet-4-6 | Technical decisions need precision |
| CHRO | claude-haiku-4-5 | Policy tasks are periodic, not complex |
| CAO | claude-sonnet-4-6 | Audit requires independent strong reasoning |

### License

[MIT](LICENSE)

---

## 繁體中文

### 概述

Claw Company 是一個為**一人公司**設計的**多代理人 AI 架構**。透過 [OpenClaw](https://github.com/openclaw/openclaw) 協調多個 AI Agent，組成虛擬高階管理團隊（C-suite），涵蓋日常生活管理到產品開發的各個面向。

### 架構

```
董事長（人類）
  ↕ Telegram / WhatsApp / Discord
CEO（總經理）— 統籌、分派、精煉回報
  ├── CFO（財務長）— 記帳、預算、成本審計
  ├── CIO（投資長）— 投資組合監控、市場分析
  ├── COO（營運長）— 行程、飲食、出行、生活管理
  ├── CTO（技術長）— 產品開發、工兵 Sub-Agent 管理
  └── CHRO（人資長）— Agent 能力評估、政策撰寫

CAO（稽核長）— 獨立監督，直接向董事長報告
```

### 專案結構

```
claw-company/
├── claw-company-config/   # OpenClaw 部署配置
│   ├── openclaw.json      # 主配置檔（JSON5）— Agent 定義、通道、排程
│   ├── setup.sh           # 一鍵部署腳本
│   ├── shared/            # 跨 Agent 共用政策與規範
│   │   ├── AGENTS.md      # 全公司營運規範
│   │   ├── USER.md        # 董事長資訊（請自行修改為你的偏好）
│   │   ├── policies/      # 核決權限、安全、記憶、稽核、資料存取政策
│   │   └── setup-guides/  # 資料庫與插件安裝指南（Supabase、LanceDB）
│   ├── skills/            # 自定義 OpenClaw Skill（各 Agent 專用）
│   │   ├── cfo-finance/   # CFO 記帳、預算、報表（需 Supabase）
│   │   ├── cio-portfolio/ # CIO 投資組合 CRUD、損益計算（需 Supabase）
│   │   └── coo-schedule/  # COO 行程管理、衝突檢測（需 Supabase）
│   └── workspace-{agent}/ # 各 Agent 的 workspace 模板
│       ├── SOUL.md        # 角色定義、職責、邊界
│       ├── MEMORY.md      # 熱記憶（≤200 行）
│       └── HEARTBEAT.md   # 心跳任務定義
├── README.md
└── LICENSE                # MIT 授權
```

### 設計原則

| 原則 | 說明 |
|------|------|
| 三級核決 | 綠燈自動 → 黃燈 CEO 審 → 紅燈董事長核決 |
| 三方制衡 | CEO（執行）↔ CAO（監督）↔ CHRO（政策），僵局由董事長裁決 |
| 記憶分層 | MEMORY.md（熱）→ 每日日誌（溫）→ LanceDB（冷，未來規劃） |
| 治理分層 | AGENTS.md（索引）→ SOUL.md（角色）→ policies/（詳細規範） |
| 按需載入 | policies/ 只在觸發情境時讀取，節省 Token |
| 精煉回報 | 逐層精煉，董事長只收到摘要，不收原始資料 |

### 快速開始

#### 前置條件

- 已安裝 [OpenClaw](https://github.com/openclaw/openclaw)
- 至少一組 LLM API Key（推薦 Anthropic；任何 OpenClaw 支援的模型皆可）
- 一組通訊平台 Bot Token（推薦 Telegram；WhatsApp / Discord 也支援）

#### 步驟一 — Clone

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company
```

#### 步驟二 — 配置 Token

編輯 `claw-company-config/openclaw.json`，替換以下佔位符：

| 佔位符 | 說明 |
|--------|------|
| `YOUR_CEO_BOT_TOKEN` | CEO 的 Telegram Bot Token |
| `YOUR_CAO_BOT_TOKEN` | CAO 的 Telegram Bot Token（可選，稽核獨立通道） |
| `YOUR_TELEGRAM_ID` | 你的 Telegram User ID |
| `YOUR_DISCORD_BOT_TOKEN` | Discord Bot Token（可選） |
| `YOUR_GATEWAY_TOKEN` | 自行設定一個安全字串，用於 Gateway 認證 |

#### 步驟三 — 自訂你的身份

編輯 `claw-company-config/shared/USER.md` — 把預設的董事長資訊改成你自己的偏好（語言、溝通風格、通知規則）。

#### 步驟四 — 部署

```bash
cd claw-company-config
chmod +x setup.sh
./setup.sh
```

腳本會自動：
- 把 `openclaw.json` 複製到 `~/.openclaw/`
- 建立 7 個 Agent workspace 到 `~/.openclaw/`
- 設定共用政策的軟連結
- 印出 `openclaw agents add` 和 `openclaw cron add` 指令

#### 步驟五 — 註冊 Agent 與排程

複製 `setup.sh` 輸出的指令，逐一執行，註冊 7 個 Agent 和 5 個 Cron 排程。

#### 步驟六 — 啟動

```bash
openclaw gateway start
```

#### 步驟七 — 測試

透過 Telegram 向 CEO Bot 發送訊息，例如：「你好，請自我介紹。」

### Agent 模型配置

| Agent | 模型 | 原因 |
|-------|------|------|
| CEO | claude-sonnet-4-6 | 核心協調者，需要強推理能力 |
| CFO | claude-sonnet-4-6 | 財務準確性重要 |
| CIO | claude-sonnet-4-6 | 投資分析需要深度 |
| COO | claude-haiku-4-5 | 生活任務頻繁但簡單 |
| CTO | claude-sonnet-4-6 | 技術決策需要精確 |
| CHRO | claude-haiku-4-5 | 政策任務是週期性的，不複雜 |
| CAO | claude-sonnet-4-6 | 稽核需要獨立的強推理能力 |

### 授權

[MIT](LICENSE)
