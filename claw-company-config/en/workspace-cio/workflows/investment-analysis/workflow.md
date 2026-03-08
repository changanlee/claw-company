---
name: investment-analysis
description: "Investment Analysis: Confirm target -> Collect data -> Analyze -> Produce recommendation"
type: interactive
agent: cio
sub-agent: null
approval: yellow
output-dir: output/analysis/
---

# CIO Investment Analysis Workflow

## Overview

CIO (Orion) conducts a comprehensive analysis of a specified investment target, evaluating from fundamental, technical, and market sentiment perspectives, and produces an investment recommendation.

## Prerequisites

- Investment analysis request relayed by CEO

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Confirm Target | Confirm analysis target | — |
| 02 | Collect Data | Collect fundamental, technical, sentiment data | — |
| 03 | Analyze | SWOT, valuation, risk assessment | — |
| 04 | Produce Recommendation | Buy/sell/hold recommendation with confidence level | Yellow |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-target.md
```
