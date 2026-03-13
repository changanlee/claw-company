---
name: report
description: "Produce report: compile audit results, produce operations audit report"
next-step: null
output-file: output/audits/operations-audit-{date}.md
template: null
---

# Step 5: Produce Report

**Progress: Step 5 / 5 total**

## Objective

Compile all audit results from previous steps, produce an operations audit report, and notify CEO.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Write Audit Report

Report format:

```
# Operations Audit Report

- Audit date: {date}
- Audit scope: All Agent operations from the past week

## Summary
- Overall compliance status: {Good/Needs Attention/Abnormal}
- Red flag count: {N}

## Record Completeness
{Step 2 cross-reference results}

## Traffic Light Review
{Step 3 review results}

## Channel Audit
{Step 4 channel audit results}

## Findings and Recommendations
{Specific issues and improvement suggestions}
```

### 2. Notify CEO

Send summary to CEO via `exec dispatch`:

write file → `bash {{INSTALL_DIR}}/shared/dispatch.sh cc-ceo /tmp/claw-task-cc-ceo.txt 60`

Message format:
```
[Operations Audit Report — {date}]
Compliance status: {Good/Needs Attention/Abnormal}
Red flags: {N} items
{Key findings summary}
Full report: output/audits/operations-audit-{date}.md
```

### 3. Save Report

Save the full report to `output/audits/operations-audit-{date}.md`.

## Completion Criteria

- [ ] Full audit report has been written
- [ ] CEO has been notified
- [ ] Report has been saved

## Severe Findings Handling

If severe violations are found (red-light operations without approval, systematic record gaps), immediately trigger the `audit-issue` workflow to handle them.
