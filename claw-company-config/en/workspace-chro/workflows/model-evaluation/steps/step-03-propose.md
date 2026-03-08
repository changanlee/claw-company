---
name: propose
description: "Produce upgrade/downgrade proposal (affected Agents, current vs recommended model, rationale, cost estimate, risk)"
next-step: ./step-04-submit.md
output-file: output/assessments/model-evaluation-YYYY-MM-DD.md
template: ../../templates/model-evaluation.md
---

# Step 3: Produce Proposal

**Progress: Step 3 of 4**

## Goal

Based on comparative analysis results, produce a structured model upgrade/downgrade proposal.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Use Template

Read `{{INSTALL_DIR}}/workspace-chro/templates/model-evaluation.md` and fill in analysis data.

### 2. Required Proposal Elements

- **Affected Agents**: List of Agents requiring model changes
- **Current vs Recommended Model**: Change comparison for each Agent
- **Rationale**: Based on trigger conditions and comparative analysis
- **Estimated Cost Change**: Monthly / annualized
- **Risk Assessment**:
  - Upgrade: Cost increase, whether truly needed
  - Downgrade: Quality degradation risk, rollback plan
- **Transition Plan**: How to switch safely (reference knowledge-migration workflow)
- **Recommended Approval Level**: Yellow (downgrade) or Red (upgrade/vendor change)

### 3. Proposal Classification

Determine approval level based on change type:

| Change Type | Approval Level | Rationale |
|------------|---------------|-----------|
| fast to fast (same-tier swap) | Yellow | Cost-neutral, CEO can decide |
| smart to fast (downgrade) | Yellow | Cost saving, CEO can decide |
| fast to smart (upgrade) | Red | Cost increase, requires Chairman approval |
| Vendor change | Red | Major change, requires Chairman approval |

## Completion Criteria

- [ ] Proposal completed using template
- [ ] All required elements included
- [ ] Approval level confirmed

## Next Step

👉 Proceed to [Step 4: Tiered Submission](./step-04-submit.md)
