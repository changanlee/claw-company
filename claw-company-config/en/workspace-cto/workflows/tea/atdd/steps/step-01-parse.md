---
name: step-01-parse
description: "Load story acceptance criteria"
next-step: ./step-02-generate.md
output-file: null
template: null
---

# Step 1: Parse Acceptance Criteria

**Progress: Step 1 of 3** — Next: Generate acceptance test code

## Goal

Load the story file and parse all Given/When/Then acceptance criteria.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Receive Story File

Receive the story file path provided by CTO at spawn time. Read the story file.

### 2. Extract Acceptance Criteria

Extract all acceptance criteria (AC) from the story file:

- Identify Given/When/Then formatted scenarios
- Identify implicit boundary conditions and exception scenarios
- Record each AC's ID or sequence number

### 3. Structure Acceptance Criteria

Structure each AC as:

- **Scenario name**: Descriptive scenario title
- **Given**: Preconditions (initial state, test data)
- **When**: Trigger action (user operation, API call)
- **Then**: Expected result (state change, response content, side effects)
- **And/But**: Additional conditions (if any)

### 4. Identify Test Dependencies

Analyze what each scenario requires:

- Test data (fixtures / factories)
- Mock objects (external APIs, third-party services)
- Environment preparation (database state, user authentication)

## Completion Criteria

- ✅ Story file read
- ✅ All acceptance criteria extracted and structured
- ✅ Test dependencies identified

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-generate.md`
