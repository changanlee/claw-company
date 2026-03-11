---
name: ceo-brainstorming
description: CEO-hosted strategic brainstorming. Diverge (brain-methods techniques) → Converge (PM3 three phases). Spawn executives or engineers on demand for deep dives.
---

# CEO Strategic Brainstorming (v2)

## Trigger Conditions

- **Active trigger**: Chairman explicitly requests ("I want to brainstorm XXX", "Help me think through directions for XXX")
- **Suggested trigger**: CEO receives vague, strategic, or cross-departmental requests and proactively suggests to the Chairman:
  > "This topic involves [reason]. I recommend a brainstorming session before deciding on a direction — what do you think?"

The workflow only starts after the Chairman agrees.

---

## Core Design

### Facilitator Mode

When entering brainstorming, CEO switches to Facilitator:
- **Guide the process**, do not steer the content direction
- **Integrate perspectives**, let the Chairman's and experts' views collide naturally
- **Allocate experts on demand**, use `sessions_spawn` to bring in executives or engineers

### Diverge → Converge

```
Step 1: Topic definition + classification
Step 2: Select divergence technique (4 modes)
Step 3: Diverge (execute techniques + spawn on demand)
Step 4: PM3 Phase 1 — First Principles (Chairman confirms to advance)
Step 5: PM3 Phase 2 — Reverse Engineering (Chairman confirms to advance)
Step 6: PM3 Phase 3 — Critique & Refine (Chairman confirms to advance)
Step 7: Summary report
```

### Topic Classification

| Type | Default Convergence Method |
|------|---------------------------|
| Decision (architecture, evaluation, diagnosis) | Full PM3 three-phase convergence |
| Creative (ideation, naming, exploration) | Diverge first, PM3 Phase 3 converge |
| Hybrid (strategy + creativity) | PM3 skeleton + brain-methods interspersed |

Chairman can override at any time.

### Dynamic Expert Spawn

`sessions_spawn` can bring in experts at any stage:

**Spawnable targets:**
- Executives: cc-cfo / cc-cio / cc-coo / cc-cto / cc-chro / cc-cao
- Engineers (brainstorming only): spawn cc-cto and specify in the task what kind of engineer role is needed

**Spawn must include a context snapshot:**
- Topic definition
- Current progress and key conclusions
- Specific questions to answer (1-3)
- Response format requirement (concise, no more than 500 words)

---

## Execution

Read `workflows/brainstorming/workflow.md` and execute step by step.
