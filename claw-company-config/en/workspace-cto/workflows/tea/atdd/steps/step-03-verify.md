---
name: step-03-verify
description: "Run tests to confirm all fail (RED)"
next-step: null
output-file: null
template: null
---

# Step 3: Verify Test Status

**Progress: Step 3 of 3** — Final step

## Goal

Run all generated acceptance tests to confirm they are all in RED (failing) state, then hand off to dev engineers for implementation.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Execute Acceptance Tests

Run all newly generated acceptance tests:

- Use the project's test execution command
- Only run newly generated ATDD tests (don't affect existing tests)
- Record each test's execution result

### 2. Confirm RED Status

Verify all tests are in the expected failing state:

- **Expected result**: All tests should fail (RED)
- If any test passes: investigate the cause (feature may already be implemented or test may be flawed)
- Passing tests need correction or marking as already-covered

### 3. Handle Exceptions

- **Compilation errors**: Fix syntax issues to ensure tests can run (but should still fail)
- **Environment issues**: Ensure test environment is properly configured
- **Unexpected passes**: Analyze cause, fix test logic or confirm feature already exists

### 4. Delivery Report

Report to CTO:

- Acceptance test file path list
- Total test count and RED status confirmation
- Corresponding story and AC numbers
- Recommended implementation order for dev (sorted by dependency chain)
- Notify dev engineer to begin implementation (GREEN phase)

## Completion Criteria

- ✅ All acceptance tests executed
- ✅ All tests in RED state (or exceptions handled)
- ✅ Results reported to CTO and dev engineer notified
