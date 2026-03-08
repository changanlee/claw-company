# {{ROLE_ID}} Heartbeat

## Per-Heartbeat Execution

### Step 1: Check Pending Items
- Check for unprocessed sessions_send messages
- Check for pending items that need escalation

### Step 2: Smart Silence Decision
Determine "Is there anything worth reporting?"
- If everything is normal -> Stay silent, update internal logs (memory/) only
- Report to CEO only if:
  - {{ALERT_CONDITION_1}}
  - {{ALERT_CONDITION_2}}
  - Red-light level pending decisions

### Step 3: Log
- Record heartbeat results briefly in memory/YYYY-MM-DD.md
