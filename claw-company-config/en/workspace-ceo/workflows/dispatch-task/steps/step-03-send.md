---
name: send
description: "Compose sessions_send directive and create tracking record"
next-step: null
output-file: null
template: null
---

# Step 3: Send & Track

**Progress: Step 3 of 3**

## Objective

Use `sessions_send` to dispatch the task to the target executive and create a tracking record.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Compose Send Directive

Use `sessions_send` to send the task to the target executive, including:

- Task description (refined from chairman's original message)
- Urgency level
- Expected response time
- Required output format (if any)

### 2. Create Tracking Record

Record in MEMORY.md or memory/:

- Send time
- Target executive
- Task summary
- Status: Sent / Awaiting Reply

### 3. Report to Chairman

Confirm task dispatch to the Chairman:

> Your directive has been forwarded to {executive name}, expected response by {time}.

## Completion Criteria

- [ ] Task sent via sessions_send
- [ ] Tracking record created
- [ ] Dispatch confirmed to Chairman
