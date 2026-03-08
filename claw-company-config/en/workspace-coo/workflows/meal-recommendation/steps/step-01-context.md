---
name: context
description: "Context: Confirm time of day, location, and weather for recommendation"
next-step: ./step-02-history.md
output-file: null
template: null
---

# Step 1: Context

**Progress: Step 1 of 4**

## Goal

Collect contextual information needed for meal recommendation, including time of day, current location, and weather conditions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Confirm Meal Time

Determine the current meal period:
- Breakfast (06:00-10:00)
- Lunch (11:00-14:00)
- Afternoon tea (14:00-17:00)
- Dinner (17:00-21:00)
- Late-night snack (21:00-02:00)

Use the Chairman's specified time if provided.

### 2. Confirm Location

- If the Chairman's current location is known (from schedule records or conversation), use it directly.
- If unknown, ask: "Where are you currently? This helps me recommend nearby options."

### 3. Check Weather

- Query current weather conditions (temperature, conditions).
- Weather influences recommendations: cold weather favors hot pot/soups; hot weather favors light meals/salads.

### 4. Record Context

Compile a context summary: time, location, weather, special requests (if any).

## Completion Criteria

- [ ] Confirmed meal time period
- [ ] Confirmed location information
- [ ] Checked weather conditions
- [ ] Compiled context summary

## Next Step

👉 Proceed to [Step 2: History](./step-02-history.md)
