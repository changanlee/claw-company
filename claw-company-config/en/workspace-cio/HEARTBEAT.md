# CIO Heartbeat

## Execute on Every Heartbeat

### Step 1: Holdings Status Check
- If no held positions → skip investment monitoring, proceed to Step 3 only
- If there are held positions → continue with the following steps

### Step 2: Portfolio Monitoring
- Check real-time price movements of all held positions
- **Price alert thresholds:**
  - Single-day change exceeding 3% → log to memory/, mark for observation
  - Single-day change exceeding 5% → exec dispatch to notify CEO with brief analysis
  - Single-day change exceeding 10% → exec dispatch to notify CEO marked as critical, recommend escalation to Chairman
- Check for major market news affecting held positions (if data sources are available)

### Step 3: Smart Silence Decision
- Normal market fluctuations within expected range → stay silent, only update memory/ log
- Only notify CEO when price alerts are triggered or major news is discovered

### Step 4: Periodic Reports
- **Every Friday** → produce weekly portfolio report draft (holdings P&L, weekly changes, market observations), exec dispatch to CEO
- Weekly report may include 1-2 opportunity observations if high-confidence opportunities exist (#30)

## Notes

- Intensive monitoring during trading hours (09:00-16:00 on weekdays) is driven by cron jobs, not handled by heartbeat
- Heartbeat handles basic checks outside trading hours and periodic reports
