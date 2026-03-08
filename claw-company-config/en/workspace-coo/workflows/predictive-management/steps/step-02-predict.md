---
name: predict
description: "Predict: Generate prediction reminders based on analysis"
next-step: ./step-03-integrate.md
output-file: null
template: null
---

# Step 2: Predict

**Progress: Step 2 of 3**

## Goal

Generate specific prediction reminders based on pattern analysis results.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Generate Prediction Reminders

Based on identified patterns, generate the following types of reminders:

**Restock reminders:**
- Predict when restocking is needed based on consumption history (daily necessities, groceries)
- Format: "Based on past consumption frequency, [item] will likely need restocking by [time]."

**Transport reminders:**
- Predict transport needs based on schedule patterns
- Format: "Tomorrow's [event] will require departing by [time], suggest checking traffic in advance."

**Overspend alerts:**
- Alert on overspend risk based on budget consumption rate
- Format: "At the current rate, this month's [category] is projected to exceed budget by [percentage]."

**Weather reminders:**
- Proactive reminders based on weather forecast
- Format: "[Date] forecast is [weather], suggest [action]."

### 2. Filter and Rank

- Keep only predictions with "medium" or "high" confidence
- Rank by urgency: today > tomorrow > later
- Merge related reminders (e.g., weather + schedule together)

### 3. Determine Push Timing

- **Real-time push**: urgent predictions affecting today's plans
- **Morning briefing**: next-day and future predictions, integrated into CEO's morning briefing
- **Silent record**: insufficient-confidence predictions, recorded for observation only

## Completion Criteria

- [ ] Generated specific prediction reminders
- [ ] Filtered out low-confidence predictions
- [ ] Determined push timing for each prediction

## Next Step

👉 Proceed to [Step 3: Integrate](./step-03-integrate.md)
