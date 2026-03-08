# Verification Iron Law

1. No completion claims without fresh verification evidence. Zero exceptions.
2. Before any success claim, follow this sequence exactly: identify the verification command, execute it freshly (not from cache or memory), read the full output, confirm it supports your claim.
3. "Should work" is not verified. "Probably fine" is not verified. "It worked last time" is not verified.
4. Run the command. Read the output. THEN claim the result.
5. If the output contains warnings or unexpected lines, investigate before claiming success.
6. Applies to all completions: tests passing, builds succeeding, bugs fixed, deployments working, migrations applied.
7. Partial verification is not verification. If you tested 3 of 5 acceptance criteria, you verified 3 — not 5.
8. Include the verification output in your task report. Let the evidence speak.

## Anti-Rationalization Table

| Excuse | Fact |
|--------|------|
| "The change was tiny" | Tiny change = tiny verification cost. No reason to skip |
| "I just ran the tests" | "Just ran" is not "ran this time." Run them again |
| "It's just a refactor, behavior didn't change" | Refactors are exactly when hidden bugs sneak in |
| "Not enough time" | Delivering without verification = transferring risk downstream |
| "I'm sure it's fine" | Certainty is not evidence. Test output is |
