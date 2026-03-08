---
name: step-02-execute-tasks
description: "Execute tasks with TDD"
next-step: ./step-03-verify.md
output-file: null
template: null
---

# Step 2: Execute Tasks with TDD

**Progress: Step 2 of 3** — Next: Final verification and delivery

## Goal

Execute the TDD development cycle for each task in order, completing all tasks.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps
- 🔴 Strictly follow `{{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md`: never skip the RED step

## Execution Instructions

### 1. TDD Cycle Per Task

For each task in the task list, execute in order:

**a. RED — Write Failing Test**

- Write tests based on task requirements
- Run tests, confirm they fail (red)
- If tests pass immediately, the test is incorrect — review and fix

**b. GREEN — Write Minimum Code**

- Write the minimum code to make tests pass
- No over-engineering; only satisfy current test requirements
- Run tests, confirm they pass (green)

**c. REFACTOR — Refactor**

- Improve code quality (naming, structure, duplication removal)
- Keep all tests green
- If refactoring causes test failure, fix immediately

### 2. Mark Task Complete

After each task completes the TDD cycle, mark `[x]` in the story file.

### 3. Handle Architecture Issues

When encountering the following, **stop development and report to CTO** — do not decide independently:

- Need to modify another module's API interface
- Architecture design doesn't match actual requirements
- External service behavior differs from expectations
- Task scope exceeds story definition

### 4. Record Development Process

Record in the story file's Dev Agent Record section:

- Completion time for each task
- Problems encountered and solutions
- Important technical decisions and rationale

## Completion Criteria

- ✅ All tasks marked `[x]`
- ✅ All tests passing (zero failures)
- ✅ Dev Agent Record documented

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-verify.md`
