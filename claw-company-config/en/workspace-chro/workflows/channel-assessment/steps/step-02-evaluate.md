---
name: evaluate
description: "Evaluation: compare against activation and closure criteria, produce determination"
next-step: ./step-03-test.md
output-file: null
template: null
---

# Step 2: Determine Activation/Maintenance/Closure

**Progress: Step 2 / 4 total**

## Objective

Based on the collected data, compare against channel-governance.md criteria to determine whether the channel should be activated, maintained, or closed.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Compare Against Activation Criteria

Check each condition (meeting any one triggers the assessment):

- [ ] Does the Chairman have high-frequency direct interaction needs with this role?
- [ ] Does the role require governance independence?
- [ ] Does the role's responsibilities involve frequent red-light proposals requiring multi-round discussions?

### 2. Compare Against Closure Criteria (only for Agents with existing channels)

- [ ] Has usage frequency been below expectations at activation for two consecutive months?
- [ ] After model downgrade, is the model still capable?

### 3. Produce Determination

| Determination | Condition | Next Step |
|--------------|-----------|-----------|
| Recommend activation | Meets activation criteria | Proceed to Step 3 (capability test) |
| Recommend maintenance | Has channel and usage is normal | Skip to Step 4 (produce recommendation) |
| Recommend closure | Meets closure criteria | Skip to Step 4 (produce recommendation) |
| No channel needed | Does not meet any activation criteria | Skip to Step 4 (produce recommendation) |

## Completion Criteria

- [ ] All criteria comparisons have been completed
- [ ] A clear determination has been produced (activate/maintain/close/not needed)

## Next Step

👉 If recommend activation → [Step 3: Capability Test](./step-03-test.md)
👉 Other determinations → [Step 4: Produce Recommendation](./step-04-recommend.md)
