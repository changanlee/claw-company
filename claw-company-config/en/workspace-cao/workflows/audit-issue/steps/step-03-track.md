---
name: track
description: "Track: Track remediation progress"
next-step: ./step-04-verify.md
output-file: null
template: null
---

# Step 3: Track

**Progress: Step 3 of 5**

## Goal

Continuously track the responsible Agent's remediation progress to ensure completion within deadline.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Periodic Check

During heartbeat inspections, check all Open/Notified issues in issues.md:
- Check if remediation deadline has passed
- Check if the responsible Agent has reported progress

### 2. Progress Reminder

If an issue is approaching deadline (25% time remaining) with no progress reported:

Use `sessions_send` to remind the responsible Agent:

> "[Agent name], Audit issue [AUD-YYYY-NNN] remediation deadline approaching ([time remaining]). Please report progress."

### 3. Overdue Handling

If an issue is past its remediation deadline:
- Update issues.md status to "Overdue"
- Notify CEO of overdue issue
- Critical/High overdue → push directly to Chairman

### 4. Progress Recording

When the responsible Agent reports back:
- Record remediation progress in issues.md
- If Agent reports remediation complete → proceed to verification step

## Completion Criteria

- [ ] Confirmed issue remediation progress
- [ ] Reminded/escalated overdue issues (if applicable)
- [ ] Responsible Agent reports completion → proceed to verification

## Next Step

👉 Proceed to [Step 4: Verify](./step-04-verify.md)
