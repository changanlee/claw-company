---
name: step-01-init
description: "Load PRD, confirm target users and core features"
next-step: ./step-02-flow.md
output-file: "output/planning/ux-design.md"
template: "../../../templates/ux-design.md"
---

# Step 1: Initialization

**Progress: Step 1 of 4** — Next: User Journey Design

## Objective

Load the PRD and related documents, confirm target users and core feature list, and create the UX design file.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Check if output file exists

Check whether `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` already exists.

### 2. Continuation recovery decision

- **File exists**: Read its frontmatter `steps-completed`, jump to the step after the last completed one
- **File does not exist**: Proceed to next instruction, create a new UX design file

### 3. Load PRD

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` and extract:

- Target user personas
- Core feature list
- User stories and acceptance criteria
- Non-functional requirements (UX-relevant portions)

### 4. Load product brief (if available)

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` (if exists) to supplement user pain point and value proposition information.

### 5. Create UX design file

Use the template `{{INSTALL_DIR}}/workspace-cto/templates/ux-design.md` to create a new UX design file with initial frontmatter:

```yaml
---
type: ux-design
status: draft
created: {today}
agent: cto
workflow: create-ux-design
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 6. Update frontmatter

Add `step-01-init` to `steps-completed`.

## Completion Criteria

- ✅ PRD loaded and understood
- ✅ Target users and core features confirmed
- ✅ UX design file created

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-flow.md`
