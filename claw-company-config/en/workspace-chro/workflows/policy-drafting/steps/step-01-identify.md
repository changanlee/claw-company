---
name: identify
description: "Confirm policy need (create/modify/delete) and clarify trigger reason"
next-step: ./step-02-research.md
output-file: null
template: null
---

# Step 1: Identify Need

**Progress: Step 1 of 5**

## Goal

Confirm the type of policy need and its trigger reason, and define the policy scope.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Confirm Need Type

- **Create**: No existing policy covers this area
- **Modify**: Existing policy needs updating (due to environmental changes, execution issues, etc.)
- **Delete**: Existing policy is no longer applicable

### 2. Clarify Trigger Reason

Record the event that triggered the policy need:

- Which Agent or event triggered this need
- Specific problems caused by lacking a policy
- Impact scope (single Agent / multiple Agents / company-wide)

### 3. Define Policy Scope

- Policy name (tentative)
- Applicable targets (which Agents)
- Expected outcome (what problem it solves)
- Relationship with existing policies (replaces or supplements)

### 4. Check Existing Policies

Read the `{{INSTALL_DIR}}/shared/policies/` directory to confirm:

- Whether a related policy already exists
- Whether it conflicts with existing policies
- Whether it can be merged into an existing policy

## Completion Criteria

- [ ] Need type confirmed
- [ ] Trigger reason recorded
- [ ] Policy scope defined
- [ ] Existing policies checked for conflicts

## Next Step

👉 Proceed to [Step 2: Research](./step-02-research.md)
