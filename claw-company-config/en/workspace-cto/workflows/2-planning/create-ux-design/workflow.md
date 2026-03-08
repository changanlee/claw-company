---
name: create-ux-design
description: "UX design specification creation"
type: execution
agent: cto
sub-agent: ux-designer
phase: planning
approval: yellow
output-dir: output/planning/
---

# UX Design Specification Workflow

## Overview

The UX designer creates a complete UX design specification document based on the PRD or product brief, covering user journeys, information architecture, and UI component specifications.

## Prerequisites

- PRD or product brief
- Target users confirmed

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-init.md | Load PRD, confirm target users and core features |
| 2 | steps/step-02-flow.md | Design user journeys and information architecture |
| 3 | steps/step-03-spec.md | UI component specs and interaction patterns |
| 4 | steps/step-04-complete.md | Final output and submission |

## Execution

Read and follow the first step: `steps/step-01-init.md`

⚠️ **Just-In-Time loading rules:**
- Only read the current step file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gates

| Output | Level | Process |
|--------|-------|---------|
| UX design document | Yellow | Submit to CTO for review → CEO approval |
