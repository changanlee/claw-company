---
name: dev-story
description: "Execute feature development based on story file, strictly following TDD"
type: execution
agent: cto
sub-agent: dev
phase: implementation
approval: green
output-dir: output/implementation/
---

# Story Feature Development

## Overview

The dev engineer implements features step by step based on the story file's acceptance criteria. Strictly follows the TDD (Test-Driven Development) process, ensuring every task goes through the RED → GREEN → REFACTOR cycle.

## Prerequisites

- An established story file (with acceptance criteria and task list)
- sprint-status (if available)
- Story file path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-load-story.md | Load story and prepare dev environment |
| 2 | steps/step-02-execute-tasks.md | Execute tasks with TDD |
| 3 | steps/step-03-verify.md | Final verification and delivery |

## Execution Instructions

Read and follow the first step: `steps/step-01-load-story.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Feature implementation | Green | Dev completes independently, reports to CTO |
