---
name: step-01-assess
description: "Analyze existing automation coverage, identify gaps"
next-step: ./step-02-implement.md
output-file: null
template: null
---

# Step 1: Assess Automation Coverage

**Progress: Step 1 of 3** — Next: Write automated test scripts

## Goal

Analyze existing test automation coverage, identify gaps, and prioritize by risk.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Inventory Existing Automated Tests

Scan all automated tests in the project:

- Unit test count and covered modules
- Integration test count and covered endpoints
- E2E test count and covered scenarios
- Record last update time for each test category

### 2. Identify Automation Gaps

Cross-reference against the functional module list to identify areas lacking automated tests:

- **No-test modules**: Modules with zero tests
- **Low-coverage modules**: Modules with tests but insufficient coverage
- **Stale tests**: Test code out of sync with implementation
- **Manual test dependencies**: Features that can only be verified manually

### 3. Risk Prioritization

Assess risk for each gap along the following dimensions:

- **Business impact**: Severity if the feature breaks
- **Change frequency**: How often the module is modified
- **Complexity**: Logic complexity and error probability
- Produce a prioritized list (P0 > P1 > P2)

### 4. Feasibility Analysis

For each gap, assess automation feasibility:

- Can it be fully automated?
- Level of mock/stub required
- Estimated automation effort

## Completion Criteria

- ✅ Existing automated tests inventoried
- ✅ Automation gaps identified
- ✅ Risk prioritization completed
- ✅ Feasibility analysis produced

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-implement.md`
