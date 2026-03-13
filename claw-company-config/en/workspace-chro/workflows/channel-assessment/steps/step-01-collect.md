---
name: collect
description: "Collect data: read channel governance policy, collect data needed for assessment"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# Step 1: Collect Assessment Data

**Progress: Step 1 / 4 total**

## Objective

Read the channel governance policy and collect the target Agent's interaction frequency, task types, and governance requirement data.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Read Channel Governance Policy

Read `{{INSTALL_DIR}}/shared/policies/channel-governance.md` to confirm activation criteria, capability prerequisites, maintenance conditions, and closure criteria.

### 2. Confirm Trigger Source

Identify the trigger source of this assessment, record as one of the following:
- `[Trigger: create-agent]` — New role assessment
- `[Trigger: org-review]` — Usage frequency change detected
- `[Trigger: Chairman request]` — Chairman proactively requested
- `[Trigger: model change cascading]` — Post model upgrade/downgrade review (`[Cascading Review]`)

### 3. Collect Data

**If new role (create-agent triggered):**
- Expected interaction frequency (high/medium/low)
- Expected task types (whether involving frequent red-light proposals)
- Governance independence requirement

**If existing Agent (org-review / model change triggered):**
- Recent session count and frequency
- Task type distribution recorded in MEMORY.md
- Chairman direct interaction frequency (if channel exists)
- Current channel utilization rate

**If Chairman request:**
- Chairman's specific requirement description
- Expected use scenarios

## Completion Criteria

- [ ] Channel governance policy has been read
- [ ] Trigger source has been confirmed
- [ ] All necessary data has been collected

## Next Step

👉 Proceed to [Step 2: Evaluation](./step-02-evaluate.md)
