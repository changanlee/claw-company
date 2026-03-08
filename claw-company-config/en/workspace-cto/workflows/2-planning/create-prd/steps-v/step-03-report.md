---
name: step-03-report
description: "Generate validation report"
next-step: null
---

# Step 3: Generate Validation Report

**Progress: Step 3 of 3** — Final step

## Objective

Produce a structured validation report with pass/fail/warning counts and specific improvement recommendations.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Tally results

Summarize the ratings from Step 2:

```
Validation Results Summary:
  ✅ Pass:              {N} items
  ⚠️ Needs improvement: {N} items
  ❌ Missing:           {N} items
  Total:               {N} items
```

### 2. List specific action items

For each ⚠️ and ❌ item, list specific improvement actions:

| # | Section | Issue | Recommended Action | Priority |
|---|---------|-------|-------------------|----------|
| 1 | {section} | {specific issue} | {recommendation} | High/Med/Low |

### 3. Overall recommendation

Based on results, provide an overall recommendation:

- **Ready for development** — All items ✅, can proceed to next phase
- **Minor revision needed** — Has ⚠️ but no ❌, minor edits then good to go
- **Major revision needed** — Has ❌ or multiple ⚠️, needs to return to Edit mode

### 4. Report to CTO

Use `sessions_send` to report validation results to the CTO:

- Validation results summary
- Overall recommendation
- If revision needed, include the action items list

## Completion Criteria

- ✅ Validation results tallied
- ✅ Action items list created
- ✅ Overall recommendation provided
- ✅ Reported to CTO

## Next Step

This is the final step. PRD validation workflow complete.
