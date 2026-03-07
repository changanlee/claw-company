# Engineer Report Template

All engineers (Sub-Agents) must report results to CTO using the following format upon task completion.

## Report Format

```
## Task Result

- Status: Success / Partial Success / Failure
- Summary: <one-sentence description of what was accomplished>
- Deliverables: <PR link / file list / document link>

## Problems Encountered

- <Problem 1 description + how it was resolved>
- <Problem 2 description + how it was resolved>
- (Write "None" if no problems)

## Lessons and Recommendations

- <Notable technical discoveries, patterns, or pitfalls>
- <Recommendations for similar future tasks>
- (Write "None" if nothing to note)

## Test Verification

- Test status: Passed / Partially Passed / Not Tested
- Test coverage: <describe what was tested>
- Uncovered items: <describe untested portions and reasons>

## Resource Consumption

- Estimated token consumption: Low / Medium / High
- Follow-up work needed: Yes / No
- Follow-up description: <if applicable>
```

## CTO Processing After Receiving Report

1. Review deliverable quality
2. Extract lessons → Write to CTO's MEMORY.md (if long-term pattern)
3. Update status.md task status
4. Record in memory/YYYY-MM-DD.md daily log
5. Distill summary → Report to CEO
6. If security issues are involved → Notify CAO
