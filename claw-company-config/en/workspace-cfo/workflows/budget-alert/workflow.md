---
name: budget-alert
description: "Budget Alert: Detect anomaly -> Analyze cause -> Notify CEO"
type: automatic
agent: cfo
sub-agent: null
approval: green
---

# CFO Budget Alert Workflow

## Overview

CFO (Sage) automatically triggers this workflow upon detecting anomalous spending, analyzes the cause, and notifies CEO.

## Prerequisites

- Triggered by record-expense or heartbeat

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Detect | Detect anomalous spending (>2x daily average) | — |
| 02 | Analyze | Analyze cause and impact | — |
| 03 | Notify | exec dispatch notification to CEO | — |

## Execution

Begin from the first step:

```
👉 Start execution → Read steps/step-01-detect.md
```
