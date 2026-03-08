---
name: evaluate
description: "Evaluate capability fitness, task completion rate, and model match"
next-step: ./step-03-gaps.md
output-file: null
template: null
---

# Step 2: Evaluate Fitness

**Progress: Step 2 of 4**

## Goal

Based on collected data, evaluate each Agent's capability fitness, task completion rate, and model match.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Capability Fitness Evaluation

Evaluate each Agent on the following dimensions (1-5 scale):

- **Responsibility Coverage**: Whether all responsibilities defined in AGENTS.md have corresponding execution records
- **Execution Quality**: Quality and accuracy of task completion
- **Response Efficiency**: Whether task processing speed is reasonable
- **Autonomous Judgment**: Whether green/yellow/red level classification is appropriate

### 2. Task Completion Rate Analysis

- Completed tasks / Total assigned tasks
- Proportion of overdue completions
- Proportion requiring rework

### 3. Model Match Evaluation

Compare each Agent's current model (smart / fast) and evaluate:

- Whether Agents using smart model truly need high-capability model
- Whether Agents using fast model show signs of insufficient capability
- Cost-performance ratio of Token consumption vs output quality

### 4. Compile Evaluation Results

| Agent | Model | Fitness | Completion | Model Match | Overall Rating |
|-------|-------|---------|------------|-------------|---------------|
| CEO | smart | /5 | % | Appropriate/Over/Under | |
| CFO | smart | /5 | % | | |
| CIO | smart | /5 | % | | |
| COO | fast | /5 | % | | |
| CTO | smart | /5 | % | | |
| CAO | smart | /5 | % | | |

## Completion Criteria

- [ ] All Agent capability fitness evaluated
- [ ] Task completion rates calculated
- [ ] Model match evaluated
- [ ] Summary table completed

## Next Step

👉 Proceed to [Step 3: Identify Gaps](./step-03-gaps.md)
