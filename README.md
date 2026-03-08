# Claw Company — One-Person Company Multi-Agent Architecture

[繁體中文](#繁體中文) | [English](#english)

---

## English

### Overview

Claw Company is a **multi-agent AI architecture** designed for one-person companies. It uses [OpenClaw](https://github.com/openclaw/openclaw) to orchestrate multiple AI agents that function as a virtual C-suite, handling everything from daily life management to product development.

The project supports **English** and **Traditional Chinese** — choose your language during setup.

### Architecture

```
Chairman (Human Owner)
  ↕ Telegram / WhatsApp / Discord
CEO (General Manager) — Coordination, delegation, refined reporting
  ├── CFO (Finance)    — Bookkeeping, budgeting, cost auditing
  ├── CIO (Investment) — Portfolio monitoring, market analysis
  ├── COO (Operations) — Scheduling, meals, travel, life management
  ├── CTO (Technology) — Product development, sub-agent management
  │     └── 11 Engineer Sub-Agents
  │          PM, Architect, Dev, QA, UX, Tech-Writer, Analyst, Scrum-Master, Solo-Dev, Spec-Reviewer, Code-Reviewer
  └── CHRO (HR)        — Agent capability assessment, policy writing

CAO (Auditor) — Independent oversight, reports directly to Chairman
```

### Agent ID Reference

All agents are registered with a `cc-` prefix to avoid naming conflicts in multi-project environments.

| Agent | ID | Role |
|-------|----|------|
| CEO | `cc-ceo` | Core coordinator |
| CFO | `cc-cfo` | Finance |
| CIO | `cc-cio` | Investment |
| COO | `cc-coo` | Operations |
| CTO | `cc-cto` | Technology |
| CHRO | `cc-chro` | Human Resources |
| CAO | `cc-cao` | Audit |

### Project Structure

```
claw-company/
├── claw-company-config/           # OpenClaw deployment configuration
│   ├── install.sh                 # Bilingual deployment script
│   ├── en/                        # English version
│   └── zh/                        # Chinese version
│       ├── openclaw.json          # Main config (JSON5) — agent definitions, channels, cron
│       ├── shared/                # Shared policies & rules across all agents
│       │   ├── company-rules.md   # Company rules (runtime read)
│       │   ├── tools-policy.md    # Common tool policies (runtime read)
│       │   ├── brain-methods.csv  # 60 brainstorming techniques
│       │   ├── USER.md            # Chairman preferences
│       │   ├── policies/          # On-demand policy files
│       │   ├── standards/         # Format standards (agent, workflow)
│       │   ├── tasks/             # 8 shared task descriptions
│       │   └── setup-guides/      # Database & plugin setup guides
│       ├── skills/                # Custom OpenClaw Skills per agent
│       └── workspace-{agent}/     # Per-agent workspace
│           ├── IDENTITY.md        # Role identity
│           ├── SOUL.md            # Role personality & boundaries
│           ├── AGENTS.md          # Role responsibilities + startup-read
│           ├── TOOLS.md           # Tool policies + domain operations
│           ├── HEARTBEAT.md       # Heartbeat logic
│           ├── MEMORY.md          # Hot memory (200-line cap)
│           ├── workflows/         # BMAD micro-file workflows
│           ├── templates/         # Output templates
│           └── output/            # Agent work output (preserved on upgrade)
├── README.md
└── LICENSE                        # MIT
```

### BMAD Workflow System

The company integrates the [BMAD Method](https://github.com/bmad-method/bmad-method) lifecycle into OpenClaw's native mechanisms, providing **54 structured workflows** across all agents.

- **Micro-file pattern**: `workflow.md` (definition + step table) + `steps/step-0N-xxx.md` (independent step files)
- **Just-In-Time loading**: Only reads current step file, never pre-reads subsequent steps
- **Session continuity**: YAML frontmatter enables resumption after interruption

#### CTO Workflows (BMAD 4-Phase Lifecycle)

| Phase | Workflows |
|---|---|
| Analysis | create-product-brief, research |
| Planning | create-prd (3 modes), create-ux-design |
| Solutioning | create-architecture, create-epics-and-stories, check-readiness |
| Implementation | dev-story, sprint-planning, create-story, code-review |
| Quick Flow | quick-spec, quick-dev |
| TEA Testing | test-design, test-review, atdd, automate, framework, ci, trace, nfr |
| Support | sprint-status, correct-course, retrospective, document-project, generate-project-context |
| Dev Dispatch | dev-dispatch (brainstorming → scale assessment → task breakdown → dispatch → review) |

#### C-Suite Workflows

| Agent | Workflows |
|---|---|
| CEO | dispatch-task, morning-briefing, brainstorming, deep-discussion, advisory-panel |
| CFO | record-expense, purchase-analysis, token-audit, monthly-closing, budget-alert |
| CIO | portfolio-monitor, investment-analysis, weekly-report, opportunity-scan |
| COO | meal-recommendation, trip-planning, schedule-management, weather-check, predictive-management |
| CHRO | agent-assessment, policy-drafting, model-evaluation, org-review, memory-audit, create-agent, knowledge-migration |
| CAO | security-scan, audit-issue, compliance-check, emergency-brake, soul-integrity |

### Design Principles

| Principle | Description |
|-----------|-------------|
| Three-tier Approval | Green (auto) → Yellow (CEO review) → Red (Chairman approval) |
| Three-way Checks | CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy) |
| Layered Memory | MEMORY.md (hot) → memory/ logs (warm) → built-in vector search (cold) |
| Layered Governance | AGENTS.md (index) → SOUL.md (role) → policies/ (details) |
| On-demand Loading | Policies loaded only when triggered, saving tokens |
| Refined Reporting | Layer-by-layer refinement; Chairman receives summaries only |
| BMAD Lifecycle | Analysis → Planning → Solutioning → Implementation structured phases |
| TDD Iron Law | RED → GREEN → REFACTOR cycle enforced for all coding tasks |
| Anti-Rationalization | Every iron law and SOUL.md includes excuse-vs-fact tables to counter LLM rationalization tendencies |
| Two-Phase Review | Spec compliance (Scout) → Code quality (Knox); fresh sub-agent per task; controller never fixes |
| Verification Before Completion | No claims without fresh evidence; "should work" is forbidden |

### Getting Started

#### Prerequisites

- [OpenClaw](https://github.com/openclaw/openclaw) >= 2026.3.7
- At least one LLM API Key configured in OpenClaw (Anthropic recommended)
- A messaging platform Bot Token (Telegram recommended; WhatsApp/Discord also supported)

#### Step 1 — Clone

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company/claw-company-config
```

#### Step 2 — Configure Tokens

Edit `{en|zh}/openclaw.json` and replace the placeholders:

| Placeholder | Description |
|-------------|-------------|
| `YOUR_CEO_BOT_TOKEN` | CEO Telegram Bot Token |
| `YOUR_CAO_BOT_TOKEN` | CAO Telegram Bot Token (optional, for independent audit channel) |
| `YOUR_TELEGRAM_ID` | Your Telegram User ID |
| `YOUR_DISCORD_BOT_TOKEN` | Discord Bot Token (optional) |
| `YOUR_GATEWAY_TOKEN` | A secure string you create for gateway auth |

#### Step 3 — Customize Your Profile

Edit `{en|zh}/shared/USER.md` — replace the default Chairman profile with your own preferences.

#### Step 4 — Deploy

```bash
chmod +x install.sh
./install.sh
```

The script will prompt you to choose a language (English or Chinese), then:
- Copy configuration to `~/.openclaw/`
- Create all 7 agent workspaces
- Set up symlinks for shared policies
- Print the `openclaw agents add` and `openclaw cron add` commands

#### Step 5 — Register Agents & Cron

Copy and run the commands printed by `install.sh`.

#### Step 6 — Start

```bash
openclaw gateway start
```

#### Step 7 — Test

Send a message to your CEO Bot via Telegram, e.g., "Hello, please introduce yourself."

### Upgrade & Uninstall

**Upgrade**: Re-run `./install.sh`. The following data is preserved automatically: `MEMORY.md`, `output/`, `auth-profiles.json`.

**Uninstall**: Run `./install.sh --uninstall` to remove installed files at `~/.openclaw/claw-company/`.

### Agent Model Configuration

The setup script reads available models and lets you assign them to two tiers:

| Agent | Default Tier | Rationale |
|-------|-------------|-----------|
| CEO | smart | Core coordinator, needs strong reasoning |
| CFO | smart | Financial accuracy matters |
| CIO | smart | Investment analysis needs depth |
| COO | fast | Life tasks are frequent but simple |
| CTO | smart | Technical decisions need precision |
| CTO Sub-Agents | fast | Execution tasks |
| CHRO | fast | Policy tasks are periodic, not complex |
| CAO | smart | Audit requires independent strong reasoning |

### Cron Schedule

| Name | Agent | Schedule | Purpose |
|------|-------|----------|---------|
| morning-briefing | CEO | Daily 06:30 | Morning briefing |
| investment-monitor | CIO | Mon-Fri 09-16 hourly | Portfolio monitoring |
| memory-cleanup | CHRO | 1st of month 03:00 | Memory health review |
| weekly-org-review | CHRO | Monday 08:00 | Org health report |
| security-scan | CAO | Wednesday 02:00 | Security scan |
| cto-memory-cleanup | CTO | Sunday 03:00 | CTO memory self-cleanup |

### License

[MIT](LICENSE)

---

## 繁體中文

### 概述

Claw Company 是一個為**一人公司**設計的**多代理人 AI 架構**。透過 [OpenClaw](https://github.com/openclaw/openclaw) 協調多個 AI Agent，組成虛擬高階管理團隊（C-suite），涵蓋日常生活管理到產品開發的各個面向。

本專案支援**英文**和**繁體中文**——部署時選擇你的語言即可。

### 架構

```
董事長（人類擁有者）
  ↕ Telegram / WhatsApp / Discord
CEO（總經理）— 統籌、分派、精煉回報
  ├── CFO（財務長）— 記帳、預算、成本審計
  ├── CIO（投資長）— 投資組合監控、市場分析
  ├── COO（營運長）— 行程、飲食、出行、生活管理
  ├── CTO（技術長）— 產品開發、工程師管理
  │     └── 11 位工程師子代理
  │          PM、Architect、Dev、QA、UX、Tech-Writer、Analyst、Scrum-Master、Solo-Dev、Spec-Reviewer、Code-Reviewer
  └── CHRO（人資長）— Agent 能力評估、政策撰寫

CAO（稽核長）— 獨立監督，直接向董事長報告
```

### Agent ID 對照表

所有 Agent 註冊時加上 `cc-` 前綴，避免多專案命名衝突。

| Agent | ID | 角色 |
|-------|----|------|
| CEO 總經理 | `cc-ceo` | 核心協調 |
| CFO 財務長 | `cc-cfo` | 財務 |
| CIO 投資長 | `cc-cio` | 投資 |
| COO 營運長 | `cc-coo` | 營運 |
| CTO 技術長 | `cc-cto` | 技術 |
| CHRO 人資長 | `cc-chro` | 人力資源 |
| CAO 稽核長 | `cc-cao` | 稽核 |

### 專案結構

```
claw-company/
├── claw-company-config/           # OpenClaw 部署配置
│   ├── install.sh                 # 雙語部署腳本
│   ├── en/                        # 英文版
│   └── zh/                        # 中文版
│       ├── openclaw.json          # 主配置檔（JSON5）— Agent 定義、通道、排程
│       ├── shared/                # 跨 Agent 共用政策與規範
│       │   ├── company-rules.md   # 公司規範（啟動時載入）
│       │   ├── tools-policy.md    # 通用工具規範（啟動時載入）
│       │   ├── brain-methods.csv  # 60 個腦力激盪技法
│       │   ├── USER.md            # 董事長偏好
│       │   ├── policies/          # 按需載入政策文件
│       │   ├── standards/         # 格式標準（Agent、工作流程）
│       │   ├── tasks/             # 8 個共用任務描述
│       │   └── setup-guides/      # 資料庫與插件安裝指南
│       ├── skills/                # 自定義 OpenClaw Skill（各 Agent 專用）
│       └── workspace-{agent}/     # 各 Agent 工作區
│           ├── IDENTITY.md        # 角色身份
│           ├── SOUL.md            # 角色人格與邊界
│           ├── AGENTS.md          # 角色職責 + 啟動必讀
│           ├── TOOLS.md           # 工具規範 + 領域操作
│           ├── HEARTBEAT.md       # 心跳巡檢邏輯
│           ├── MEMORY.md          # 熱記憶（上限 200 行）
│           ├── workflows/         # BMAD 微檔案工作流程
│           ├── templates/         # 產出範本
│           └── output/            # Agent 工作產出（升級時保留）
├── README.md
└── LICENSE                        # MIT 授權
```

### BMAD 工作流程系統

公司將 [BMAD 方法論](https://github.com/bmad-method/bmad-method)的生命週期整合進 OpenClaw 原生機制，共提供 **54 個結構化工作流程**。

- **微檔案模式**：`workflow.md`（定義 + 步驟表）+ `steps/step-0N-xxx.md`（獨立步驟檔案）
- **即時載入**：只讀取當前步驟檔案，不預先讀取後續步驟
- **Session 續接**：YAML frontmatter 支援中斷後恢復

#### CTO 工作流程（BMAD 四階段生命週期）

| 階段 | 工作流程 |
|------|---------|
| 分析 | create-product-brief、research |
| 規劃 | create-prd（3 種模式）、create-ux-design |
| 方案 | create-architecture、create-epics-and-stories、check-readiness |
| 實作 | dev-story、sprint-planning、create-story、code-review |
| 快速流程 | quick-spec、quick-dev |
| TEA 測試 | test-design、test-review、atdd、automate、framework、ci、trace、nfr |
| 支援 | sprint-status、correct-course、retrospective、document-project、generate-project-context |
| 開發派發 | dev-dispatch（腦力激盪 → 規模評估 → 任務拆分 → 派發 → 審查）|

#### 高管工作流程

| 角色 | 工作流程 |
|------|---------|
| CEO 總經理 | dispatch-task、morning-briefing、brainstorming、deep-discussion、advisory-panel |
| CFO 財務長 | record-expense、purchase-analysis、token-audit、monthly-closing、budget-alert |
| CIO 投資長 | portfolio-monitor、investment-analysis、weekly-report、opportunity-scan |
| COO 營運長 | meal-recommendation、trip-planning、schedule-management、weather-check、predictive-management |
| CHRO 人資長 | agent-assessment、policy-drafting、model-evaluation、org-review、memory-audit、create-agent、knowledge-migration |
| CAO 稽核長 | security-scan、audit-issue、compliance-check、emergency-brake、soul-integrity |

### 設計原則

| 原則 | 說明 |
|------|------|
| 三級核決 | 綠燈自動 → 黃燈 CEO 審 → 紅燈董事長核決 |
| 三方制衡 | CEO（執行）↔ CAO（監督）↔ CHRO（政策），僵局由董事長裁決 |
| 記憶分層 | MEMORY.md（熱）→ memory/ 日誌（溫）→ 內建向量搜尋（冷） |
| 治理分層 | AGENTS.md（索引）→ SOUL.md（角色）→ policies/（詳細規範） |
| 按需載入 | policies/ 只在觸發情境時讀取，節省 Token |
| 精煉回報 | 逐層精煉，董事長只收到摘要，不收原始資料 |
| BMAD 生命週期 | 分析 → 規劃 → 方案 → 實作 結構化階段 |
| TDD 鐵律 | RED → GREEN → REFACTOR 循環，所有編碼任務強制遵守 |
| 反合理化機制 | 每條鐵律和 SOUL.md 都含「藉口 vs 事實」對照表，對抗 LLM 合理化傾向 |
| 兩階段審查 | 規格合規（Scout）→ 程式碼品質（Knox）；每任務新鮮 sub-agent；controller 不修復 |
| 完成前驗證 | 沒有新鮮驗證證據不可宣稱完成；「應該沒問題」是禁用語 |

### 快速開始

#### 前置條件

- 已安裝 [OpenClaw](https://github.com/openclaw/openclaw) >= 2026.3.7
- 至少一組已在 OpenClaw 中配置的 LLM API Key（推薦 Anthropic）
- 一組通訊平台 Bot Token（推薦 Telegram；WhatsApp / Discord 也支援）

#### 步驟一 — Clone

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company/claw-company-config
```

#### 步驟二 — 配置 Token

編輯 `{en|zh}/openclaw.json`，替換以下佔位符：

| 佔位符 | 說明 |
|--------|------|
| `YOUR_CEO_BOT_TOKEN` | CEO 的 Telegram Bot Token |
| `YOUR_CAO_BOT_TOKEN` | CAO 的 Telegram Bot Token（可選，稽核獨立通道） |
| `YOUR_TELEGRAM_ID` | 你的 Telegram User ID |
| `YOUR_DISCORD_BOT_TOKEN` | Discord Bot Token（可選） |
| `YOUR_GATEWAY_TOKEN` | 自行設定一個安全字串，用於 Gateway 認證 |

#### 步驟三 — 自訂你的身份

編輯 `{en|zh}/shared/USER.md` — 把預設的董事長資訊改成你自己的偏好。

#### 步驟四 — 部署

```bash
chmod +x install.sh
./install.sh
```

腳本會提示你選擇語言（英文或中文），然後自動：
- 把配置複製到 `~/.openclaw/`
- 建立 7 個 Agent workspace
- 設定共用政策的軟連結
- 印出 `openclaw agents add` 和 `openclaw cron add` 指令

#### 步驟五 — 註冊 Agent 與排程

複製 `install.sh` 輸出的指令，逐一執行。

#### 步驟六 — 啟動

```bash
openclaw gateway start
```

#### 步驟七 — 測試

透過 Telegram 向 CEO Bot 發送訊息，例如：「你好，請自我介紹。」

### 升級與移除

**升級**：重新執行 `./install.sh`。以下資料會自動保留：`MEMORY.md`、`output/`、`auth-profiles.json`。

**移除**：執行 `./install.sh --uninstall`，移除安裝在 `~/.openclaw/claw-company/` 的檔案。

### Agent 模型配置

部署腳本會從你現有的 OpenClaw 配置中讀取可用模型，讓你指定兩個等級：

| 角色 | 預設等級 | 原因 |
|------|---------|------|
| CEO 總經理 | smart | 核心協調者，需要強推理能力 |
| CFO 財務長 | smart | 財務準確性重要 |
| CIO 投資長 | smart | 投資分析需要深度 |
| COO 營運長 | fast | 生活任務頻繁但簡單，省 Token |
| CTO 技術長 | smart | 技術決策需要精確 |
| CTO 子代理 | fast | 執行任務 |
| CHRO 人資長 | fast | 政策任務是週期性的，不複雜 |
| CAO 稽核長 | smart | 稽核需要獨立的強推理能力 |

### 排程總覽

| 名稱 | 角色 | 時間 | 用途 |
|------|------|------|------|
| morning-briefing | CEO | 每日 06:30 | 晨間會報 |
| investment-monitor | CIO | 週一至五 09-16 每小時 | 投資監控 |
| memory-cleanup | CHRO | 每月 1 日 03:00 | 記憶審視 |
| weekly-org-review | CHRO | 週一 08:00 | 組織健康週報 |
| security-scan | CAO | 週三 02:00 | 安全掃描 |
| cto-memory-cleanup | CTO | 週日 03:00 | CTO 記憶自清理 |

### 授權

[MIT](LICENSE)
