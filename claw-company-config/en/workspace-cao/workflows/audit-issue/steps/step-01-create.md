---
name: create
description: "Create: Create a formal audit issue record"
next-step: ./step-02-notify.md
output-file: null
template: ../../templates/audit-report.md
---

# Step 1: Create

**Progress: Step 1 of 5**

## Goal

Create a formal audit issue record with complete issue information for the discovered problem.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Assign Issue ID

Read `{{INSTALL_DIR}}/workspace-cao/issues.md` and assign a new ID based on existing issue numbers:
- Format: `AUD-YYYY-NNN` (e.g., AUD-2026-001)
- Sequential numbering

### 2. Fill Issue Record

Create the issue record containing:
- **Issue ID**: AUD-YYYY-NNN
- **Discovery date**: Creation date
- **Source**: Security scan / Compliance check / Routine inspection / Report
- **Description**: Detailed problem description
- **Severity**: Critical / High / Medium / Low
- **Responsible Agent**: Agent that needs to remediate
- **Remediation deadline**: Based on severity
  - Critical: 24 hours
  - High: 3 days
  - Medium: 7 days
  - Low: 14 days
- **Status**: Open

### 3. Write to issues.md

Write the issue record to `{{INSTALL_DIR}}/workspace-cao/issues.md`.

### 4. Produce Issue Report

Read `{{INSTALL_DIR}}/workspace-cao/templates/audit-report.md` and produce an issue report per template, archived to `output/issues/`.

## Completion Criteria

- [ ] Assigned issue ID
- [ ] Filled complete issue record
- [ ] Written to issues.md
- [ ] Produced issue report

## Next Step

👉 Proceed to [Step 2: Notify](./step-02-notify.md)
