---
name: step-01-map
description: "Extract requirement IDs and test cases"
next-step: ./step-02-link.md
output-file: null
template: null
---

# Step 1: Extract Requirements and Tests

**Progress: Step 1 of 3** — Next: Build mapping matrix

## Goal

Extract all requirement IDs from PRD and all test cases from test code.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Extract Requirement IDs

Extract all requirements from PRD and related documents:

- **Functional requirements**: Feature descriptions with IDs (e.g., FR-001, REQ-001)
- **User stories**: User stories with IDs (e.g., US-001)
- **Acceptance criteria**: AC numbers for each story
- If documents lack IDs, assign sequential numbers to create an index

### 2. Extract Test Cases

Extract all test cases from test code:

- Scan all test files
- Extract test names (describe/it combinations)
- Record test file paths
- Identify test types (unit/integration/E2E)

### 3. Compile Lists

Produce two structured lists:

**Requirements list:**
| ID | Description | Module | Priority |
|----|-------------|--------|----------|

**Test list:**
| Test Name | File Path | Type | Related Module |
|-----------|-----------|------|----------------|

## Completion Criteria

- ✅ All requirement IDs extracted and listed
- ✅ All test cases extracted and listed
- ✅ Both lists uniformly formatted and complete

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-link.md`
