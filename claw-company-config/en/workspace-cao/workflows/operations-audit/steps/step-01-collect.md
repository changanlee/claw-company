---
name: collect
description: "Collect records: read all Agents' MEMORY.md and recent output/"
next-step: ./step-02-compare.md
output-file: null
template: null
---

# Step 1: Collect Records

**Progress: Step 1 / 5 total**

## Objective

Read all Agents' MEMORY.md and output/ directory contents from the past week to establish the audit baseline data.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Read Each Agent's MEMORY.md

Read the following paths one by one (scan summaries, no need for verbatim recording):

- `{{INSTALL_DIR}}/workspace-ceo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cfo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cio/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-coo/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-cto/MEMORY.md`
- `{{INSTALL_DIR}}/workspace-chro/MEMORY.md`

### 2. Scan Each Agent's output/

List the files in each Agent's `output/` directory from the past week, recording file names and dates.

### 3. Record Baseline Data

Compile for each Agent:
- Number of recent entries in MEMORY.md
- Number of output/ items from the past week
- Last activity timestamp

## Completion Criteria

- [ ] All Agents' MEMORY.md have been read
- [ ] All Agents' output/ have been scanned
- [ ] Baseline data has been recorded

## Next Step

👉 Proceed to [Step 2: Cross-Reference](./step-02-compare.md)
