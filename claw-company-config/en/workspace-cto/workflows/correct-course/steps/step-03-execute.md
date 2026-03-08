---
name: step-03-execute
description: "Execute changes"
next-step: null
output-file: null
template: null
---

# Step 3: Execute Changes

**Progress: Step 3 of 3** — Final step

## Goal

Execute the approved correction plan, update all related documents, and notify relevant Agents.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Update Sprint Status

Update the sprint-status file per the correction plan:

- Add new stories to the list
- Mark removed stories as `cancelled`
- Update descriptions for modified stories
- Adjust ordering for reordered stories

### 2. Update Story Files

- Stories needing modification: Update acceptance criteria and task lists
- Stories to be removed: Mark as `cancelled`, preserve records
- New stories: Queue for creation

### 3. Notify Relevant Agents

Notify via `sessions_send`:

- Engineers working on affected stories: Pause/adjust instructions
- CEO: Confirmation that course correction has been executed
- Other affected Agents (if any)

### 4. Record Decision

Record in CTO MEMORY.md:

- Reason for course correction
- Change summary
- Lessons learned (to avoid future recurrence)

## Completion Criteria

- ✅ Sprint status updated
- ✅ Affected story files updated
- ✅ Relevant Agents notified
- ✅ Decision recorded

## Next Step

This is the final step. Course correction complete, Sprint continues execution.
