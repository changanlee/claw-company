---
name: finalize
description: "Submit revised policy to Chairman for approval"
next-step: null
output-file: null
template: null
---

# Step 5: Submit for Approval

**Progress: Step 5 of 5**

## Goal

Submit the tripartite-reviewed policy document to the Chairman for approval.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Prepare Approval Document

Compile the final version including:

- Full policy text (revised version)
- Trigger reason summary
- CEO review comments
- CAO compliance check results
- Change comparison table (diff from initial version)

### 2. Escalate to Chairman via CEO (Red)

Submit the policy document to the Chairman via CEO.

Submission format:

> **Policy Approval Request**
>
> - Policy Name: {name}
> - Type: Create / Modify / Delete
> - Scope: {Agent list}
> - CEO Opinion: Approved / Conditionally Approved
> - CAO Opinion: Compliant / Conditionally Compliant
> - Attachment: Full policy text

### 3. Process Approval Result

- **Approved**: Place policy file in `{{INSTALL_DIR}}/shared/policies/`, notify relevant Agents
- **Conditionally Approved**: Modify per Chairman's requirements then place
- **Rejected**: Record rejection reason, archive to memory/

### 4. Update Records

- Update MEMORY.md with policy change record
- If the policy affects company-rules.md, CEO needs to update accordingly

## Completion Criteria

- [ ] Approval document prepared
- [ ] Escalated to Chairman via CEO
- [ ] Approval result processed
- [ ] Records updated
