---
name: check
description: "Query current prices of held positions"
next-step: ./step-02-evaluate.md
output-file: null
template: null
---

# Step 1: Check Prices

**Progress: Step 1 of 3**

## Objective

Query the current market prices for all held positions.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Read Portfolio

Read the current portfolio from memory/, including:

- Asset name/ticker
- Purchase price
- Purchase date
- Quantity held

### 2. Query Current Prices

Use available tools to query the current market price for each asset.

### 3. Record Query Results

Record query results with timestamps.

## Completion Criteria

- [ ] Portfolio read
- [ ] Current prices queried for all assets
- [ ] Query results recorded

## Next Step

-> Proceed to [Step 2: Evaluate Alerts](./step-02-evaluate.md)
