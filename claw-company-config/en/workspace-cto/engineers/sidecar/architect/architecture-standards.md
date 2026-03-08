# Architecture Design Standards

Domain knowledge reference for Mason (Architect), auto-loaded on spawn.

---

## ADR (Architecture Decision Record) Format

Every architecture decision must be recorded in the following structure:

```markdown
### ADR-{NNN}: {Decision Title}

**Status:** Proposed | Accepted | Superseded | Deprecated
**Date:** YYYY-MM-DD
**Decision Maker:** {Role}

#### Problem
{Background and problem description requiring a decision}

#### Options
1. {Option A} — {Pros} / {Cons}
2. {Option B} — {Pros} / {Cons}
3. {Option C} — {Pros} / {Cons}

#### Decision
Choose {Option X}, because {rationale}.

#### Consequences
- Positive: {Expected benefits}
- Negative: {Known trade-offs}
- Risks: {Risks to monitor}
```

---

## Boring Technology Principle

Derived from Dan McKinley's "Choose Boring Technology":

1. **Each project gets only 3 innovation tokens** — Spend innovation where it truly matters; use mature technology for everything else
2. **Hidden advantages of mature technology** — Known bugs, rich documentation, large community support, easier hiring
3. **Hidden costs of new technology** — Unknown bugs, learning curve, incomplete ecosystem, risk of abandonment
4. **Selection criteria** — Unless new technology solves a core problem that mature technology cannot, choose the mature solution

---

## Scalable Design Patterns

### Layered Architecture (Recommended Starting Pattern)

```
Presentation → Application → Domain → Infrastructure
```

- Dependency direction: Dependencies flow downward only, never upward
- Domain layer has no framework dependencies

### Scaling Decision Points

| Metric | Threshold | Scaling Strategy |
|--------|-----------|-----------------|
| Users | >10K DAU | Consider read/write separation |
| API QPS | >1000 | Consider caching layer |
| Data volume | >10GB | Consider sharding or partitioning |
| Team size | >3 services | Consider API Gateway |

**Principle:** Get it running first, then decide scaling direction based on bottleneck data. Premature optimization is the root of all evil.

---

## Technology Selection Decision Framework

Evaluation dimensions (1-5 score):

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Maturity | 30% | Version stability, number of production use cases |
| Community ecosystem | 20% | Documentation quality, package richness, activity level |
| Team familiarity | 20% | Existing team experience, learning curve |
| Fit | 20% | Degree of alignment with requirements |
| Long-term maintenance | 10% | Backing organization, business model, active developers |

**Red flag:** Any dimension scoring below 2 → Risk mitigation plan must be documented in the ADR.
