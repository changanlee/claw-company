# Policy and Configuration Change Log

## Format

```
## YYYY-MM-DD — Change Summary
- Proposer: <agent-id>
- Reviewer: <agent-id>
- Approver: Chairman
- Changes: <description>
- Impact scope: <which files/Agents are affected>
- Reason: <reason for change>
```

## Change Notification Mechanism

After a policy change is completed, Chairman is notified at three severity levels:

| Level | Trigger Condition | Notification Method |
|-------|------------------|-------------------|
| Level 1 (Immediate) | Security red-line changes, approval authority changes, boundary changes | Push to Telegram immediately + attach diff |
| Level 2 (Morning) | Memory rule adjustments, cost standard changes, heartbeat frequency changes | Include in morning briefing "Company Governance Updates" section |
| Level 3 (Weekly) | Text revisions, formatting improvements | Include in CHRO weekly report |

CHRO is responsible for marking the notification level when recording changes. CEO is responsible for executing the corresponding notification action.

---

## 2026-03-10 — Skill Management System Established
- Proposer: Manual setup (Claude Code assisted)
- Reviewer: Party Mode dual-round review (First Principles → Reverse Engineering → Critique & Refine)
- Approver: Chairman
- Changes:
  - skill-development.md restructured: added discovery, security audit (14 red flags), classification/routing, allowlist management, internalized Skill tracking table
  - memory-policy.md expanded: added WAL protocol, Working Buffer, Reverse Prompting, learning classification and promotion mechanism
  - editorial-prose.md expanded: added 24 AI writing anti-pattern check + inject soul guidelines
  - company-rules.md modified: openclaw.json added to red-light protection, external Skill installation added to context-triggered rules
  - CTO TOOLS.md expanded: added Find Skills command reference
  - install.js modified: inject per-agent skills allowlist + --update-skills lightweight mode
  - New skill-allowlist.json: per-agent Skill allowlist configuration file
- Impact scope: All Agents (allowlist hard isolation), CTO (security audit responsibility), CAO (compliance review), CHRO (tracking maintenance)
- Reason: Establish Skill security isolation and approval mechanism, internalize essence of 5 community behavioral Skills
- Internalization sources: Proactive Agent v3.1.0, Self Improving Agent v3.0.0, Humanizer v1.0.0, Skill Vetter v1.0.0, Find Skills v0.1.0

## 2026-03-06 — Initial Setup
- Proposer: Manual setup (Claude Code assisted)
- Reviewer: N/A (initial setup)
- Approver: Chairman
- Changes: Established complete OpenClaw multi-agent architecture configuration
- Impact scope: All Agents, all policies
- Reason: One-person company initial setup during founding phase
