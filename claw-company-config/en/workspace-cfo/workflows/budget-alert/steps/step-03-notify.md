---
name: notify
description: "exec dispatch notification to CEO"
next-step: null
output-file: null
template: null
---

# Step 3: Notify

**Progress: Step 3 of 3**

## Goal

Notify CEO of the anomalous spending analysis results.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Compose Notification

Use `exec dispatch` to notify CEO (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh), including:

- Anomaly type
- Anomalous amount and comparison baseline
- Cause analysis
- Impact assessment
- Recommended course of action

### 2. Record

Record the anomaly event to memory/.

## Completion Criteria

- [ ] CEO notified
- [ ] Anomaly event recorded
