---
name: test-review
description: "Review existing test coverage and quality"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Test Quality Review

## Overview

The QA engineer scans existing test code, evaluates coverage and quality, and produces an improvement recommendation report.

## Prerequisites

- Existing test codebase
- Project path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-scan.md | Scan existing test code, collect coverage stats |
| 2 | steps/step-02-evaluate.md | Evaluate test quality |
| 3 | steps/step-03-report.md | Produce test quality report |

## Execution Instructions

Read and follow the first step: `steps/step-01-scan.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Test quality report | Green | QA completes independently, reports to CTO |
