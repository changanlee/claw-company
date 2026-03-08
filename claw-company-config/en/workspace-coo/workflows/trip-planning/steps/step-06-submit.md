---
name: submit
description: "Submit: Submit trip plan to CEO for Chairman approval"
next-step: null
output-file: null
template: null
---

# Step 6: Submit

**Progress: Step 6 of 6**

## Goal

Submit the completed trip plan draft to CEO for consolidation and escalation to Chairman for approval.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Submit to CEO

Use `sessions_send` to submit the trip plan draft to CEO:

> "CEO, attached is the [destination] trip plan draft. Please consolidate and escalate to the Chairman for approval."

Include the plan file path.

### 2. Await Approval Result

- **Approved**: Record approval result. Subsequent booking/payment is a separate red-level operation requiring re-confirmation.
- **Returned for revision**: Revise based on Chairman's feedback and resubmit.
- **Cancelled**: Record cancellation reason and archive the plan draft.

### 3. Record Result

Record the approval result in `memory/` logs:
- Plan summary
- Approval result
- Follow-up action items (booking, confirmations, etc.)

## Completion Criteria

- [ ] Submitted to CEO for Chairman escalation
- [ ] Received approval result
- [ ] Recorded result to memory/

## Workflow Complete
