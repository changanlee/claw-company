---
name: step-02-validate
description: "Validate completeness item by item"
next-step: ./step-03-report.md
---

# Step 2: Validate Completeness

**Progress: Step 2 of 3** — Next: Produce report

## Objective

Validate each document item by item for completeness and quality, identifying gaps and risks.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. PRD Validation

Check whether the PRD contains:

- [ ] Project overview (type, domain, complexity)
- [ ] Functional requirements (with priorities)
- [ ] User stories
- [ ] Acceptance criteria (for each feature)
- [ ] Non-functional requirements (performance, security, scalability)
- [ ] Boundary conditions and exclusions
- [ ] Risks and mitigation strategies
- [ ] All sections filled in (no blank placeholders)

### 2. UX Design Validation

Check whether the UX design contains:

- [ ] User journey map
- [ ] Information architecture
- [ ] Core flow diagrams
- [ ] UI component specifications
- [ ] Interaction pattern definitions
- [ ] Responsive design strategy
- [ ] Accessibility standards

### 3. Architecture Document Validation

Check whether the architecture document contains:

- [ ] System boundary definition
- [ ] Component decomposition (with responsibilities and dependencies)
- [ ] Communication protocol definitions
- [ ] Data flow design
- [ ] Data model
- [ ] ADR (Architecture Decision Records)
- [ ] Infrastructure design
- [ ] Deployment strategy
- [ ] Security strategy
- [ ] Performance strategy

### 4. Epic/Story Validation

Check whether Epic/Stories comply with:

- [ ] Each Epic has a clear goal and scope
- [ ] Each Story satisfies INVEST principles
- [ ] Acceptance criteria use Given-When-Then format
- [ ] Stories cover all PRD functional requirements
- [ ] Dependencies marked
- [ ] Effort estimated

### 5. Cross-Document Consistency

- [ ] PRD requirements ↔ Story coverage = 100%
- [ ] Architecture components ↔ Story-involved components are consistent
- [ ] UX flows ↔ Story functionality is consistent
- [ ] Non-functional requirements ↔ Architecture strategies are consistent

### 6. Record Validation Results

Mark each check item: ✅ Pass / ⚠️ Partial Pass / ❌ Fail, with explanations.

## Completion Criteria

- ✅ All sections of all documents checked item by item
- ✅ Cross-document consistency verified
- ✅ Validation results recorded

## Next Step

After confirming all completion criteria are met, read and follow: `./step-03-report.md`
