---
name: evaluate
description: "Compare with purchase/previous price, determine three-tier alert"
next-step: ./step-03-alert.md
output-file: null
template: null
---

# Step 2: Evaluate Alerts

**Progress: Step 2 of 3**

## Objective

Compare current prices with purchase prices and previous check prices to determine whether to trigger alerts.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Calculate Change Rates

For each held position, calculate:

- Change rate vs purchase price
- Change rate vs previous check price

### 2. Three-Tier Alert Assessment

| Tier | Threshold | Action |
|------|-----------|--------|
| Tier 1 (Notice) | Change >= 3% | Record, include in weekly report |
| Tier 2 (Warning) | Change >= 5% | Notify CEO |
| Tier 3 (Urgent) | Change >= 10% | Immediately notify CEO |

### 3. Record Assessment

Record the assessment result for each asset.

## Completion Criteria

- [ ] Change rates calculated for all assets
- [ ] Alert tiers determined
- [ ] Assessment results recorded

## Next Step

-> Proceed to [Step 3: Notify](./step-03-alert.md)
