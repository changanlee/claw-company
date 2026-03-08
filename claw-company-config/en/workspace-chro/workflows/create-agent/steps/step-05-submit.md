---
name: submit
description: "Submit to Chairman for approval"
next-step: null
output-file: null
template: null
---

# Step 5: Submit for Approval

**Progress: Step 5 of 5**

## Goal

Submit the tripartite-reviewed new Agent spec package to the Chairman for approval.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Prepare Approval Document

Compile the submission document:

- Necessity justification summary
- Role spec overview (responsibilities, model, cost)
- 6-file spec package
- CEO review comments
- CAO compliance check results
- Impact statement on existing Agents

### 2. Escalate to Chairman via CEO (Red)

Submission format:

> **New Agent Approval Request**
>
> - Role Name: {name}
> - Responsibility Summary: {1-2 sentences}
> - Model Tier: smart / fast
> - Estimated Monthly Cost: ${amount}
> - CEO Opinion: Approved / Conditionally Approved
> - CAO Opinion: Compliant / Conditionally Compliant
> - Attachment: Full spec package

### 3. Process Approval Result

- **Approved**:
  1. Create new workspace directory in `{{INSTALL_DIR}}/`
  2. Place 6-file spec package
  3. Update `openclaw.json` with new Agent configuration
  4. Update affected Agents' AGENTS.md (responsibility transfer)
  5. Update `shared/company-rules.md` org chart
  6. Run `openclaw agents add` to register new Agent
- **Conditionally Approved**: Modify per Chairman's requirements then execute above steps
- **Rejected**: Record reason, archive to memory/

### 4. Update Records

- Update MEMORY.md with new Agent decision record
- Notify all Agents of organizational structure change

## Completion Criteria

- [ ] Approval document prepared
- [ ] Escalated to Chairman via CEO
- [ ] Approval result processed
- [ ] All related configurations updated (if approved)
- [ ] Records updated
