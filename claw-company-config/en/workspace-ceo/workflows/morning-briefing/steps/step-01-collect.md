---
name: collect
description: "sessions_send each executive requesting status summaries"
next-step: ./step-02-compile.md
output-file: null
template: null
---

# Step 1: Collect Status

**Progress: Step 1 of 4**

## Objective

Request current status summaries from each executive via `sessions_send` to collect real-time information.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Send Status Requests

Use `sessions_send` to request status from the following executives:

| Executive | Requested Information |
|-----------|----------------------|
| CFO | Yesterday's spending summary, budget utilization, anomalies |
| CIO | Position changes, market alerts, investment opportunities |
| COO | Today's schedule, weather overview, to-do reminders |
| CTO | Development progress, blockers, technical issues |
| CHRO | Agent status, policy to-dos, organizational issues |
| CAO | Security status, open audit issues, compliance alerts |

### 2. Wait for Replies

- Set a reasonable wait time.
- Record which executives have and have not replied.

## Completion Criteria

- [ ] Status requests sent to all executives
- [ ] Replies collected (or timeouts noted)

## Next Step

-> Proceed to [Step 2: Compile & Sort](./step-02-compile.md)
