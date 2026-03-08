---
name: step-01-init
description: "Initialize, discover input documents"
next-step: ./step-02-discovery.md
output-file: "output/planning/product-brief.md"
template: "../../../templates/product-brief.md"
---

# Step 1: Initialization

**Progress: Step 1 of 4** — Next: Problem Exploration

## Objective

Detect whether an incomplete product brief exists (continuation recovery), discover and load all input documents (brainstorming results, research reports), and create the output file.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Check if output file exists

Check whether `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` already exists.

### 2. Continuation recovery decision

- **File exists**: Read its frontmatter `steps-completed`, jump to the step after the last completed one
- **File does not exist**: Proceed to next instruction, create a new product brief

### 3. Create new product brief

Use the template `{{INSTALL_DIR}}/workspace-cto/templates/product-brief.md` to create a new product brief file with initial frontmatter:

```yaml
---
type: product-brief
status: draft
created: {today}
agent: cto
workflow: create-product-brief
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 4. Discover input documents

Scan the following locations for available input documents:

- `{{INSTALL_DIR}}/workspace-cto/output/` — Brainstorming results
- `{{INSTALL_DIR}}/workspace-cto/output/analysis/` — Research reports
- Any files mentioned in the CTO's task description

### 5. Load all discovered inputs

Read all discovered input documents to understand the product concept context.

## Completion Criteria

- ✅ Product brief file created (or recovered from interruption point)
- ✅ All available input documents loaded and understood

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-discovery.md`
