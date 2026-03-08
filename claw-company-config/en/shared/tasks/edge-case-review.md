# Edge Case Hunter

## Purpose

Systematically walk through every branch path and boundary condition to find **unhandled** edge cases. Unlike adversarial review — this is method-driven line-by-line checking, not attitude-driven critique.

## How to Execute

1. **Identify all branches** — List every decision point, conditional check, and classification in the content.

2. **Check each boundary** — For each branch, ask:
   - What happens when input is empty/null?
   - What happens with extremely large/small values?
   - What happens with malformed input?
   - What happens when multiple conditions trigger simultaneously?
   - Timing issues: What happens with different event ordering?
   - Concurrency issues: What happens when multiple agents operate at the same time?
   - Resource issues: What happens when tokens run out / file does not exist / network disconnects?

3. **Only report unhandled cases** — Boundary conditions that already have handling mechanisms do not need to be reported.

4. **Produce a report** — Format:

```markdown
## Edge Case Review Report

**Subject:** {filename or description}
**Reviewer:** {Agent name}

### Unhandled Edge Cases

| # | Branch Point | Edge Case | Potential Impact | Suggested Handling |
|---|-------------|-----------|------------------|-------------------|
| 1 | {location} | {condition} | {impact} | {suggestion} |
```

## Guidelines

- Focus on **unhandled** edge cases — do not report ones that are already handled
- Orthogonal to adversarial review — this is method-driven, not attitude-driven
