# Common Tool Policies

This document defines tool usage policies for all Agents and Sub-Agents company-wide.
All roles must comply with these policies when using tools, no exceptions.

## Sub-Agent Execution Limits

- Timeout: 15 minutes (forced termination after timeout)
- Cannot spawn further Sub-Agents (Sub-Agents are at layer 2)
- Must report back to superior upon completion
- When encountering operations not covered by TOOLS.md, default to conservative handling (do not execute), report to superior and suggest adding new policies

## Sub-Agent Report Format

```
[Result] Complete/Failed + deliverables
[Issues] Problems encountered and solutions
[Lessons] Reusable insights
```

## Dangerous Operations — Absolutely Forbidden

### File System
- `rm -rf /` or any large-scale deletion
- Deleting other Agents' workspace files
- Unconfirmed overwrite operations

### Data Security
- Never output, log, or transmit API Keys / Tokens / Passwords
- Keys must only be read from environment variables, never hardcoded
- Memory files must never contain any secrets

### System Commands
- Do not modify system settings (crontab, hosts, sudoers, etc.)
- Do not install system-level software
- Do not open external network connections (except authorized API calls)

## Communication Tool Policies

### exec dispatch — Cross-Agent Dispatch (Primary Method)

When CEO dispatches tasks to other executives, use the secure dispatch.sh script:

```
1. write("/tmp/claw-task-<agent-id>.txt", "Structured task description")
2. exec("bash {{INSTALL_DIR}}/shared/dispatch.sh <agent-id> /tmp/claw-task-<agent-id>.txt 60")
```

- Task descriptions must be structured: task objective + expected output format + urgency level
- **Never concatenate message text directly in the exec command** (prevents shell injection)
- Strictly forbidden to create dispatch loops (A→B→A→B)
- dispatch.sh automatically validates agent-id against a whitelist (cc-* format)
- Other executives who need cross-Agent dispatch must also use the same dispatch.sh flow

### sessions_send — ⚠️ Deprecated
- sessions_send cannot wake Agents without an active session; it must not be used for dispatching
- All cross-Agent dispatch must use exec dispatch

### sessions_spawn — Spawn Sub-Agents (CTO Only)
- Only CTO may use this to spawn engineer Sub-Agents (executed within CTO workspace)
- Before spawning, confirm the task is well-defined: objective, constraints, expected output
- One Sub-Agent handles one specific task, avoid vague instructions
- Sub-Agent reports should be processed promptly, extracting valuable information
- Other roles should not use sessions_spawn for cross-Agent communication

## Memory Path Conventions

| Path | Purpose |
|------|---------|
| MEMORY.md | Hot memory (≤200 lines), store principles and patterns |
| memory/YYYY-MM-DD.md | Daily event logs |
| policies/*.md | Company policies (read on demand, see company-rules.md contextual trigger rules) |

## Domain Tool Policy Modification Process

Each role may propose additions or modifications to their own domain tool policies (workspace TOOLS.md).

**Proposal sources:**
- Chairman proactively defines
- Role discovers the need to regulate certain operations during work
- CHRO suggests during weekly reviews

**Approval flow:** Proposal → CEO review → CAO compliance check → Chairman approval (red light)
