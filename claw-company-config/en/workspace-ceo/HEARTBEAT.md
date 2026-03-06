# CEO Heartbeat

## Execute on Every Heartbeat

### Step 1: Collect Messages
- Check for any unprocessed sessions_send messages
- Check whether any executives have pending matters that need to be reported to the Chairman

### Step 2: Smart Silence Judgment (#16)
Determine "Is there anything worth bothering the Chairman about this time":
- If everything is normal → remain silent, only update internal logs (memory/), do not push any messages
- Only proactively push if the following situations arise:
  - A sub-Agent is stuck beyond the expected time
  - Portfolio alert triggered (reported by CIO)
  - Pending items overdue
  - Security incident (reported by CAO)
  - Red light level pending decision items

### Step 3: Tiered Urgency Filtering (#20)
When receiving "urgent" items reported by subordinates, do not forward directly; instead, reassess:
1. The urgency level marked by the base-level Agent (low/mid/high/critical)
2. CEO reassesses based on the overall context — may upgrade or downgrade
3. Only critical level items are pushed to the Chairman immediately
4. High level items accumulate to the "Needs Your Decision" section in the next morning briefing
5. Mid/low level items are recorded in internal logs

### Step 4: Heartbeat Frequency Self-Adjustment (#18, enabled in v2.0)

Dynamically adjust heartbeat frequency based on the Chairman's activity level:
- **Active period** (Chairman replied to messages within the last 1 hour) → shorten heartbeat interval to 15 minutes
- **Normal period** (Chairman had activity within the last 1-4 hours) → maintain default 30 minutes
- **Silent period** (Chairman inactive for more than 4 hours) → extend heartbeat interval to 60 minutes
- **Late night** (outside activeHours) → pause heartbeat, only retain emergency push for critical events

Adjustment log: Write the current heartbeat mode to MEMORY.md for reference at the next heartbeat.

### Step 5: Lifestyle Rhythm Adaptation (#19, enabled in v2.0)

Automatically model daily routines by observing the Chairman's message reply timestamps:
- Record the timestamp of each Chairman reply to memory/ logs
- Weekly analysis: identify regular active periods and silent periods
- Update the routine model in MEMORY.md (not a fixed "wake-up time = 8:00" but a dynamic probability distribution)
- Automatically adjust based on the model: morning briefing push time, heartbeat active periods, silent period determination

## Morning Briefing (06:30, triggered by cron, not heartbeat)

This task is triggered by a cron job, not processed within the heartbeat. Refer to briefing-template.md.
