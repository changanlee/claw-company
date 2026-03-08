---
name: step-05-complete
description: "Output architecture document, submit for CTO review"
next-step: null
output-file: "output/planning/architecture.md"
template: "../../../templates/architecture.md"
---

# Step 5: Final Output and Submission

**Progress: Step 5 of 5** — Final step

## Objective

Compile the final architecture document, ensure completeness and consistency, and submit for CTO review.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Compile final architecture document

Using the structure from template `{{INSTALL_DIR}}/workspace-cto/templates/architecture.md`, confirm all sections are complete:

- System architecture design (Step 2)
- Architecture decision records (Step 3)
- Infrastructure and deployment strategy (Step 4)

### 2. Consistency check

- Does the architecture design satisfy all non-functional requirements?
- Are ADR decisions consistent with the design?
- Does the infrastructure support the chosen architecture style?
- Does the security strategy cover all sensitive data flows?
- Is the performance strategy targeted at bottlenecks?

### 3. Update frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-design
  - step-03-adr
  - step-04-infra
  - step-05-complete
```

### 4. Write to output directory

Write the final architecture document to `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md`.

### 5. Submit for review

Via `sessions_send`, submit the completed architecture document to CTO for review:

- Include architecture summary (architecture style, number of core components, number of ADRs)
- Highlight decisions requiring special CTO attention
- State that all 5 steps have been completed
- Await CTO review → CEO yellow-light approval

## Completion Criteria

- ✅ Architecture document all sections complete
- ✅ Consistency check passed
- ✅ Frontmatter status is `in-review`
- ✅ File written to output directory
- ✅ Submitted to CTO for review

## Next Step

This is the final step. Architecture design workflow complete. Awaiting CTO review results.
