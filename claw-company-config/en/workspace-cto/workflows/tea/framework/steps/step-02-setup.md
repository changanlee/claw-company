---
name: step-02-setup
description: "Install and configure test framework"
next-step: ./step-03-scaffold.md
output-file: null
template: null
---

# Step 2: Install and Configure Test Framework

**Progress: Step 2 of 3** — Next: Create foundational test scripts

## Goal

Install the selected test framework and complete all configuration.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Install Dependencies

Install test framework and related packages:

- Test framework core package
- Assertion library (if separate installation needed)
- Coverage tools (e.g., c8 / istanbul / coverage.py)
- TypeScript support (if needed)
- Other plugins (e.g., testing-library)

### 2. Create Directory Structure

Set up the standard test directory structure:

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/            # E2E tests
├── fixtures/       # Test data
├── helpers/        # Test utility functions
└── setup.ts        # Global setup
```

### 3. Configure Test Framework

Create test configuration files:

- Test match patterns (testMatch / testPathPattern)
- Coverage collection configuration
- Module resolution aliases
- Environment variable loading
- Timeout settings
- Report formats (console / HTML / JSON)

### 4. Configure npm Scripts

Add test commands to `package.json` (or equivalent):

- `test`: Run all tests
- `test:unit`: Run unit tests only
- `test:integration`: Run integration tests only
- `test:e2e`: Run E2E tests only
- `test:coverage`: Run tests with coverage report

### 5. Verify Installation

Confirm the test framework works correctly:

- Run `test` command to confirm no errors
- Confirm coverage report generates correctly

## Completion Criteria

- ✅ Test framework installed
- ✅ Directory structure created
- ✅ Configuration files created
- ✅ npm scripts configured
- ✅ Installation verified

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-scaffold.md`
