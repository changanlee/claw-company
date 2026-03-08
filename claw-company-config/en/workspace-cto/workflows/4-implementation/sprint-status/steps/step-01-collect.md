---
name: step-01-collect
description: "Read sprint-status, collect each story's status"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# Step 1: Collect Status Data

**Progress: Step 1 of 3** — Next: Analyze progress and risks

## Goal

Read the sprint-status file and collect the current status of all stories.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Sprint Status

Read the sprint-status file provided by CTO.

### 2. Collect Story Statuses

Record each story's current status:

| Status | Description |
|--------|-------------|
| `backlog` | Not yet started |
| `ready` | Story file created, ready for development |
| `in-progress` | In development |
| `review` | Awaiting review |
| `done` | Completed |

### 3. Collect Supplementary Information

If story files are available, read supplementary information:

- Task completion ratio (marked `[x]` / total tasks)
- Issue records in development notes
- Blockers

### 4. Build Status Snapshot

Organize all collected data into a current point-in-time status snapshot.

## Completion Criteria

- ✅ Sprint status loaded
- ✅ All story statuses collected
- ✅ Supplementary information collected (if available)
- ✅ Status snapshot built

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-analyze.md`
