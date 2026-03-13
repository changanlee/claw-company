---
name: submit
description: "Submit to Chairman for approval"
next-step: null
output-file: null
template: null
---

# Step 6: Submit for Approval

**Progress: Step 6 / 6 total**

## Objective

Submit the three-party reviewed new Agent spec package to the Chairman for approval.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Prepare Approval Documents

Compile the submission documents:

- Necessity justification summary
- Role spec overview (responsibilities, model, cost)
- 6-file spec package
- CEO review comments
- CAO compliance check results
- Impact statement on existing Agents

### 2. Escalate to Chairman via CEO (Red Light)

Submission format:

> **New Agent Approval Request**
>
> - Role name: {name}
> - Responsibility summary: {1-2 sentences}
> - Model tier: smart / fast
> - Estimated monthly cost: ${amount}
> - CEO opinion: Approved / Conditionally approved
> - CAO opinion: Compliant / Conditionally compliant
> - Attachment: Full spec package

### 3. Handle Approval Result

- **Approved**:
  1. Create new workspace directory in `{{INSTALL_DIR}}/`
  2. Place the 6-file spec package
  3. Update `openclaw.json` to add Agent configuration
  4. Update affected Agents' AGENTS.md (responsibility handover)
  5. Update organizational structure in `shared/company-rules.md`
  6. Run `openclaw agents add` to register the new Agent
- **Conditionally approved**: Make modifications per Chairman's requirements then execute above steps
- **Rejected**: Record the reason, archive to memory/

### 4. Update Records

- Update MEMORY.md to record the new Agent decision
- Notify all Agents of organizational structure change

## Completion Criteria

- [ ] Approval documents have been prepared
- [ ] Escalated to Chairman via CEO
- [ ] Approval result has been handled
- [ ] All related configurations have been updated (if approved)
- [ ] Records have been updated
