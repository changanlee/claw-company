---
name: test-design
description: "Design system-level or Epic-level test strategy and plan"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Test Strategy Design

## Overview

The QA engineer designs a comprehensive test strategy and plan based on PRD, architecture documents, and Epic requirements, covering test pyramid ratios, framework selection, and coverage strategy.

## Prerequisites

- PRD or Epic document (with requirement specifications)
- Architecture design document (if available)
- Related file paths provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-analyze.md | Load documents, analyze test scope and risks |
| 2 | steps/step-02-design.md | Design test architecture and coverage strategy |
| 3 | steps/step-03-document.md | Produce test plan document |

## Execution Instructions

Read and follow the first step: `steps/step-01-analyze.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Test strategy plan | Green | QA completes independently, reports to CTO |
