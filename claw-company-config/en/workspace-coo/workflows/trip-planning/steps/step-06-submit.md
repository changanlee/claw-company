---
name: submit
description: "Submit: Submit trip plan for Chairman approval"
next-step: null
output-file: null
template: null
---

# Step 6: Submit

**Progress: Step 6 of 6**

## Goal

Submit the completed trip plan draft for Chairman approval. Choose the submission path based on task source.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Submit for Approval

Choose the submission path based on task source:

**If task came from CEO dispatch**: Use `exec dispatch` to submit the trip plan draft to CEO (write file → bash {{INSTALL_DIR}}/shared/dispatch.sh):

> "CEO, attached is the [destination] trip plan draft. Please consolidate and escalate to the Chairman for approval."

**If Chairman assigned directly**: Reply directly in channel to Chairman with the trip plan draft for approval. Also dispatch CEO for notification.

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

- [ ] Submitted for approval (CEO dispatch → submit to CEO; Chairman direct → reply to Chairman + notify CEO)
- [ ] Received approval result
- [ ] Recorded result to memory/

## Workflow Complete
