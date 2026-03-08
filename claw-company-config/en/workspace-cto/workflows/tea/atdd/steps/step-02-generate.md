---
name: step-02-generate
description: "Generate test code for each acceptance criterion"
next-step: ./step-03-verify.md
output-file: null
template: null
---

# Step 2: Generate Acceptance Tests

**Progress: Step 2 of 3** — Next: Run tests to confirm failure

## Goal

Generate expected-to-fail acceptance test code for each acceptance criterion.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Determine Test Framework

Confirm the tools and syntax to use for acceptance tests based on the project's test framework configuration.

### 2. Generate Test Code for Each AC

For each acceptance criterion (AC), generate corresponding test code:

- **Test name**: Directly maps to scenario name (e.g., `should allow user to register when providing valid email`)
- **Arrange**: Set up preconditions based on Given
- **Act**: Execute trigger action based on When
- **Assert**: Write assertions based on Then

### 3. Handle Boundary Scenarios

For each AC, consider boundary scenario tests:

- Invalid input scenarios
- Insufficient permission scenarios
- Data not found scenarios
- Concurrent operation scenarios (if applicable)

### 4. Organize Test Structure

- Group by feature/story (describe blocks)
- Test file naming follows project conventions
- Shared setup/teardown extracted as helpers
- Test data uses fixtures or factories

### 5. Mark as ATDD Tests

Add markers in test files indicating these are ATDD-generated acceptance tests:

- Add comments at file top noting the source story
- Mark each test with its corresponding AC number

## Completion Criteria

- ✅ Every acceptance criterion has corresponding test code
- ✅ Boundary scenario tests generated
- ✅ Test structure is clear with consistent naming
- ✅ ATDD markers added

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-verify.md`
