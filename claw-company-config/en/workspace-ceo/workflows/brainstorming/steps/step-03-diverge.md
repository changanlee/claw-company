---
name: diverge
description: "Execute divergence techniques + spawn experts on demand for deep dives"
next-step: ./step-04-fp.md
output-file: null
template: null
---

# Step 3: Diverge

**Progress: Step 3 / 7**

## Goal

Execute the selected thinking techniques to expand breadth as much as possible. Spawn experts on demand during this process to provide domain perspectives.

## Execution Rules

- 📖 Read the entire step file before taking any action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps
- ⚡ During the divergence phase, do not judge ideas as good or bad — quantity and diversity are the only goals

## Instructions

### 1. Execute Techniques

For each selected technique (skip this step for Mode 4):

1. Explain the technique's rules and guiding questions to the Chairman (from the CSV's description field).
2. Guide divergent thinking and encourage bold ideas.
3. Run **1-2 rounds** of dialogue per technique.
4. **Anti-bias mechanism**: every 10 ideas, deliberately shift the thinking angle.

### 2. Spawn Experts on Demand

During discussion, spawn experts for targeted deep dives when any of the following situations arise:

**Auto-trigger (CEO's judgment):**

| Trigger Situation | Spawn Target | Agent ID |
|-------------------|-------------|----------|
| Cost or budget estimation involved | CFO | cc-cfo |
| Market trends or investment involved | CIO | cc-cio |
| Schedule or lifestyle impact involved | COO | cc-coo |
| System architecture or technical feasibility involved | CTO or Architect | cc-cto |
| Org design or headcount involved | CHRO | cc-chro |
| Compliance or risk involved | CAO | cc-cao |

**Manual trigger:**
- The Chairman can say at any time "bring XX in" or "ask the CTO"

**Spawn Context Snapshot Format:**

When using `sessions_spawn`, the task prompt must include:

```
## Brainstorming Context

### Topic
[topic definition]

### Current Progress
[summary of key ideas generated so far]

### Questions for You
[1-3 specific questions]

### Response Format
Please answer the questions above directly with your professional analysis. Be concise — no more than 500 words.
```

### 3. Integrate Expert Perspectives

After receiving a spawned expert's response:
1. Integrate their perspective into the discussion.
2. Present to the Chairman: "[Role]'s perspective is [summary], which opens up [new direction for thought]."
3. Continue diverging.

### 4. Record Ideas

Record all generated ideas, grouped by theme. This list will serve as input for the PM3 convergence phase.

## Completion Criteria

- [ ] Selected techniques have been executed (or direct discussion completed)
- [ ] Idea list recorded and grouped by theme
- [ ] Chairman confirms divergence is sufficient and is ready to converge

## Next Step

👉 Go to [Step 4: PM3 — First Principles](./step-04-fp.md)
