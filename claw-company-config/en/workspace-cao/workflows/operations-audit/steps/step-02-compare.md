---
name: compare
description: "Cross-reference: session count vs record entries, detect record gaps"
next-step: ./step-03-review.md
output-file: null
template: null
---

# Step 2: Cross-Reference

**Progress: Step 2 / 5 total**

## Objective

Compare each Agent's session count against MEMORY.md/output/ record entries to detect potential record gaps.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Count Sessions

List each Agent's sessions/ directory (if accessible) and count the number of sessions from the past week.

### 2. Cross-Reference

For each Agent, compare:

| Agent | Session Count | Record Entries | Gap | Red Flag? |
|-------|--------------|----------------|-----|-----------|

**Red flag condition**: Session count significantly exceeds record entries (gap > 50%), indicating operations that were not recorded.

### 3. Record Findings

Add red-flagged Agents to the audit watch list for in-depth review in subsequent steps.

## Completion Criteria

- [ ] All Agent session counts have been tallied
- [ ] Cross-reference is complete
- [ ] Red-flagged Agents have been marked

## Next Step

👉 Proceed to [Step 3: Traffic Light Review](./step-03-review.md)
