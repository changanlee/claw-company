---
name: step-02-evaluate
description: "Evaluate test quality"
next-step: ./step-03-report.md
output-file: null
template: null
---

# Step 2: Evaluate Test Quality

**Progress: Step 2 of 3** — Next: Produce test quality report

## Goal

Conduct an in-depth evaluation of existing test quality across structure, maintainability, and effectiveness dimensions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Check AAA Pattern

Sample-check whether tests follow the Arrange-Act-Assert pattern:

- Do tests have a clear setup phase (Arrange)?
- Do tests have an explicit action (Act)?
- Do tests have specific assertions (Assert)?
- Flag tests that don't follow the AAA pattern

### 2. Evaluate Test Independence

Check test isolation:

- Do tests depend on execution order?
- Do they share mutable state?
- Are setup/teardown properly cleaning up?
- Is parallel execution safe?

### 3. Review Naming Conventions

Check whether test names are descriptive:

- Do test names describe behavior rather than implementation?
- Do they follow consistent naming conventions (e.g., `should...when...`)?
- Are describe/context groupings reasonable?

### 4. Evaluate Boundary Coverage

Check the degree of boundary case coverage:

- Null/undefined/empty handling
- Boundary values (max, min, zero)
- Error paths and exception scenarios
- Concurrency and race conditions (if applicable)

### 5. Check Anti-Patterns

Identify common test anti-patterns:

- Over-mocking (losing integration test value)
- Overly complex test logic (tests that need testing)
- Too many or too few assertions
- Hard-coded test data (magic numbers)
- Ignored tests (skip/pending)

## Completion Criteria

- ✅ AAA pattern compliance evaluated
- ✅ Test independence checked
- ✅ Naming conventions reviewed
- ✅ Boundary coverage evaluated
- ✅ Anti-patterns identified

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-report.md`
