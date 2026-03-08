---
name: execute
description: "Execute: Perform schedule operation and check for time conflicts"
next-step: ./step-03-confirm.md
output-file: null
template: null
---

# Step 2: Execute

**Progress: Step 2 of 3**

## Goal

Execute the schedule operation (add/delete/modify/query) and check for time conflicts on add or modify operations.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Conflict Check (Add/Modify)

Read schedule records from `{{INSTALL_DIR}}/workspace-coo/memory/` and check:
- Time overlap: does the new entry conflict with existing entries
- Travel time: is there sufficient travel time between entries
- Density: is the day already packed, warranting a heads-up

If conflict found:
> "Time conflict detected: [conflict description]. Suggest [adjustment], or would you like to replace the existing entry?"

### 2. Execute Operation

**Add:** Record the entry in the corresponding date's memory/ log.
**Delete:** Mark the entry as cancelled in memory/ log.
**Modify:** Update the entry's information in memory/ log.
**Query:** Read and organize the schedule list from memory/ logs.

### 3. Set Reminders

For add/modify operations, record the required reminder time (default: 2 hours before event; heartbeat handles reminder delivery).

## Completion Criteria

- [ ] Completed conflict check (if applicable)
- [ ] Executed schedule operation
- [ ] Set reminders (if applicable)

## Next Step

👉 Proceed to [Step 3: Confirm](./step-03-confirm.md)
