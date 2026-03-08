---
name: step-01-init
description: "Initialization and state detection"
next-step: ./step-02-classify.md
output-file: "output/planning/prd.md"
template: "../../templates/prd.md"
---

# Step 1: Initialization and State Detection

**Progress: Step 1 of 8** — Next: Project Classification

## Objective

Detect whether an incomplete PRD exists (continuation recovery), or create a new PRD file; discover and load all input documents.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Check if output file exists

Check whether `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` already exists.

### 2. Continuation recovery decision

- **File exists**: Read its frontmatter `steps-completed`, jump to the step after the last completed one
- **File does not exist**: Proceed to next instruction, create a new PRD

### 3. Create new PRD

Use the template `{{INSTALL_DIR}}/workspace-cto/templates/prd.md` to create a new PRD file with initial frontmatter:

```yaml
---
type: prd
status: draft
created: {today}
agent: cto
workflow: create-prd
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 4. Discover input documents

Scan the following locations for available input documents:

- `{{INSTALL_DIR}}/workspace-cto/output/analysis/` — Product brief
- `{{INSTALL_DIR}}/workspace-cto/output/` — Brainstorming results, research reports
- Any files mentioned in the CTO's task description

### 5. Load all discovered inputs

Read all discovered input documents to understand the requirements context.

## Completion Criteria

- ✅ PRD file created (or recovered from interruption point)
- ✅ All available input documents loaded and understood

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-classify.md`
