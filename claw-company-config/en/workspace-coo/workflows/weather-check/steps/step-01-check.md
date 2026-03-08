---
name: check
description: "Check: Query current and forecast weather information"
next-step: ./step-02-alert.md
output-file: null
template: null
---

# Step 1: Check

**Progress: Step 1 of 2**

## Goal

Query current weather and forecast for the Chairman's location.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Determine Location

Get the Chairman's current location from MEMORY.md or schedule records. If there's an upcoming trip, also check destination weather.

### 2. Query Weather

Query the following information:
- **Current weather**: temperature, conditions (sunny/cloudy/rain/snow), humidity, wind speed
- **Today's forecast**: full-day trend, high/low temperatures
- **3-day forecast**: daily weather summary

### 3. Assess Abnormalities

Determine if any weather conditions warrant alerting:
- Imminent rain (within 2 hours)
- Drastic temperature changes (daily range > 10°C)
- Extreme weather alerts (typhoon, blizzard, heat advisory, etc.)
- Weather affecting scheduled activities (outdoor event with rain, etc.)

## Completion Criteria

- [ ] Queried current and forecast weather
- [ ] Assessed whether abnormalities exist

## Next Step

👉 Proceed to [Step 2: Alert](./step-02-alert.md)
