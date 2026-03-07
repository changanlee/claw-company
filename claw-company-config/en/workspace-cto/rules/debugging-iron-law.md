# Debugging Iron Law

1. No fixes without root cause investigation first. Guessing is not debugging.
2. Phase 1 — Observe: Read error messages carefully. Reproduce the bug reliably. Check recent changes. Trace the data flow end to end.
3. Phase 2 — Compare: Find a working example of the same behavior. Identify exactly what differs.
4. Phase 3 — Hypothesize: Test one hypothesis at a time. Make the smallest possible change per attempt. Record what you tried and the result.
5. Phase 4 — Fix: Create a failing test that reproduces the bug. Implement a single, targeted fix. Verify the test passes and no regressions occur.
6. After 3+ failed fix attempts, stop. Question your assumptions. Re-examine the architecture. Ask whether you are solving the right problem.
7. Never accept "quick fix now, investigate later." That later never comes.
8. If you cannot explain the root cause in one sentence, you have not found it yet.
