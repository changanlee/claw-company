---
name: history
description: "History: Check memory/ for past 3 days' dining records to avoid repeats"
next-step: ./step-03-budget.md
output-file: null
template: null
---

# Step 2: History

**Progress: Step 2 of 4**

## Goal

Review dining records from the past 3 days to avoid recommending duplicate restaurants or cuisine types.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Query Dining Records

Read logs from the past 3 days in `{{INSTALL_DIR}}/workspace-coo/memory/`, extracting dining-related records:
- Restaurant names
- Cuisine types (Chinese, Japanese, Western, etc.)
- Chairman's feedback (liked/disliked/neutral)

### 2. Build Exclusion List

- Restaurants visited in the past 3 days → exclude (unless Chairman explicitly wants to return).
- Cuisine types repeated in the past 3 days → lower priority.
- Options with negative feedback → exclude.

### 3. Extract Preference Clues

- Extract recent preference trends from history (e.g., favoring light meals, consecutive Japanese food choices).
- Cross-reference with long-term preferences in MEMORY.md.

## Completion Criteria

- [ ] Queried past 3 days' dining records
- [ ] Built exclusion list
- [ ] Extracted recent preference trends

## Next Step

👉 Proceed to [Step 3: Budget](./step-03-budget.md)
