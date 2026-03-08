---
name: step-01-select
description: "Select test framework based on tech stack"
next-step: ./step-02-setup.md
output-file: null
template: null
---

# Step 1: Select Test Framework

**Progress: Step 1 of 3** — Next: Install and configure test framework

## Goal

Select the most suitable test framework based on the project's tech stack and requirements.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Analyze Project Tech Stack

Identify the following:

- **Programming language**: TypeScript / JavaScript / Python / Go etc.
- **Frontend framework**: React / Vue / Svelte / Next.js etc.
- **Backend framework**: Express / NestJS / FastAPI / Gin etc.
- **Build tools**: Vite / Webpack / esbuild etc.
- **Package manager**: npm / pnpm / yarn / pip etc.

### 2. Evaluate Framework Options

List candidate frameworks based on tech stack:

**Unit/Integration testing:**
- Node.js: Jest / Vitest / Mocha + Chai
- Python: pytest / unittest
- Go: testing (stdlib) + testify

**E2E testing:**
- Web: Playwright / Cypress / Selenium
- API: Supertest / REST Assured / httpx

**Performance testing (if needed):**
- k6 / Artillery / Locust

### 3. Selection Decision

Select frameworks based on the following criteria:

- **Technical fit**: Integration level with the project tech stack
- **Community support**: Documentation quality, community activity, update frequency
- **Learning curve**: Ease of adoption by the team (Agents)
- **Feature completeness**: Coverage reports, watch mode, parallel execution
- **Performance**: Test execution speed

### 4. Record Decision

Document the selected frameworks and rationale:

- Selected framework names and versions
- Selection rationale (advantages)
- Known limitations
- Alternative options

## Completion Criteria

- ✅ Project tech stack analyzed
- ✅ Framework candidates evaluated
- ✅ Final frameworks selected (with decision rationale)

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-setup.md`
