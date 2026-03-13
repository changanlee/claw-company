---
name: channel
description: "Channel assessment: evaluate whether the new role needs an independent channel"
next-step: ./step-04-build.md
output-file: null
template: null
---

# Step 3: Channel Assessment

**Progress: Step 3 / 6 total**

## Objective

Based on the role spec from Step 2, evaluate whether the new Agent needs an independent channel and execute the channel-assessment workflow.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Determine Whether Channel Assessment Is Needed

Based on the channel configuration conclusion from Step 2, determine whether to initiate a full assessment:

- **No independent channel needed**: Record the reason, skip to completion criteria
- **May need an independent channel**: Proceed to next step

### 2. Initiate channel-assessment Workflow

Read and execute `{{INSTALL_DIR}}/workspace-chro/workflows/channel-assessment/workflow.md`, using the new role's spec as the assessment input.

Assessment focus:
- Whether the role's tasks require real-time response (time sensitivity)
- Whether there is high-frequency Chairman direct interaction demand
- Whether the model capability is sufficient to support independent operation (reference channel-capability-test template)
- Cost-benefit ratio

### 3. Integrate Assessment Results

Incorporate the channel-assessment results into the spec package:

- **Recommend activation**: Add channel configuration in Step 4 (build spec package)
- **Do not recommend activation**: Record assessment results, use CEO dispatch channel
- **Defer assessment**: Record conditions, reassess after the role has been operational for some time

### 4. Checks and Balances

- Confirm channel assessment results do not affect model selection decisions (one-way trigger lock: model changes can trigger channel review, but channel results do not trigger model evaluation in return)
- Confirm assessment results are consistent with `policies/channel-governance.md`

## Completion Criteria

- [ ] Determined whether channel assessment is needed
- [ ] Completed channel-assessment (if applicable)
- [ ] Assessment results have been recorded
- [ ] Checks and balances have passed

## Next Step

👉 Proceed to [Step 4: Build Spec Package](./step-04-build.md)
