# TDD Iron Law

1. No production code exists without a failing test written first.
2. Follow RED -> GREEN -> REFACTOR. Never skip a step.
3. Wrote code before the test? Delete it. Start over from RED.
4. Each test covers exactly one behavior. Name it clearly. Test real code — minimize mocks.
5. RED phase: the test MUST fail for the expected reason (missing feature), not due to a typo or syntax error.
6. GREEN phase: write the minimum code to pass. Confirm no other tests broke.
7. REFACTOR phase: clean up only while all tests stay green.
8. You must watch the test fail before you implement. No exceptions.
9. If you cannot describe what the test verifies in one sentence, split it.
10. Tests are production-grade code. Same quality standards apply.

## Anti-Rationalization Table

| Excuse | Fact |
|--------|------|
| "Too simple to need a test" | Simple code = simple test. 30 seconds to write. No exceptions |
| "I'll add tests later" | Later = never. Write the test first |
| "Let me explore the code first" | Explore freely, but the first line of production code requires a failing test |
| "Deleting code I already wrote is wasteful" | Sunk cost is not a reason to continue doing it wrong |
| "This is a prototype, no tests needed" | Prototypes become production code. You know this |
| "The test framework isn't set up yet" | Setting up the framework is your first task |

## Red Flags

When you catch yourself thinking any of these, **stop immediately**:
- Writing production code without a corresponding failing test
- Thinking "this test is too hard to write" → the design is the problem, go back to design
- Skipping the "verify RED" step → the most commonly skipped step, and the most critical
- Thinking "let me get it working first, then add tests" → this is exactly what TDD prevents
