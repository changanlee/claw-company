---
name: assess
description: "Assess: Classify and mark verification results"
next-step: ./step-04-report.md
output-file: null
template: null
---

# Step 3: Assess

**Progress: Step 3 of 4**

## Goal

Classify and mark the item-by-item verification results with amendment suggestions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Reference Principle

Read `{{INSTALL_DIR}}/shared/principles/verification-before-completion.md` — Every judgment must be backed by evidence; never conclude based on impression alone.

## Instructions

### 1. Classify Items

Mark each item as one of three categories:

**Compliant (Pass):**
- Fully conforms to company-rules.md
- No changes needed

**Needs Amendment (Amend):**
- Correct direction but wording needs adjustment
- Has omissions but doesn't violate red lines
- Include amendment suggestions and reasoning

**Non-Compliant (Reject):**
- Directly violates company-rules.md
- Touches security red lines
- Undermines approval system or three-way checks and balances
- Include violation explanation and required correction direction

### 2. Compile Issues List

Organize all "Needs Amendment" and "Non-Compliant" items into an issues list:
- Issue number
- Original item content
- Classification
- Violated compliance baseline (citing specific company-rules.md section)
- Amendment suggestion

### 3. Overall Assessment

- **All compliant**: Draft may proceed to approval process
- **Has amendments needed**: Return to drafter for revision and resubmission
- **Has non-compliant items**: Return with mandatory correction items marked

## Completion Criteria

- [ ] Completed classification for all items
- [ ] Compiled issues list (if any)
- [ ] Made overall assessment

## Next Step

👉 Proceed to [Step 4: Report](./step-04-report.md)
