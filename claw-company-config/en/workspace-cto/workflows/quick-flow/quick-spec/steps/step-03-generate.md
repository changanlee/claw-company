---
name: step-03-generate
description: "Generate complete technical spec"
next-step: ./step-04-review.md
output-file: "output/planning/quick-spec.md"
template: "../../templates/quick-spec.md"
---

# Step 3: Generate Complete Technical Spec

**Progress: Step 3 of 4** — Next: Review and confirm

## Goal

Consolidate investigation results into a complete, directly executable technical spec document.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write Implementation Steps

Make the modification plan specific down to file and function level:

- Each step should explicitly state the file path to modify
- Describe the specific change (add function, modify logic, adjust parameters, etc.)
- Steps must have a clear sequential order

### 2. Define Test Cases

Define corresponding tests for each implementation step:

- Test name and description
- Input and expected output
- Boundary condition tests

### 3. List Acceptance Criteria

Clear, verifiable acceptance criteria:

- Functional criteria (does the feature work correctly)
- Non-functional criteria (performance, security, etc., if applicable)

### 4. Produce quick-spec Document

Use the `templates/quick-spec.md` template (if it exists) to produce the complete quick-spec document.

## Completion Criteria

- ✅ Implementation steps written (specific to file and function level)
- ✅ Test cases defined
- ✅ Acceptance criteria listed
- ✅ quick-spec document produced

## Next Step

After confirming completion criteria are met, read and follow: `./step-04-review.md`
