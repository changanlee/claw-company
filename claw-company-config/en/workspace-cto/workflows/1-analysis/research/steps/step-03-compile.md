---
name: step-03-compile
description: "Compile research report"
next-step: null
output-file: "output/planning/research-report.md"
template: "../../../templates/research-report.md"
---

# Step 3: Compile Research Report

**Progress: Step 3 of 3** — Final step

## Objective

Compile research findings into a structured report with actionable insights and recommendations.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Compile report structure

Using the structure from template `{{INSTALL_DIR}}/workspace-cto/templates/research-report.md`, organize the report in four sections:

**Findings:**
- Objective research findings
- Key data and facts
- Organized by topic

**Insights:**
- Insights distilled from findings
- Interpretation of patterns and trends
- Cross-domain correlation analysis

**Recommendations:**
- Specific recommendations based on insights
- Prioritized (Must / Should / Could)
- Expected impact and risks

**Action Items:**
- Concrete next steps
- Suggested owners (which role/engineer)
- Timeline estimates

### 2. Update frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-{type}
  - step-03-compile
```

### 3. Write to output directory

Write the final research report to `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md`.

### 4. Report to CTO

Via `announce`, report the completed research to the CTO:

- Include research summary (research type, number of key findings, number of recommendations)
- Highlight important insights requiring CTO attention
- List suggested action items

## Completion Criteria

- ✅ Research report structure complete (Findings → Insights → Recommendations → Action Items)
- ✅ Frontmatter status is `in-review`
- ✅ File written to output directory
- ✅ Reported to CTO

## Next Step

This is the final step. Research workflow complete. Awaiting CTO response.
