---
name: submit
description: "Downgrade → CEO yellow light; Upgrade/vendor switch → Chairman red light"
next-step: null
output-file: null
template: null
---

# Step 5: Tiered Submission

**Progress: Step 5 / 5 total**

## Objective

Submit to the corresponding approver based on the proposal's approval level.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Yellow-Light Proposal (Downgrade)

Submit to CEO for approval via `exec dispatch`:

> **Model Adjustment Proposal (Yellow Light)**
>
> - Change type: Downgrade
> - Affected Agents: {Agent list}
> - Estimated monthly savings: ${amount}
> - Risk level: Low/Medium
> - Attachment: Full evaluation report

After CEO approval, initiate the knowledge-migration workflow to execute the switch.

### 2. Red-Light Proposal (Upgrade/Vendor Switch)

Submit to CEO via `exec dispatch`, CEO escalates to Chairman:

> **Model Adjustment Proposal (Red Light)**
>
> - Change type: Upgrade / Vendor switch
> - Affected Agents: {Agent list}
> - Estimated monthly cost increase: ${amount}
> - Expected performance improvement: {description}
> - Risk level: Medium/High
> - Attachment: Full evaluation report

### 3. Handle Approval Result

- **Approved**: Initiate the knowledge-migration workflow, execute model switch
- **Conditionally approved**: Adjust per requirements then execute
- **Rejected**: Record the reason, archive evaluation report to memory/
- **Deferred**: Set reminder, reassess when conditions are met

### 4. Update Records

- Update MEMORY.md to record model change decision
- Notify CFO to update cost budget

## Completion Criteria

- [ ] Proposal has been submitted at the appropriate tier
- [ ] Approval result has been handled
- [ ] Records have been updated
- [ ] CFO has been notified (if approved)
