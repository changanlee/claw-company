---
name: load
description: "Load: Load the policy draft under review"
next-step: ./step-02-verify.md
output-file: null
template: null
---

# Step 1: Load

**Progress: Step 1 of 4**

## Goal

Load the policy draft under review and the compliance baseline document.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Load Document Under Review

Confirm the source and path of the document under review:
- Policy draft submitted by CHRO
- Rule modifications submitted by other Agents
- Rule change proposals relayed by CEO

Read the complete document content.

### 2. Load Compliance Baseline

Read `{{INSTALL_DIR}}/shared/company-rules.md` and extract compliance baselines:
- Organizational structure rules
- Communication protocols
- Approval authority matrix
- Security red lines
- Memory management rules
- Cost awareness rules

### 3. Confirm Review Scope

Determine which compliance areas the draft touches:
- Which company-rules.md sections are relevant
- Whether it involves definition file modifications (red-level protection)
- Whether it touches security red lines

## Completion Criteria

- [ ] Loaded document under review
- [ ] Loaded compliance baseline
- [ ] Confirmed review scope

## Next Step

👉 Proceed to [Step 2: Verify](./step-02-verify.md)
