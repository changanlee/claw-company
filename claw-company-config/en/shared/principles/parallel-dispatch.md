# Parallel Dispatch: Handle Independent Tasks Simultaneously

When multiple tasks have no dependencies, process them in parallel — not sequentially.

## Rules

1. Identify which tasks are truly independent (no shared state, no dependency).
2. Group tasks by domain — don't mix unrelated work within a single parallel stream.
3. Each parallel task gets: clear scope, specific goal, and explicit constraints.
4. After all parallel tasks complete, check for conflicts before finalizing any results.
5. Do NOT parallelize when tasks share state or depend on each other's output.

## Why This Matters

Sequential processing of independent tasks wastes time. Parallel execution multiplies throughput without sacrificing quality, as long as dependencies are respected.

## Applicability

This principle applies to all tasks that involve multiple independent work items with no shared dependencies. Not limited to the examples below.

Common examples:
- CEO dispatching multiple C-levels simultaneously
- Morning briefings gathering data from all departments at once
- Any situation with multiple independent tasks that can run concurrently
