---
name: operations-audit
description: "Operations audit: read all Agent records → cross-reference → traffic light review → channel audit → produce report"
type: automatic
agent: cao
sub-agent: null
approval: green
---

# CAO Operations Audit Workflow

## Overview

CAO periodically reviews all Agent operation records, cross-references session counts against record entries, reviews traffic light classification accuracy, and audits whether independent channel operations have complete records and CEO notifications.

## Prerequisites

- Each Agent's MEMORY.md is readable
- Each Agent's output/ directory is readable
- Channel governance policy: `{{INSTALL_DIR}}/shared/policies/channel-governance.md`

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Collect Records | Read all Agents' MEMORY.md and output/ | — |
| 02 | Cross-Reference | Session count vs record entries, detect gaps | — |
| 03 | Traffic Light Review | Review whether operation traffic lights in records are correct | — |
| 04 | Channel Audit | Audit record completeness of independent channel operations | — |
| 05 | Produce Report | Produce audit report, dispatch CEO | — |

## Execution

Start from the first step:

```
👉 Begin execution → Read steps/step-01-collect.md
```
