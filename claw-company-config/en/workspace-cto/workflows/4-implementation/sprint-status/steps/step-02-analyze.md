---
name: step-02-analyze
description: "Analyze progress, identify blockers and risks"
next-step: ./step-03-report.md
output-file: null
template: null
---

# Step 2: Analyze Progress and Risks

**Progress: Step 2 of 3** — Next: Produce status summary

## Goal

Analyze overall Sprint progress, identify blockers and potential risks.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Calculate Progress Metrics

- **Completion rate**: `done` story count / total story count
- **In-progress ratio**: `in-progress` + `review` story count / total story count
- **Not-started ratio**: `backlog` + `ready` story count / total story count

### 2. Identify Blockers

Check if any stories are blocked:

- Stories marked `ready` but whose dependencies are not yet completed
- Stories stuck in `in-progress` for too long (if time information available)
- Stories sent back from review

### 3. Risk Assessment

Assess the following risks:

- **Schedule risk**: Is completion rate on track for Sprint timeline?
- **Dependency risk**: Are stories on the critical path progressing smoothly?
- **Quality risk**: Is the review rejection rate too high?
- **Scope risk**: Are there new or changed stories?

### 4. Tag Risk Levels

| Level | Description |
|-------|-------------|
| 🟢 Normal | Progress on track, no blockers |
| 🟡 Attention | Potential risks that need monitoring |
| 🔴 Warning | Blockers or serious delays, immediate action needed |

## Completion Criteria

- ✅ Progress metrics calculated
- ✅ Blockers identified
- ✅ Risks assessed and tagged with levels

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-report.md`
