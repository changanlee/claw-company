---
name: step-04-complete
description: "Final UX design document output, submit for CTO review"
next-step: null
output-file: "output/planning/ux-design.md"
template: "../../../templates/ux-design.md"
---

# Step 4: Final Output and Submission

**Progress: Step 4 of 4** — Final step

## Objective

Compile the final UX design document, ensure completeness, and submit for CTO review.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Compile final UX design document

Using the structure from template `{{INSTALL_DIR}}/workspace-cto/templates/ux-design.md`, confirm all sections are complete:

- User journey maps (Step 2)
- Information architecture (Step 2)
- UI component specifications (Step 3)
- Interaction patterns (Step 3)
- Responsive design strategy (Step 3)
- Accessibility standards (Step 3)

### 2. Consistency check

- Do UI components cover all pages in the user journeys?
- Are interaction patterns consistent with the information architecture?
- Does responsive design cover all core flows?
- Does accessibility design affect UI component specs?

### 3. Update frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-flow
  - step-03-spec
  - step-04-complete
```

### 4. Write to output directory

Write the final UX design document to `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md`.

### 5. Submit for review

Via `announce`, submit the completed UX design document to CTO for review:

- Include design summary (number of pages, core flows, components)
- State that all 4 steps have been completed
- Await CTO review → CEO yellow-light approval

## Completion Criteria

- ✅ UX design document all sections complete
- ✅ Consistency check passed
- ✅ Frontmatter status is `in-review`
- ✅ File written to output directory
- ✅ Submitted to CTO for review

## Next Step

This is the final step. UX design workflow complete. Awaiting CTO review results.
