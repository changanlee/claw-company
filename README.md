# Claw Company

**Your one-person company deserves a real C-suite.**
7 AI executives with hierarchy, governance, and discipline — not just chatbots.

[繁體中文](README.zh-TW.md) · Built on [OpenClaw](https://github.com/nicekid1/OpenClaw) · [MIT License](LICENSE)

---

## Why?

Running a one-person company means you're the CEO, CFO, COO, and CTO all at once. Things slip through the cracks:

- You're deep in code and forget to reply to an important message
- You tracked expenses for three days, then stopped — and overspent by month's end
- Your portfolio dropped 8% while you weren't looking
- You wanted to build a side project, but planning + design + coding + testing + review all by yourself killed the momentum

You don't need another AI tool. **You need an organization** — with delegation, approval chains, institutional memory, and checks and balances. Claw Company gives you exactly that: a full management team that operates 24/7, talks to you on Telegram, WhatsApp, or Discord, and runs your company while you focus on what matters.

**You're the Chairman — not a one-person sweatshop.**

---

## See It in Action

```
👤 You:       幫我記午餐 $15
🤵 CEO:      已轉 CFO 處理 ✓
💰 CFO→CEO:  已記帳。本月餐飲累計 $280，預算剩餘 $120
🤵 CEO:      午餐 $15 已記錄，本月餐飲剩 $120 額度
```

```
👤 You:       我想做一個 habit tracker app
🤵 CEO:      已轉 CTO 評估
🔧 CTO→CEO:  已啟動開發流程。先跑腦力激盪，收斂後做規模評估和任務拆解
              預計 3 階段，每階段結束向您報告
🤵 CEO:      CTO 已啟動，第一步是腦力激盪，完成後會跟你確認方向
```

```
👤 You:       查一下我的投資組合
🤵 CEO:      已轉 CIO 查詢
📈 CIO→CEO:  美股持倉總值 $12,450（+2.3%）。NVDA 單日 +5.1% 觸發關注
              本週五投資週報會有完整分析
🤵 CEO:      投資組合 $12,450，漲 2.3%。NVDA 今天漲了 5.1%，CIO 週五會出週報
```

```
🔍 CAO → You (independent channel):
    安全掃描完成。發現 1 項中風險：CTO 上週 spawn 的工程師未在完成後清理 session
    建議：執行 session 清理。需要我追蹤改善嗎？
```

Every message goes through **CEO as your single point of contact**. Behind the scenes: delegation, execution, review, and reporting — all automatic. CAO (auditor) reports directly to you through an independent channel, bypassing CEO entirely.

---

## Getting Started

### Prerequisites

- [OpenClaw](https://github.com/nicekid1/OpenClaw) >= 2026.3.8
- At least one LLM API key (Anthropic recommended)
- A messaging platform bot token (Telegram, WhatsApp, or Discord)
- [Node.js](https://nodejs.org/) >= 18

### Install

```bash
git clone https://github.com/changanlee/claw-company.git
cd claw-company/claw-company-config

# Edit your Chairman profile first
# vi {en|zh}/shared/USER.md

node install.js        # Interactive setup — language, models, channels, cron, memory, skills
openclaw gateway start # Launch
```

### Verify

Send a message to your CEO bot: *"Hello, please introduce yourself."*

---

## Architecture

```
Chairman (you) — the only human
  ↕ Telegram / WhatsApp / Discord
CEO — single point of contact, delegates everything
  ├── CFO — bookkeeping, budgets, token cost auditing
  ├── CIO — portfolio monitoring, market analysis, weekly reports
  ├── COO — scheduling, meals, trips, weather
  ├── CTO — product dev, spawns 11 engineer sub-agents
  │         (PM, Architect, Dev, QA, UX, Tech Writer, Analyst,
  │          Scrum Master, Solo Dev, Spec Reviewer, Code Reviewer)
  └── CHRO — agent assessment, policy writing, model evaluation
CAO — independent auditor, reports directly to Chairman
```

- **CEO routes everything** — you talk to one agent, not seven
- **CTO is the only agent that spawns sub-agents** — full engineering team on demand
- **CAO bypasses CEO** — independent oversight with its own bot and channel
- **Three-way balance**: CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy)

---

## How It Stays Reliable

### Three-Tier Approval

No agent acts without appropriate authorization — evaluated across amount × reversibility × delegation × urgency.

- **Green** — auto-execute: data collection, logging, heartbeat checks
- **Yellow** — CEO approves: spending proposals, investment advice, dev plans
- **Red** — you decide: expenses > $50, push to main, external comms, definition file changes

<details>
<summary>Approval details</summary>

Four-dimension evaluation takes the highest level. Protected definition files under Red: SOUL.md, HEARTBEAT.md, IDENTITY.md, AGENTS.md, TOOLS.md, tools-policy.md, engineers/*.md, rules/*.md, openclaw.json.

</details>

### Domain-Specific Iron Laws

Every agent has iron laws for their domain — not just engineering, but finance, investment, operations, audit, HR, and decision-making. No agent can bypass or rationalize away these rules.

- **CTO**: TDD, Solution Design Document, Systematic Debugging, Verification Before Completion
- **CEO**: Approval never skipped, reports never trimmed, delegation with context
- **CFO**: Record before analyze, numbers never from memory, anomaly alerts
- **CIO**: Observe don't trade, risk before return, positions never embellished
- **COO**: Suggest don't execute, check preferences first, confirm then act
- **CAO**: Complete evidence chains, independence non-negotiable, findings recorded immediately
- **CHRO**: Policy requires basis, assessment requires data, model eval double-blind

<details>
<summary>Anti-rationalization system</summary>

Three layers prevent agents from talking themselves out of their own rules:

1. **Company-wide** — shared excuse-vs-fact table in company rules
2. **Per-agent** — domain-specific tables (CEO, CTO, CAO each have 5+)
3. **Per-iron-law** — each law includes its own red flag checklist

*"Feeling like you don't need to follow the rules" is itself the biggest red flag.*

</details>

### Layered Memory

Agents don't forget between sessions. Three layers capture different granularity:

- **Hot** (MEMORY.md) — refined principles, 200-line cap, auto-loaded every session
- **Warm** (memory/*.md) — daily event logs with tags, today + yesterday auto-loaded
- **Cold** (LanceDB) — `autoCapture` distills at session end, `autoRecall` injects at session start. Hybrid vector + BM25 retrieval, cross-encoder rerank, multi-scope isolation

<details>
<summary>Memory details</summary>

Cold layer powered by [memory-lancedb-pro](https://github.com/nicekid1/memory-lancedb-pro): each agent has a private scope; all `cc-*` agents share a company scope. Post-compaction context survival ensures Session Startup instructions and Red Lines are re-injected after context compression — agents never lose core identity in long sessions.

</details>

### 58 Structured Workflows

Full lifecycle coverage from analysis to implementation, with interruption recovery via YAML frontmatter.

- **CTO** (27): brainstorming → scale assessment → task breakdown → sub-agent spawn → two-phase review
- **CEO** (5): task delegation, morning briefings, brainstorming, advisory panels
- **CFO** (5): expense tracking, purchase analysis, token cost auditing, monthly closing
- **CIO** (4): portfolio monitoring, investment analysis, weekly reports
- **COO** (5): meal recommendations, trip planning, schedule management
- **CHRO** (7): agent assessment, policy drafting, memory audits, new agent creation
- **CAO** (5): security scans, compliance checks, emergency brake, SOUL integrity

### Skill Access Control

Per-agent skill allowlist. Policy-sensitive agents (CHRO, CAO) are fully blocked. New skills require: CTO security review (14 red flags) → CAO compliance check → Chairman approval.

---

<details>
<summary><strong>Reference</strong></summary>

### Agent IDs

All agents use a `cc-` prefix to avoid naming conflicts.

| Agent | ID | Default Model Tier |
|-------|----|-------------------|
| CEO | `cc-ceo` | smart |
| CFO | `cc-cfo` | smart |
| CIO | `cc-cio` | smart |
| COO | `cc-coo` | fast |
| CTO | `cc-cto` | smart |
| CHRO | `cc-chro` | fast |
| CAO | `cc-cao` | smart |
| CTO Sub-Agents | — | fast |

### Cron Schedule

| Name | Agent | Schedule | Purpose |
|------|-------|----------|---------|
| morning-briefing | CEO | Daily 06:30 | Morning briefing |
| investment-monitor | CIO | Mon-Fri 09-16 hourly | Portfolio monitoring |
| memory-cleanup | CHRO | 1st of month 03:00 | Memory health review |
| weekly-org-review | CHRO | Monday 08:00 | Org health report |
| security-scan | CAO | Wednesday 02:00 | Security scan |
| cto-memory-cleanup | CTO | Sunday 03:00 | CTO memory self-cleanup |

### Upgrade & Uninstall

```bash
node install.js                # Upgrade (preserves MEMORY.md, output/, auth-profiles.json)
node install.js --update-skills # Update skill allowlist only
node install.js --uninstall     # Remove installed files
```

### Project Structure

```
claw-company-config/
├── install.js                 # Cross-platform deployment script
├── skill-allowlist.json       # Per-agent skill access control
├── {en,zh}/
│   ├── shared/                # Company-wide policies, rules, templates, standards
│   └── workspace-{agent}/     # Per-agent: AGENTS.md, SOUL.md, IDENTITY.md,
│                              #   TOOLS.md, HEARTBEAT.md, MEMORY.md,
│                              #   rules/, workflows/, templates/, output/
```

</details>

---

## Credits

Built on [OpenClaw](https://github.com/nicekid1/OpenClaw). Workflow architecture inspired by [BMAD Method](https://github.com/bmad-method/bmad-method). Engineering discipline informed by [Superpowers](https://github.com/nicolecomputer/superpowers).

## License

[MIT](LICENSE)
