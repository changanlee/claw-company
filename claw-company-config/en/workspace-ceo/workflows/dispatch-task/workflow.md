---
name: dispatch-task
description: "Task Dispatch: Analyze chairman's directive -> Route to target -> Send and track"
type: interactive
agent: ceo
sub-agent: null
approval: green
---

# CEO Task Dispatch Workflow

## Overview

Upon receiving a directive from the Chairman, CEO (Nova) analyzes the directive type and urgency, routes it to the appropriate executive based on dispatch principles, and creates a tracking record.

## Prerequisites

- Chairman's directive or request
- `{{INSTALL_DIR}}/shared/company-rules.md` (dispatch principles)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Analyze Directive | Parse type, urgency, involved departments | — |
| 02 | Route Target | Select target based on dispatch principles | — |
| 03 | Send & Track | Compose directive and create record | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-analyze.md
```
