---
name: scan
description: "Scan each Agent's MEMORY.md usage (line count, update frequency, last update time)"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# Step 1: Scan Usage

**Progress: Step 1 of 3**

## Goal

Scan each Agent's MEMORY.md usage metrics.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Read Each Agent's MEMORY.md

Read all Agent MEMORY.md files (including CHRO's own):

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-chro/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cao/MEMORY.md`

### 2. Collect Usage Metrics

For each MEMORY.md, record:

- **Line Count**: Current line count (limit: 200 lines)
- **Utilization**: Line count / 200
- **Last Update Time**: Date of most recent modification
- **Update Frequency**: Number of updates in the past 30 days (estimated from memory/ logs)

### 3. Scan memory/ Directories

Check each Agent's memory/ directory:

- Total file count
- Oldest file date
- Newest file date
- Total size

### 4. Compile Scan Results

| Agent | MEMORY.md Lines | Utilization | Last Update | Monthly Updates | memory/ Files |
|-------|----------------|-------------|-------------|----------------|--------------|
| CEO | /200 | % | | | |
| CFO | /200 | % | | | |
| CIO | /200 | % | | | |
| COO | /200 | % | | | |
| CTO | /200 | % | | | |
| CHRO | /200 | % | | | |
| CAO | /200 | % | | | |

## Completion Criteria

- [ ] All Agent MEMORY.md files scanned
- [ ] memory/ directories scanned
- [ ] Scan results compiled into table

## Next Step

👉 Proceed to [Step 2: Evaluate Health](./step-02-evaluate.md)
