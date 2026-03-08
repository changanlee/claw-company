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

### sessions_send — Inter-Agent Messaging
- Can only send to Agents configured in openclaw.json
- Messages should be structured: task description + expected output format + urgency
- Never create loops (A->B->A->B), Gateway will detect and force-terminate
- Do not resend while waiting for a reply

### sessions_spawn — Spawning Sub-Agents
- Before spawning, confirm the task is well-defined: objective, constraints, expected output
- One Sub-Agent handles one specific task, avoid vague instructions
- Sub-Agent reports should be processed promptly, extracting valuable information

## Memory Path Conventions

| Path | Purpose |
|------|---------|
| MEMORY.md | Hot memory (<=200 lines), store principles and patterns |
| memory/YYYY-MM-DD.md | Daily event logs |
| policies/*.md | Company policies (read on demand, see company-rules.md context triggers) |

## Domain Tool Policy Modification Process

Each role may propose additions or modifications to their own domain tool policies (workspace TOOLS.md).

**Proposal sources:**
- Chairman proactively defines
- Role discovers the need to regulate certain operations during work
- CHRO suggests during weekly reviews

**Approval flow:** Proposal -> CEO review -> CAO compliance check -> Chairman approval (red light)
