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

## 2026-03-06 — Initial Setup
- Proposer: Manual setup (Claude Code assisted)
- Reviewer: N/A (initial setup)
- Approver: Chairman
- Changes: Established complete OpenClaw multi-agent architecture configuration
- Impact scope: All Agents, all policies
- Reason: One-person company initial setup during founding phase
