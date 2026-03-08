---
name: monthly-closing
description: "Monthly Closing: Aggregate records -> Categorize statistics -> Trend analysis -> Monthly summary"
type: semi-automatic
agent: cfo
sub-agent: null
approval: green
output-dir: output/reports/
---

# CFO Monthly Closing Workflow

## Overview

CFO (Sage) aggregates all expense records from the previous month at the beginning of each month, categorizes and analyzes trends, and produces a monthly financial summary.

## Prerequisites

- Previous month's expense records (memory/)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Aggregate Records | Aggregate all expense records for the month | — |
| 02 | Categorize Statistics | Categorize and compare against budget | — |
| 03 | Trend Analysis | Trend analysis, flag anomalies | — |
| 04 | Monthly Summary | Produce monthly financial summary | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-aggregate.md
```
