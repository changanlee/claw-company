---
name: notify
description: "Notify: exec dispatch to notify responsible Agent and CEO"
next-step: ./step-03-track.md
output-file: null
template: null
---

# Step 2: Notify

**Progress: Step 2 of 5**

## Goal

Notify the responsible Agent and CEO via exec dispatch to ensure all parties are aware and can begin remediation.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Notify Responsible Agent

Use `exec dispatch` to notify the responsible Agent (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh):

> "[Agent name], Audit Issue Notification:
> - Issue ID: [AUD-YYYY-NNN]
> - Severity: [level]
> - Description: [description]
> - Remediation deadline: [date]
> Please complete remediation and report back before the deadline."

### 2. Notify CEO

Use `exec dispatch` to notify CEO:

> "CEO, New audit issue [AUD-YYYY-NNN] ([severity]):
> - Issue: [description]
> - Responsible Agent: [name]
> - Deadline: [date]"

### 3. Critical Special Handling

If severity is Critical:
- Push directly to Chairman via CAO's independent channel
- Mark "immediate action required" in the notification

### 4. Record Notification

Record notification send time and recipients. Update issue status in issues.md to "Notified."

## Completion Criteria

- [ ] Notified responsible Agent
- [ ] Notified CEO
- [ ] Pushed to Chairman for Critical (if applicable)
- [ ] Updated issue status

## Next Step

👉 Proceed to [Step 3: Track](./step-03-track.md)
