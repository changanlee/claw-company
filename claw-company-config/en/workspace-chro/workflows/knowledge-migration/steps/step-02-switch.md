---
name: switch
description: "Switch model, load workspace"
next-step: ./step-03-test.md
output-file: null
template: null
---

# Step 2: Switch Model

**Progress: Step 2 of 4**

## Goal

Execute the model switch and ensure the Agent workspace loads properly.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Modify Model Configuration

Update the model configuration for affected Agents in `{{INSTALL_DIR}}/openclaw.json`:

- Locate the affected Agent's `model` field
- Update the model alias or model ID to the target model
- Confirm syntax is correct

### 2. Reload Workspace

- Notify affected Agent to reload (or wait for next heartbeat auto-reload)
- Confirm Agent successfully responds using the new model

### 3. Basic Functionality Verification

Quick check post-switch basic functionality:

- Can the Agent respond normally
- Can MEMORY.md be read normally
- Can heartbeat execute normally
- Can `sessions_send` send normally

### 4. Record Switch Status

| Agent | Original Model | New Model | Switch Time | Basic Verification |
|-------|---------------|-----------|------------|-------------------|
| | | | | Pass/Fail |

If basic verification fails, immediately rollback to the original model.

## Completion Criteria

- [ ] Model configuration updated
- [ ] Agent reloaded
- [ ] Basic functionality verification passed
- [ ] Switch status recorded

## Next Step

👉 Proceed to [Step 3: Adaptation Test](./step-03-test.md)
