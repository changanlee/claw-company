---
name: step-03-report
description: "Produce readiness report"
next-step: null
output-file: "output/planning/readiness-report.md"
---

# Step 3: Produce Readiness Report

**Progress: Step 3 of 3** — Final step

## Objective

Produce a readiness report based on validation results, with a clear readiness determination.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions (in order, no skipping)

### 1. Calculate Readiness Score

Tally the validation results:

- ✅ Number of passed items
- ⚠️ Number of partially passed items
- ❌ Number of failed items

### 2. Determine Readiness Level

Issue a determination based on the validation results:

| Level | Condition | Description |
|-------|-----------|-------------|
| ✅ Ready | 0 ❌, ⚠️ ≤ 2 | Can begin development |
| ⚠️ Needs Work | 0 ❌, ⚠️ > 2 | Needs supplementation before starting |
| ❌ Not Ready | Any ❌ | Major gaps exist, rework required |

### 3. Write Readiness Report

```markdown
# Development Readiness Report

**Date**: {today}
**Determination**: {✅ Ready / ⚠️ Needs Work / ❌ Not Ready}
**Score**: {passed count} / {total items}

## Document Completeness

| Document | Status | Pass Rate | Key Issues |
|----------|--------|-----------|------------|
| PRD | ✅/⚠️/❌ | X/Y | {Issue description} |
| UX Design | ✅/⚠️/❌ | X/Y | {Issue description} |
| Architecture | ✅/⚠️/❌ | X/Y | {Issue description} |
| Epic/Story | ✅/⚠️/❌ | X/Y | {Issue description} |

## Cross-Document Consistency

{Consistency validation results}

## Items Requiring Correction

{List items requiring correction, ordered by priority}

## Recommendations

{Next step recommendations}
```

### 4. Write to Output Directory

Write the readiness report to `{{INSTALL_DIR}}/workspace-cto/output/planning/readiness-report.md`.

### 5. Report to CTO

Report the readiness report to CTO via `announce`:

- Clearly state the determination (Ready / Needs Work / Not Ready)
- If Needs Work or Not Ready, list items requiring correction
- Suggest an action plan

## Completion Criteria

- ✅ Readiness score calculated
- ✅ Readiness level determined
- ✅ Report written
- ✅ File written to output directory
- ✅ Reported to CTO

## Next Step

This is the final step. The readiness check workflow is complete. Await CTO's response.
