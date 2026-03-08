---
name: trigger
description: "Detect trigger conditions (failure rate >20% needs upgrade, <5% can downgrade, new model release)"
next-step: ./step-02-analyze.md
output-file: null
template: null
---

# Step 1: Detect Trigger

**Progress: Step 1 of 4**

## Goal

Detect model upgrade/downgrade trigger conditions and confirm whether an evaluation workflow should be initiated.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Check Upgrade Trigger Conditions

Any of the following triggers an upgrade evaluation:

- **Failure rate > 20%**: Agent task failure or rework ratio exceeds 20%
- **Capability bottleneck**: Agent assessment report shows model match as "Under"
- **New model release**: A more suitable new model is available on the market

### 2. Check Downgrade Trigger Conditions

Any of the following triggers a downgrade evaluation:

- **Failure rate < 5%**: Agent performs stably, may be using an over-spec model
- **High cost**: Token audit shows an Agent's cost significantly higher than peers
- **Task simplification**: Agent responsibilities adjusted, no longer requiring high-capability model

### 3. External Triggers

- **New model release**: Evaluate whether a new model better suits existing Agents
- **Model retirement**: Vendor announces model end-of-life
- **Pricing change**: Model pricing adjustments affecting cost-efficiency

### 4. Record Trigger Context

| Trigger Type | Affected Agent | Current Model | Trigger Metric | Data |
|-------------|---------------|--------------|---------------|------|
| Upgrade/Downgrade/External | | smart/fast | | |

## Completion Criteria

- [ ] Trigger conditions checked
- [ ] Trigger context recorded
- [ ] Confirmed evaluation workflow should proceed

## Next Step

👉 Proceed to [Step 2: Comparative Analysis](./step-02-analyze.md)
