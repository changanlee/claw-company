---
name: opportunity-scan
description: "Opportunity Scan: Market trend scanning -> Evaluate -> Report (v2.0)"
type: semi-automatic
agent: cio
sub-agent: null
approval: green
---

# CIO Opportunity Scan Workflow (v2.0)

## Overview

CIO (Orion) proactively scans market trends and emerging investment opportunities, conducts preliminary assessments, and decides whether to notify immediately or include in the weekly report based on confidence level.

## Prerequisites

- Market data sources

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Scan | Scan market trends and emerging opportunities | — |
| 02 | Evaluate | Preliminary assessment (potential return vs risk) | — |
| 03 | Report | High-confidence: notify immediately; others: include in weekly report | — |

## Execution

Begin from the first step:

```
-> Start execution -> Read steps/step-01-scan.md
```
