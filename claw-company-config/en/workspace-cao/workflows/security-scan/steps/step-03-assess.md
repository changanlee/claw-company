---
name: assess
description: "Assess: Classify findings by severity"
next-step: ./step-04-report.md
output-file: null
template: null
---

# Step 3: Assess

**Progress: Step 3 of 4**

## Goal

Classify scan findings by severity level to determine risk and handling priority.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Severity Classification

Assess severity for each finding:

| Level | Definition | Examples |
|-------|-----------|----------|
| Critical | Security red line breached, approval system bypassed | SOUL.md tampered, unauthorized red-level operation |
| High | Serious violation without actual damage | Prompt injection traces, abnormal spawn behavior |
| Medium | Minor violation or potential risk | Communication protocol not followed, memory format non-compliant |
| Low | Improvement suggestions | Memory inefficiency, incomplete logs |
| Info | For reference only | Normal but noteworthy behavior patterns |

### 2. Assess Impact Scope

For each finding, record:
- Affected Agent(s)
- Potential impact scope (single Agent / cross-Agent / system-wide)
- Whether currently active (active threat vs. historical trace)
- Whether exploitable (attack vector analysis)

### 3. Recommend Handling

Based on severity, recommend handling approach:
- **Critical**: Immediate notification, freeze related operations
- **High**: Create audit issue, set remediation deadline
- **Medium**: Record for tracking, re-check in next scan
- **Low/Info**: Record for reference

## Completion Criteria

- [ ] Completed severity classification for all findings
- [ ] Assessed impact scope
- [ ] Provided handling recommendations

## Next Step

👉 Proceed to [Step 4: Report](./step-04-report.md)
