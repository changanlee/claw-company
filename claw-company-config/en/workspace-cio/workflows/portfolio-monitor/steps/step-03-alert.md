---
name: alert
description: "Alert triggers sessions_send to CEO; no anomaly stays silent"
next-step: null
output-file: null
template: null
---

# Step 3: Notify

**Progress: Step 3 of 3**

## Objective

Based on alert assessment results, determine whether to notify CEO.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Handling

- **No alert**: Stay silent, only record to memory/.
- **Tier 1 alert**: Record, accumulate for weekly report.
- **Tier 2/3 alert**: Use `sessions_send` to immediately notify CEO.

### 2. Notification Content

Notification to CEO includes:

- Asset that triggered the alert
- Current price and change rate
- Alert tier
- Suggested action (hold/reduce/add/stop-loss)

### 3. Update Portfolio Records

Update this check's price to memory/ as the baseline for next comparison.

## Completion Criteria

- [ ] Handled according to alert tier
- [ ] Portfolio records updated
