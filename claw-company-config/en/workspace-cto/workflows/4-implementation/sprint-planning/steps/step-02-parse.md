---
name: step-02-parse
description: "Parse Epics → Stories, build complete list"
next-step: ./step-03-generate.md
output-file: null
template: null
---

# Step 2: Parse Story List

**Progress: Step 2 of 4** — Next: Generate Sprint status document

## Goal

Parse Stories from all Epics and build a complete Sprint backlog list.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Parse Stories from Each Epic

Parse each Epic and extract the following information:

- **Story title**: Concise description
- **Story description**: Feature requirement summary
- **Acceptance criteria count**: Total number of conditions
- **Estimated size**: Small / Medium / Large (if noted in Epic)
- **Dependencies**: Whether it depends on other Stories

### 2. Ordering and Priority

Order Stories based on the following factors:

- Priority defined in the Epic
- Dependencies between Stories (dependencies first)
- Estimated size (prioritize high-value small tasks)

### 3. Build Complete List

Integrate Stories from all Epics into a unified backlog list:

- Tag each Story with its source Epic
- Set initial status to `backlog`
- Tag dependencies

## Completion Criteria

- ✅ All Stories from all Epics parsed
- ✅ Stories ordered and prioritized
- ✅ Dependencies identified
- ✅ Unified backlog list built

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-generate.md`
