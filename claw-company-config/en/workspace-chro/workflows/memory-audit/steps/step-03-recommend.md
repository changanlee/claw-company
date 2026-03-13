---
name: recommend
description: "Produce memory health report (suggested cleanup/archive item list)"
next-step: null
output-file: null
template: null
---

# Step 3: Produce Recommendations

**Progress: Step 3 of 3**

## Goal

Produce a memory health report listing items recommended for cleanup or archival.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Memory Health Report

```markdown
# Memory Health Report — {date}

## Summary
- Overall Health: Good / Needs Attention / Needs Cleanup
- Agent Requiring Most Attention: {Agent name}

## Agent Memory Health
| Agent | Utilization | Stale Ratio | Structure Score | Recommendation |
|-------|------------|------------|----------------|---------------|

## Cleanup Recommendations
### Priority Cleanup (Critical/Warning)
- {Agent}: {specific recommendation}

### Suggested Cleanup (Attention)
- {Agent}: {specific recommendation}

### Structure Improvements
- {Agent}: {specific recommendation}
```

### 2. Specific Cleanup Suggestions

For each Agent needing cleanup, list:

- Entries recommended for deletion (stale, redundant)
- Entries recommended for archival (historically valuable but rarely used, move to memory/)
- Entries recommended for update (outdated content)
- Structural adjustment suggestions

**Note**: CHRO only provides recommendations and does not directly modify other Agents' MEMORY.md. Each Agent executes cleanup independently.

### 3. Submit Report

> **Note**: This workflow is triggered by cron. Use exec dispatch for dispatching (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh). exec is available in cron environment. Report is auto-delivered via cron delivery announce mechanism.

- Output the report as the final response; cron announce pushes to channel (visible to CEO)
- Also save report to `output/reports/memory-health-YYYY-MM-DD.md`
- For Agents with memory utilization over 80%, flag them in the report (CEO heartbeat will check and follow up)
- CTO has its own weekly memory self-cleanup mechanism (cron) — can reference but do not duplicate

### 4. Update Records

- Update CHRO MEMORY.md with memory health trends
- Store full report in memory/

## Completion Criteria

- [ ] Memory health report produced
- [ ] Specific cleanup suggestions listed
- [ ] Submitted to CEO and Agents requiring attention
- [ ] Records updated
