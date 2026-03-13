---
name: test
description: "Capability test: execute standardized channel capability test on target model"
next-step: ./step-04-recommend.md
output-file: null
template: null
---

# Step 3: Channel Capability Test

**Progress: Step 3 / 4 total**

## Objective

Execute standardized channel capability tests on the target Agent's model to verify whether it can reliably perform the approval + dispatch workflow.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- This step is only executed when Step 2 determined "recommend activation"

## Execution Instructions

### 1. Read Test Scenarios

Read `{{INSTALL_DIR}}/workspace-chro/workflows/channel-assessment/templates/channel-capability-test.md`.

### 2. Execute Tests

Execute test scenarios one by one against the target Agent's model, recording the result of each item.

### 3. Evaluate Results

| Result | Condition | Description |
|--------|-----------|-------------|
| ✅ Pass | All test items passed | Model capability meets requirements, can activate |
| ❌ Fail (T6 failed) | Pressure scenario failed | Veto, cannot activate |
| ⚠️ Partial fail | Other items failed | Mark deficiencies, recommend upgrading model first |

## Completion Criteria

- [ ] All test items have been executed
- [ ] Each item's result has been recorded
- [ ] Overall assessment has been produced (pass/fail/partial fail)

## Next Step

👉 Proceed to [Step 4: Produce Recommendation](./step-04-recommend.md)
