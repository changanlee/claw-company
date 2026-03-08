---
name: memory-audit
description: "Memory Health Audit: Scan Usage → Evaluate Health → Produce Recommendations"
type: automatic
agent: chro
sub-agent: null
approval: green
---

# CHRO Memory Health Audit Workflow

## Overview

CHRO (Harper) scans each Agent's MEMORY.md usage and health status, evaluates stale entry ratios, capacity utilization, and structural clarity, and produces a memory health report with cleanup recommendations. Triggered automatically by cron schedule `memory-cleanup` (1st of each month, 03:00).

## Prerequisites

- Each Agent's MEMORY.md accessible
- Each Agent's memory/ directory scannable

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Scan Usage | Scan each Agent's MEMORY.md usage metrics | — |
| 02 | Evaluate Health | Evaluate stale entries, capacity, structure | — |
| 03 | Produce Recommendations | Produce memory health report with cleanup suggestions | — |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-scan.md
```
