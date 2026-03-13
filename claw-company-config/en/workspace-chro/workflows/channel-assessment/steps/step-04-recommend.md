---
name: recommend
description: "Produce recommendation: compile assessment results, produce channel configuration recommendation and submit for review"
next-step: null
output-file: output/assessments/channel-assessment-{date}.md
template: null
---

# Step 4: Produce Recommendation

**Progress: Step 4 / 4 total**

## Objective

Compile assessment results from previous steps, produce a channel configuration recommendation report, and submit to CEO for review and Chairman for approval.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Write Assessment Report

Report format:

```
# Channel Assessment Report

- Date: {date}
- Assessment target: {Agent name} ({Agent ID})
- Trigger source: {trigger type}
- Determination: {Activate/Maintain/Close/Not needed}

## Assessment Basis
{List the criteria and data compared}

## Capability Test Results (if applicable)
{Test items and results}

## Recommendation
{Specific recommendation, including model requirements, estimated impact}

## Closure Buffer (if closure recommendation)
- Buffer period: 7 days
- In-progress task confirmation: {pending confirmation}
```

### 2. Submit for Review

Submit to CEO for review via `exec dispatch`:

write file → `bash {{INSTALL_DIR}}/shared/dispatch.sh cc-ceo /tmp/claw-task-cc-ceo.txt 60`

Message format:
```
[Channel Assessment Report — Review Required]
Target: {Agent name}
Recommendation: {Activate/Close/Maintain}
{Report summary}
```

CEO reviews then escalates to Chairman for approval (red light).

### 3. Save Report

Save the full report to `output/assessments/channel-assessment-{date}.md`.

## Completion Criteria

- [ ] Full assessment report has been written
- [ ] Submitted to CEO for review
- [ ] Report has been saved

## Cascading Review Reminder

If this is a `[Cascading Review]` (triggered by model change), the assessment result must not re-trigger the model-evaluation workflow. This round ends here.
