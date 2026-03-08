---
name: dev-dispatch
description: "CTO Dev Dispatch Workflow: Brainstorm → Scale Assessment → Task Breakdown → Engineer Dispatch → Review"
type: interactive
agent: cto
sub-agent: null
phase: implementation
approval: yellow
output-dir: output/planning/
---

# CTO Dev Dispatch Workflow

## Overview

The complete workflow when CTO (Atlas) receives a development request relayed by the CEO. Five phases cover the full lifecycle from requirement understanding, brainstorming, scale assessment, task breakdown, engineer dispatch, to final quality review.

## Prerequisites

- Development request relayed by CEO (with description and context)
- `engineers/roster.md` (available engineer roles)
- `{{INSTALL_DIR}}/shared/brain-methods.csv` (brainstorming technique library)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Brainstorm | Select thinking techniques, diverge then converge to 2-3 technical solutions | Design direction requires Chairman approval |
| 01.5 | Implementation Plan | Convert design doc to structured implementation plan (Superpowers writing-plans) | — |
| 02 | Scale Assessment | Determine lean or full workflow | — |
| 03 | Task Breakdown | Lean: direct breakdown; Full: PRD → Architecture → Epic | PRD yellow, Architecture yellow |
| 03.5 | Readiness Check | Full flow: check-readiness verification (SDD hard gate) | check-readiness PASS |
| 04 | Dispatch | Compose spawn instructions, select engineers, dispatch tasks | — |
| 05 | Review | Code Review, quality gates, report to CEO | Push main red, Deploy red |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-brainstorm.md
```

## Approval Gates Overview

| Decision Item | Level | Handling |
|--------------|-------|---------|
| PRD Approval | Yellow | Submit to CEO for review |
| Architecture Approval | Yellow | Submit to CEO for review |
| Push to main branch | Red | Escalate to Chairman via CEO |
| Production Deploy | Red | Escalate to Chairman via CEO |

- **Yellow**: Atlas proposes recommendation, CEO has authority to approve or reject.
- **Red**: Requires explicit Chairman approval. Neither Atlas nor CEO may decide independently.
