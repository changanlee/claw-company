---
name: step-05-acceptance
description: "Acceptance criteria"
next-step: ./step-06-nfr.md
---

# Step 5: Acceptance Criteria

**Progress: Step 5 of 8** — Next: Non-Functional Requirements

## Objective

Define clear acceptance criteria for each user story, including boundary conditions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Define acceptance criteria

Write acceptance criteria for each user story using the Given/When/Then format:

```
Given {precondition},
When {trigger action},
Then {expected result}.
```

### 2. Include boundary conditions

Each acceptance criterion should consider at least:

- **Happy path**: Standard operation flow
- **Boundary values**: Extreme inputs, empty values, min/max values
- **Error path**: Invalid inputs, insufficient permissions, network failures

### 3. Write to PRD

Write the acceptance criteria into the PRD, attached beneath each corresponding user story.

### 4. Update PRD frontmatter

Add `step-05-acceptance` to `steps-completed`.

## Completion Criteria

- ✅ Each user story has at least one set of acceptance criteria
- ✅ Acceptance criteria use Given/When/Then format
- ✅ Boundary conditions considered
- ✅ PRD updated

## Next Step

After confirming completion criteria are met, read and follow: `./step-06-nfr.md`
