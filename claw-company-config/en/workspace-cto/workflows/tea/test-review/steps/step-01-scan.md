---
name: step-01-scan
description: "Scan existing test code, collect coverage stats"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# Step 1: Scan Test Code

**Progress: Step 1 of 3** — Next: Evaluate test quality

## Goal

Scan the existing test codebase to collect coverage data and test distribution statistics.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Identify Test Files

Scan project directories to identify all test files:

- By naming convention (`*.test.*`, `*.spec.*`, `test_*`, `*_test.*`)
- By directory (`__tests__/`, `tests/`, `test/`, `spec/`)
- Record total test file count and distribution

### 2. Classify Test Types

Categorize tests by type:

- **Unit tests**: Testing single functions/classes
- **Integration tests**: Testing inter-module interactions
- **E2E tests**: End-to-end scenario tests
- **Other**: Performance tests, snapshot tests, etc.

### 3. Run Coverage Analysis

Execute tests and collect coverage data:

- Run the `coverage` command (per project configuration)
- Record overall coverage (line/branch/function)
- Record per-module coverage
- Identify zero-coverage or low-coverage modules

### 4. Compile Test Distribution Statistics

Consolidate statistics:

- Total test count (grouped by type)
- Test-to-source-code ratio
- Per-module test density (test count / source lines)

## Completion Criteria

- ✅ All test files identified and classified
- ✅ Coverage data collected
- ✅ Test distribution statistics compiled

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-evaluate.md`
