---
name: create-epics-and-stories
description: "Break down PRD into Epics and User Stories"
type: execution
agent: cto
sub-agent: scrum-master
phase: solutioning
approval: green
output-dir: output/planning/
---

# Epic & User Story Breakdown Workflow

## Overview

The Scrum Master breaks down requirements from the PRD and architecture documents into actionable Epics and User Stories, following INVEST principles to ensure story quality.

## Prerequisites

- PRD (required)
- Architecture document (required)

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-load.md | Load PRD and architecture documents |
| 2 | steps/step-02-epics.md | Break down into Epics |
| 3 | steps/step-03-stories.md | Break down Stories for each Epic |
| 4 | steps/step-04-complete.md | Produce final list and report to CTO |

## Execution Instructions

Read and follow the first step: `steps/step-01-load.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gate

| Output | Signal | Handling |
|--------|--------|----------|
| Epic/Story list | Green | Report to CTO |
