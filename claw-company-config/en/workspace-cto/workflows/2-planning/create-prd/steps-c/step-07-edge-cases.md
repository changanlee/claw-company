---
name: step-07-edge-cases
description: "Edge cases and risks"
next-step: ./step-08-complete.md
---

# Step 7: Edge Cases and Risks

**Progress: Step 7 of 8** — Next: Completion and Output

## Objective

Identify edge cases, error scenarios, and failure modes; conduct risk assessment with mitigation strategies.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Edge cases

Enumerate system edge cases:

- Extreme input values (empty, too long, special characters)
- Concurrent operation conflicts
- Data consistency boundaries
- Timezone / locale / encoding issues

### 2. Error scenarios

Define possible error scenarios:

- External service unavailability (API timeout, third-party failures)
- Data corruption or incompleteness
- User operation errors
- Resource exhaustion (disk, memory, API quota)

### 3. Failure modes

Analyze possible failure modes:

- Single points of failure
- Cascading failure paths
- Data loss risks

### 4. Risk assessment

Build a risk matrix:

| Risk | Likelihood | Impact | Risk Level | Mitigation Strategy |
|------|-----------|--------|------------|-------------------|
| {description} | High/Med/Low | High/Med/Low | {level} | {strategy} |

### 5. Technical constraints

Document known technical constraints:

- Platform limitations
- Third-party service limitations
- Compatibility constraints

### 6. Write to PRD

Write edge cases, error scenarios, failure modes, risk matrix, and technical constraints into the corresponding PRD sections.

### 7. Update PRD frontmatter

Add `step-07-edge-cases` to `steps-completed`.

## Completion Criteria

- ✅ Edge cases identified
- ✅ Error scenarios defined
- ✅ Risk assessment matrix built
- ✅ Each medium/high risk has a mitigation strategy
- ✅ Technical constraints documented
- ✅ PRD updated

## Next Step

After confirming completion criteria are met, read and follow: `./step-08-complete.md`
