---
name: step-03-document
description: "Produce test plan document"
next-step: null
output-file: test-plan.md
template: null
---

# Step 3: Produce Test Plan Document

**Progress: Step 3 of 3** — Final step

## Goal

Integrate analysis and design results into a formal test plan document for CTO review.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write Test Plan Document

Produce `test-plan.md` under `{{INSTALL_DIR}}/output/implementation/`, including:

- **Project overview**: Project name, version, test scope summary
- **Test strategy**: Test pyramid ratios, framework selection, coverage strategy
- **Test types**:
  - Unit tests: Scope, tools, target coverage
  - Integration tests: Scope, tools, target coverage
  - E2E tests: Scope, tools, critical scenarios
- **Priority matrix**: High/medium/low risk areas mapped to test priorities
- **Resource requirements**: Test environments, tool licenses, test data
- **Timeline estimate**: Estimated effort for each test type

### 2. Quality Self-Check

Verify document quality:

- All high-risk areas have corresponding test strategies
- Test pyramid ratios are reasonable (not an inverted pyramid)
- Coverage targets are quantifiable and trackable
- Resource requirements are specific and actionable

### 3. Delivery Report

Report to CTO:

- Test plan document path
- Test scope summary (X feature points, Y integration points)
- Risk summary (number of high-risk items)
- Recommended test execution priority order

## Completion Criteria

- ✅ Test plan document produced
- ✅ Quality self-check passed
- ✅ Results reported to CTO
