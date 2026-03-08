---
name: freeze
description: "Freeze: Immediately freeze suspect Agent spawn permissions"
next-step: ./step-03-escalate.md
output-file: null
template: null
---

# Step 2: Freeze

**Progress: Step 2 of 3**

## Goal

Immediately freeze the suspect Agent's spawn permissions and record the anomaly event in issues.md.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Freeze Spawn Permissions

Execute freeze on the suspect Agent:
- Record freeze directive in issues.md
- Mark the frozen Agent and freeze time
- Freeze scope: Sub-Agent spawn permissions (does not affect the Agent's own basic functions)

### 2. Record in issues.md

Create an emergency brake record in `{{INSTALL_DIR}}/workspace-cao/issues.md`:

```
## Emergency Brake — [datetime]
- Trigger condition: [A/B/C]
- Suspect Agent: [name]
- Anomaly values: [actual] vs [threshold]
- Freeze action: [spawn permissions frozen]
- Status: Frozen (pending CEO confirmation + root cause analysis)
```

### 3. Preserve Evidence

Save detailed anomaly evidence:
- Token consumption timeline
- Spawn records (time, type, count)
- Related memory/ log excerpts

## Completion Criteria

- [ ] Froze suspect Agent's spawn permissions
- [ ] Recorded in issues.md
- [ ] Preserved anomaly evidence

## Next Step

👉 Proceed to [Step 3: Escalate](./step-03-escalate.md)
