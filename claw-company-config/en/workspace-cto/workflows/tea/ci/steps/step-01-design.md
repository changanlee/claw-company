---
name: step-01-design
description: "Design quality gates"
next-step: ./step-02-implement.md
output-file: null
template: null
---

# Step 1: Design Quality Gates

**Progress: Step 1 of 3** — Next: Build CI configuration

## Goal

Design quality gates and checkpoints for PR, Staging, and Production stages.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Define PR Stage Gates

Automatic checks on PR submission:

- **Lint check**: Code style and static analysis
- **Type check**: TypeScript / Flow etc.
- **Unit tests**: All unit tests must pass
- **Coverage threshold**: New code coverage not below set value
- **Commit message format**: Conventional Commits etc.

### 2. Define Staging Stage Gates

On merge to staging/develop branch:

- **Integration tests**: All integration tests pass
- **E2E tests**: Critical path E2E tests pass
- **Build verification**: Confirm successful build
- **Security scan**: Dependency vulnerability scanning

### 3. Define Production Stage Gates

Before production deployment:

- **Full test suite**: All tests (unit + integration + e2e) pass
- **Performance baseline**: Key metrics not below baseline values
- **Smoke tests**: Quick verification after deployment

### 4. Design Failure Handling

Define handling strategies for gate failures:

- Which gates are blocking (must pass to proceed)
- Which gates are warning (allow proceeding but flag warning)
- Failure notification mechanism (how to notify relevant parties)

### 5. Document Gate Design

Compile into a structured gate design document as the basis for subsequent implementation.

## Completion Criteria

- ✅ PR gates defined
- ✅ Staging gates defined
- ✅ Production gates defined
- ✅ Failure handling strategy defined

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-implement.md`
