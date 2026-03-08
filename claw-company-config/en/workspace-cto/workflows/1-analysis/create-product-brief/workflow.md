---
name: create-product-brief
description: "Product brief creation: from vision to core value proposition"
type: execution
agent: cto
sub-agent: analyst
phase: analysis
approval: yellow
output-dir: output/planning/
---

# Product Brief Creation Workflow

## Overview

The analyst creates a structured product brief document based on brainstorming results or initial concepts, covering vision, target users, core value proposition, and differentiation strategy.

## Prerequisites

- Brainstorming results or initial concept
- Research reports (if available)

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-init.md | Initialize, discover input documents |
| 2 | steps/step-02-discovery.md | Problem exploration, interact with CTO |
| 3 | steps/step-03-draft.md | Draft product brief |
| 4 | steps/step-04-complete.md | Final review and submission |

## Execution

Read and follow the first step: `steps/step-01-init.md`

⚠️ **Just-In-Time loading rules:**
- Only read the current step file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gates

| Output | Level | Process |
|--------|-------|---------|
| Product brief | Yellow | Submit to CTO for review → CEO approval |
