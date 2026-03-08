---
name: meal-recommendation
description: "Meal Recommendation Workflow: Context → History → Budget → Recommend"
type: interactive
agent: coo
approval: green
output-dir: output/meals/
---

# Meal Recommendation Workflow

## Overview

COO recommends 2-3 meal options during meal times or when the Chairman asks, combining time of day, location, weather, dining history, and budget.

## Prerequisites

- Chairman's food preferences (recorded in MEMORY.md)
- `memory/` dining logs from the past 3 days
- CFO available to respond to meal budget queries

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Context | Confirm time of day, location, weather | — |
| 02 | History | Check memory/ for past 3 days' dining to avoid repeats | — |
| 03 | Budget | sessions_send CFO to confirm meal budget | — |
| 04 | Recommend | Produce 2-3 recommendations with reasons and cost estimates | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-context.md
```
