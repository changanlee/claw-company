---
name: create-architecture
description: "System architecture design and ADR"
type: execution
agent: cto
sub-agent: architect
phase: solutioning
approval: yellow
output-dir: output/planning/
---

# System Architecture Design Workflow

## Overview

The architect designs a complete system architecture based on the PRD and UX design (if available), including component decomposition, communication protocols, data flow, infrastructure strategy, and documents key architecture decisions using ADR format.

## Prerequisites

- PRD (required)
- UX design document (if available)
- Technical recommendations from research report (if available)

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-init.md | Load PRD and related documents, confirm NFRs |
| 2 | steps/step-02-design.md | System architecture design |
| 3 | steps/step-03-adr.md | Architecture decision records |
| 4 | steps/step-04-infra.md | Infrastructure and deployment strategy |
| 5 | steps/step-05-complete.md | Final output and submission |

## Execution

Read and follow the first step: `steps/step-01-init.md`

⚠️ **Just-In-Time loading rules:**
- Only read the current step file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gates

| Output | Level | Process |
|--------|-------|---------|
| Architecture document | Yellow | Submit to CTO for review → CEO approval |
