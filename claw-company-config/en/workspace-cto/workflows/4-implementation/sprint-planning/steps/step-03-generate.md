---
name: step-03-generate
description: "Generate Sprint status document"
next-step: ./step-04-validate.md
output-file: sprint-status.md
template: ../../templates/sprint-status.md
---

# Step 3: Generate Sprint Status Document

**Progress: Step 3 of 4** — Next: Validate completeness

## Goal

Use the template to generate a Sprint status tracking document containing status tracking for all Stories.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Template

Read the Sprint status template: `{{INSTALL_DIR}}/workspace-cto/templates/sprint-status.md`

### 2. Populate Sprint Information

Fill in according to template format:

- **Sprint name**: Specified by CTO or auto-generated
- **Sprint goal**: Aggregated from Epic goals
- **Start date / End date**: If specified by CTO
- **Story list**: From Step 2's backlog list

### 3. Build Story Status Tracking Table

Create status tracking for each Story:

| Field | Description |
|-------|-------------|
| Story ID | Unique identifier |
| Story title | Concise description |
| Source Epic | Source Epic name |
| Status | `backlog` / `in-progress` / `review` / `done` |
| Assignee | Dev engineer (to be assigned) |
| Dependencies | Prerequisite Story IDs |

### 4. Write File

Write the completed Sprint status document to the `output/implementation/` directory.

## Completion Criteria

- ✅ Sprint status document generated
- ✅ All Story statuses initialized to `backlog`
- ✅ File written to specified directory

## Next Step

After confirming completion criteria are met, read and follow: `./step-04-validate.md`
