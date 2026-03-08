---
name: record-expense
description: "Expense Recording: Parse expense info -> Structured recording -> Anomaly check"
type: execution
agent: cfo
sub-agent: null
approval: green
output-dir: output/expenses/
---

# CFO Expense Recording Workflow

## Overview

Upon receiving expense information, CFO (Sage) parses and records it in structured format to the memory/ journal, while checking for anomalous spending.

## Prerequisites

- Expense information relayed by CEO

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Parse Expense | Parse date, amount, category, notes | — |
| 02 | Record | Structured recording to memory/ | — |
| 03 | Check | Check for anomalies, trigger budget-alert if needed | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-parse.md
```
