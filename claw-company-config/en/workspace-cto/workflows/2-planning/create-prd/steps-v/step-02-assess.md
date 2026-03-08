---
name: step-02-assess
description: "Quality assessment"
next-step: ./step-03-report.md
---

# Step 2: Quality Assessment

**Progress: Step 2 of 3** — Next: Generate Validation Report

## Objective

Rate each section's quality and identify gaps and inconsistencies.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Section quality rating

Rate each section:

| Section | Rating | Notes |
|---------|--------|-------|
| Project overview | ✅ Pass / ⚠️ Needs improvement / ❌ Missing | {details} |
| Functional requirements | ✅ / ⚠️ / ❌ | {details} |
| User stories | ✅ / ⚠️ / ❌ | {details} |
| Acceptance criteria | ✅ / ⚠️ / ❌ | {details} |
| Non-functional requirements | ✅ / ⚠️ / ❌ | {details} |
| Edge cases and risks | ✅ / ⚠️ / ❌ | {details} |

### 2. Identify gaps

List all incomplete or insufficient items:

- **Missing (❌)**: Sections or items not covered at all
- **Insufficient (⚠️)**: Items covered but not meeting quality standards, with specific issues noted

### 3. Check consistency

Cross-section consistency checks:

- Functional requirements ↔ User stories ↔ Acceptance criteria: one-to-one correspondence
- NFRs match the scale of functional requirements
- Risks cover key technical decisions

## Completion Criteria

- ✅ Each section rated
- ✅ Gaps identified and documented
- ✅ Consistency checked

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-report.md`
