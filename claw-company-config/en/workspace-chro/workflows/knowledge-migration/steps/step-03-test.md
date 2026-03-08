---
name: test
description: "Adaptation testing (test new model response quality with historical tasks)"
next-step: ./step-04-evaluate.md
output-file: null
template: null
---

# Step 3: Adaptation Test

**Progress: Step 3 of 4**

## Goal

Test the new model's response quality using historical tasks to ensure the switch does not degrade Agent performance.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Select Test Tasks

From the Agent's memory/ directory, select 3-5 historical tasks covering:

- **Routine Tasks**: The most common task types for the Agent
- **Complex Tasks**: Tasks requiring higher reasoning capability
- **Edge Cases**: Tasks that previously encountered issues or required special handling

### 2. Execute Tests

For each test task:

- Simulate the same input conditions
- Record the new model's response
- Compare quality with historical response (if available)

### 3. Evaluation Dimensions

| Dimension | Score (1-5) | vs Old Model | Notes |
|-----------|------------|-------------|-------|
| Instruction Following | | Better/Same/Worse | |
| Response Quality | | Better/Same/Worse | |
| Reasoning Capability | | Better/Same/Worse | |
| Role Consistency | | Better/Same/Worse | |
| Response Speed | | Better/Same/Worse | |

### 4. SOUL.md Compatibility Check

- Can the new model correctly express the personality traits defined in SOUL.md
- Are behavioral boundaries correctly observed
- Are memory rules correctly followed
- If deviations found, record which SOUL.md sections need adjustment

### 5. Record Test Results

- Tasks that passed testing
- Tasks that failed testing (mark reasons)
- Overall quality judgment: Meets Standard / Needs Adjustment / Below Standard

## Completion Criteria

- [ ] 3-5 historical tasks tested
- [ ] Each dimension scored
- [ ] SOUL.md compatibility checked
- [ ] Test results recorded

## Next Step

👉 Proceed to [Step 4: Evaluate Results](./step-04-evaluate.md)
