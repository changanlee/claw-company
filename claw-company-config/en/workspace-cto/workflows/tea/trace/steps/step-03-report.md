---
name: step-03-report
description: "Produce traceability report"
next-step: null
output-file: traceability-report.md
template: null
---

# Step 3: Produce Traceability Report

**Progress: Step 3 of 3** — Final step

## Goal

Integrate the traceability matrix and analysis results into a formal traceability report.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write Traceability Report

Produce `traceability-report.md` under `{{INSTALL_DIR}}/output/implementation/`, including:

- **Summary**: Total requirements, total tests, overall coverage rate
- **Traceability matrix**: Complete requirement-test mapping table
- **Coverage analysis**:
  - Overall coverage rate
  - Coverage grouped by priority
  - Coverage grouped by module
- **Uncovered requirements**: List of requirements with no test mappings (with priority)
- **Orphaned tests**: List of tests not mapping to any requirement
- **Recommended actions**: Improvement suggestions sorted by priority

### 2. Risk Flagging

Flag uncovered high-priority requirements:

- P0 requirement uncovered → Red risk
- P0 requirement weakly covered → Orange risk
- P1 requirement uncovered → Yellow risk

### 3. Delivery Report

Report to CTO:

- Traceability report path
- Overall requirement coverage rate
- Number of uncovered high-priority requirements
- Number of orphaned tests
- Recommended priority improvement items

## Completion Criteria

- ✅ Traceability report produced
- ✅ Risk flagging completed
- ✅ Results reported to CTO
