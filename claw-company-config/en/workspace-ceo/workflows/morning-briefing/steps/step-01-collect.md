---
name: collect
description: "Read each executive's MEMORY.md and output/ for status"
next-step: ./step-02-compile.md
output-file: null
template: null
---

# Step 1: Collect Status

**Progress: Step 1 of 4**

## Goal

Read each executive's MEMORY.md and recent output/ files to collect their latest status information.

> **Note**: This workflow is triggered by cron. Use exec dispatch for dispatching (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh). exec is available in cron environment. This workflow directly reads executive files to collect information.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- Directly read files to collect information (use exec dispatch for cross-Agent communication if needed)

## Instructions

### 1. Read Executive Status

Read the following files in order to extract each executive's latest status:

| Executive | Source Files | Extract |
|-----------|-------------|---------|
| CFO | MEMORY.md + latest file in output/reports/ | Spending summary, budget utilization, anomalies |
| CIO | MEMORY.md + latest file in output/alerts/ | Position changes, market alerts, opportunities |
| COO | MEMORY.md | Today's schedule, weather overview, reminders |
| CTO | MEMORY.md | Development progress, blockers, technical issues |
| CHRO | MEMORY.md + latest file in output/reports/ | Agent status, policy to-dos, org issues |
| CAO | MEMORY.md + latest file in output/scans/ | Security status, open audit issues, compliance |

**Path format**: `{{INSTALL_DIR}}/workspace-{role}/MEMORY.md` and `{{INSTALL_DIR}}/workspace-{role}/output/`

### 2. Record Collection Results

- Note which executives had data available and which did not.
- If an executive's output/ is empty, fall back to MEMORY.md information.

## Completion Criteria

- [ ] All executives' MEMORY.md files read
- [ ] All executives' output/ latest files checked
- [ ] Collected status information organized

## Next Step

👉 Proceed to [Step 2: Compile & Sort](./step-02-compile.md)
