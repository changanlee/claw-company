---
name: predictive-management
description: "Predictive Life Management Workflow: Analyze patterns → Generate predictions → Integrate & push (v2.0)"
type: automatic
agent: coo
approval: green
version: "2.0"
---

# Predictive Life Management Workflow (v2.0)

## Overview

COO evolves from a "reactive assistant" to a "predictive butler." Analyzes the past 7 days of memory/ logs to identify predictable patterns, generates proactive reminders, and integrates them into morning briefings or real-time pushes.

## Prerequisites

- At least 7 days of log data in memory/
- Heartbeat or cron trigger

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Analyze | Analyze past 7 days' memory/ logs for predictable patterns | — |
| 02 | Predict | Generate prediction reminders | — |
| 03 | Integrate | Integrate into morning briefing or real-time push | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-analyze.md
```
