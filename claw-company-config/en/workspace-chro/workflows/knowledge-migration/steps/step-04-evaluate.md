---
name: evaluate
description: "Evaluate results (quality met? style consistent? need SOUL.md adjustment?), confirm switch or rollback"
next-step: null
output-file: null
template: null
---

# Step 4: Evaluate Results

**Progress: Step 4 of 4**

## Goal

Comprehensively evaluate test results and decide whether to confirm the switch or rollback.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Comprehensive Evaluation

Based on test results, make a judgment:

| Result | Condition | Action |
|--------|-----------|--------|
| **Confirm Switch** | All dimensions >= 3, no "Worse" items | Officially adopt new model |
| **Conditional Switch** | Mostly meets standard, minor SOUL.md tuning needed | Adjust then observe for 1 week |
| **Rollback** | Multiple dimensions below standard or critical dimension "Worse" | Restore original model |

### 2. Confirm Switch Flow

If confirming the switch:

- Notify CEO via `exec dispatch` (Yellow)
- Notify CFO to update cost budget
- Update MEMORY.md with model change record

### 3. Conditional Switch Flow

If SOUL.md adjustment is needed:

- Record specific sections requiring adjustment
- **Note**: SOUL.md modification is Red-protected, requires escalation to Chairman via CEO
- Set 1-week observation period after adjustment
- Re-evaluate after observation period ends

### 4. Rollback Flow

If deciding to rollback:

- Restore original model configuration in `openclaw.json`
- Confirm Agent resumes normal operation
- Verify from backup that MEMORY.md is undamaged
- Notify CEO via `exec dispatch` (Yellow)
- Record rollback reason and findings

### 5. Final Report

Produce knowledge migration result report:

- Switch/rollback decision and rationale
- Test data summary
- Follow-up action items
- Recommendations for future model evaluations

Submit to CEO.

## Completion Criteria

- [ ] Comprehensive evaluation completed
- [ ] Switch/rollback executed
- [ ] CEO notified
- [ ] Final report produced
- [ ] Records updated
