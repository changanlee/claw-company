---
name: knowledge-migration
description: "Knowledge Migration: Backup → Switch Model → Adaptation Test → Evaluate Results"
type: execution
agent: chro
sub-agent: null
approval: yellow
---

# CHRO Knowledge Migration Workflow

## Overview

CHRO (Harper) executes knowledge migration during model switches, including backup, switch, adaptation testing, and result evaluation. Ensures Agent knowledge and behavioral quality are not degraded after a model switch.

## Prerequisites

- model-evaluation workflow approved
- Confirmed Agent(s) and target model for switching
- CFO has confirmed cost budget

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Backup | Backup affected Agent's MEMORY.md and logs | — |
| 02 | Switch | Switch model, load workspace | — |
| 03 | Test | Adaptation testing (historical task testing) | — |
| 04 | Evaluate | Evaluate results, confirm switch or rollback | Yellow (CEO) |

## Approval Gates

| Decision Item | Level | Handling |
|--------------|-------|---------|
| Confirm switch completion | Yellow | Submit to CEO for confirmation |
| Rollback decision | Yellow | Submit to CEO for confirmation |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-backup.md
```
