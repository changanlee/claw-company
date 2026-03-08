---
name: scope
description: "Scope: Determine scan scope"
next-step: ./step-02-scan.md
output-file: null
template: null
---

# Step 1: Scope

**Progress: Step 1 of 4**

## Goal

Determine the scope of this security scan: all Agents or specific Agents.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Determine Trigger Source

- **Cron trigger (weekly Wednesday)**: default to scanning all Agents
- **Manual trigger**: scan specific Agent(s) or all based on instructions

### 2. List Scan Targets

Full Agent list:
- CEO (workspace-ceo)
- CFO (workspace-cfo)
- CIO (workspace-cio)
- COO (workspace-coo)
- CTO (workspace-cto)
- CHRO (workspace-chro)
- CAO (workspace-cao, self-scan)

### 3. Confirm Scan Items

Items to scan per Agent:
- SOUL.md integrity
- AGENTS.md integrity
- TOOLS.md integrity
- IDENTITY.md integrity
- HEARTBEAT.md integrity
- Abnormal content in memory/
- Abnormal patterns in recent behavior logs

## Completion Criteria

- [ ] Determined scan scope
- [ ] Listed scan target checklist
- [ ] Confirmed scan items

## Next Step

👉 Proceed to [Step 2: Scan](./step-02-scan.md)
