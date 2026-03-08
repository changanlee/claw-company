---
name: escalate
description: "Escalate: Notify CEO; push directly to Chairman if no response in 30 minutes"
next-step: null
output-file: null
template: null
---

# Step 3: Escalate

**Progress: Step 3 of 3**

## Goal

Notify CEO to investigate the anomaly. If CEO doesn't respond within 30 minutes, push directly to the Chairman.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Notify CEO

Use `sessions_send` to notify CEO:

> "CEO, Emergency brake activated:
> - Suspect Agent: [name]
> - Anomaly type: [description]
> - Frozen: [Agent]'s spawn permissions
> - Required: investigate root cause and provide analysis
> - Unfreeze condition: CEO confirmation + root cause analysis"

### 2. Await Response

Wait for CEO response (maximum 30 minutes):

**CEO responds:**
- Record CEO's investigation results and root cause analysis
- If CEO confirms unfreeze → update issues.md status to Resolved
- If further investigation needed → maintain freeze status

**CEO no response in 30 minutes:**
- Push directly to Chairman via CAO's independent channel

### 3. Push to Chairman (if needed)

Notify Chairman via independent channel:

> "Chairman, Emergency brake notification:
> - Anomaly: [description]
> - Frozen: [Agent]'s spawn permissions
> - CEO has not responded
> - Your instructions are needed"

### 4. Record Result

Update issues.md and memory/ logs:
- Notification time
- Response status
- Final handling result
- Unfreeze record (if any)

## Completion Criteria

- [ ] Notified CEO
- [ ] CEO responded or pushed to Chairman
- [ ] Recorded complete handling process

## Workflow Complete
