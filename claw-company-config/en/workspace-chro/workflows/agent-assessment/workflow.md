---
name: agent-assessment
description: "Agent Assessment: Collect Data → Evaluate Fitness → Identify Gaps → Generate Report"
type: semi-automatic
agent: chro
sub-agent: null
approval: green
output-dir: output/assessments/
---

# CHRO Agent Assessment Workflow

## Overview

CHRO (Harper) collects MEMORY.md summaries and recent performance data from all Agents, evaluates capability fitness and task completion rates, identifies capability gaps with improvement suggestions, and produces an assessment report.

## Prerequisites

- Each Agent's MEMORY.md
- Recent task completion records
- Each Agent's model configuration (smart / fast)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Collect Data | Collect Agent MEMORY.md summaries and recent performance data | — |
| 02 | Evaluate Fitness | Evaluate capability fitness, completion rate, model match | — |
| 03 | Identify Gaps | Identify capability gaps, propose improvements | — |
| 04 | Generate Report | Produce Agent assessment report | — |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-collect.md
```
