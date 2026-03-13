---
name: org-review
description: "Org Health Report: Scan Activity → Analyze Metrics → Produce Weekly Report"
type: automatic
agent: chro
sub-agent: null
approval: green
---

# CHRO Org Health Weekly Report Workflow

## Overview

CHRO (Harper) scans each Agent's MEMORY.md and recent activity weekly, analyzes organizational health metrics, and produces an org health weekly report. Triggered automatically by cron schedule `weekly-org-review` (Monday 08:00).

## Prerequisites

- Each Agent's MEMORY.md accessible
- Each Agent's memory/ directory recent logs

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Scan Activity | Scan each Agent's MEMORY.md and recent activity | — |
| 02 | Analyze Metrics | Analyze load balance, coordination frequency, capability gaps | — |
| 03 | Produce Report | Produce org health weekly report | — |
| 04 | Channel Assessment Trigger | Determine whether to initiate channel assessment | — |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-scan.md
```
