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
