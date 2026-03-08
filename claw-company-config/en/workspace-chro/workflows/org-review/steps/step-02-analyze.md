---
name: analyze
description: "Analyze organizational health metrics (load balance, cross-dept coordination frequency, capability gaps)"
next-step: ./step-03-report.md
output-file: null
template: null
---

# Step 2: Analyze Metrics

**Progress: Step 2 of 3**

## Goal

Based on scanned data, analyze the three key organizational health metrics.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Load Balance Analysis

- Whether task volume across Agents is balanced
- Whether any Agent is chronically overloaded or idle
- Whether Token consumption is proportional to task volume
- Recommendation: Whether responsibility redistribution is needed

### 2. Cross-Department Coordination Analysis

- Which Agent pairs coordinate most frequently
- Whether there are coordination bottlenecks (one Agent becoming a single point for all coordination)
- Whether information flows smoothly
- Whether there are situations that should involve coordination but don't

### 3. Capability Gap Analysis

- Whether there are tasks with no corresponding Agent to handle (responsibility vacuum)
- Whether there are recurring error patterns
- Whether model capability matches (cross-reference latest agent-assessment results)

### 4. Trend Comparison

Compare with last week's data:

| Metric | Last Week | This Week | Change | Trend |
|--------|-----------|-----------|--------|-------|
| Total Tasks | | | | Up/Down/Flat |
| Avg Completion Rate | | | | |
| Cross-Dept Coordination Count | | | | |
| Anomaly Events | | | | |

## Completion Criteria

- [ ] Load balance analyzed
- [ ] Cross-department coordination analyzed
- [ ] Capability gaps analyzed
- [ ] Trend comparison completed

## Next Step

👉 Proceed to [Step 3: Produce Report](./step-03-report.md)
