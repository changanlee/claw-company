---
name: analyze
description: "Comparative analysis (performance, cost, context length)"
next-step: ./step-03-propose.md
output-file: null
template: null
---

# Step 2: Comparative Analysis

**Progress: Step 2 of 4**

## Goal

Perform multi-dimensional comparative analysis between current and candidate models.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Compile Current Configuration

Read current model configuration from `{{INSTALL_DIR}}/openclaw.json`:

| Agent | Model Alias | Actual Model | Monthly Avg Tokens | Monthly Avg Cost |
|-------|------------|-------------|-------------------|-----------------|
| CEO | smart | | | |
| CFO | smart | | | |
| CIO | smart | | | |
| COO | fast | | | |
| CTO | smart | | | |
| CAO | smart | | | |
| CTO-Sub | fast | | | |

### 2. Candidate Model Evaluation

Evaluate each candidate model on:

- **Performance**: Response quality, reasoning capability, instruction following
- **Cost**: Price per million tokens (input/output)
- **Context Length**: Maximum context window
- **Speed**: Response latency (first token, full response)
- **Reliability**: API stability, rate limits

### 3. Comparison Matrix

| Dimension | Current Model | Candidate A | Candidate B | Weight |
|-----------|-------------|------------|------------|--------|
| Performance | | | | 40% |
| Cost | | | | 25% |
| Context | | | | 15% |
| Speed | | | | 10% |
| Reliability | | | | 10% |
| **Weighted Total** | | | | |

### 4. Cost Impact Estimate

- Monthly cost change (upgrade/downgrade)
- Annualized cost impact
- Percentage impact on total budget

## Completion Criteria

- [ ] Current configuration compiled
- [ ] Candidate models evaluated
- [ ] Comparison matrix completed
- [ ] Cost impact estimated

## Next Step

👉 Proceed to [Step 3: Produce Proposal](./step-03-propose.md)
