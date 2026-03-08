---
name: weekly-report
description: "Investment Weekly Report: Compile changes -> Performance analysis -> Produce report"
type: automatic
agent: cio
sub-agent: null
approval: green
output-dir: output/portfolios/
---

# CIO Investment Weekly Report Workflow

## Overview

CIO (Orion) compiles weekly portfolio changes and market dynamics, analyzes performance, and produces an investment weekly report.

## Prerequisites

- This week's portfolio monitoring records (memory/)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Compile Changes | Compile this week's portfolio changes, market dynamics | — |
| 02 | Performance Analysis | Performance analysis, benchmark comparison | — |
| 03 | Produce Report | Investment weekly report + opportunity watch | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-compile.md
```
