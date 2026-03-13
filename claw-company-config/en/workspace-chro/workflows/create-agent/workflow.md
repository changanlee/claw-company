---
name: create-agent
description: "Create Agent: Justify Need → Design Spec → Channel Assessment → Build Package → Tripartite Review → Submit for Approval"
type: interactive
agent: chro
sub-agent: null
approval: red
---

# CHRO Create Agent Workflow

## Overview

CHRO (Harper) justifies the need for a new role, designs role specifications, assesses channel requirements, builds a complete 6-file spec package using templates, submits for CEO review and CAO compliance check, and escalates to the Chairman for approval.

## Prerequisites

- Signals for new role need (persistent task increase, existing Agent overload, etc.)
- Token consumption data (provided by CFO)
- Org health report

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Justify Need | Detect signals, justify necessity of new role | — |
| 02 | Design Spec | Design responsibilities, model, cost estimate | — |
| 03 | Channel Assessment | Assess whether new role needs an independent channel | — |
| 04 | Build Package | Build 6-file spec package using templates | — |
| 05 | Tripartite Review | CEO review + CAO compliance check | Yellow (CEO) |
| 06 | Submit for Approval | Submit to Chairman for approval | Red (Chairman) |

## Approval Gates

| Decision Item | Level | Handling |
|--------------|-------|---------|
| Channel assessment result | — | Include in spec package (channel-assessment workflow) |
| Spec package review | Yellow | Submit to CEO review + CAO compliance check |
| New Agent enactment | Red | Escalate to Chairman via CEO |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-justify.md
```
