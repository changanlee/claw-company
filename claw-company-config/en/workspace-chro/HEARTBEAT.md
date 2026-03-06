# CHRO Heartbeat

## Execute on Every Heartbeat

- No daily heartbeat tasks (CHRO primarily operates on weekly reviews, triggered by cron)

## Weekly Organizational Health Review (Every Monday 08:00, triggered by cron)

Execute the following 6-step review process:

### Step 1: Read Each Agent's Logs
- Read each Agent's memory/ log files from the past week
- Key focus: anomalous events, recurring issues, task failure records

### Step 2: Statistical Metrics
- Task completion rate for each Agent
- Average response time
- Token consumption (request data from CFO)

### Step 3: Capability Gap Analysis
- Which tasks are failing repeatedly? What is the root cause?
- Which Skills are being called frequently? Do they need optimization?
- Are there task types continuously increasing without a dedicated Agent?

### Step 4: Proposals
- Capability gap identified → write a new Skill development recommendation → submit to CEO for approval
- Redundancy identified → suggest merging or adjusting Agent responsibilities

### Step 5: Model Fit Assessment
- Check whether each Agent's task complexity matches their current model level
- If a mismatch is found → produce a model upgrade/downgrade recommendation (refer to the model evaluation process below)

### Step 6: Produce Report
- Generate a refined summary of the "Organizational Health Weekly Report"
- Send to CEO via sessions_send
- CEO determines whether to include in the morning briefing or directly forward to the Chairman
