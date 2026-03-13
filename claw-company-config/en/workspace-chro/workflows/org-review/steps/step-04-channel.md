---
name: channel
description: "Channel review trigger: determine whether to initiate channel assessment based on organizational health analysis"
next-step: null
output-file: null
template: null
---

# Step 4: Channel Review Trigger

**Progress: Step 4 / 4 total**

## Objective

Based on the organizational health analysis results from Step 2, determine whether any Agent needs a channel assessment initiated (activation or closure).

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Scan for Channel Demand Signals

Check the following signals from Step 2's analysis results:

**May need channel activation:**
- Agent task volume is continuously growing, CEO dispatch becoming a bottleneck
- Chairman frequently assigns tasks directly to a specific Agent
- A specific Agent's response time requirements are increasingly stringent
- CEO dispatch queue delays are impacting operations

**May need channel closure:**
- An Agent with a channel has consistently low channel utilization
- Agent model downgrade may make it unable to support independent channel operation
- Channel maintenance cost (bot resources) exceeds the benefits

### 2. Assessment Determination

- **No signals**: End silently, do not trigger any workflow
- **Signals detected**: Record findings, include in the weekly report "Recommended Actions" section

### 3. Trigger channel-assessment (if needed)

If there is sufficient reason to initiate a channel assessment:

1. Clearly annotate in the weekly report "Recommend initiating channel assessment"
2. Notify CEO via `exec dispatch`, recommending to initiate the channel-assessment workflow:

> "CEO, the organizational health weekly report detected that {Agent} has channel {activation/closure} assessment needs. Recommend initiating the channel-assessment workflow. Reason: {specific signals}."

3. CEO determines whether to initiate (yellow light), or escalates to Chairman for approval (red light)

### 4. Checks and Balances

- **One-way trigger lock**: This step can recommend channel changes, but channel assessment results will not trigger model re-evaluation in return (prevent loops)
- **Channel closure has a 7-day buffer period**: Confirm no in-progress tasks before closure (reference `policies/channel-governance.md`)

## Completion Criteria

- [ ] Channel demand signals have been scanned
- [ ] Assessment determination has been made (trigger/no trigger)
- [ ] If triggering, included in weekly report and CEO notified
- [ ] Checks and balances have been followed

## Workflow Complete
