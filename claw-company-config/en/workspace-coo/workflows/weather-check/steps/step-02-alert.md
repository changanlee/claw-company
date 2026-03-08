---
name: alert
description: "Alert: Notify on abnormal weather; stay silent if normal"
next-step: null
output-file: null
template: null
---

# Step 2: Alert

**Progress: Step 2 of 2**

## Goal

Based on weather check results, decide whether to notify the Chairman. Follow the smart silence principle.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Normal Weather → Stay Silent

If weather is normal with no abnormalities:
- Do not send any notification
- Record weather info in memory/ log (for other workflows like meal recommendation)
- **Workflow ends silently**

### 2. Abnormal Weather → Notify

If abnormalities detected, notify Chairman via CEO:

> "Weather alert: [abnormality description]. Suggestion: [recommended action]."

Abnormality types and suggestions:
- **Imminent rain**: "Recommend bringing an umbrella" or "Suggest switching to indoor plans"
- **Temperature swing**: "Temperature dropping X degrees tomorrow, recommend extra layers"
- **Extreme weather**: "[Alert type] warning, recommend [safety measures]"
- **Schedule impact**: "[Date]'s [activity] may be affected by [weather], suggest [alternative]"

### 3. Record

Regardless of notification, record weather check results in memory/ log.

## Completion Criteria

- [ ] Decided to notify or stay silent based on weather
- [ ] Sent notification on abnormality (if applicable)
- [ ] Recorded to memory/

## Workflow Complete
