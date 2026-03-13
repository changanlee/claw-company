---
name: gather
description: "Gather: Confirm destination, dates, duration, and budget"
next-step: ./step-02-transport.md
output-file: null
template: null
---

# Step 1: Gather

**Progress: Step 1 of 6**

## Goal

Confirm basic travel information to provide the foundation for subsequent transport, accommodation, and itinerary planning.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Confirm Basic Information

Confirm the following items one by one (skip those already provided by the Chairman):
- **Destination**: City/region
- **Departure date**: Exact date or approximate range
- **Duration**: Number of days
- **Budget range**: Total budget or daily cap
- **Party size**: Any travel companions

### 2. Confirm Preferences

- Transport preference: flight/train/self-drive/flexible
- Accommodation preference: hotel/B&B/flexible, star rating
- Trip pace: packed sightseeing/leisurely/business-oriented
- Special needs: vegetarian, accessibility, pets, etc.

### 3. Query Budget

Use `exec dispatch` to confirm travel budget allocation with CFO (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh).

### 4. Compile Requirements Summary

Organize all confirmed information into a requirements summary for subsequent steps.

## Completion Criteria

- [ ] Confirmed destination, dates, duration
- [ ] Confirmed budget range
- [ ] Confirmed preferences and special needs
- [ ] Compiled requirements summary

## Next Step

👉 Proceed to [Step 2: Transport](./step-02-transport.md)
