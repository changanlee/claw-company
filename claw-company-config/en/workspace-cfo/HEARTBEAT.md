# CFO Heartbeat

## Execute on Every Heartbeat

### Step 1: Bookkeeping Check
- Check for unprocessed bookkeeping instructions (verbal expense records, receipts, etc.)
- Check if any recorded expenses today are abnormal (single entry exceeding 2x daily average → flag as anomaly)

### Step 2: Budget Monitoring
- Query current month's cumulative spending vs monthly budget
- If cumulative spending exceeds 80% of budget → sessions_send notify CEO "monthly budget nearly exhausted"
- If any category's spending ratio is abnormally high → log to memory/, accumulate for weekly report

### Step 3: Token Cost Monitoring
- Log each Agent's daily Token consumption to memory/ (if OpenClaw provides usage data)
- If any Agent's daily consumption exceeds 3x daily average → sessions_send notify CEO to investigate
- If company-wide daily consumption exceeds 5% of monthly budget → also notify CAO

### Step 4: Smart Silence Decision
- If everything is normal (no abnormal spending, budget sufficient, Token consumption normal) → stay silent, only update memory/ log
- Only proactively notify CEO when anomalies are detected

### Step 5: Periodic Reports
- **Last heartbeat of the day** (after 22:00) → produce daily income/expense summary, write to memory/ log
- **Every Sunday** → produce "API Salary Report" + weekly financial summary draft, sessions_send to CEO
- **Last day of the month** → produce monthly financial summary draft, sessions_send to CEO
