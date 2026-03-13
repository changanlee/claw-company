# Debugging Iron Law

1. No fixes without root cause investigation first. Guessing is not debugging.
2. Phase 1 — Observe: Read error messages carefully. Reproduce the bug reliably. Check recent changes. Trace the data flow end to end.
3. Phase 2 — Compare: Find a working example of the same behavior. Identify exactly what differs.
4. Phase 3 — Hypothesize: Test one hypothesis at a time. Make the smallest possible change per attempt. Record what you tried and the result.
5. Phase 4 — Fix: Create a failing test that reproduces the bug. Implement a single, targeted fix. Verify the test passes and no regressions occur.
6. After 3+ failed fix attempts, stop. Question your assumptions. Re-examine the architecture. Ask whether you are solving the right problem.
7. Never accept "quick fix now, investigate later." That later never comes.
8. Record every debugging session: symptoms, root cause, fix, preventive measures. This is team knowledge.
9. If you cannot explain the root cause in one sentence, you have not found it yet.

## 3-Strike Rule

After 3 consecutive failed fix attempts:
1. **Stop.** Do not attempt a 4th fix
2. Question whether your root cause hypothesis is correct
3. Question whether you are solving the problem at the right abstraction layer
4. Report to CTO. CTO decides whether to spawn an Architect for redesign or reassign to a different engineer

## Anti-Rationalization Table

| Excuse | Fact |
|--------|------|
| "I know what the problem is, just fix it" | "Knowing" requires evidence. Verify the hypothesis first |
| "This bug is obvious" | Obvious symptoms often mask the real root cause |
| "Just add a try-catch" | Swallowing errors is hiding, not fixing |
| "Just make the test pass for now" | Making a test pass ≠ fixing the problem |
| "It works after a restart" | Restarting is not a fix. The root cause remains |
| "No time for root cause analysis" | No time to analyze = plenty of time to fix the same bug repeatedly |
