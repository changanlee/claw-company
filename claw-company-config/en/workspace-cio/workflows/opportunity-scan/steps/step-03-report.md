---
name: report
description: "High-confidence: notify CEO immediately; others: include in weekly report"
next-step: null
output-file: null
template: null
---

# Step 3: Report

**Progress: Step 3 of 3**

## Goal

Determine notification method based on confidence level.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. High-Confidence Opportunities

Use `exec dispatch` to immediately notify CEO (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh), including:

- Asset overview
- Opportunity rationale
- Suggested action
- Time sensitivity reminder

### 2. Medium/Low-Confidence Opportunities

Record to memory/, include in the next weekly report's "Opportunity Watch" section.

## Completion Criteria

- [ ] High-confidence opportunities notified immediately
- [ ] Other opportunities recorded
