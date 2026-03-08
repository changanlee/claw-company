---
name: step-03-summary
description: "Produce automation summary"
next-step: null
output-file: automation-summary.md
template: null
---

# Step 3: Produce Automation Summary

**Progress: Step 3 of 3** — Final step

## Goal

Produce a comprehensive summary report of the test automation expansion.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write Automation Summary

Produce `automation-summary.md` under `{{INSTALL_DIR}}/output/implementation/`, including:

- **New test statistics**: Number of new tests added (grouped by type)
- **Coverage changes**: Before-and-after coverage comparison
- **Gaps filled**: List of completed automation items
- **Remaining gaps**: Items not yet automated (with reasons)
- **Maintenance notes**: Maintenance considerations for new tests

### 2. Coverage Comparison

Produce before-and-after comparison data:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Line coverage | X% | Y% | +Z% |
| Branch coverage | X% | Y% | +Z% |
| Function coverage | X% | Y% | +Z% |

### 3. Delivery Report

Report to CTO:

- Automation summary report path
- Total new tests added
- Coverage improvement
- Remaining non-automated items count and reasons

## Completion Criteria

- ✅ Automation summary produced
- ✅ Coverage comparison data recorded
- ✅ Results reported to CTO
