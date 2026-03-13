---
name: step-03-document
description: "Produce retrospective report, write lessons to memory"
next-step: null
output-file: retrospective.md
template: ../../templates/retrospective.md
---

# Step 3: Produce Retrospective Report

**Progress: Step 3 of 3** — Final step

## Goal

Use the template to produce a retrospective report and write lessons into CTO MEMORY.md.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Template

Read the retrospective template: `{{INSTALL_DIR}}/workspace-cto/templates/retrospective.md`

### 2. Fill Report

Fill in according to template format:

- **Sprint/Epic overview**: Name, time range, goals
- **Metrics summary**: Completion rate, review rejection rate, blocker count
- **What went well**: Keep list
- **What needs improvement**: Improve list
- **Action items**: With owner and timeline
- **Lessons**: Categorized

### 3. Write Retrospective Report

Write the retrospective report to the `output/planning/` directory.

### 4. Update CTO MEMORY.md

Write refined lessons into CTO MEMORY.md:

- Only write lessons with long-term value (not one-off issues)
- Organize per existing MEMORY.md format
- Ensure MEMORY.md stays within the 200-line limit

### 5. Route Lessons

Send lessons that need routing via `exec dispatch` (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh):

- Security related → CAO
- Cost related → CFO
- Process related → CHRO
- Strategic related → CEO

## Completion Criteria

- ✅ Retrospective report filled per template
- ✅ Report written to specified directory
- ✅ CTO MEMORY.md updated
- ✅ Lessons routed to relevant Agents

## Next Step

This is the final step. Retrospective complete, lessons retained.
