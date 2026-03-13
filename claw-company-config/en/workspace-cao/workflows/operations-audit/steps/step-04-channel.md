---
name: channel
description: "Channel audit: audit record completeness and CEO notification for independent channel operations"
next-step: ./step-05-report.md
output-file: null
template: null
---

# Step 4: Channel Audit

**Progress: Step 4 / 5 total**

## Objective

Audit the record completeness of Agents with independent channels (CTO, COO, CAO), verifying whether they follow the approval flow and CEO notification mechanism.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Read Channel Governance Policy

Read `{{INSTALL_DIR}}/shared/policies/channel-governance.md` to confirm the approval flow for Agents with channels.

### 2. Check Record Completeness

For CTO and COO's MEMORY.md and output/, check each item:

- [ ] Are all operations recorded (green-light in MEMORY.md, red-light with notification records)
- [ ] Are task sources marked (`[Source: CEO dispatch]` / `[Source: Chairman direct]` / `[Source: cron]`)
- [ ] Do red-light operations from Chairman direct assignments have dispatch CEO notifications

### 3. Verify CEO Notification Receipt

Read CEO's MEMORY.md to confirm whether corresponding `[Chairman Direct Assignment — Red-Light Notification]` records exist.

If CTO/COO has red-light notifications but CEO has no corresponding record → red flag (notification not delivered or CEO did not file).

### 4. Record Findings

| Agent | Check Item | Result | Notes |
|-------|-----------|--------|-------|

## Completion Criteria

- [ ] Record completeness has been checked for all Agents with channels
- [ ] CEO notification records have been cross-referenced
- [ ] All findings have been recorded

## Next Step

👉 Proceed to [Step 5: Produce Report](./step-05-report.md)
