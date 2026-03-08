---
name: automate
description: "Expand test automation coverage"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Test Automation Expansion

## Overview

The QA engineer analyzes existing automation coverage gaps and writes automated test scripts by risk priority to improve test automation coverage.

## Prerequisites

- Existing test codebase
- Test strategy document (if available)
- Project path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-assess.md | Analyze existing automation coverage, identify gaps |
| 2 | steps/step-02-implement.md | Write automated test scripts |
| 3 | steps/step-03-summary.md | Produce automation summary |

## Execution Instructions

Read and follow the first step: `steps/step-01-assess.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Automated test scripts | Green | QA completes independently, reports to CTO |
