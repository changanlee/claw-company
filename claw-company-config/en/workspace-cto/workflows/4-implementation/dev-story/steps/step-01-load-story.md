---
name: step-01-load-story
description: "Load story and prepare dev environment"
next-step: ./step-02-execute-tasks.md
output-file: null
template: null
---

# Step 1: Load Story

**Progress: Step 1 of 3** — Next: Execute tasks with TDD

## Goal

Load the story file, parse all development information, and confirm the dev environment is ready.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Receive Story File

Receive the story file path provided by CTO at spawn time. Read the story file.

### 2. Parse Story Content

Parse the following information from the story file:

- **Story description**: Complete description of the feature requirement
- **Acceptance criteria**: Conditions that must be satisfied item by item
- **Task list**: Ordered list of development tasks
- **Development notes**: Technical hints left by architect or PM

### 3. Continuation Detection

Check for previous development records (continuation detection):

- Check if the story file has tasks already marked `[x]`
- If so, continue from the last incomplete task; do not repeat completed work
- Record the recovery point in the Dev Agent Record

### 4. Update Sprint Status

If a sprint-status file exists: update this story's status to `in-progress`.

### 5. Confirm Dev Environment

- Confirm the current git branch is correct
- Confirm dependencies are installed (run the project's dependency install command)
- Confirm the test framework runs correctly

## Completion Criteria

- ✅ Story file read, all fields parsed
- ✅ Task list confirmed (including continuation detection)
- ✅ Dev environment ready (git branch, dependencies, test framework)

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-execute-tasks.md`
