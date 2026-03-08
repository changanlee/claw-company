---
name: step-03-report
description: "Produce review report"
next-step: null
output-file: code-review-report.md
template: ../../templates/code-review-report.md
---

# Step 3: Produce Review Report

**Progress: Step 3 of 3** — Final step

## Goal

Use the template to produce a review report, determine pass or fail, and list items that must be fixed.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Template

Read the review report template: `{{INSTALL_DIR}}/workspace-cto/templates/code-review-report.md`

### 2. Determine Result

Determine the review result based on issue statistics:

| Condition | Result |
|-----------|--------|
| No Critical issues | **Pass** |
| Has Critical issues | **Fail** — list all Critical must-fix items |

### 3. Fill Report

Fill in according to template format:

- **Review summary**: Change scope, review result
- **Issue list**: Grouped by severity
- **Must-fix items**: Specific fix suggestions for Critical + Important
- **Improvement suggestions**: Optimization suggestions for Minor
- **Acceptance criteria verification**: Whether each criterion is satisfied

### 4. Update Story Status

Update based on review result:

- **Pass**: Story status → `done`, sync sprint-status update
- **Fail**: Story status → `in-progress`, attach must-fix list

### 5. Write Report

Write the review report to the `output/implementation/` directory.

## Completion Criteria

- ✅ Review result determined
- ✅ Report filled completely per template
- ✅ Story status updated
- ✅ Report written to specified directory

## Next Step

This is the final step. Report the review results to CTO for next steps.
