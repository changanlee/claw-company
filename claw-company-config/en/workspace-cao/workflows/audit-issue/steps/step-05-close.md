---
name: close
description: "Close: Close issue and propose prevention rules"
next-step: null
output-file: output/issues/issue-{{ID}}-closed.md
template: null
---

# Step 5: Close

**Progress: Step 5 of 5**

## Goal

Close the verified audit issue and propose prevention recommendations to avoid similar problems in the future.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Close Issue

Update issues.md:
- Status: Closed
- Close date
- Remediation summary
- Verification result

### 2. Propose Prevention Recommendations

Analyze the root cause and propose prevention recommendations:
- Whether a new policy rule is needed
- Whether existing policies need modification
- Whether inspection items need enhancement
- Whether heartbeat inspection frequency needs adjustment

### 3. Route Recommendations

Route recommendations based on content:
- **New/modified policy needed** → submit to CHRO for drafting via `exec dispatch`
- **Security rule modification needed** → CAO drafts, sends to CEO → Chairman approval
- **Technical configuration change needed** → notify CTO via `exec dispatch`

### 4. Record and Archive

- Archive the complete issue lifecycle record to `output/issues/`
- Update audit statistics in MEMORY.md
- Record to memory/ log

## Completion Criteria

- [ ] Updated issues.md status to Closed
- [ ] Proposed prevention recommendations
- [ ] Routed recommendations to corresponding Agent
- [ ] Archived issue record

## Workflow Complete
