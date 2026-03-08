---
name: parse
description: "Parse expense information (date, amount, category, notes)"
next-step: ./step-02-record.md
output-file: null
template: null
---

# Step 1: Parse Expense

**Progress: Step 1 of 3**

## Objective

Parse expense information and extract structured fields.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Extract Fields

Extract the following from the expense information:

| Field | Description | Required |
|-------|-------------|----------|
| Date | Expense date (default: today) | Yes |
| Amount | Expense amount (with currency) | Yes |
| Category | Dining/Transport/Accommodation/Entertainment/Shopping/Subscription/Other | Yes |
| Notes | Expense description | No |
| Merchant | Store/restaurant name | No |

### 2. Fill Missing Information

If information is incomplete, infer from context or report back to CEO to inquire.

## Completion Criteria

- [ ] All required fields extracted
- [ ] Information complete and ready to record

## Next Step

-> Proceed to [Step 2: Record](./step-02-record.md)
