---
name: step-04-complete
description: "Final review and submission"
next-step: null
output-file: "output/planning/product-brief.md"
template: "../../../templates/product-brief.md"
---

# Step 4: Final Review and Submission

**Progress: Step 4 of 4** — Final step

## Objective

Perform final review of the product brief, ensure quality and completeness, write to output directory, and submit for CTO review.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Final quality review

Review the product brief item by item:

- Is the vision statement clear and inspiring?
- Is the problem statement specific and convincing?
- Are target users clearly defined and verifiable?
- Does the solution directly address the problem?
- Is the value proposition consistent with the differentiation strategy?
- Are success metrics quantifiable?

### 2. Update frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-discovery
  - step-03-draft
  - step-04-complete
```

### 3. Write to output directory

Write the final product brief to `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md`.

### 4. Submit for review

Via `announce`, submit the completed product brief to CTO for review:

- Include product brief summary (vision, target users, core value proposition)
- State that all 4 steps have been completed
- Await CTO review → CEO yellow-light approval

## Completion Criteria

- ✅ All product brief sections complete and quality-assured
- ✅ Frontmatter status is `in-review`
- ✅ File written to output directory
- ✅ Submitted to CTO for review

## Next Step

This is the final step. Product brief creation workflow complete. Awaiting CTO review results.
