---
name: integrate
description: "Integrate: Integrate prediction reminders into morning briefing or real-time push"
next-step: null
output-file: null
template: null
---

# Step 3: Integrate

**Progress: Step 3 of 3**

## Goal

Categorize prediction reminders by push timing and integrate them into morning briefings or push via CEO in real-time.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Real-Time Push

If there are urgent predictions affecting today's plans, immediately notify CEO via `sessions_send`:

> "CEO, the following prediction reminders need real-time relay to the Chairman: [reminder content]."

### 2. Morning Briefing Integration

Organize non-urgent predictions into briefing material and submit to CEO via `sessions_send`:

> "CEO, the following are prediction reminders for tomorrow. Please include in the morning briefing: [reminder list]."

### 3. Record and Track

- Record all predictions in memory/ logs with push status
- Track prediction accuracy (for post-verification):
  - Prediction content
  - Whether it came true
  - Accuracy score
- Update prediction accuracy statistics in MEMORY.md for continuous improvement

### 4. Silent End

If no predictions are worth pushing, end the workflow silently, recording only the analysis results.

## Completion Criteria

- [ ] Urgent predictions pushed in real-time (if any)
- [ ] Non-urgent predictions submitted for morning briefing (if any)
- [ ] All predictions recorded for tracking
- [ ] Updated prediction accuracy statistics

## Workflow Complete
