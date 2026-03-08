---
name: step-03-stories
description: "Break down Stories for each Epic (INVEST principles)"
next-step: ./step-04-complete.md
---

# Step 3: Break Down User Stories

**Progress: Step 3 of 4** — Next: Final output

## Objective

Break down User Stories for each Epic, following INVEST principles and defining acceptance criteria.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. INVEST Principle Check

Each Story must satisfy the INVEST principles:

- **I**ndependent — Can be developed and delivered independently
- **N**egotiable — Details can be discussed and adjusted
- **V**aluable — Delivers value to users or the business
- **E**stimable — Effort can be estimated
- **S**mall — Small enough (completable within 1 Sprint)
- **T**estable — Has clear acceptance tests

### 2. Write User Stories

Use the following format for each Story within each Epic:

```markdown
### Story-{EpicNumber}.{StoryNumber}: {Name}

**User Story**:
As a {role}, I want {feature}, so that {value}

**Acceptance Criteria**:
- [ ] Given {precondition}, When {action}, Then {result}
- [ ] Given {precondition}, When {action}, Then {result}

**Task Breakdown**:
1. {Technical task 1}
2. {Technical task 2}
3. {Technical task 3}

**Estimate**: {Story Points or time}
**Dependencies**: {Prerequisite Story or none}
```

### 3. Story Quality Check

Check each Story:

- Is the user story written from the user's perspective?
- Do acceptance criteria use Given-When-Then format?
- Can acceptance criteria be automated for testing?
- Does the task breakdown cover frontend + backend + testing?
- Is the estimate reasonable (not exceeding 1 Sprint)?

### 4. Cross-Validation

- Do all Story acceptance criteria combined cover all PRD requirements?
- Are there any PRD requirements not covered by any Story?
- Does every component in the architecture document have at least one Story involving it?

## Completion Criteria

- ✅ Each Epic has corresponding Stories
- ✅ All Stories satisfy INVEST principles
- ✅ Acceptance criteria use Given-When-Then format
- ✅ PRD requirements are fully covered

## Next Step

After confirming all completion criteria are met, read and follow: `./step-04-complete.md`
