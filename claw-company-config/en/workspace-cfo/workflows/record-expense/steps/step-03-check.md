---
name: check
description: "Check for anomalies (>2x daily average) -> Trigger budget-alert if anomalous"
next-step: null
output-file: null
template: null
---

# Step 3: Check

**Progress: Step 3 of 3**

## Objective

Check whether this expense is anomalous; if so, trigger the budget-alert workflow.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Anomaly Detection

Calculate the daily average spending over the past 30 days and determine whether this expense exceeds 2x the daily average.

### 2. Handle Result

- **Normal**: Workflow ends silently.
- **Anomalous**: Trigger `budget-alert` workflow and notify CEO.

## Completion Criteria

- [ ] Anomaly check completed
- [ ] budget-alert triggered for anomalous cases (if applicable)
