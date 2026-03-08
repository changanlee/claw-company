---
name: step-01-assess
description: "Assess change requirements"
next-step: ./step-02-plan.md
output-file: null
template: null
---

# Step 1: Assess Change Requirements

**Progress: Step 1 of 3** — Next: Develop correction plan

## Goal

Comprehensively assess the change requirement's scope, impact, and rationale to determine if course correction is truly needed.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Clarify Change Requirements

Confirm with the requester:

- **What to change**: Specifically what needs to change
- **Why the change**: Reason (requirement change / technical discovery / external factor)
- **Urgency**: Whether immediate action is needed

### 2. Load Current Sprint Status

Read the sprint-status file to understand:

- Current progress
- In-progress stories
- Completed stories
- Remaining backlog

### 3. Impact Analysis

Assess the change's impact on:

- **Scope impact**: Which stories need to be added/modified/removed
- **Progress impact**: Does completed work need rework?
- **Dependency impact**: Does it affect other stories' dependency chains?
- **Resource impact**: Is additional development time needed?

### 4. Determine Handling Approach

| Impact Level | Handling Approach |
|-------------|-------------------|
| Minor adjustment (Sprint goal unaffected) | Adjust directly, no full course correction needed |
| Moderate change (affects some stories) | Continue course correction workflow |
| Major change (Sprint goal changes) | Continue course correction workflow, escalate to CEO |

## Completion Criteria

- ✅ Change requirements clarified
- ✅ Current Sprint status understood
- ✅ Impact analysis completed
- ✅ Handling approach determined

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-plan.md`
