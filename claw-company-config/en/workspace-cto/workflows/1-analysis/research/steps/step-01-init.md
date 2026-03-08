---
name: step-01-init
description: "Determine research type, load context"
next-step: null
output-file: "output/planning/research-report.md"
template: "../../../templates/research-report.md"
---

# Step 1: Initialization and Type Determination

**Progress: Step 1 of 3** — Next: Mode-specific branch

## Objective

Determine the research type (market / domain / technical), load relevant background materials, and create the research report file.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Analyze research task

Based on the CTO's task description, determine the research type:

- **market**: Involves competitors, market size, trends, user needs
- **domain**: Involves industry knowledge, regulations, best practices
- **technical**: Involves technology selection, architecture, PoC feasibility

### 2. Create research report file

Use the template `{{INSTALL_DIR}}/workspace-cto/templates/research-report.md` to create a new research report with initial frontmatter:

```yaml
---
type: research-report
status: draft
created: {today}
agent: cto
workflow: research
research-type: {market|domain|technical}
steps-completed: []
related: []
tags: []
---
```

### 3. Load background materials

Scan the following locations and load documents related to the research topic:

- `{{INSTALL_DIR}}/workspace-cto/output/` — Existing reports or briefs
- Any files mentioned in the CTO's task description
- Relevant historical decisions from CTO MEMORY.md

### 4. Update frontmatter

Add `step-01-init` to `steps-completed`.

## Completion Criteria

- ✅ Research type determined
- ✅ Research report file created
- ✅ Relevant background materials loaded

## Next Step

Based on the research type, read and follow the corresponding step:

- **market** → `./step-02-market.md`
- **domain** → `./step-02-domain.md`
- **technical** → `./step-02-technical.md`
