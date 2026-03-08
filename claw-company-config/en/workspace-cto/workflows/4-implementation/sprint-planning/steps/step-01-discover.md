---
name: step-01-discover
description: "Discover and load all Epic files"
next-step: ./step-02-parse.md
output-file: null
template: null
---

# Step 1: Discover Epic Files

**Progress: Step 1 of 4** — Next: Parse Epics → Stories

## Goal

Discover and load all relevant Epic files, confirming that Sprint planning inputs are complete.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Receive Epic Path

Receive the Epic file path or directory provided by CTO at spawn time.

### 2. Scan Epic Files

- If a directory is provided, scan all Epic files within it
- If a single file is provided, load it directly
- Record the list of discovered Epic files

### 3. Load Epic Contents

Read each Epic file and confirm:

- File format is correct (contains Story breakdown section)
- Epic name and description are complete
- Story list exists and is non-empty

### 4. Build Epic Index

Organize all discovered Epics into an index:

- Epic name
- Story count
- File path

## Completion Criteria

- ✅ All Epic files discovered and loaded
- ✅ Each Epic's format validated
- ✅ Epic index built

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-parse.md`
