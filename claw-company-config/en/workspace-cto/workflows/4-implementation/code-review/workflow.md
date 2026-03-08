---
name: code-review
description: "Code review process"
type: execution
agent: cto
sub-agent: code-reviewer
phase: implementation
approval: green
output-dir: output/implementation/
---

# Code Review

## Overview

The Code Reviewer collects review materials, reviews code changes item by item (architecture, logic, tests, style, security), and produces a review report with a pass/fail determination.

## Prerequisites

- A completed story in `review` status
- Story file path and change file information provided by CTO at spawn time
- Review report template: `../../templates/code-review-report.md`

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-prepare.md | Collect review materials |
| 2 | steps/step-02-review.md | Review item by item |
| 3 | steps/step-03-report.md | Produce review report |

## Execution Instructions

Read and follow the first step: `steps/step-01-prepare.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Review report | Green | Code Reviewer completes independently, reports to CTO |
