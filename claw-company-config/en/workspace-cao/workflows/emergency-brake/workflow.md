---
name: emergency-brake
description: "Emergency Brake Workflow: Detect anomaly → Freeze → Escalate (CAO independent authority)"
type: automatic
agent: cao
approval: green
---

# Emergency Brake Workflow

## Overview

When CAO detects abnormal Token consumption or spawn behavior, it immediately freezes and escalates. This is CAO's independent authority requiring no prior approval.

## Prerequisites

- Token consumption anomaly trigger or heartbeat detection
- issues.md (for recording anomaly events)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Detect | Detect anomaly (single Agent daily >10% monthly budget, company >5%, abnormal spawn) | — |
| 02 | Freeze | Immediately freeze suspect Agent spawn permissions, record in issues.md | Green (CAO independent authority) |
| 03 | Escalate | sessions_send CEO; no response in 30 min → push directly to Chairman | — |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-detect.md
```
