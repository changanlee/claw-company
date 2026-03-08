---
name: step-02-implement
description: "Write automated test scripts (by risk priority)"
next-step: ./step-03-summary.md
output-file: null
template: null
---

# Step 2: Implement Automated Tests

**Progress: Step 2 of 3** — Next: Produce automation summary

## Goal

Write automated test scripts in risk priority order for the identified gaps.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Start from Highest Priority

Implement automated tests in P0 → P1 → P2 order.

### 2. Write Test Code

For each gap:

- Follow AAA pattern (Arrange-Act-Assert)
- Use the project's test framework and conventions
- Test names clearly describe behavior
- Use mock/stub appropriately (avoid over-mocking)

### 3. Ensure Test Quality

Each test must:

- Run independently (no dependency on other tests' execution order)
- Include positive and negative test cases
- Cover critical boundary conditions
- Execute within reasonable time (unit < 100ms, integration < 1s)

### 4. Verify Incrementally

After completing each test:

- Run the test to confirm it passes (GREEN)
- Confirm existing tests are unaffected
- Update coverage data

### 5. Track Progress

Record each completed automated test:

- Test file path
- Covered feature points
- Test type (unit/integration/E2E)

## Completion Criteria

- ✅ All P0 priority gaps covered
- ✅ P1 priority gaps covered as much as possible
- ✅ All new tests pass
- ✅ Existing tests unaffected

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-summary.md`
