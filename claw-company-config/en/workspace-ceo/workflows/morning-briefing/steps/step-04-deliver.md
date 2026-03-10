---
name: deliver
description: "Deliver morning briefing to Chairman"
next-step: null
output-file: null
template: null
---

# Step 4: Deliver

**Progress: Step 4 of 4**

## Objective

Deliver the formatted morning briefing to the Chairman.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Output Briefing

Output the formatted morning briefing as the final response.

> **Note**: This workflow is triggered by cron. Briefing delivery is handled automatically by the cron delivery announce mechanism, which pushes to CEO's bound channel (visible to Chairman). No manual message tool push needed.

### 2. Archive

Save the briefing to `output/briefings/morning-briefing-YYYY-MM-DD.md`.

## Completion Criteria

- [ ] Briefing output as final response (cron announce auto-delivers)
- [ ] Briefing archived
