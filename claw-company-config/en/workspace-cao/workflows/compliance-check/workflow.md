---
name: compliance-check
description: "Compliance Check Workflow: Load draft → Verify → Assess → Report"
type: semi-automatic
agent: cao
approval: green
---

# Compliance Check Workflow

## Overview

CAO reviews policy drafts from CHRO or other documents requiring review, verifying each item against company-rules.md for compliance, and producing a compliance review report.

## Prerequisites

- Policy draft under review (submitted by CHRO or other Agents)
- `{{INSTALL_DIR}}/shared/company-rules.md` (compliance baseline)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Load | Load the policy draft under review | — |
| 02 | Verify | Verify compliance item by item (against company-rules.md) | — |
| 03 | Assess | Mark issues (compliant/needs amendment/non-compliant) | — |
| 04 | Report | Produce compliance review report | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-load.md
```
