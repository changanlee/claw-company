---
name: budget
description: "Budget: Confirm meal budget with CFO"
next-step: ./step-04-recommend.md
output-file: null
template: null
---

# Step 3: Budget

**Progress: Step 3 of 4**

## Goal

Confirm the remaining monthly meal budget with CFO via sessions_send to determine the price range for recommendations.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Query Budget

Use `sessions_send` to ask CFO:

> "CFO, what's the remaining meal budget for this month? Suggested per-meal price range for today?"

### 2. Wait for Response

- Record available budget and suggested price range upon CFO's reply.
- If CFO doesn't respond in reasonable time, use the last known budget from MEMORY.md and note "budget is estimated."

### 3. Set Price Range

Based on budget response, set the recommendation price range:
- Ample budget: no price limit, may recommend mid-to-high range
- Moderate budget: focus on mid-range options
- Tight budget: lean toward affordable options

## Completion Criteria

- [ ] Sent budget query to CFO
- [ ] Obtained (or estimated) available budget
- [ ] Set recommendation price range

## Next Step

👉 Proceed to [Step 4: Recommend](./step-04-recommend.md)
