---
name: alert
description: "Alert triggers output file to output/alerts/; no anomaly stays silent"
next-step: null
output-file: null
template: null
---

# Step 3: Notify

**Progress: Step 3 of 3**

## Goal

Based on alert assessment results, determine whether to produce an alert file.

> **Note**: This workflow is triggered by cron. Use exec dispatch for dispatching (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh). exec is available in cron environment. Alerts are written to output/alerts/ files; CEO heartbeat automatically checks and processes them.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- Write to output/alerts/ files (use exec dispatch for cross-Agent communication if needed)

## Instructions

### 1. Handling

- **No alert**: Stay silent, only record to memory/.
- **Tier 1 alert**: Record to memory/, accumulate for weekly report.
- **Tier 2/3 alert**: Write alert file to `output/alerts/investment-alert-YYYY-MM-DD-HHMM.md`. CEO heartbeat will automatically check this directory and process alerts.

### 2. Alert File Content

Alert file includes:

- Asset that triggered the alert
- Current price and change rate
- Alert tier
- Suggested action (hold/reduce/add/stop-loss)
- Timestamp

### 3. Update Portfolio Records

Update this check's price to memory/ as the baseline for next comparison.

## Completion Criteria

- [ ] Handled according to alert tier
- [ ] Tier 2/3 alerts written to output/alerts/ (if any)
- [ ] Portfolio records updated
