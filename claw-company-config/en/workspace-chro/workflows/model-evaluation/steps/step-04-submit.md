---
name: submit
description: "Downgrade → CEO yellow; Upgrade/vendor change → Chairman red"
next-step: null
output-file: null
template: null
---

# Step 4: Tiered Submission

**Progress: Step 4 of 4**

## Goal

Submit the proposal to the appropriate approver based on the determined approval level.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Yellow Proposal (Downgrade)

Via `sessions_send`, submit to CEO for approval:

> **Model Adjustment Proposal (Yellow)**
>
> - Change Type: Downgrade
> - Affected Agents: {Agent list}
> - Estimated Monthly Savings: ${amount}
> - Risk Level: Low/Medium
> - Attachment: Full evaluation report

After CEO approval, initiate the knowledge-migration workflow for switching.

### 2. Red Proposal (Upgrade/Vendor Change)

Via `sessions_send`, submit to CEO for escalation to Chairman:

> **Model Adjustment Proposal (Red)**
>
> - Change Type: Upgrade / Vendor Change
> - Affected Agents: {Agent list}
> - Estimated Monthly Cost Increase: ${amount}
> - Expected Performance Improvement: {description}
> - Risk Level: Medium/High
> - Attachment: Full evaluation report

### 3. Process Approval Result

- **Approved**: Initiate knowledge-migration workflow to execute model switch
- **Conditionally Approved**: Adjust per requirements then execute
- **Rejected**: Record reason, archive evaluation report to memory/
- **Deferred**: Set reminder, re-evaluate when conditions mature

### 4. Update Records

- Update MEMORY.md with model change decision
- Notify CFO to update cost budget

## Completion Criteria

- [ ] Proposal submitted at appropriate level
- [ ] Approval result processed
- [ ] Records updated
- [ ] CFO notified (if approved)
