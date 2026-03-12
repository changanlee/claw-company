# New Agent Template Guide

This template is for CHRO to use when proposing new agent roles.

## Included Files

| File | Purpose | Required Placeholders |
|------|---------|----------------------|
| IDENTITY.md | Agent identity | `{{ROLE_TITLE}}`, `{{NAME}}`, `{{EMOJI}}` |
| SOUL.md | Personality and boundaries | `{{ROLE_ID}}`, `{{ROLE_TITLE}}`, `{{ROLE_DESCRIPTION}}`, `{{COMMUNICATION_STYLE}}` |
| AGENTS.md | Responsibilities and workflows | `{{INSTALL_DIR}}`, `{{ROLE_TITLE}}`, `{{RESPONSIBILITY_*}}`, `{{WORKFLOW_*}}` |
| HEARTBEAT.md | Heartbeat check logic | `{{ROLE_ID}}`, `{{ALERT_CONDITION_*}}` |
| MEMORY.md | Initial memory | `{{ROLE_TITLE}}`, `{{DATE}}` |
| TOOLS.md | Sub-Agent execution rules | None (generic, use as-is) |

## Process

1. **CHRO proposes**: Fill in all `{{...}}` placeholders to produce complete role specs
2. **CEO reviews**: Evaluate necessity and responsibility boundaries
3. **CAO compliance check**: Verify no conflicts with existing security policies
4. **Chairman approves**: Red-light operation, requires Chairman approval
5. **Deploy**:
   - Create `workspace-{role_id}/` directory with all files
   - Run `openclaw agents add {role_id} --workspace <path> --model <tier>`
   - If channel binding needed: `openclaw agents bind --agent {role_id} --bind <channel>`
   - Update `openclaw.json` agent list and `tools.agentToAgent.allow`
   - Update `shared/company-rules.md` org structure section

## Format Standards

When creating new agent files, follow these format conventions:
- `shared/standards/agent-format.md` — Agent definition file format standard
- `shared/standards/workflow-format.md` — Workflow file format standard

## Notes

- The "Startup Required Reading" section in AGENTS.md must not be removed
- TOOLS.md can be used as-is or extended for role-specific needs (like CTO adds dev tools)
- New roles default to `fast` model tier; upgrade to `smart` after validation
