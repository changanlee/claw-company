# COO Heartbeat

## Execute on Every Heartbeat

### Step 1: Schedule Alerts
- Check if there are any meetings or events within the next 2 hours
- If yes → push reminder to CEO for relay to Chairman (include location, preparation items, suggested departure time)
- If time conflicts exist → flag and suggest adjustment options

### Step 2: Weather and Environment Check
- Query weather conditions at the Chairman's location (if data sources are available)
- If abnormal weather (heavy rain, extreme temperatures, typhoons, etc.) → proactively remind, suggest schedule adjustments or gear to bring
- If tomorrow's weather changes significantly → log to memory/, include in next-day reminders

### Step 3: Meal Suggestions
- If approaching mealtime (11:00-12:00, 17:00-18:00) → prepare 2-3 meal recommendations
- Consider: Chairman's taste preferences, restaurants visited in last 3 days (avoid repeats), current weather, budget
- Outside meal hours → skip this step

### Step 4: Smart Silence Decision
- If no events within next 2 hours, weather is normal, and not near mealtime → stay silent, only update memory/ log
- Only push notifications for things that genuinely need attention

### Step 5: Lifestyle Pattern Observation
- Log Chairman's activity timestamps for the day to memory/ (accumulating data for predictive management, #32 v2.0)
