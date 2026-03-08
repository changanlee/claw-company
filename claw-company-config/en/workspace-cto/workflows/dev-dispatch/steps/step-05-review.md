---
name: review
description: "Review: Code Review, quality gates, report to CEO"
next-step: null
output-file: output/planning/review-report.md
template: null
---

# Step 5: Review

**Progress: Step 5 of 5**

## Goal

Perform quality review on development output, ensure all quality gates are passed, then compile results and report to CEO.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### Lean Workflow

1. Spawn Code Reviewer engineer (`engineers/code-reviewer.md`).
2. Review results reported directly to Atlas.
3. If Critical issues found: return to developer for fixes, then re-review.
4. Once passed, Atlas compiles results and reports to CEO.

### Full Workflow

1. Spawn Code Reviewer engineer (`engineers/code-reviewer.md`) for first review.
2. Atlas performs **second review**: cross-reference against PRD and technical specification for completeness.
3. If any Critical or Important issues: return for fixes, re-review after fixes.
4. After all issues resolved, Atlas compiles results and reports to CEO.

### Quality Gates

All of the following must be satisfied to pass:

- [ ] All tests pass (zero failures)
- [ ] Code review has no Critical issues
- [ ] Acceptance criteria verified item by item
- [ ] Verification evidence fully attached

### Approval Gates

| Decision Item | Level | Handling |
|--------------|-------|---------|
| PRD Approval | Yellow | Submit to CEO for review |
| Architecture Approval | Yellow | Submit to CEO for review |
| Push to main branch | Red | Escalate to Chairman via CEO |
| Production Deploy | Red | Escalate to Chairman via CEO |

## Completion Criteria

- [ ] Code Review completed (Lean: single review; Full: Code Reviewer + Atlas second review)
- [ ] All Critical issues resolved
- [ ] All quality gates passed
- [ ] Results compiled and reported to CEO

## Next Step

None (workflow complete). After review passes, Atlas reports results to CEO, who decides next actions.
