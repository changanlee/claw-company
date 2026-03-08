---
name: step-02-classify
description: "Project classification"
next-step: ./step-03-requirements.md
---

# Step 2: Project Classification

**Progress: Step 2 of 8** — Next: Core Requirements

## Objective

Analyze input data to classify the project and determine development direction.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Analyze inputs and classify

Analyze the following dimensions based on input data:

- **Project type**: Web app / Mobile app / API service / CLI tool / Data pipeline / Other
- **Domain**: FinTech / Life management / Developer tools / Other
- **Complexity**: Low (1-2 weeks) / Medium (2-4 weeks) / High (4+ weeks)

### 2. Determine Greenfield vs Brownfield

- **Greenfield (new project)**: Building from scratch
- **Brownfield (existing system)**: Extending or modifying an existing system

### 3. Confirm classification

Write classification results into the PRD "Project Overview" section, and use `sessions_send` to confirm the classification with the CTO.

Wait for CTO confirmation before proceeding.

### 4. Update PRD frontmatter

Add `step-02-classify` to `steps-completed`.

## Completion Criteria

- ✅ Project type, domain, and complexity classified
- ✅ Greenfield / Brownfield determined
- ✅ CTO has confirmed classification
- ✅ PRD frontmatter updated

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-requirements.md`
