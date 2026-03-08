---
name: confirm
description: "Confirm: Report operation results and update memory"
next-step: null
output-file: null
template: null
---

# Step 3: Confirm

**Progress: Step 3 of 3**

## Goal

Report the schedule operation result and update memory/ records.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Report Result

Report based on operation type:

**Add:**
> "Schedule added: [date] [time] [content]. Reminder set for [reminder time]."

**Delete:**
> "Schedule cancelled: [date] [time] [content]."

**Modify:**
> "Schedule updated: [original content] → [new content]."

**Query:**
> Organize and present the schedule list, sorted by time.

### 2. Update memory/

Record the operation in today's memory/ log:
- Operation type and time
- Schedule content
- Conflict resolution result (if any)

### 3. Cascading Effects

If the schedule change affects other arrangements (e.g., cancelling a lunch meeting affects meal recommendation), note it for subsequent heartbeat reference.

## Completion Criteria

- [ ] Reported operation result
- [ ] Updated memory/ log
- [ ] Handled cascading effects (if any)

## Workflow Complete
