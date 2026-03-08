---
name: step-01-select
description: "Select the next backlog story from sprint-status"
next-step: ./step-02-write.md
output-file: null
template: null
---

# Step 1: Select Story

**Progress: Step 1 of 3** — Next: Write the complete story file

## Goal

Select the next story to be created from the sprint-status backlog.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Sprint Status

Read the sprint-status file path provided by CTO. Load the current Sprint status.

### 2. Identify Eligible Stories

Filter for stories with `backlog` status that do not yet have a story file:

- Check if a corresponding story file already exists
- Exclude items that already have story files

### 3. Select Target Story

If CTO specified a particular story, select it directly. Otherwise, select based on priority:

- Stories that other stories depend on (unblock first)
- Highest priority
- No dependencies or dependencies already completed

### 4. Load Epic Context

Read the Epic file this Story belongs to, obtaining:

- The Story's original description in the Epic
- Architecture design related information
- Relationships with other Stories

## Completion Criteria

- ✅ Sprint status loaded
- ✅ Target story selected
- ✅ Epic context loaded

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-write.md`
