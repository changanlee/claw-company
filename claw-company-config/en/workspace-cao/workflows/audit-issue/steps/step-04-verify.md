---
name: verify
description: "Verify: Verify remediation effectiveness"
next-step: ./step-05-close.md
output-file: null
template: null
---

# Step 4: Verify

**Progress: Step 4 of 5**

## Goal

Verify that the responsible Agent's remediation has actually resolved the problem.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Obtain Remediation Report

Confirm the remediation details submitted by the responsible Agent:
- What was fixed
- How it was fixed
- Any side effects

### 2. Independent Verification

CAO independently executes verification, not relying on the responsible Agent's self-report:
- Re-execute the original check (reproduce the problem's check steps)
- Confirm the problem no longer exists
- Check for new side effects

### 3. Verification Result

**Pass:**
- Update issues.md status to "Verified"
- Proceed to close step

**Fail:**
- Update issues.md with verification failure reason
- Notify responsible Agent to re-remediate
- Return to Step 3 for tracking

## Completion Criteria

- [ ] Obtained remediation report
- [ ] Independently verified remediation effectiveness
- [ ] Verification passed → proceed to close step

## Next Step

👉 Proceed to [Step 5: Close](./step-05-close.md)
