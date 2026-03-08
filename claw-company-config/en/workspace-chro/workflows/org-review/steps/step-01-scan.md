---
name: scan
description: "Scan each Agent's MEMORY.md and recent activity"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# Step 1: Scan Activity

**Progress: Step 1 of 3**

## Goal

Scan each Agent's MEMORY.md and recent activity records, collecting raw data for organizational health analysis.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Scan Each Agent's MEMORY.md

Read all Agent MEMORY.md files one by one:

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cao/MEMORY.md`

Extract:
- Entries added/updated this week
- Memory usage (line count / 200 line limit)
- Last update time

### 2. Scan Recent Activity

Check each Agent's memory/ directory for this week's activity:

- Number and types of tasks processed
- Cross-department coordination records (`sessions_send` targets and frequency)
- Anomaly events or escalation records

### 3. Compile Raw Data

| Agent | Memory Usage | Tasks This Week | Cross-Dept Coordination | Anomalies |
|-------|-------------|----------------|----------------------|-----------|
| CEO | /200 | | | |
| CFO | /200 | | | |
| CIO | /200 | | | |
| COO | /200 | | | |
| CTO | /200 | | | |
| CAO | /200 | | | |

## Completion Criteria

- [ ] All Agent MEMORY.md files scanned
- [ ] Recent activity collected
- [ ] Raw data compiled into table

## Next Step

👉 Proceed to [Step 2: Analyze Metrics](./step-02-analyze.md)
