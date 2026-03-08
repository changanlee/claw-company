---
name: dispatch
description: "Dispatch: Compose spawn instructions, select engineers, dispatch tasks"
next-step: ./step-05-review.md
output-file: null
template: null
---

# Step 4: Dispatch

**Progress: Step 4 of 5**

## Goal

Based on task breakdown results, determine task type for each task, select applicable rules, choose engineers from roster, compose complete spawn instructions, and dispatch for execution.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Determine Task Type

For each task, determine type and applicable iron law rules:

| Task Type | Applicable Rules |
|-----------|-----------------|
| New Feature | `rules/tdd-iron-law.md` + `rules/verification.md` |
| Bug Fix | `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md` |
| Refactoring | `rules/tdd-iron-law.md` + `rules/verification.md` |

### 2. Compose Spawn Instructions

Each spawn task includes the following:

1. **Task Description**: Clear goal and scope.
2. **Constraints**: Tech stack, file scope, areas that must not be modified.
3. **Expected Output**: Specific deliverables list.
4. **Report Format**: Standardized report format (see engineer definition files).
5. **Applicable Iron Laws**: Based on task type, include the full content of corresponding `rules/*.md` in the spawn instruction.
6. **Workflow Path**: Specify the workflow for the Sub-Agent to follow (e.g., `workflows/4-implementation/dev-story/workflow.md`).

### 3. Select Engineer

Read `engineers/roster.md` and select the appropriate engineer based on task nature:

| Task Nature | Engineer Selection |
|-------------|-------------------|
| General development | Developer (`engineers/dev.md`) |
| Small independent tasks | Solo Developer (`engineers/solo-dev.md`) |
| User-facing features | UX Designer (`engineers/ux-designer.md`) for design spec first, then Developer for implementation |
| Documentation updates | Technical Writer (`engineers/tech-writer.md`) |
| Analysis support needed | Analyst (`engineers/analyst.md`) |

### 4. Execute Dispatch

Spawn engineers one by one to execute tasks, await reports.

## Completion Criteria

- [ ] Each task has determined type with mapped applicable rules
- [ ] Each task has complete spawn instructions (task description, constraints, output, report format, iron laws, workflow path)
- [ ] Each task has selected appropriate engineer from roster.md
- [ ] All tasks dispatched and awaiting/received reports

## Next Step

👉 Proceed to [Step 5: Review](./step-05-review.md)
