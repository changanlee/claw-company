---
name: token-audit
description: "Token Audit: Collect consumption -> Comparative analysis -> Budget calculation -> Produce report"
type: automatic
agent: cfo
sub-agent: null
approval: green
output-dir: output/reports/
---

# CFO Token Audit Workflow

## Overview

CFO (Sage) collects token consumption data from each Agent, compares with historical data, and produces an "API Payroll Report."

## Prerequisites

- Token consumption data from each Agent

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Collect Data | Collect each Agent's weekly token consumption | — |
| 02 | Comparative Analysis | Compare with last week, flag anomalies | — |
| 03 | Budget Calculation | Month-to-date vs monthly budget | — |
| 04 | Produce Report | API Payroll Report | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-collect.md
```
