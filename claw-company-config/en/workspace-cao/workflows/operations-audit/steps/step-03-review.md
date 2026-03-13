---
name: review
description: "Traffic light review: review whether operation traffic light classifications in records are correct"
next-step: ./step-04-channel.md
output-file: null
template: null
---

# Step 3: Traffic Light Review

**Progress: Step 3 / 5 total**

## Objective

Sample-review operations recorded in each Agent's MEMORY.md and output/ to verify whether traffic light classifications are correct.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Sample Selection

From the records collected in Step 1, select:
- All red-light operations (full review)
- 3-5 random yellow-light operations
- All records from red-flagged Agents in Step 2

### 2. Review Traffic Lights

For each sampled operation:

Read `{{INSTALL_DIR}}/shared/policies/approval-matrix.md` and re-classify using the four-dimension assessment framework:

- Traffic light classified by Agent vs traffic light classified by CAO
- Are they consistent?
- If inconsistent → record as audit finding

### 3. Record Review Results

| Agent | Operation Description | Agent Classification | CAO Review | Consistent? | Notes |
|-------|----------------------|---------------------|------------|-------------|-------|

## Completion Criteria

- [ ] All red-light operations have been reviewed
- [ ] Yellow-light operations have been sample-reviewed
- [ ] All inconsistencies have been recorded

## Next Step

👉 Proceed to [Step 4: Channel Audit](./step-04-channel.md)
