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
├── openclaw-config/       # OpenClaw deployment configuration
│   ├── openclaw.json      # Main config (JSON5)
│   ├── setup.sh           # Deployment script
│   ├── shared/            # Shared policies & rules across agents
│   └── workspace-{agent}/ # Per-agent workspace templates
├── _bmad/                 # BMAD Method modules (planning & dev framework)
│   ├── core/              # Core agents & workflows
│   ├── bmm/               # Business method modules
│   ├── cis/               # Creative & innovation strategies
│   ├── tea/               # Test engineering & automation
│   └── bmb/               # Module builder tools
├── _bmad-output/          # Generated artifacts from BMAD workflows
├── docs/                  # Project documentation
└── LICENSE                # MIT License
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

1. Install [OpenClaw](https://github.com/openclaw/openclaw)
2. Clone this repository
3. Configure tokens in `openclaw-config/openclaw.json`
4. Run `./openclaw-config/setup.sh`
5. Start the gateway: `openclaw gateway start`

See [`openclaw-config/README.md`](openclaw-config/README.md) for detailed setup instructions.

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
├── openclaw-config/       # OpenClaw 部署配置
│   ├── openclaw.json      # 主配置檔（JSON5）
│   ├── setup.sh           # 部署腳本
│   ├── shared/            # 跨 Agent 共用政策與規範
│   └── workspace-{agent}/ # 各 Agent 的 workspace 模板
├── _bmad/                 # BMAD Method 模組（規劃與開發框架）
│   ├── core/              # 核心 Agent 與工作流程
│   ├── bmm/               # 商業方法模組
│   ├── cis/               # 創意與創新策略
│   ├── tea/               # 測試工程與自動化
│   └── bmb/               # 模組建構工具
├── _bmad-output/          # BMAD 工作流程產出物
├── docs/                  # 專案文件
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

1. 安裝 [OpenClaw](https://github.com/openclaw/openclaw)
2. Clone 此倉庫
3. 在 `openclaw-config/openclaw.json` 中配置各項 Token
4. 執行 `./openclaw-config/setup.sh`
5. 啟動 Gateway：`openclaw gateway start`

詳細部署說明請參考 [`openclaw-config/README.md`](openclaw-config/README.md)。

### 授權

[MIT](LICENSE)
