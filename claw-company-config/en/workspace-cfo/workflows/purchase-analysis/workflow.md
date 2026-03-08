---
name: purchase-analysis
description: "Purchase Analysis: Confirm item -> Budget query -> Historical comparison -> Needs assessment -> Produce recommendation"
type: interactive
agent: cfo
sub-agent: null
approval: yellow
output-dir: output/reports/
---

# CFO Purchase Analysis Workflow

## Overview

CFO (Sage) conducts a comprehensive analysis of purchase decisions, providing professional recommendations from perspectives including budget, historical spending patterns, and need priority.

## Prerequisites

- Purchase consultation relayed by CEO

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Confirm Item | Confirm purchase item and estimated price | — |
| 02 | Budget Query | Query remaining monthly budget, category ratio | — |
| 03 | Historical Comparison | Compare with historical spending patterns | — |
| 04 | Needs Assessment | Assess need priority | — |
| 05 | Produce Recommendation | Produce recommendation with data | Yellow |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-item.md
```
