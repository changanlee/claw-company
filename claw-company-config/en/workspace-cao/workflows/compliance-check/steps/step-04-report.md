---
name: report
description: "Report: Produce compliance review report"
next-step: null
output-file: null
template: null
---

# Step 4: Report

**Progress: Step 4 of 4**

## Goal

Produce a compliance review report and respond to the drafter and CEO.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Produce Report

Report includes the following content:
- Review date
- Review subject (draft name and source)
- Overall assessment result (compliant / needs amendment / non-compliant)
- Statistics summary (compliant N items / needs amendment N items / non-compliant N items)
- Issues list details (if any)
- CAO recommendations and next steps

### 2. Respond to Drafter

Use `sessions_send` to send the review report to the drafter (usually CHRO):

**All compliant:**
> "[Draft name] compliance review passed. May proceed to approval process."

**Needs amendment:**
> "[Draft name] compliance review found [N] items needing amendment. Please refer to the attached report for revisions and resubmit."

**Has non-compliant:**
> "[Draft name] compliance review found [N] non-compliant items. Must be corrected before resubmission. See attached report."

### 3. Notify CEO

Use `sessions_send` to notify CEO with the review result summary.

### 4. Record

- Record review results in memory/ log
- Update compliance review statistics in MEMORY.md

## Completion Criteria

- [ ] Produced complete compliance review report
- [ ] Responded to drafter
- [ ] Notified CEO
- [ ] Recorded review results

## Workflow Complete
