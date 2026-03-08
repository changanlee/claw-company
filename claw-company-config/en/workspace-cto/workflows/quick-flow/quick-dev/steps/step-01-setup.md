---
name: step-01-setup
description: "Prepare dev environment"
next-step: ./step-02-implement.md
output-file: null
template: null
---

# Step 1: Prepare Dev Environment

**Progress: Step 1 of 4** — Next: TDD implementation

## Goal

Read the quick-spec or direct instructions, confirm the dev environment is ready, and verify the task is suitable for the quick dev process.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Read Spec

Read the quick-spec file path or direct instructions provided by CTO at spawn time. Understand:

- Feature requirements and solution
- Implementation steps
- Test cases and acceptance criteria

### 2. Confirm Git Branch

- Check the current git branch
- If needed, create a feature branch
- Confirm branch naming follows team conventions

### 3. Confirm Impact Scope and Testing Strategy

- Confirm the list of files to modify
- Confirm the testing strategy

### 4. Scope Check

**If scope exceeds "small independent feature"** → stop immediately, report to CTO recommending the full process.

Criteria:
- Modifying more than 5 files
- Need to modify public API interfaces
- Involves cross-module interactive changes
- Requires database schema changes

## Completion Criteria

- ✅ quick-spec or direct instructions read
- ✅ Git branch confirmed or created
- ✅ Impact scope and testing strategy confirmed
- ✅ Scope check passed (suitable for quick dev)

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-implement.md`
