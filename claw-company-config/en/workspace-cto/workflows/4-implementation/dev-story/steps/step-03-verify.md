---
name: step-03-verify
description: "Final verification and delivery"
next-step: null
output-file: null
template: null
---

# Step 3: Final Verification and Delivery

**Progress: Step 3 of 3** — Final step

## Goal

Execute comprehensive verification, confirm all acceptance criteria are met, update status, and report to CTO.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Execute Verification Process

Read and follow `{{INSTALL_DIR}}/workspace-cto/rules/verification.md` verification process.

### 2. Full Test Suite

Run all levels of tests:

- **Unit tests**: Confirm all unit tests pass
- **Integration tests**: Confirm inter-module interactions are correct
- **Regression tests**: Confirm no existing functionality is broken

### 3. Code Quality Checks

- Run linting, confirm no errors
- Check code style consistency

### 4. Acceptance Criteria Confirmation

Check each acceptance criterion from the story file:

- Each criterion must have a corresponding test or verification method
- Record the verification result for each criterion

### 5. Quality Checklist

Execute the `checklist.md` quality checklist, confirming each item.

### 6. Update Status

- Update story file status: `in-progress` → `review`
- If sprint-status exists: update accordingly

### 7. Produce Development Summary

Produce a development summary for CTO, including:

- List of completed tasks
- Test results summary
- File change list
- Problems encountered and solutions
- Items requiring CTO attention

## Completion Criteria

- ✅ Verification process executed
- ✅ All tests passing (unit + integration + regression)
- ✅ Lint has no errors
- ✅ Acceptance criteria confirmed item by item
- ✅ Quality checklist all passed
- ✅ Story status updated to `review`
- ✅ Development summary produced

## Next Step

This is the final step. Report the development summary to CTO and await Code Review.
