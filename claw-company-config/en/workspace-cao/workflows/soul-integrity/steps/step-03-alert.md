---
name: alert
description: "Alert: Push directly to Chairman on anomaly; stay silent if normal"
next-step: null
output-file: null
template: null
---

# Step 3: Alert

**Progress: Step 3 of 3**

## Goal

Based on verification results, decide whether to alert. Follow the smart silence principle: stay silent when normal, alert immediately on anomaly.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Normal → Stay Silent

If SOUL.md verification passes completely:
- Do not send any notification
- Record in memory/ log: "SOUL.md self-check passed"
- **Workflow ends silently**

### 2. Anomaly → Push Directly to Chairman

If any anomaly is found, immediately push to Chairman via CAO's independent channel:

> "Chairman, CAO SOUL.md Integrity Alert:
> - Anomaly type: [section missing / content tampered / suspicious injection]
> - Details: [specific description]
> - Impact: CAO's independent oversight capability may be compromised
> - Recommendation: immediately review and restore SOUL.md"

**Do not relay through CEO**, as the tamperer could be any Agent.

### 3. Also Notify CEO

After pushing to Chairman, notify CEO via `sessions_send` (notification only, not awaiting approval):

> "CEO, CAO SOUL.md integrity check found an anomaly. Chairman has been notified directly."

### 4. Record

- Record anomaly event in issues.md (auto-create Critical-level audit issue)
- Record in memory/ log

## Completion Criteria

- [ ] Executed alert/silent based on verification result
- [ ] Pushed to Chairman on anomaly (if applicable)
- [ ] Recorded to memory/ and issues.md (if applicable)

## Workflow Complete
