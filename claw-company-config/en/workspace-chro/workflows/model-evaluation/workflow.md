---
name: model-evaluation
description: "Model Evaluation: Detect Trigger → Comparative Analysis → Proposal → Tiered Approval"
type: semi-automatic
agent: chro
sub-agent: null
approval: yellow/red
output-dir: output/assessments/
---

# CHRO Model Evaluation Workflow

## Overview

CHRO (Harper) detects model upgrade/downgrade trigger conditions, performs comparative analysis on performance and cost, produces upgrade/downgrade proposals, and routes to tiered approval (downgrade to CEO yellow; upgrade/vendor change to Chairman red).

## Prerequisites

- Trigger conditions met (abnormal failure rate, new model release, etc.)
- CFO Token audit report (cost data)
- Recent Agent performance records

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Detect Trigger | Detect trigger conditions (failure rate, new model) | — |
| 02 | Comparative Analysis | Compare performance, cost, context length | — |
| 03 | Produce Proposal | Upgrade/downgrade proposal (affected Agents, rationale, risk) | — |
| 04 | Tiered Submission | Downgrade → CEO yellow; Upgrade/vendor change → Chairman red | Yellow/Red |

## Approval Gates

| Decision Item | Level | Handling |
|--------------|-------|---------|
| Model downgrade (cost saving) | Yellow | Submit to CEO for approval |
| Model upgrade | Red | Escalate to Chairman via CEO |
| Vendor change | Red | Escalate to Chairman via CEO |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-trigger.md
```
