# PRD Writing Standards

Domain knowledge reference for Reed (PM), auto-loaded on spawn.

---

## Jobs-to-be-Done Framework

Every requirement should be able to answer:

> When {situation}, {user role} wants to {action}, so that {expected outcome}.

### JTBD Levels

| Level | Description | Example |
|-------|-------------|---------|
| Functional | The specific task the user wants to accomplish | "Log into the system quickly" |
| Emotional | The feeling the user wants to have | "Don't want to remember complex passwords" |
| Social | How the user wants to be perceived | "Appear technically proficient" |

**Application in PRD:** Each functional requirement must map to at least one functional JTBD. High-priority features should also address the emotional level.

---

## User Story Format

### Standard Format

```
As a {user role},
I want {feature description},
So that {business value / user value}.
```

### Acceptance Criteria Format (Given-When-Then)

```
Scenario: {Scenario name}
  Given {precondition}
  When {trigger action}
  Then {expected result}
```

### Acceptance Criteria Testability Checklist

Every acceptance criterion must pass the following checks:

- [ ] **Clarity:** Is there only one interpretation? (No vague terms like "appropriate" or "reasonable")
- [ ] **Observability:** Can the result be externally observed or measured?
- [ ] **Boundary conditions:** Are edge cases defined (null values, extreme values, concurrency)?
- [ ] **Error paths:** Is expected behavior for error cases defined?
- [ ] **Automatable:** Can it be converted into an automated test?

**Red flag terms** (must be revised when found):
- "should" → Change to "must" or remove
- "fast" → Change to a specific value (e.g., <200ms)
- "friendly" → Change to specific UI behavior description
- "etc." → List the complete set

---

## PRD Structure Requirements

### Required Sections

| Section | Required | Description |
|---------|----------|-------------|
| Executive Summary | Yes | One paragraph stating product goal and value |
| User Personas | Yes | Primary user personas (including pain points and goals) |
| Functional Requirements | Yes | Sorted by priority, each with acceptance criteria |
| Non-functional Requirements | Yes | Performance, security, usability, etc. |
| Success Metrics | Yes | Quantifiable KPIs |
| Scope Definition | Yes | Explicitly list "Out of Scope" items |
| User Journeys | Optional | Step-by-step description of main flows |
| Competitive Analysis | Optional | Comparison with existing market solutions |

### Priority Framework (MoSCoW)

| Level | Definition | PRD Label |
|-------|------------|-----------|
| Must Have | Cannot launch without it | P0 |
| Should Have | Important but can be deferred | P1 |
| Could Have | Nice to have | P2 |
| Won't Have | Explicitly not doing | Out of Scope |

---

## PRD Quality Self-Check

After completing a PRD, the PM should verify each item:

1. Every functional requirement has at least one Given-When-Then acceptance criterion
2. All acceptance criteria pass the "Testability Checklist"
3. Non-functional requirements have specific values (not "fast" but "<200ms")
4. The Out of Scope section is not empty
5. Success metrics are quantifiable and have baseline comparisons
6. User personas are based on research or interviews, not assumptions
