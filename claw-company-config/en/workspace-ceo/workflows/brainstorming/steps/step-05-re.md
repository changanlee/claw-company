---
name: reverse-engineering
description: "PM3 Phase 2: Break down current state, feasibility, dependencies, and risks"
next-step: ./step-06-cr.md
output-file: null
template: null
---

# Step 5: PM3 — Reverse Engineering

**Progress: Step 5 / 7**

## 📌 Phase 2 — Reverse Engineering

## Goal

Break down the existing implementation (or target state) to understand why each component exists and how they interact.

## Execution Rules

- 📖 Read the entire step file before taking any action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- 🔒 Do not advance to the next step until the Chairman confirms

## Instructions

### 1. Break Down the Current State

Guiding questions (discuss each with the Chairman in turn):

- "How does it **work** right now?"
- "**Why** is each part designed this way?"
- "What **hidden dependencies** or side effects are there?"
- "Which parts, if removed, would cause the whole thing to **collapse**?"

### 2. Spawn Experts on Demand

When technical details or domain knowledge are needed, use `sessions_spawn` + context snapshot to bring in an expert.

This phase is especially suited for spawning:
- **CTO / Architect** — technical feasibility, system dependency analysis
- **CFO** — cost structure breakdown
- **Analyst** — current market research

### 3. Produce the Breakdown Diagram

Organize into a structured analysis:

```
## Current State Breakdown

| Component | Why It Exists | Dependencies | Risks |
|-----------|--------------|--------------|-------|
| [Component 1] | [why it exists] | [depends on what] | [possible issues] |
| [Component 2] | ... | ... | ... |

### Key Findings
- [Finding 1]
- [Finding 2]
```

### 4. Confirm Advancement

Present the analysis to the Chairman and confirm:
> Phase 2 breakdown complete. Current state analysis above — are you satisfied? Confirm to proceed to Phase 3 Critique & Refine.

## Completion Criteria

- [ ] Current state or target state has been broken down
- [ ] Each component's reason for existence and dependencies are clear
- [ ] Chairman confirmed to advance

## Next Step

👉 Go to [Step 6: PM3 — Critique & Refine](./step-06-cr.md)
