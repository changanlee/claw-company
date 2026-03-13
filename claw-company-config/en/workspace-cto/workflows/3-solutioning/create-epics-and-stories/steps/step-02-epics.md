---
name: step-02-epics
description: "Break down into Epics"
next-step: ./step-03-stories.md
---

# Step 2: Break Down Epics

**Progress: Step 2 of 4** — Next: Break down Stories

## Objective

Break down the feature map into Epics, each with an independent goal and scope.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. Define Epic Breakdown Principles

- Each Epic represents an independently deliverable functional module
- Epic scope is moderate (completable in 1-3 Sprints)
- Minimize dependencies between Epics
- Orient around user value, not technical layers

### 2. Break Down Epics

Define each Epic as follows:

```markdown
## Epic-{number}: {Name}

**Goal**: {What this Epic aims to achieve}
**Scope**: {What is included, what is excluded}
**Dependencies**: {Prerequisite Epics or external dependencies}
**Priority**: P0 (Must) / P1 (Should) / P2 (Could)
**Estimate**: {Approximate number of Sprints}
**Components Involved**: {Which architectural components}
```

### 3. Ordering & Dependency Graph

- Establish Epic execution order (considering dependencies)
- Identify Epics that can be executed in parallel
- Mark Epics on the critical path

### 4. Confirm with CTO

Submit the Epic breakdown to CTO via `announce` and await confirmation.

## Completion Criteria

- ✅ All features assigned to Epics
- ✅ Each Epic has a clear goal and scope
- ✅ Dependencies marked
- ✅ Priorities ordered
- ✅ CTO has confirmed the breakdown

## Next Step

After confirming all completion criteria are met, read and follow: `./step-03-stories.md`
