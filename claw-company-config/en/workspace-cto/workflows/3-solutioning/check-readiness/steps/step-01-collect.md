---
name: step-01-collect
description: "Collect all required documents"
next-step: ./step-02-validate.md
---

# Step 1: Collect Documents

**Progress: Step 1 of 3** — Next: Validate completeness

## Objective

Collect all documents required to enter the development phase and flag any missing items.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. Check Required Documents

Check the following documents one by one for existence and readability:

| Document | Path | Requirement |
|----------|------|-------------|
| PRD | `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` | Required |
| UX Design | `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` | Required |
| Architecture | `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md` | Required |
| Epic/Story | `{{INSTALL_DIR}}/workspace-cto/output/planning/epics-and-stories.md` | Required |
| Product Brief | `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` | Optional |
| Research Report | `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md` | Optional |

### 2. Load All Existing Documents

Read all documents that exist, preparing for the validation step.

### 3. Record Document Status

Create a document collection checklist:

```markdown
## Document Collection Status

| Document | Status | Notes |
|----------|--------|-------|
| PRD | ✅ Collected / ❌ Missing | |
| UX Design | ✅ Collected / ❌ Missing | |
| Architecture | ✅ Collected / ❌ Missing | |
| Epic/Story | ✅ Collected / ❌ Missing | |
```

### 4. Handle Missing Documents

If any required documents are missing:

- Notify CTO of the missing documents via `announce`
- Await CTO instructions: supplement the documents or continue checking existing ones

## Completion Criteria

- ✅ Existence of all required documents checked
- ✅ All existing documents loaded
- ✅ Document collection checklist created

## Next Step

After confirming all completion criteria are met, read and follow: `./step-02-validate.md`
