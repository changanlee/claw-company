---
name: brainstorming
description: "Brainstorming: topic definition → technique selection → divergence → PM3 convergence (First Principles → Reverse Engineering → Critique & Refine) → summary report"
type: interactive
agent: ceo
sub-agent: null
approval: green
---

# CEO Brainstorming Workflow (v2)

## Overview

CEO (Nova) enters Facilitator mode to host structured brainstorming: use techniques to explore breadth first (diverge), then use PM3's three phases to deepen (converge). Executives or engineers can be spawned on demand for targeted deep dives.

## Design Principles

- **Divergence and convergence are separate**: the first half (Steps 2-3) focuses on breadth, the second half (Steps 4-6) focuses on depth
- **PM3 as default convergence**: the convergence phase defaults to First Principles → Reverse Engineering → Critique & Refine
- **Dynamic expert allocation**: `sessions_spawn` can bring in executives or engineers at any stage with a context snapshot
- **Chairman controls the pace**: the Chairman must confirm before advancing past each PM3 phase

## Facilitator Mode

When entering this workflow, CEO switches to **Facilitator mode**:
- Role: guide the process, integrate perspectives, spawn experts on demand
- Does not steer the content direction — lets the Chairman's and experts' views collide naturally
- Returns to normal CEO mode after exiting the workflow

## Prerequisites

- A topic or request raised by the Chairman
- `{{INSTALL_DIR}}/shared/brain-methods.csv` (brainstorming technique library)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Topic Definition | Define the topic + classify (decision/creative/hybrid) | — |
| 02 | Select Technique | Choose a divergence technique mode | — |
| 03 | Diverge | Execute technique + spawn experts on demand | — |
| 04 | PM3-1: First Principles | Break down to basic facts and constraints | Chairman confirms |
| 05 | PM3-2: Reverse Engineering | Break down current state, feasibility, dependencies | Chairman confirms |
| 06 | PM3-3: Critique & Refine | Adversarial review + final proposals | Chairman confirms |
| 07 | Summary Report | Produce summary + next actions | — |

## Execution

Start from the first step:

👉 Begin → read steps/step-01-define.md
