---
name: step-02-write
description: "Write the complete story file"
next-step: ./step-03-ready.md
output-file: story-{id}.md
template: ../../templates/story.md
---

# Step 2: Write Story File

**Progress: Step 2 of 3** — Next: Confirm story is ready for development

## Goal

Use the template to write a complete story file containing all information needed for development.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Template

Read the Story template: `{{INSTALL_DIR}}/workspace-cto/templates/story.md`

### 2. Write Story Description

Based on Epic context, write:

- **Story title**: Clear feature description
- **Story description**: Feature requirement from user perspective (As a... I want... So that...)
- **Background**: Why this feature is needed

### 3. Define Acceptance Criteria

Write specific, verifiable acceptance criteria:

- Each criterion must be verifiable through testing
- Include both happy paths and edge cases
- Use Given/When/Then format (if applicable)

### 4. Break Down Task List

Decompose the Story into ordered development tasks:

- Each task should be appropriately sized (completable in 1-2 hours)
- Tasks should have clear ordering
- Mark initial task status as `[ ]`

### 5. Write Development Notes

Provide technical hints for the dev engineer:

- Relevant code locations
- Architecture constraints
- Test strategy suggestions
- Edge cases to watch for

### 6. Write File

Write the completed story file to the `output/implementation/` directory.

## Completion Criteria

- ✅ Story description complete
- ✅ Acceptance criteria are specific and verifiable
- ✅ Task list decomposed
- ✅ Development notes written
- ✅ File written to specified directory

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-ready.md`
