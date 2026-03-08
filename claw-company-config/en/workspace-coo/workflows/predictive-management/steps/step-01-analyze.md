---
name: analyze
description: "Analyze: Analyze past 7 days' memory/ logs for predictable patterns"
next-step: ./step-02-predict.md
output-file: null
template: null
---

# Step 1: Analyze

**Progress: Step 1 of 3**

## Goal

Analyze the past 7 days of memory/ logs to identify predictable patterns and trends in daily life.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Read Past 7 Days' Logs

Read logs from `{{INSTALL_DIR}}/workspace-coo/memory/` for the past 7 days, extracting data in these categories:
- Spending records (amounts, categories, frequency)
- Schedule patterns (commute times, frequent locations, activity rhythm)
- Dining records (preference changes, meal time regularity)
- Weather-behavior correlation (how weather affects activity planning)

### 2. Identify Patterns

Identify the following types of patterns from the data:
- **Cyclical patterns**: weekly fixed activities, recurring spending
- **Trend changes**: spending increase/decrease, preference shifts
- **Causal correlations**: weather→behavior, time-of-day→spending associations
- **Anomalous deviations**: new behaviors differing from past patterns

### 3. Assess Prediction Confidence

Evaluate prediction confidence (high/medium/low) for each identified pattern, based on:
- Frequency of occurrence (more frequent = higher confidence)
- Data volume (more data = higher confidence)
- Regularity (more regular = higher confidence)

## Completion Criteria

- [ ] Read and analyzed past 7 days' logs
- [ ] Identified predictable patterns
- [ ] Assessed confidence level for each pattern

## Next Step

👉 Proceed to [Step 2: Predict](./step-02-predict.md)
