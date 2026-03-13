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
👤 You (CEO channel):  Log my lunch, $15
🤵 CEO:      → dispatched to CFO
💰 CFO→CEO:  Recorded. Dining this month: $280 total, $120 remaining
🤵 CEO:      Lunch $15 logged. You have $120 left in your dining budget
```

```
👤 You (CEO channel):  I want to build a habit tracker app
🤵 CEO:      → dispatched to CTO
🔧 CTO→CEO:  Dev pipeline started. Running brainstorming first,
              then scale assessment and task breakdown.
              3 phases — I'll report at each checkpoint
🤵 CEO:      CTO is on it. First step is brainstorming,
              he'll confirm direction with you once done
```

```
👤 You (CTO channel):  Deploy the new API to staging
🔧 CTO:      Staging deploy requires CEO approval (yellow-light)
              → dispatched to CEO for review
🤵 CEO:      CTO requests staging deploy. Approved ✓
🔧 CTO:      Deploying to staging... done. 3 endpoints verified
```

```
👤 You (CTO channel):  Delete the test database
🔧 CTO:      Confirming scope: test-db-2026Q1, 3 tables, 240 rows. Proceed?
👤 You:       Yes
🔧 CTO:      Deleted ✓ → notified CEO [red-light notification]
```

```
🔍 CAO → You (independent channel):
    Security scan complete. 1 medium-risk finding: CTO's sub-agent
    from last week didn't clean up its session after finishing.
    Recommendation: run session cleanup. Want me to track remediation?
```

**4 agents have their own channel and bot** — CEO (primary), CTO (technical), COO (operations), CAO (audit). The remaining 3 (CFO, CIO, CHRO) route through CEO. Behind the scenes: exec dispatch handles delegation, execution, and reporting — all automatic. CAO bypasses CEO entirely for independent oversight.

---

## Getting Started

### Prerequisites

- [OpenClaw](https://github.com/nicekid1/OpenClaw) >= 2026.3.8
- At least one LLM API key — **Sonnet 4.5 or above required** (exec dispatch relies on write + exec tool chaining; weaker models cannot execute this reliably)
- A messaging platform bot token (Telegram, WhatsApp, or Discord — Discord supports multi-bot routing)
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
  ┌──────────────────────────────────────────────┐
  │ CEO channel  ←→  CEO — delegates everything  │  ← primary channel
  │ CTO channel  ←→  CTO — product dev           │  ← independent
  │ COO channel  ←→  COO — operations             │  ← independent
  │ CAO channel  ←→  CAO — audit                  │  ← independent
  └──────────────────────────────────────────────┘
         CEO dispatches internally (exec dispatch)
         ├── CFO — bookkeeping, budgets, token cost auditing
         ├── CIO — portfolio monitoring, market analysis, weekly reports
         └── CHRO — agent assessment, policy writing, model evaluation

CTO spawns 11 engineer sub-agents on demand:
  PM, Architect, Dev, QA, UX, Tech Writer, Analyst,
  Scrum Master, Solo Dev, Spec Reviewer, Code Reviewer
```

- **4 independent channels** — CEO (primary), CTO, COO, CAO each have their own bot
- **3 agents route through CEO** — CFO, CIO, CHRO don't need dedicated channels
- **Channels are orthogonal to approval** — having a channel doesn't mean more authority; the same three-tier approval applies everywhere
- **CTO is the only agent that spawns sub-agents** — full engineering team on demand
- **Three-way balance**: CEO (execution) ↔ CAO (oversight) ↔ CHRO (policy)

---

## How It Stays Reliable

### Three-Tier Approval

No agent acts without appropriate authorization — evaluated across amount × reversibility × delegation × urgency.

- **Green** — auto-execute: data collection, logging, heartbeat checks
- **Yellow** — CEO approves: spending proposals, investment advice, dev plans
- **Red** — you decide: expenses > $50, push to main, external comms, definition file changes

Red-light behavior depends on task source:

- **Chairman direct** (via agent's own channel) — already authorized. Confirm scope, execute, then dispatch CEO a red-light notification
- **CEO dispatch** — dispatch back to CEO for review; CEO escalates to Chairman
- **Other sources** — dispatch CEO for approval

<details>
<summary>Approval details</summary>

Four-dimension evaluation takes the highest level. Protected definition files under Red: SOUL.md, HEARTBEAT.md, IDENTITY.md, AGENTS.md, TOOLS.md, tools-policy.md, engineers/*.md, rules/*.md, openclaw.json.

Red-light destructive operations (delete, drop, force-push) require the agent to confirm exact scope with the Chairman before execution — no assumptions allowed.

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

### Cross-Agent Dispatch

Agents communicate through **exec dispatch** — a secure file-based mechanism that replaced the deprecated `sessions_send`.

1. Sender writes task to a temp file
2. `dispatch.sh` validates the target agent (whitelist), tags the message with source (`[Source: CTO dispatch]`), and invokes `openclaw agent`
3. Receiver processes and replies; sender waits for the full response before continuing

This enforces a **one-question-one-answer discipline** — no runaway token loops between agents.

<details>
<summary>Dispatch details</summary>

- File-based message passing prevents shell injection
- Agent whitelist: `cc-ceo`, `cc-cfo`, `cc-cio`, `cc-coo`, `cc-cto`, `cc-chro`, `cc-cao`
- Bypasses `autoCapture`/`autoRecall` — dispatch responses don't pollute cold memory
- Works in main sessions, cron, and independent channels
- Cron tasks can use exec dispatch despite tight cron isolation

</details>

### Channel Governance

Not every agent needs its own channel. Activation requires: high-frequency interaction, governance independence, or multi-round discussion demand. The model must also pass a **channel capability test** — traffic light identification, task source identification, yellow-light dispatch, and pressure scenario.

<details>
<summary>Governance details</summary>

- **4 active channels**: CEO (primary), CTO (technical), COO (operations), CAO (audit)
- **3 agents route through CEO**: CFO, CIO, CHRO
- Quarterly usage review; model change triggers capability re-test
- Closure criteria: usage drop, model downgrade failure, or Chairman request (7-day buffer)

</details>

### Skill Access Control

Per-agent skill allowlist. Policy-sensitive agents (CHRO, CAO) are fully blocked. New skills require: CTO security review (14 red flags) → CAO compliance check → Chairman approval.

---

<details>
<summary><strong>Reference</strong></summary>

### Agent IDs

All agents use a `cc-` prefix to avoid naming conflicts.

| Agent | ID | Model Tier | Channel |
|-------|----|-----------|---------|
| CEO | `cc-ceo` | smart | independent (primary) |
| CFO | `cc-cfo` | smart | via CEO |
| CIO | `cc-cio` | smart | via CEO |
| COO | `cc-coo` | fast | independent |
| CTO | `cc-cto` | smart | independent |
| CHRO | `cc-chro` | fast | via CEO |
| CAO | `cc-cao` | smart | independent (audit) |
| CTO Sub-Agents | — | fast | — |

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
node install.js                  # Upgrade (preserves MEMORY.md, output/, auth-profiles.json)
node install.js --update-channels # Update channel bindings and Discord bot routing only
node install.js --update-skills   # Update skill allowlist only
node install.js --uninstall       # Remove installed files
```

### Project Structure

```
claw-company-config/
├── install.js                 # Cross-platform deployment script
├── skill-allowlist.json       # Per-agent skill access control
├── {en,zh}/
│   ├── shared/                # Company-wide policies, rules, templates, standards
│   │   ├── dispatch.sh        # Secure cross-agent dispatch (whitelist + source tagging)
│   │   └── policies/          # Approval matrix, channel governance, security rules
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
