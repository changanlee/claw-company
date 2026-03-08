---
name: step-01-init
description: "Load PRD and related documents, confirm non-functional requirements"
next-step: ./step-02-design.md
output-file: "output/planning/architecture.md"
template: "../../../templates/architecture.md"
---

# Step 1: Initialization

**Progress: Step 1 of 5** — Next: System Architecture Design

## Objective

Load the PRD and all related documents, confirm non-functional requirements, and create the architecture file.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Check if output file exists

Check whether `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md` already exists.

### 2. Continuation recovery decision

- **File exists**: Read its frontmatter `steps-completed`, jump to the step after the last completed one
- **File does not exist**: Proceed to next instruction, create a new architecture file

### 3. Load PRD

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` and extract:

- Functional requirements list
- Non-functional requirements (performance, security, scalability)
- Technical constraints and preferences
- Integration requirements

### 4. Load related documents

- `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` (if exists) — Page structure, data flow needs
- `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md` (if exists) — Technical recommendations
- `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` (if exists) — Product context

### 5. Confirm non-functional requirements

Organize and confirm NFR baselines with the CTO:

- **Performance**: Response time, throughput, latency targets
- **Scalability**: Expected load, growth projections
- **Availability**: SLA targets, fault tolerance requirements
- **Security**: Authentication, authorization, data encryption needs
- **Maintainability**: Code quality standards, tech debt tolerance

### 6. Create architecture file

Use the template `{{INSTALL_DIR}}/workspace-cto/templates/architecture.md` to create a new architecture file with initial frontmatter:

```yaml
---
type: architecture
status: draft
created: {today}
agent: cto
workflow: create-architecture
steps-completed: []
approved-by: null
related: []
tags: []
---
```

### 7. Update frontmatter

Add `step-01-init` to `steps-completed`.

## Completion Criteria

- ✅ PRD loaded and understood
- ✅ Related documents loaded
- ✅ Non-functional requirements confirmed
- ✅ Architecture file created

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-design.md`
