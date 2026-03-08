---
name: weather-check
description: "Weather Check Workflow: Check weather → Alert if abnormal"
type: automatic
agent: coo
approval: green
---

# Weather Check Workflow

## Overview

COO automatically checks weather conditions during heartbeat. Alerts the Chairman only on abnormal conditions; stays silent when normal.

## Prerequisites

- Chairman's location (from MEMORY.md or schedule records)
- Heartbeat trigger

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Check | Query current and forecast weather | — |
| 02 | Alert | Alert on abnormal conditions; stay silent if normal | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-check.md
```
