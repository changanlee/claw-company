---
name: scale-assessment
description: "Scale Assessment: Determine whether the requirement should follow lean or full workflow"
next-step: ./step-03-task-breakdown.md
output-file: null
template: null
---

# Step 2: Scale Assessment

**Progress: Step 2 of 5**

## Goal

Based on the requirement's complexity and risk, determine whether to follow the lean workflow or the full workflow, which dictates the depth of subsequent task breakdown and review phases.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Assess Requirement Scale

Based on the technical design document, assess complexity and recommend a workflow to the superior (CEO or Chairman, depending on session source):

> "For this requirement, I recommend the **lean/full** workflow, estimating N engineer spawns."

### 2. Lean Workflow

Applicable to: Small features, bug fixes, straightforward tasks.

- Skip PRD and architecture design phases.
- CTO directly breaks down tasks and dispatches.
- Subsequent Step 3 follows lean path, Step 5 follows lean review.
- **Spawn limit: 4** (Dev + CR + rework + buffer)

### 3. Full Workflow

Applicable to: Complex products, multi-component systems, new architectures, high-risk changes.

- Execute full PRD → Architecture Design → Task Breakdown → Development → Review.
- Subsequent Step 3 follows full path, Step 5 follows full review.
- **Spawn limit: 12** (PM + Architect + SM + readiness + Dev + SR + CR + TEA + rework)

### 4. Record Decision

Record the workflow choice (lean/full) + estimated spawn count in `status.md` for subsequent steps to branch accordingly. CAO heartbeat scans this record for spawn monitoring.

## Completion Criteria

- [ ] Explained recommended workflow scale, reasoning, and estimated spawn count to superior
- [ ] Superior confirmed workflow choice (lean or full) — yellow light, CEO can approve
- [ ] Recorded workflow decision and estimated spawn count in status.md

## Next Step

👉 Proceed to [Step 3: Task Breakdown](./step-03-task-breakdown.md)
