---
name: step-02-identify
description: "Identify changes"
next-step: ./step-03-execute.md
---

# Step 2: Identify Changes

**Progress: Step 2 of 4** — Next: Execute Changes

## Objective

Receive the CTO's change request, identify which sections need modification, and assess impact on dependent sections.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Receive change request

Extract change requirements from the CTO's task description:

- Which requirements need to be added, modified, or deleted?
- What is the reason and context for the change?
- Are there specific constraints?

### 2. Identify affected sections

Map changes against the PRD structure:

| Section | Impact | Description |
|---------|--------|-------------|
| Functional requirements | Add/Modify/Delete/None | {details} |
| User stories | Add/Modify/Delete/None | {details} |
| Acceptance criteria | Add/Modify/Delete/None | {details} |
| Non-functional requirements | Modify/None | {details} |
| Edge cases and risks | Modify/None | {details} |

### 3. Assess cascading impact

Check whether changes affect other sections:

- Modified requirements → Do corresponding user stories need updates?
- Modified user stories → Do corresponding acceptance criteria need updates?
- New features → Do new NFRs or risk items need to be added?

## Completion Criteria

- ✅ Change request clearly understood
- ✅ Affected sections identified
- ✅ Cascading impact assessed

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-execute.md`
