---
name: channel-assessment
description: "Channel assessment: collect data → determine activation/maintenance/closure → capability test → produce recommendation"
type: semi-automatic
agent: chro
sub-agent: null
approval: red
---

# CHRO Channel Assessment Workflow

## Overview

CHRO (Harper) evaluates whether an Agent needs an independent Discord channel. Can be triggered from multiple sources: create-agent workflow, org-review detection, Chairman request, model change cascading.

## Prerequisites

- Channel governance policy: `{{INSTALL_DIR}}/shared/policies/channel-governance.md`
- Trigger source is clearly identified (new role/usage frequency change/Chairman request/model change)

## Step Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Collect Assessment Data | Read policy, collect interaction frequency and task type data | — |
| 02 | Determine Activation/Maintenance/Closure | Compare against activation and closure criteria | — |
| 03 | Channel Capability Test | If activation needed, run standardized test on target model | — |
| 04 | Produce Recommendation | Produce assessment report, submit for review | Red light (Chairman) |

## Approval Gates

| Decision Item | Traffic Light | Handling |
|--------------|--------------|---------|
| Channel activation | Red light | CHRO assessment → CEO review → Chairman approval |
| Channel closure | Red light | CHRO assessment → CEO review → Chairman approval (with 7-day buffer) |

## Cascading Review Rules

If this assessment was triggered by a model change event (`[Cascading Review]`), the assessment result must not re-trigger a model evaluation. Prevents circular dependency.

## Execution

Start from the first step:

```
👉 Begin execution → Read steps/step-01-collect.md
```
