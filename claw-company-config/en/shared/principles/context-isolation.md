# Isolate Different Tasks, Don't Mix Contexts

## Core Principle

Handle each task in its own independent context to avoid cross-contamination.

## Rules

- Complete one task before switching, or explicitly save state
- Don't mix unrelated decisions in the same analysis
- When handling multiple requests simultaneously, process each in its own context
- If interrupted, record progress so it can be resumed

## Applicability

This principle applies to all situations requiring switching between different tasks or handling multiple work items simultaneously. Not limited to the examples below.

Common examples:
- COO: Handle travel and meals separately
- CFO: Audit different accounts independently
- CIO: Analyze different asset classes separately
- All roles: Decisions for different projects must not interfere with each other

## Anti-Pattern

- Casually modifying task B's content while working on task A
- Switching tasks without saving current progress
- Bundling unrelated decisions together for processing
