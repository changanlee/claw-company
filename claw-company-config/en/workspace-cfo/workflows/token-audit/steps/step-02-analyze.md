---
name: analyze
description: "Compare with last week, flag anomalies (>200% average)"
next-step: ./step-03-budget.md
output-file: null
template: null
---

# Step 2: Comparative Analysis

**Progress: Step 2 of 4**

## Objective

Compare with last week's data and flag Agents with anomalous consumption.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Week-over-Week Comparison

- Change rate for each Agent: this week vs last week
- Flag Agents with change rates exceeding 200%

### 2. Anomaly Analysis

For flagged anomalous Agents:

- Analyze possible causes (increased workload? model switch? bug?)
- Determine whether the increase is justified

## Completion Criteria

- [ ] Week-over-week comparison completed
- [ ] Anomalous Agents flagged and analyzed

## Next Step

-> Proceed to [Step 3: Budget Calculation](./step-03-budget.md)
