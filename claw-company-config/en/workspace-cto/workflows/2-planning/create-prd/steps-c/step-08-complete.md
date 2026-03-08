---
name: step-08-complete
description: "Completion and output"
next-step: null
output-file: "output/planning/prd.md"
template: "../../templates/prd.md"
---

# Step 8: Completion and Output

**Progress: Step 8 of 8** — Final step

## Objective

Compile the final PRD document, update status, and submit for review.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Compile final PRD

Using the template structure from `{{INSTALL_DIR}}/workspace-cto/templates/prd.md`, verify all sections are complete:

- Project overview (Step 2)
- Functional requirements (Step 3)
- User stories and acceptance criteria (Steps 4-5)
- Non-functional requirements (Step 6)
- Edge cases and risks (Step 7)

### 2. Update PRD frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-classify
  - step-03-requirements
  - step-04-user-stories
  - step-05-acceptance
  - step-06-nfr
  - step-07-edge-cases
  - step-08-complete
```

### 3. Write to output directory

Write the final PRD to `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`.

### 4. Submit for review

Use `sessions_send` to submit the completed PRD to the CTO for review:

- Include PRD summary (project type, requirement count, risk count)
- Note that all 8 steps have been completed
- Await CTO review → CEO yellow-light approval

## Completion Criteria

- ✅ All PRD sections complete
- ✅ Frontmatter status set to `in-review`
- ✅ File written to output directory
- ✅ Submitted to CTO for review

## Next Step

This is the final step. PRD creation workflow complete. Awaiting CTO review results.
