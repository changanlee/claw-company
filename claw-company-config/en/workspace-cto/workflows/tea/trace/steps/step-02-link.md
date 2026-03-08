---
name: step-02-link
description: "Build requirement-test mapping matrix"
next-step: ./step-03-report.md
output-file: null
template: null
---

# Step 2: Build Traceability Matrix

**Progress: Step 2 of 3** — Next: Produce traceability report

## Goal

Build a bidirectional requirement-to-test mapping matrix.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Establish Mappings

Analyze each requirement and identify corresponding test cases:

- Match by test name and test content against requirements
- Match by test file path and module affiliation
- Match by comments or markers in tests
- Record mapping confidence level (high/medium/low)

### 2. Produce Traceability Matrix

Build the complete traceability matrix:

| Req ID | Req Description | Mapped Tests | Test Type | Confidence |
|--------|----------------|--------------|-----------|------------|

### 3. Identify Coverage Gaps

Flag the following situations:

- **Uncovered requirements**: Requirements with no test mappings (red alert)
- **Weakly covered requirements**: Requirements with only a single test or low-confidence mapping (yellow alert)
- **Orphaned tests**: Tests that don't map to any requirement (determine if deletable or requirement was missed)

### 4. Calculate Coverage Statistics

- Requirement coverage = requirements with test mappings / total requirements
- Coverage grouped by priority
- Coverage grouped by module

## Completion Criteria

- ✅ All requirements attempted to map to tests
- ✅ Traceability matrix built
- ✅ Coverage gaps identified
- ✅ Coverage statistics calculated

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-report.md`
