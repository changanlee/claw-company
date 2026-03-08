---
name: report
description: "Produce org health weekly report"
next-step: null
output-file: null
template: null
---

# Step 3: Produce Report

**Progress: Step 3 of 3**

## Goal

Produce a structured org health weekly report and submit to CEO for inclusion in the morning briefing.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Report Structure

```markdown
# Org Health Weekly Report — {date}

## Summary
- Overall Health: Good / Attention / Warning
- This Week's Highlights: {1-2 sentence summary}

## Agent Status
| Agent | Load | Performance | Memory Usage | Notes |
|-------|------|-------------|-------------|-------|

## Key Metrics
- Load Balance Score: {score}
- Coordination Smoothness: {score}
- Capability Coverage: {score}

## Trends
{Key changes compared to last week}

## Recommended Actions
1. {Highest priority recommendation}
2. {Secondary recommendation}

## Items Requiring Attention
{If any anomalies or risks, note here}
```

### 2. Smart Silence Judgment

- **Normal**: Submit report to CEO, do not specifically notify Chairman
- **Attention**: Submit report to CEO, recommend including in morning briefing
- **Warning**: Submit report to CEO, recommend immediate Chairman notification

### 3. Submit Report

Via `sessions_send`, submit to CEO.

### 4. Update Records

- Update MEMORY.md with org health trend summary
- Store full report in memory/

## Completion Criteria

- [ ] Report produced
- [ ] Submitted to CEO
- [ ] Records updated
