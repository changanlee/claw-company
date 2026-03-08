---
name: step-02-implement
description: "TDD implementation"
next-step: ./step-03-test.md
output-file: null
template: null
---

# Step 2: TDD Implementation

**Progress: Step 2 of 4** — Next: Comprehensive testing

## Goal

Follow the quick-spec's implementation steps, strictly adhering to TDD to complete the feature development.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps
- 🔴 Strictly follow `{{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md`: never skip the RED step

## Execution Instructions

### 1. Execute Step by Step

Follow the quick-spec's implementation steps in order.

### 2. Strict TDD Cycle

For each implementation step, execute the TDD cycle:

**a. RED — Write Failing Test**

- Write tests based on quick-spec's test cases
- Run tests, confirm they fail
- If tests pass immediately, review whether the test is correct

**b. GREEN — Write Minimum Code**

- Write the minimum code to make tests pass
- No over-engineering

**c. REFACTOR — Refactor**

- Improve code quality
- Keep all tests green

### 3. Commit Per Step

Commit after each implementation step:

- Commit message clearly describes what the step accomplished
- Maintain appropriate commit granularity (one step, one commit)

## Completion Criteria

- ✅ All implementation steps completed
- ✅ Each step went through RED → GREEN → REFACTOR
- ✅ Each step committed after completion

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-test.md`
