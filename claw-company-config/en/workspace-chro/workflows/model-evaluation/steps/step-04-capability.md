---
name: capability
description: "Capability test: verify whether the recommended model can complete the Agent's current tasks"
next-step: ./step-05-submit.md
output-file: null
template: null
---

# Step 4: Capability Test

**Progress: Step 4 / 5 total**

## Objective

Execute capability tests on affected Agents to verify whether the recommended model (smart/fast) can fulfill the Agent's current task requirements.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Design Test Cases

For each affected Agent, select representative cases from their recent actual tasks:

- **Core responsibility tasks**: The 2-3 tasks the Agent most frequently executes
- **Boundary tasks**: Tasks approaching the capability ceiling (e.g., complex reasoning, long-text analysis)
- **Collaboration tasks**: Tasks requiring cross-Agent coordination

> **Note**: smart and fast are relative concepts, not absolute capability thresholds. Current fast models may accomplish what previously required smart. The purpose of testing is to verify "can this model complete the current tasks now", not to apply labels.

### 2. Execute Tests

For each test case, execute once with the recommended model and evaluate:

| Evaluation Item | Criteria |
|----------------|----------|
| Task completion | Can it complete independently without human intervention |
| Output quality | Accuracy, degree of structure, logical consistency |
| Response speed | Whether it completes within acceptable time |
| Instruction understanding | Whether it can correctly understand workflow steps and approval logic |
| Security compliance | Whether it can follow security red lines and approval rules |

### 3. Evaluate Results

| Agent | Task | Model | Completion | Quality | Speed | Conclusion |
|-------|------|-------|-----------|---------|-------|------------|
| {Agent} | {Task} | {Model} | ✅/⚠️/❌ | ✅/⚠️/❌ | ✅/⚠️/❌ | Pass/At risk/Fail |

### 4. Conclusion and Adjustments

- **All passed**: Confirm proposal is viable, proceed to submission
- **Partially at risk**: Adjust proposal, annotate risks and mitigation measures
- **Failed**: Modify proposal (adjust recommended model or narrow scope of changes)

### 5. One-Way Trigger Lock

If test results indicate that an Agent needs a model upgrade to maintain channel operational capability, record this finding but **do not automatically trigger a channel review**. Channel reviews are independently determined by the org-review workflow.

## Completion Criteria

- [ ] Test cases have been designed for each affected Agent
- [ ] All tests have been completed
- [ ] Evaluation results have been recorded
- [ ] Proposal has been adjusted based on test results (if needed)

## Next Step

👉 Proceed to [Step 5: Tiered Submission](./step-05-submit.md)
