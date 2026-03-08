---
name: step-01-prepare
description: "Collect review materials"
next-step: ./step-02-review.md
output-file: null
template: null
---

# Step 1: Collect Review Materials

**Progress: Step 1 of 3** — Next: Review item by item

## Goal

Collect all materials needed for the review and establish the review context.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Story File

Read the story file provided by CTO, obtaining:

- Story description and acceptance criteria
- Task list and completion status
- Development notes

### 2. Collect Changed Files List

Confirm the code changes to review:

- Obtain the changed files list from CTO's provided information
- Or retrieve changes via git diff
- Record each file's change type (added/modified/deleted)

### 3. Load Related Spec Documents

If available, also load:

- PRD (Product Requirements Document)
- Architecture design document
- Technical specifications

### 4. Build Review Checklist

Organize the review context:

- Change scope summary
- Modules/components involved
- Expected behavior changes

## Completion Criteria

- ✅ Story file loaded
- ✅ Changed files list confirmed
- ✅ Related spec documents loaded (if available)
- ✅ Review context established

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-review.md`
