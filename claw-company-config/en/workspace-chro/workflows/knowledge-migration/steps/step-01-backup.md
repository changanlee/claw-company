---
name: backup
description: "Backup affected Agent's MEMORY.md and recent memory/ logs"
next-step: ./step-02-switch.md
output-file: null
template: null
---

# Step 1: Backup

**Progress: Step 1 of 4**

## Goal

Fully backup affected Agent's memory and logs before model switch.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Confirm Affected Agents

From the model-evaluation proposal, confirm:

- List of Agents requiring model switch
- Current model to target model

### 2. Backup MEMORY.md

For each affected Agent:

- Read `{{INSTALL_DIR}}/workspace-{agent}/MEMORY.md`
- Copy as `{{INSTALL_DIR}}/workspace-{agent}/memory/backup-MEMORY-{date}.md`

### 3. Backup Recent Logs

For each affected Agent:

- List recent files in `{{INSTALL_DIR}}/workspace-{agent}/memory/`
- Record file list (as reference point for rollback)

### 4. Record Backup List

| Agent | MEMORY.md Backup Path | Log File Count | Backup Time |
|-------|----------------------|---------------|-------------|
| | | | |

### 5. Verify Backup Integrity

- Verify backup files are readable
- Confirm content matches original files

## Completion Criteria

- [ ] All affected Agent MEMORY.md files backed up
- [ ] Recent log list recorded
- [ ] Backup integrity verified

## Next Step

👉 Proceed to [Step 2: Switch Model](./step-02-switch.md)
