---
name: trace
description: "Requirements-to-tests traceability matrix"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Requirements Traceability Matrix

## Overview

The QA engineer builds a requirements-to-tests traceability matrix, identifying uncovered requirements and orphaned tests to ensure all requirements have corresponding test verification.

## Prerequisites

- PRD (with requirement IDs)
- Existing test codebase
- Related file paths provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-map.md | Extract requirement IDs and test cases |
| 2 | steps/step-02-link.md | Build requirement-test mapping matrix |
| 3 | steps/step-03-report.md | Produce traceability report |

## Execution Instructions

Read and follow the first step: `steps/step-01-map.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Traceability matrix report | Green | QA completes independently, reports to CTO |
