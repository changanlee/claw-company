# Audit Response and Closure Mechanism

## Audit Issue Format

```
Issue ID: AUDIT-YYYY-MM-DD-NNN
Severity: P0 / P1 / P2 / P3
Responsible Agent: <agent-id>
Discovery Date: YYYY-MM-DD
Deadline: YYYY-MM-DD
Status: Open / In Progress / Pending Verification / Closed
Description: <issue description>
Recommended Fix: <fix direction>
```

## Handling Procedure

### 1. Discovery and Recording
- CAO creates an audit issue upon discovering a problem
- Recorded in CAO's MEMORY.md (open issues list)

### 2. Notification
- P0/P1: Immediately notify the responsible Agent + CEO (P0 also notifies Chairman)
- P2/P3: Record and include in the next communication with CEO

### 3. Remediation
- Responsible Agent proposes a fix within the deadline
- Fix proposal must be confirmed by CEO

### 4. Prevention Rules
- After remediation, CAO evaluates whether new prevention rules are needed
- If new rules are needed: CAO recommends → CHRO drafts policy → CEO reviews → Chairman approves
- Rules are written into the corresponding policies/ file, not into SOUL.md

### 4b. Systemic Issue Analysis (#59)
- CAO notifies CHRO of the root cause analysis for the issue
- CHRO evaluates: Is this an isolated case or a systemic issue?
  - **Isolated case** → Individual fix for the responsible Agent only
  - **Systemic issue** → CHRO proposes company-wide standard revision
- Systemic standard revision process: CHRO drafts → CEO reviews → CAO compliance check → Chairman approves → CHRO deploys to all Agents → CAO verifies implementation

### 5. Verification and Closure
- CAO verifies the effectiveness of the fix
- Once confirmed effective, close the issue
- Archive to memory/ daily log

## Overdue Handling

- First overdue: CAO reminds the responsible Agent, grants one extension
- Second overdue: Notify CEO to intervene
- Third overdue: Escalate to Chairman

## SOUL.md Modification Special Procedure

Any modification to an Agent's SOUL.md must:
1. The proposer cannot be the Agent being modified
2. Requires a three-party process: drafter + reviewer + Chairman approval
3. Before/after diff is recorded in policies/changelog.md

**Exception: Chairman direct naming**
When Chairman names an Agent (e.g., "CIO shall be called Xiaoming"), this is a direct Chairman instruction. The Agent may update the "name" field in its own SOUL.md without the three-party process.

## HEARTBEAT.md Modification Special Procedure

HEARTBEAT.md defines an Agent's heartbeat patrol logic. Modifications require red-light approval:

1. The proposer cannot be the Agent being modified (same principle as SOUL.md)
2. Scope includes: heartbeat frequency, trigger conditions, patrol checklist, auto-adjustment logic
3. Process: CHRO drafts change → CEO reviews → CAO compliance check → Chairman approves
4. Before/after diff is recorded in policies/changelog.md

**Exception: v2.0 adaptive adjustment**
The heartbeat "self-adjustment" feature (dynamic frequency tuning) is pre-defined automation within HEARTBEAT.md and does not require approval for each frequency change. However, modifying the adaptive rules themselves (e.g., adjusting thresholds) still requires the above process.
