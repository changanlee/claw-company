---
name: step-01-analyze
description: "Load documents, analyze test scope and risks"
next-step: ./step-02-design.md
output-file: null
template: null
---

# Step 1: Analyze Test Scope

**Progress: Step 1 of 3** — Next: Design test architecture

## Goal

Load PRD, architecture documents, and Epic files to analyze test scope and perform risk assessment.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Related Documents

Receive file paths provided by CTO at spawn time. Read the following:

- **PRD**: Product requirements document (functional requirements, user stories)
- **Architecture document**: System architecture design (modules, interfaces, dependencies)
- **Epic document**: If available, load the Epic's story breakdown

### 2. Analyze Test Scope

Identify all areas requiring testing:

- **Functional scope**: List all feature points and user scenarios
- **Integration scope**: Identify inter-module interfaces and third-party integration points
- **Boundary scope**: Identify input boundaries, state transitions, error handling

### 3. Risk Assessment

Assess risk for each test scope area:

- **High risk**: Core business logic, payment flows, security-related, complex algorithms
- **Medium risk**: General CRUD, user interactions, state management
- **Low risk**: Static pages, simple configuration, UI styling

### 4. Compile Analysis Results

Consolidate into a structured analysis summary:

- Test scope list (grouped by functional module)
- Risk matrix (impact x probability)
- Priority testing area recommendations

## Completion Criteria

- ✅ All related documents read and parsed
- ✅ Test scope fully identified (functional/integration/boundary)
- ✅ Risk assessment completed (high/medium/low classification)

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-design.md`
