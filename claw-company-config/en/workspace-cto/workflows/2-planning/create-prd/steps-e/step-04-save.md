---
name: step-04-save
description: "Save and report"
next-step: null
output-file: "output/planning/prd.md"
---

# Step 4: Save and Report

**Progress: Step 4 of 4** — Final step

## Objective

Update the PRD frontmatter, save the modified file, and report the change summary to the CTO.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Update frontmatter

Update the PRD frontmatter:

- `status`: Keep `draft` or change to `in-review` (depending on change scope)
- Add `last-modified: {today}` field

### 2. Save PRD

Write the modified PRD to `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`.

### 3. Report change summary

Use `announce` to report to the CTO:

- List of changes (what was added / modified / deleted)
- Number of affected sections
- If major changes were made, recommend whether re-review is needed

## Completion Criteria

- ✅ Frontmatter updated
- ✅ PRD saved
- ✅ Change summary reported to CTO

## Next Step

This is the final step. PRD editing workflow complete.
