---
name: detect
description: "Detect anomalous spending (>2x daily average)"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# Step 1: Detect

**Progress: Step 1 of 3**

## Objective

Detect anomalous spending.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Anomaly Criteria

- Single expense > 2x daily average spending
- Single-day cumulative > 3x daily average spending
- Category surge (this week > 3x same category last week)

### 2. Confirm Anomaly

Verify the anomaly is genuine, ruling out false positives (e.g., known large planned expenditures).

## Completion Criteria

- [ ] Anomaly detected
- [ ] Anomaly confirmed (not a false positive)

## Next Step

-> Proceed to [Step 2: Analyze](./step-02-analyze.md)
