---
name: create-story
description: "Create implementation-ready Story files"
type: execution
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# Create Story File

## Overview

The Scrum Master selects the next backlog story from sprint-status, writes a complete story file (description, acceptance criteria, task list, development notes), confirms it is ready for development, and updates sprint-status.

## Prerequisites

- An established sprint-status document
- CTO specifies which story to create at spawn time (or Scrum Master selects from backlog)
- Story template: `../../templates/story.md`

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-select.md | Select the next backlog story from sprint-status |
| 2 | steps/step-02-write.md | Write the complete story file |
| 3 | steps/step-03-ready.md | Confirm story is ready for development, update sprint-status |

## Execution Instructions

Read and follow the first step: `steps/step-01-select.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Story file | Green | Scrum Master completes independently, reports to CTO |
