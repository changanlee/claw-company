---
name: portfolio-monitor
description: "Portfolio Monitor: Check prices -> Evaluate alerts -> Notify or stay silent"
type: automatic
agent: cio
sub-agent: null
approval: green
output-dir: output/portfolios/
---

# CIO Portfolio Monitor Workflow

## Overview

CIO (Orion) queries current prices of held positions, compares with purchase price and previous check, and determines whether to trigger the three-tier alert system.

## Prerequisites

- Portfolio data (memory/)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Check Prices | Query current prices of held positions | — |
| 02 | Evaluate Alerts | Compare with purchase/previous price, determine alert tier | — |
| 03 | Notify | Alert triggers notification to CEO; no anomaly stays silent | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-check.md
```
