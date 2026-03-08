---
name: create-prd
description: "Product Requirements Document (PRD) creation, editing, and validation"
type: execution
agent: cto
sub-agent: pm
phase: planning
approval: yellow
output-dir: output/planning/
---

# Product Requirements Document (PRD) Workflow

## Overview

PRD workflow executed by the PM engineer, supporting three execution modes: Create, Edit, and Validate. The mode is automatically determined based on the task assigned by the CTO, producing a structured product requirements document.

## Prerequisites

- Product brief or brainstorming results
- Task description from CTO (with mode indication or inferable context)

## Mode Overview

| Mode | Directory | Steps | Use Case |
|------|-----------|-------|----------|
| Create | steps-c/ | 8 steps | Build a new PRD from scratch |
| Edit | steps-e/ | 4 steps | Modify an existing PRD |
| Validate | steps-v/ | 3 steps | Verify PRD quality and completeness |

## Execution

Determine the execution mode based on the task, then read the first step in the corresponding directory:

- **Create mode** → Read `steps-c/step-01-init.md`
- **Edit mode** → Read `steps-e/step-01-load.md`
- **Validate mode** → Read `steps-v/step-01-check.md`

⚠️ **Just-In-Time loading rules:**
- Only read the current step file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gates

| Output | Level | Process |
|--------|-------|---------|
| PRD document | Yellow | Submit to CTO for review → CEO approval |
