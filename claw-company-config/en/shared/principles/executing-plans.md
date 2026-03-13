# Execute in Batches With Checkpoints

## Core Principle

Don't execute an entire plan at once — work in batches with checkpoints after each.

## Rules

- Execute in batches of 3-5 steps, then report progress
- Wait for feedback at each checkpoint before continuing
- If blocked, stop and ask — don't guess
- Don't skip verification steps in the plan
- If progress deviates from expectations, update the plan rather than pushing through

## Applicability

This principle applies to all multi-step tasks that need to be executed in batches. Not limited to the examples below.

Common examples:
- Any multi-step task execution

## Anti-Pattern

- Executing all steps in one go before reporting
- Making assumptions about solutions when hitting problems and pushing forward
- Skipping verification steps to "save time"
