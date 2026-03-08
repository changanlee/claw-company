---
name: parse
description: "Parse: Parse schedule command type and content"
next-step: ./step-02-execute.md
output-file: null
template: null
---

# Step 1: Parse

**Progress: Step 1 of 3**

## Goal

Parse the Chairman's schedule command and determine the operation type and relevant details.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Determine Operation Type

Parse the command to identify the operation:
- **Add**: Create a new schedule entry
- **Delete**: Remove an existing schedule entry
- **Modify**: Change time/location/content of an existing entry
- **Query**: View schedule for a specific date or period

### 2. Extract Information

Extract required information based on operation type:

**Add/Modify:**
- Date and time
- Event content
- Location (if any)
- Duration
- Reminder settings (if any)

**Delete:**
- Schedule entry identifier (date + time + content)

**Query:**
- Query range (specific date/this week/this month)

### 3. Fill in Missing Information

If the command is incomplete, ask the Chairman (via CEO) for missing items. Ask only one question at a time.

## Completion Criteria

- [ ] Determined operation type
- [ ] Extracted all required information
- [ ] Information complete, ready to execute

## Next Step

👉 Proceed to [Step 2: Execute](./step-02-execute.md)
