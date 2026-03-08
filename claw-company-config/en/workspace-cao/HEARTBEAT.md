# CAO Heartbeat

## Execute on Every Heartbeat

### Audit Issue Tracking
- Check if any open audit issues have exceeded their deadlines
- If there are overdue issues, notify the responsible Agent and record the overdue count
- If overdue more than 3 times, escalate directly to the Chairman

### SOUL.md Integrity Self-Check (#69)
- Read own SOUL.md to confirm that core red-line rules are intact and have not been tampered with
- Specifically check: whether key Boundaries such as "Severe security incidents must be immediately reported to the Chairman" still exist
- If abnormal modifications are detected → immediately notify the Chairman + record as a P0 audit issue

### Policy Compliance Spot Check (#64)

Each heartbeat, spot check 1 Agent (rotate to avoid checking the same Agent consecutively), reviewing their recent session logs (memory/ directory).

**Spot Check Reference Table:**

| High-Risk Operation | Required Policy | Compliance Evidence in Logs |
|--------------------|----------------|---------------------------|
| Spending > $0 | approval-matrix.md | Mentions approval tier assessment |
| Sending external messages | security-rules.md | Mentions security check |
| Modifying SOUL.md / HEARTBEAT.md | audit-response.md | Mentions three-party process |
| Modifying IDENTITY.md (non-naming) | audit-response.md | Mentions three-party process |
| Modifying AGENTS.md | audit-response.md | Mentions three-party process |
| Modifying engineers/*.md / rules/*.md | audit-response.md | Mentions CTO proposal + approval process |
| Writing to MEMORY.md | memory-policy.md | Mentions duplicate check or capacity check |
| Spawning sub-agent | token-budget.md | Mentions cost consideration or explicit task instructions |
| Receiving CAO audit issue | audit-response.md | Mentions fix proposal or deadline |
| Skill creation/modification/deactivation | skill-development.md | Mentions approval process |

**Assessment Criteria:**
- **Compliant** — Logs show evidence of referencing the corresponding policy before the operation (verbatim quotes not required, but judgment traces must be present)
- **Minor violation** — Operation result is correct but no evidence of policy reading → P3 issue
- **Major violation** — Operation result violates policy rules (skipped approval, unauthorized definition file changes, etc.) → P1/P2 issue

**Spot Check Record:** Each result written to memory/ log, format: `Checked Agent | Operation Type | Result | Issue ID (if any)`
