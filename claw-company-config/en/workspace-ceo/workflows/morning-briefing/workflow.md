---
name: morning-briefing
description: "Morning Briefing: Collect executive status -> Compile and sort -> Format -> Deliver to chairman"
type: automatic
agent: ceo
sub-agent: null
approval: green
output-dir: output/briefings/
---

# CEO Morning Briefing Workflow

## Overview

CEO (Nova) automatically collects status summaries from each executive every morning, compiles them into a structured format, and delivers the briefing to the Chairman for a quick overview.

## Prerequisites

- Morning cron trigger (daily 06:30)
- `{{INSTALL_DIR}}/shared/company-rules.md` (report format guidelines)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Collect Status | sessions_send each executive for summaries | — |
| 02 | Compile & Sort | Compile replies, sort by urgency | — |
| 03 | Format | Format using briefing template | — |
| 04 | Deliver | Deliver to Chairman | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-collect.md
```
