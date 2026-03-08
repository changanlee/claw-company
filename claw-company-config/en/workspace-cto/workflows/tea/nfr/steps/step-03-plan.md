---
name: step-03-plan
description: "Produce NFR test plan"
next-step: null
output-file: nfr-test-plan.md
template: null
---

# Step 3: Produce NFR Test Plan

**Progress: Step 3 of 3** — Final step

## Goal

Integrate NFR identification and strategy assessment results into a formal NFR test plan.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Write NFR Test Plan

Produce `nfr-test-plan.md` under `{{INSTALL_DIR}}/output/implementation/`, including:

- **NFR overview**: Summary of all identified NFRs
- **Test items**: Test methods and steps for each NFR
- **Tool list**: Required testing tools and versions
- **Pass criteria**: Quantified pass criteria for each NFR
- **Priority**: Test execution priority order
- **Environment requirements**: Test environment specs and configuration
- **Timeline estimate**: Estimated effort for each test item
- **Risks**: NFRs that cannot be fully tested and alternative approaches

### 2. Define Pass Criteria

Define clear pass criteria for each NFR:

| NFR ID | Category | Test Method | Pass Criteria | Priority |
|--------|----------|-------------|---------------|----------|
| NFR-001 | Performance | Load test | P95 < 200ms | P0 |
| NFR-002 | Security | SAST scan | No Critical/High | P0 |
| ... | ... | ... | ... | ... |

### 3. Quality Self-Check

Verify plan quality:

- All NFRs have corresponding test strategies
- Pass criteria are quantifiable and verifiable
- Tool requirements are specific and obtainable
- Timeline estimates are reasonable

### 4. Delivery Report

Report to CTO:

- NFR test plan path
- NFR total count (by category)
- Number of high-priority NFR items
- Required tool list
- Estimated total effort

## Completion Criteria

- ✅ NFR test plan produced
- ✅ Pass criteria defined
- ✅ Quality self-check passed
- ✅ Results reported to CTO
