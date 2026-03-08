---
name: step-03-report
description: "Produce test quality report"
next-step: null
output-file: test-quality-report.md
template: null
---

# Step 3: Produce Test Quality Report

**Progress: Step 3 of 3** — Final step

## Goal

Integrate scan and evaluation results into a structured test quality report.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write Test Quality Report

Produce `test-quality-report.md` under `{{INSTALL_DIR}}/output/implementation/`, including:

- **Coverage summary**: Overall and per-module coverage data
- **Strengths**: Well-executed testing practices
- **Weaknesses**: Problem areas requiring improvement
- **Recommendations**: Specific improvement action items with priorities
- **Anti-pattern list**: Discovered anti-patterns with fix suggestions
- **Risk areas**: Low-coverage or no-coverage high-risk modules

### 2. Quantitative Scoring

Score the following dimensions (1-5):

- Coverage adequacy
- Test structure quality
- Naming readability
- Boundary case coverage
- Maintainability

### 3. Delivery Report

Report to CTO:

- Test quality report path
- Overall quality score
- Top 3 issues requiring priority improvement
- Estimated improvement effort

## Completion Criteria

- ✅ Test quality report produced
- ✅ Quantitative scoring completed
- ✅ Results reported to CTO
