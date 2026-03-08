---
name: step-01-load
description: "Load PRD and architecture documents"
next-step: ./step-02-epics.md
---

# Step 1: Load Documents

**Progress: Step 1 of 4** — Next: Break down Epics

## Objective

Load the PRD and architecture documents, understand functional requirements and technical constraints, and prepare for breakdown.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. Load PRD

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` and extract:

- Functional requirements list
- User stories (if a preliminary version exists)
- Acceptance criteria
- Priority information

### 2. Load Architecture Document

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md` and extract:

- Component decomposition structure
- Technical constraints and dependencies
- Data model
- Impact of non-functional requirements on implementation

### 3. Load UX Design (if available)

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` (if it exists) and extract:

- Page list and flows
- Interaction specifications

### 4. Build Feature Map

Organize all functional requirements into a feature map (grouped by user journey or functional module), marking:

- Core features vs. auxiliary features
- Frontend vs. backend vs. full-stack
- Dependencies (A must be completed before B)

## Completion Criteria

- ✅ PRD loaded and understood
- ✅ Architecture document loaded and understood
- ✅ Feature map built
- ✅ Dependencies marked

## Next Step

After confirming all completion criteria are met, read and follow: `./step-02-epics.md`
