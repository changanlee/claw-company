---
name: check-readiness
description: "Check whether requirement documents are ready for development"
type: execution
agent: cto
sub-agent: pm
phase: solutioning
approval: green
output-dir: output/planning/
---

# Development Readiness Check Workflow

## Overview

The PM engineer checks all requirement documents for completeness and assesses whether they are ready to enter the development phase. Each item in the PRD, UX design, architecture document, and Epic/Story list is verified individually.

## Prerequisites

- PRD (required)
- UX design document (required)
- Architecture document (required)
- Epic/Story list (required)

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-collect.md | Collect all required documents |
| 2 | steps/step-02-validate.md | Validate completeness item by item |
| 3 | steps/step-03-report.md | Produce readiness report |

## Execution Instructions

Read and follow the first step: `steps/step-01-collect.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gate

| Output | Signal | Handling |
|--------|--------|----------|
| Readiness report | Green | Report to CTO |
