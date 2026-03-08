---
name: detect
description: "Detect: Detect Token consumption anomalies and abnormal spawn behavior"
next-step: ./step-02-freeze.md
output-file: null
template: null
---

# Step 1: Detect

**Progress: Step 1 of 3**

## Goal

Detect whether budget consumption anomalies or abnormal spawn behavior exist.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Check Trigger Conditions

Determine if any of the following conditions are met:

**Condition A — Single Agent daily consumption too high:**
- Any Agent's daily Token consumption exceeds 10% of its monthly budget
- Check method: read Token consumption data from CFO or query CFO

**Condition B — Company-wide daily consumption too high:**
- Company-wide daily Token consumption exceeds 5% of monthly budget
- Check method: sum all Agents' daily consumption

**Condition C — Abnormal spawn behavior:**
- Large number of Sub-Agent spawns in short time (e.g., >10 spawns in 1 hour)
- Repeated spawning of the same Sub-Agent type
- Spawn then immediately destroy then re-spawn (infinite loop signs)

### 2. Identify Suspect Agent

Confirm which Agent(s) triggered the anomaly:
- Agent name
- Anomaly type (A/B/C)
- Anomaly values (actual consumption vs. threshold)

### 3. Assess Urgency

- **Immediate freeze**: exceeds threshold by 2x or more, or consumption is ongoing
- **Observational freeze**: just reached threshold, may be legitimate use

If no trigger conditions are met → end workflow silently.

## Completion Criteria

- [ ] Checked all trigger conditions
- [ ] Identified suspect Agent(s) (if any)
- [ ] Assessed urgency level

## Next Step

👉 Proceed to [Step 2: Freeze](./step-02-freeze.md)
