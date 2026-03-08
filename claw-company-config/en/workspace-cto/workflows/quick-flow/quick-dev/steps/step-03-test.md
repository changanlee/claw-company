---
name: step-03-test
description: "Comprehensive testing"
next-step: ./step-04-deliver.md
output-file: null
template: null
---

# Step 3: Comprehensive Testing

**Progress: Step 3 of 4** — Next: Delivery

## Goal

Run the full test suite to confirm the feature is correct with no regressions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Run Full Test Suite

Run the project's complete test suite:

- Unit tests
- Integration tests (if any)
- Confirm no regressions (all existing tests still pass)

### 2. Lint Check

Run code style and quality checks:

- Run the project's linter
- Fix all lint errors
- Confirm code style consistency

### 3. Check Against Acceptance Criteria

Verify each acceptance criterion from the quick-spec:

- Each criterion must pass verification
- Record the verification method and result for each
- If any criterion fails, return to Step 2 to fix

## Completion Criteria

- ✅ Full test suite passing (zero failures)
- ✅ Lint check passed
- ✅ Acceptance criteria confirmed item by item

## Next Step

After confirming completion criteria are met, read and follow: `./step-04-deliver.md`
