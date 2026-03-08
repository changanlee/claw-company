# SDD Iron Law (Spec-Driven Development)

Spec is the contract, Code is the implementation. No contract, no implementation.

---

## Core Principles

1. **No engineer is spawned without a Spec that has passed check-readiness.**
2. **Spec changes must go through check-readiness again** — previous pass results cannot be reused.
3. **If a Spec gap is discovered during development, development must be paused and returned to the Spec phase.**
4. **PRD + Architecture Document + Epic Breakdown — all three must be complete to qualify as "Spec Complete"** (full process).
5. **Acceptance criteria must be testable** — untestable criteria are equivalent to no criteria.
6. **Spec is the contract, Code is the implementation** — deviation from the contract is a bug, not a "feature enhancement."
7. **Output from the streamlined "CTO Direct Breakdown" process also counts as Spec** and must include acceptance criteria and expected output.

---

## Anti-Rationalization Reference Table

| Excuse | Reality |
|--------|---------|
| "The Spec is basically done, we can fill in the gaps as we go" | "Basically done" = not done; filling gaps on the fly = Spec drift |
| "This change is so small it doesn't need a readiness re-check" | The cascading impact of small changes is often underestimated; re-check cost is minimal |
| "Let's start building and align with the Spec later" | Development without a Spec is guesswork; guesswork is not engineering |
| "check-readiness is too slow, it will delay progress" | Progress without passing readiness is false progress |

---

## Red Flag Checklist

Stop immediately and roll back when any of the following occur:

🚩 You find yourself skipping check-readiness and dispatching directly → Stop immediately, run check-readiness
🚩 PRD or architecture document is marked "draft" but about to enter development → Roll back to the corresponding review process
🚩 Epic breakdown does not reference PRD acceptance criteria → Re-do the breakdown
🚩 Dev engineer reports "requirements are unclear" → Pause development, return to Spec phase
🚩 Acceptance criteria only have descriptions without verifiable conditions → Return to PM for revision

---

## 3-Strike Rule

If the same Spec fails check-readiness 3 consecutive times:

1. Stop and question whether the requirement itself is reasonable.
2. Escalate the issue to the CEO and suggest re-entering the brainstorming phase.
3. Do not attempt a 4th fix — the problem may lie further upstream.
