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
chmod +x install.sh
./install.sh
```

The setup script will prompt you to choose a language. All configuration files, agent personalities, policies, and documentation will be deployed in your selected language.

部署腳本會提示你選擇語言。所有配置文件、Agent 人格設定、政策文件和說明文件都會以你選擇的語言部署。

## Architecture / 架構總覽

### Org Chart / 組織圖

```
Chairman / 董事長（人類擁有者）
  ↕ Telegram / WhatsApp / Discord
CEO 總經理（Chief Executive Officer）— Coordination, dispatch, refined reporting / 統籌、分派、精煉回報
  ├── CFO 財務長（Chief Financial Officer）— Finance, budgets, cost auditing / 記帳、預算、成本審計
  ├── CIO 投資長（Chief Investment Officer）— Investment portfolio, market analysis / 投資組合監控、市場分析
  ├── COO 營運長（Chief Operating Officer）— Schedule, meals, travel, life management / 行程、飲食、出行、生活管理
  ├── CTO 技術長（Chief Technology Officer）— Product development, sub-agent management / 產品開發、工程師管理
  │     └── 10 Engineer Sub-Agents / 10 位工程師子代理
  │          PM, Architect, Dev, QA, UX, Tech-Writer, Analyst, Scrum-Master, Solo-Dev, Code-Reviewer
  └── CHRO 人資長（Chief Human Resources Officer）— Agent evaluation, policy writing / Agent 能力評估、政策撰寫

CAO 稽核長（Chief Audit Officer）— Independent audit, reports directly to Chairman / 獨立監督，直接向董事長報告
```

### Agent ID Reference / Agent ID 對照表

All agents are registered with a `cc-` prefix to avoid naming conflicts in multi-project environments.
所有 Agent 註冊時加上 `cc-` 前綴，避免多專案命名衝突。

| Agent | ID | Role / 角色 |
|-------|----|-------------|
| CEO 總經理 | `cc-ceo` | Core coordinator / 核心協調 |
| CFO 財務長 | `cc-cfo` | Finance / 財務 |
| CIO 投資長 | `cc-cio` | Investment / 投資 |
| COO 營運長 | `cc-coo` | Operations / 營運 |
| CTO 技術長 | `cc-cto` | Technology / 技術 |
| CHRO 人資長 | `cc-chro` | Human Resources / 人力資源 |
| CAO 稽核長 | `cc-cao` | Audit / 稽核 |

## File Structure / 文件結構

```
claw-company-config/
├── install.sh                    # Bilingual deployment script / 雙語部署腳本
├── README.md                     # This file / 本文件
├── en/                           # English version / 英文版
└── zh/                           # Chinese version / 中文版
    ├── openclaw.json
    ├── shared/
    │   ├── company-rules.md      # Company rules (runtime read) / 公司規範（啟動時載入）
    │   ├── tools-policy.md       # Common tool policies (runtime read) / 通用工具規範（啟動時載入）
    │   ├── brain-methods.csv     # 60 brainstorming techniques / 60 個腦力激盪技法
    │   ├── USER.md               # Chairman preferences / 董事長偏好
    │   ├── policies/             # On-demand policy files / 按需載入政策文件
    │   ├── setup-guides/         # Tech environment guides / 技術環境設定指南
    │   │   ├── database-setup.md
    │   │   └── supabase-setup.md
    │   ├── standards/            # Format standards / 格式標準
    │   │   ├── agent-format.md   # Agent definition format / Agent 定義檔案格式
    │   │   └── workflow-format.md # Workflow file format / 工作流程檔案格式
    │   ├── tasks/                # 8 shared task descriptions (reviews, utilities) / 8 個共用任務描述
    │   └── templates/new-agent/  # New agent template (for CHRO) / 新 Agent 範本（CHRO 用）
    ├── workspace-{agent}/        # Each C-suite agent workspace / 每個高管 Agent 工作區
    │   ├── IDENTITY.md           # Role identity / 角色身份
    │   ├── SOUL.md               # Role personality & boundaries / 角色人格與邊界
    │   ├── AGENTS.md             # Role responsibilities + startup-read / 角色職責 + 啟動必讀
    │   ├── TOOLS.md              # Tool policies + domain operations / 工具規範 + 領域操作
    │   ├── HEARTBEAT.md          # Heartbeat logic / 心跳巡檢邏輯
    │   ├── MEMORY.md             # Hot memory (200-line cap) / 熱記憶（上限 200 行）
    │   ├── workflows/            # BMAD micro-file workflows / BMAD 微檔案工作流程
    │   │   └── {workflow}/
    │   │       ├── workflow.md   # Workflow definition + step table / 流程定義 + 步驟表
    │   │       └── steps/        # Step files (JIT loading) / 步驟檔案（即時載入）
    │   ├── templates/            # Output templates / 產出範本
    │   └── output/               # Agent work output (preserved on upgrade) / Agent 工作產出（升級時保留）
    ├── workspace-ceo/            # CEO（總經理）additional structure / 額外結構
    │   └── skills/               # CEO skills (brainstorming) / CEO 專屬 Skill
    └── workspace-cto/            # CTO（技術長）additional structure / 額外結構
        ├── engineers/            # 10 Sub-Agent definitions / 10 個工程師定義
        │   ├── roster.md         # Engineer roster / 工程師清單
        │   ├── {role}.md         # Role definition / 角色定義
        │   └── sidecar/          # Domain knowledge / 領域知識
        │       ├── qa/test-standards.md
        │       └── tech-writer/documentation-standards.md
        ├── rules/                # Iron laws / 開發鐵律
        │   ├── tdd-iron-law.md           # RED → GREEN → REFACTOR
        │   ├── debugging-iron-law.md     # Systematic debugging protocol / 系統化除錯
        │   └── verification.md           # Verification before completion / 完成前驗證
        └── skills/               # CTO skills (dev-dispatch) / CTO 專屬 Skill
```

## Prerequisites / 前置條件

- OpenClaw >= 2026.3.7 / 已安裝 OpenClaw >= 2026.3.7（https://github.com/openclaw/openclaw）
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
chmod +x install.sh
./install.sh
```

### 3. Register Agents and Cron / 註冊 Agent 和排程

Copy and run the commands printed by the setup script.
複製並執行 install.sh 輸出的指令。

### 4. Start / 啟動

```bash
openclaw gateway start
```

### 5. Test / 測試

Send a message to the CEO Bot via your configured messaging platform (Telegram, Discord, or WhatsApp).
透過你設定的通訊平台（Telegram、Discord 或 WhatsApp）向 CEO Bot 發送訊息測試。

## Upgrade & Uninstall / 升級與移除

### Upgrade / 升級

Re-run `./install.sh` to upgrade. The following data is **preserved** automatically:
重新執行 `./install.sh` 即可升級。以下資料會**自動保留**：

- `MEMORY.md` — Each agent's hot memory / 各 Agent 熱記憶
- `output/` — Agent work output / Agent 工作產出
- `auth-profiles.json` — Authentication profiles / 認證設定

### Uninstall / 移除

```bash
./install.sh --uninstall
```

This removes the installed files at `~/.openclaw/claw-company/` and the symlink to `openclaw.json`.
這會移除安裝在 `~/.openclaw/claw-company/` 的檔案及 `openclaw.json` 的符號連結。

## BMAD Workflow System / BMAD 工作流程系統

The company integrates the [BMAD Method](https://github.com/bmad-method/bmad-method) lifecycle into OpenClaw's native mechanisms, providing structured workflows for every agent.

公司將 BMAD 方法論的生命週期整合進 OpenClaw 原生機制，為每個 Agent 提供結構化工作流程。

### Workflow Architecture / 工作流架構

- **Micro-file pattern / 微檔案模式**: `workflow.md` (definition + step table) + `steps/step-0N-xxx.md` (independent step files)
- **Just-In-Time loading / 即時載入**: Only reads current step file, never pre-reads subsequent steps
- **Session continuity / Session 續接**: YAML frontmatter `steps-completed` array enables resumption after interruption
- **54 total workflows / 共 54 個工作流程**: CTO (23), CEO (5), CFO (5), CIO (4), COO (5), CHRO (7), CAO (5)

### CTO Workflows (BMAD 4-Phase Lifecycle) / CTO（技術長）工作流程

| Phase / 階段 | Workflows | Description / 說明 |
|---|---|---|
| Analysis / 分析 | create-product-brief, research | Product discovery, market/domain/tech research |
| Planning / 規劃 | create-prd (3 modes), create-ux-design | PRD creation/edit/validate, UX design |
| Solutioning / 方案 | create-architecture, create-epics-and-stories, check-readiness | Architecture (ADR), epic breakdown, readiness gate |
| Implementation / 實作 | dev-story, sprint-planning, create-story, code-review | TDD development, sprint management, reviews |
| Quick Flow / 快速流程 | quick-spec, quick-dev | Small feature fast track |
| TEA Testing / TEA 測試 | test-design, test-review, atdd, automate, framework, ci, trace, nfr | Full test lifecycle |
| Support / 支援 | sprint-status, correct-course, retrospective, document-project, generate-project-context | Sprint tracking, course correction |
| Dev Dispatch / 開發派發 | dev-dispatch | Brainstorming → scale assessment → task breakdown → dispatch → review |

### C-Suite Workflows / 高管工作流程

| Agent / 角色 | Workflows | Focus / 重點 |
|---|---|---|
| CEO 總經理 | dispatch-task, morning-briefing, brainstorming, deep-discussion, advisory-panel | Coordination, strategic thinking / 統籌、策略思考 |
| CFO 財務長 | record-expense, purchase-analysis, token-audit, monthly-closing, budget-alert | Financial management / 財務管理 |
| CIO 投資長 | portfolio-monitor, investment-analysis, weekly-report, opportunity-scan | Investment management / 投資管理 |
| COO 營運長 | meal-recommendation, trip-planning, schedule-management, weather-check, predictive-management | Life management / 生活管理 |
| CHRO 人資長 | agent-assessment, policy-drafting, model-evaluation, org-review, memory-audit, create-agent, knowledge-migration | HR & organizational health / 人資與組織健康 |
| CAO 稽核長 | security-scan, audit-issue, compliance-check, emergency-brake, soul-integrity | Independent audit / 獨立稽核 |

## Design Principles / 設計原則

| Principle / 原則 | Description / 說明 |
|---|---|
| Three-tier Approval / 三級核決 | Green (auto) → Yellow (CEO review) → Red (Chairman approval) |
| Three-way Checks / 三方制衡 | CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy) |
| Layered Memory / 記憶分層 | MEMORY.md (hot) → memory/ logs (warm) → built-in vector search (cold) |
| Layered Governance / 治理分層 | AGENTS.md (index) → SOUL.md (role) → policies/ (details) |
| On-demand Loading / 按需載入 | Policies loaded only when triggered, saving tokens |
| Refined Reporting / 精煉回報 | Layer-by-layer refinement; Chairman receives summaries only |
| BMAD Lifecycle / BMAD 生命週期 | Analysis → Planning → Solutioning → Implementation structured phases |
| Micro-file Workflows / 微檔案工作流 | JIT step loading, session-resumable, YAML state tracking |
| TDD Iron Law / TDD 鐵律 | RED → GREEN → REFACTOR cycle enforced for all coding tasks |

## Agent Model Configuration / Agent 模型配置

The setup script reads available models from your existing OpenClaw configuration and lets you assign them to two aliases:
部署腳本會從你現有的 OpenClaw 配置中讀取可用模型，讓你指定兩個別名：

- **smart** — High capability model for agents that need strong reasoning / 高能力模型，適合需要強推理的角色
- **fast** — Lightweight model for frequent but simple tasks / 輕量模型，適合頻繁但簡單的任務

You can then assign each agent to either `smart` or `fast`. Default assignment:
你可以為每個角色選擇 `smart` 或 `fast`。預設配置：

| Agent / 角色 | Default Tier / 預設等級 | Rationale / 理由 |
|-------|----------|----------|
| CEO 總經理 | smart | Core coordinator, needs strong reasoning / 核心協調，需強推理 |
| CFO 財務長 | smart | Financial accuracy matters / 財務準確性重要 |
| CIO 投資長 | smart | Investment analysis needs depth / 投資分析需要深度 |
| COO 營運長 | fast | Frequent but simple tasks, saves tokens / 頻繁但簡單，省 Token |
| CTO 技術長 | smart | Technical decisions need precision / 技術決策需要精確 |
| CTO Sub-Agent / CTO 子代理 | fast | Execution tasks / 執行任務 |
| CHRO 人資長 | fast | Periodic policy tasks, not complex / 週期性，不複雜 |
| CAO 稽核長 | smart | Auditing needs independent strong reasoning / 稽核需要獨立強推理 |

## Cron Schedule / 排程總覽

| Name | Agent / 角色 | Schedule / 時間 | Purpose / 用途 |
|------|-------|------|------|
| morning-briefing | CEO 總經理 | Daily 06:30 | Morning briefing / 晨間會報 |
| investment-monitor | CIO 投資長 | Mon-Fri 09-16 hourly | Portfolio monitoring / 投資監控 |
| memory-cleanup | CHRO 人資長 | 1st of month 03:00 | Memory health review / 記憶審視 |
| weekly-org-review | CHRO 人資長 | Monday 08:00 | Org health report / 組織健康週報 |
| security-scan | CAO 稽核長 | Wednesday 02:00 | Security scan / 安全掃描 |
| cto-memory-cleanup | CTO 技術長 | Sunday 03:00 | CTO memory self-cleanup / CTO 記憶自清理 |
