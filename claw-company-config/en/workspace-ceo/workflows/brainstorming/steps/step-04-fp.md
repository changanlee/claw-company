---
name: first-principles
description: "PM3 Phase 1: Break down to basic facts and core constraints"
next-step: ./step-05-re.md
output-file: null
template: null
---

# Step 4: PM3 — First Principles

**Progress: Step 4 / 7**

## 📌 Phase 1 — First Principles

## Goal

From the idea list produced in the divergence phase, break everything down to the most fundamental facts and constraints, eliminating assumptions.

## Execution Rules

- 📖 Read the entire step file before taking any action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- 🔒 Do not advance to the next step until the Chairman confirms

## Instructions

### 1. Review Divergence Results

Present a summary of the Step 3 idea list to the Chairman and confirm these are the inputs for convergence.

### 2. Break Down Basic Facts

Guiding questions (discuss each with the Chairman in turn):

- "What is the **essence** of this topic?"
- "What are **facts** and what are **assumptions**?"
- "If we were designing from scratch, what is **non-negotiable**?"
- "Which constraints are **genuine hard limits**, and which are just conventions?"

### 3. Spawn Experts on Demand

Same spawn mechanism as Step 3 — when a question requires domain depth, use `sessions_spawn` + context snapshot to bring in an expert.

### 4. Produce the Facts List

Organize into a structured list:

```
## Basic Facts and Core Constraints

### Facts (verified)
- F1: [fact]
- F2: [fact]

### Constraints (hard limits)
- C1: [constraint]
- C2: [constraint]

### Assumptions (to be verified)
- A1: [assumption] — Verification method: [how to verify]
```

### 5. Confirm Advancement

Present the list to the Chairman and confirm:
> Phase 1 breakdown complete. Facts list above — are you satisfied? Confirm to proceed to Phase 2 Reverse Engineering.

## Completion Criteria

- [ ] Basic facts have been identified
- [ ] Facts, constraints, and assumptions are distinguished
- [ ] Chairman confirmed to advance

## Next Step

👉 Go to [Step 5: PM3 — Reverse Engineering](./step-05-re.md)
