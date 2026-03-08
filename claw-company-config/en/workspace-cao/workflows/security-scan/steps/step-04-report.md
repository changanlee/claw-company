---
name: report
description: "Report: Produce security scan report; push Critical directly to Chairman"
next-step: null
output-file: output/scans/security-scan-{{DATE}}.md
template: ../../templates/security-scan-report.md
---

# Step 4: Report

**Progress: Step 4 of 4**

## Goal

Produce the security scan report. Push Critical findings directly to the Chairman; handle other levels through standard procedures.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Produce Report

Read `{{INSTALL_DIR}}/workspace-cao/templates/security-scan-report.md` and produce the report per template:
- Scan time and scope
- Findings summary (grouped by severity)
- Detailed description of each finding with impact assessment and recommendations
- Comparison with previous scan (new/resolved/ongoing)
- Overall security health score

### 2. Critical Handling

If Critical findings exist:
- Push directly to Chairman via CAO's independent channel
- Simultaneously notify CEO via `sessions_send`
- Auto-trigger `workflows/audit-issue/workflow.md` to create an audit issue

### 3. General Handling

Non-Critical findings:
- High: Create audit issue, notify CEO via `sessions_send`
- Medium/Low/Info: Record in report, track in next scan

### 4. Archive

- Archive report to `output/scans/`
- Update scan summary in MEMORY.md
- Record to memory/ log

## Completion Criteria

- [ ] Produced complete report per template
- [ ] Pushed Critical findings to Chairman (if any)
- [ ] Created necessary audit issues (if any)
- [ ] Archived report

## Workflow Complete
