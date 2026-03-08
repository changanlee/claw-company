---
name: step-01-check
description: "Load and verify item by item"
next-step: ./step-02-assess.md
---

# Step 1: Load and Verify Item by Item

**Progress: Step 1 of 3** — Next: Quality Assessment

## Objective

Load the PRD and validation checklist, verify each section for completeness and quality.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Load PRD

Read `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`.

If the CTO specified a different path, use the specified path.

### 2. Verify item by item

Check each item against the following checklist:

**Project Overview**
- [ ] Project type classified
- [ ] Complexity assessed
- [ ] Greenfield / Brownfield determined

**Functional Requirements**
- [ ] Requirements structured into feature groups
- [ ] Each requirement has MoSCoW priority
- [ ] Must-level requirements are clear and reasonable

**User Stories**
- [ ] Each Must/Should requirement has a corresponding user story
- [ ] Stories use As a / I want / So that format
- [ ] Stories meet INVEST principles

**Acceptance Criteria**
- [ ] Each user story has acceptance criteria
- [ ] Uses Given/When/Then format
- [ ] Includes happy path and boundary conditions

**Non-Functional Requirements**
- [ ] Performance requirements have measurable metrics
- [ ] Security requirements defined
- [ ] Availability targets set

**Edge Cases and Risks**
- [ ] Edge cases identified
- [ ] Risk matrix established
- [ ] Medium/high risks have mitigation strategies

### 3. Additional quality checks

- [ ] Are requirements testable? (Can test cases be derived directly from requirements?)
- [ ] Are acceptance criteria specific enough? (No vague terms like "fast", "user-friendly")
- [ ] Are NFRs measurable? (Have concrete numbers, not descriptions like "high performance")

## Completion Criteria

- ✅ PRD fully loaded
- ✅ All verification items checked one by one

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-assess.md`
