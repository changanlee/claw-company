---
name: step-03-adr
description: "Architecture Decision Records (ADR)"
next-step: ./step-04-infra.md
---

# Step 3: Architecture Decision Records

**Progress: Step 3 of 5** — Next: Infrastructure Strategy

## Objective

Document all key architecture decisions using ADR (Architecture Decision Record) format, ensuring decisions are traceable.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Identify key decisions

From the Step 2 design, identify all architecture decisions that need documentation:

- Architecture style choice (monolith / microservices / serverless)
- Tech stack selection (programming language, framework, database)
- Communication protocol selection
- Authentication/authorization approach
- Deployment strategy selection
- Any other decisions with multiple viable options

### 2. Write ADRs

Use the following format for each decision:

```markdown
### ADR-{number}: {Decision Title}

**Status**: Accepted

**Problem**:
{Description of the problem requiring a decision}

**Options**:
1. {Option A} — {Pros} / {Cons}
2. {Option B} — {Pros} / {Cons}
3. {Option C} — {Pros} / {Cons} (if applicable)

**Decision**:
Choose {Option X}

**Rationale**:
{Why this option was chosen, what factors were considered}

**Consequences**:
- Positive: {Benefits gained}
- Negative: {Costs or limitations incurred}
- Risks: {Potential risks}
```

### 3. Update frontmatter

Add `step-03-adr` to `steps-completed`.

## Completion Criteria

- ✅ All key architecture decisions identified
- ✅ Each decision has a complete ADR (problem/options/decision/rationale/consequences)
- ✅ No contradictions between decisions

## Next Step

After confirming completion criteria are met, read and follow: `./step-04-infra.md`
