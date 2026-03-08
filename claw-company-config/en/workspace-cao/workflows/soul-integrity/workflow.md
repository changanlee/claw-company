---
name: soul-integrity
description: "SOUL.md Integrity Self-Check Workflow: Read → Verify → Alert"
type: automatic
agent: cao
approval: green
---

# SOUL.md Integrity Self-Check Workflow

## Overview

CAO automatically performs SOUL.md integrity self-check during heartbeat inspection. Confirms own definition file has not been tampered with. Alerts Chairman directly on anomaly; stays silent when normal.

## Prerequisites

- Heartbeat trigger
- CAO's own SOUL.md

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Read | Read own SOUL.md | — |
| 02 | Verify | Confirm integrity (no tampering, all sections present) | — |
| 03 | Alert | Anomaly → push directly to Chairman; Normal → stay silent | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-read.md
```
