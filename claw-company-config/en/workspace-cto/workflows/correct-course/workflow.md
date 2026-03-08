---
name: correct-course
description: "Major change management during Sprint execution"
type: interactive
agent: cto
sub-agent: null
phase: implementation
approval: yellow
output-dir: output/planning/
---

# Course Correction

## Overview

When the CTO encounters a major change requirement during Sprint execution, this workflow assesses the change impact, develops a correction plan, and executes the changes while updating all related documents.

## Prerequisites

- An active Sprint (with sprint-status file)
- A clear change requirement (from Chairman, CEO, or discovered during development)

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-assess.md | Assess change requirements |
| 2 | steps/step-02-plan.md | Develop correction plan |
| 3 | steps/step-03-execute.md | Execute changes |

## Execution Instructions

Read and follow the first step: `steps/step-01-assess.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Correction plan | Yellow | Requires CEO approval before execution |
