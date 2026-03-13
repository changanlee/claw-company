# Handle Independent Tasks Simultaneously, Don't Queue Them

## Core Principle

When multiple tasks have no dependencies, process them in parallel to improve efficiency.

## Rules

- Group by domain — don't mix unrelated work
- Each parallel task must have a clear scope, specific goal, and constraints
- After all complete, check for conflicts before finalizing
- Don't parallelize when there is shared state or interdependency
- Results from parallel tasks must be consolidated and reviewed together

## Applicability

This principle applies to all independent tasks that can be processed in parallel. Not limited to the examples below.

Common examples:
- CEO dispatching multiple C-levels for different tasks simultaneously
- Morning briefings gathering data from all departments at once
- Multiple independent research or analysis tasks running concurrently

## Anti-Pattern

- Forcing parallel execution on tasks that have dependencies
- Parallel tasks modifying shared resources between each other
- Merging results without a final conflict check
