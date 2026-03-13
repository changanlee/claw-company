# Next Step Suggestion

## Purpose

Analyze the current state and suggest the most appropriate next action.

## How to Execute

1. **Understand current state** — Ask the user what they are working on and what problems they are facing.

2. **Analyze possible next steps** — Judge based on the following information:
   - The current agent's available workflows (table in AGENTS.md)
   - Shared standalone tasks (README.md in this directory)
   - Whether the task should be handed off to another agent (exec dispatch)

3. **Give specific suggestions** — Format:

> Based on your current state, I suggest:
> 1. **{Best action}** — {rationale}
> 2. **{Alternative action}** — {rationale}
>
> Which would you like me to execute?

## Guidelines

- Suggestions must be specific and actionable
- Give at most 3 options — do not list too many
- If unsure, ask the user for more information directly
