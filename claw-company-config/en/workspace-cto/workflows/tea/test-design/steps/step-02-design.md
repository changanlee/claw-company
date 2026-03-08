---
name: step-02-design
description: "Design test architecture and coverage strategy"
next-step: ./step-03-document.md
output-file: null
template: null
---

# Step 2: Design Test Architecture

**Progress: Step 2 of 3** — Next: Produce test plan document

## Goal

Based on analysis results, design the test architecture including test pyramid ratios, framework selection, and coverage strategy.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Design Test Pyramid

Determine test ratios based on project characteristics:

- **Unit tests**: Core logic, utility functions, data transformations (highest proportion)
- **Integration tests**: API endpoints, database operations, service-to-service communication
- **E2E tests**: Critical user journeys, payment flows, registration/login (lowest proportion)
- Specify target test count for each layer

### 2. Select Test Frameworks

Recommend test frameworks based on the project tech stack:

- **Unit/Integration**: Jest / Vitest / Mocha / pytest / JUnit etc.
- **E2E**: Playwright / Cypress / Selenium etc.
- **API**: Supertest / REST Assured / httpx etc.
- Explain selection rationale (community support, learning curve, project fit)

### 3. Define Coverage Strategy

- **Coverage targets**: Overall targets and per-module targets
- **Priority coverage areas**: High-risk areas first (referencing Step 1 risk assessment)
- **Exclusions**: Areas not requiring testing (third-party packages, auto-generated code)
- **Coverage types**: Line coverage, branch coverage, function coverage

### 4. Define Test Environment

- Test data strategy (fixtures / factories / seeds)
- Mock strategy (which dependencies need mocking)
- Test environment configuration (env vars, database, external services)

## Completion Criteria

- ✅ Test pyramid ratios determined
- ✅ Test frameworks selected (with rationale)
- ✅ Coverage strategy defined (targets, priorities, exclusions)
- ✅ Test environment requirements defined

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-document.md`
