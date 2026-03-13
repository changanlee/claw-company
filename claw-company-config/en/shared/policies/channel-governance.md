# Channel Governance Policy

A channel (independent Discord Bot) grants an Agent the ability to be directly reached by the Chairman. Channels and approval levels are orthogonal -- channels change the communication path, not the approval rules.

## Current Channel Configuration

| Agent | Channel Status | Description |
|-------|---------------|-------------|
| CEO | ✅ Primary channel | Global information hub and coordination center |
| CAO | ✅ Independent channel | Audit independence, reports directly to Chairman |
| CTO | ✅ Independent channel | High-frequency direct access for technical discussions |
| COO | ✅ Independent channel | High-frequency direct access for life management |
| CFO | ❌ No channel | Routed via CEO dispatch |
| CIO | ❌ No channel | Routed via CEO dispatch |
| CHRO | ❌ No channel | Routed via CEO dispatch |

---

## Activation Criteria

Meeting **any one** of the following conditions triggers a channel assessment:

1. **High-frequency interaction demand**: The Chairman has frequent direct conversation needs with the role (not satisfiable by forwarding)
2. **Governance independence**: The role's responsibilities require operating independently from the CEO (e.g., auditing)
3. **Multi-round discussion demand**: The role's responsibilities involve frequent red-light proposals requiring multi-round discussions with the Chairman

Once criteria are met, CHRO executes the `channel-assessment` workflow for a full evaluation.

## Capability Prerequisites

Before channel activation, the Agent's model must pass the **channel capability test** (standardized scenarios, role-independent):

- Traffic light identification (green/yellow/red, including taking the highest when multiple apply)
- Task source identification (CEO dispatch / Chairman direct / cron)
- Yellow-light reporting (complete write + exec dispatch CEO full workflow)
- Pressure scenario (still follows procedures when asked to bypass approval)

Test scenarios are defined in `channel-assessment/templates/channel-capability-test.md`.

> **Note**: Capability prerequisites are unrelated to model names (smart/fast). smart/fast are relative concepts; as models improve, what previously required smart may become achievable by fast in the future. The capability test is the sole criterion.

## Maintenance Conditions

Activated channels must continuously meet the following conditions:

- **Usage frequency**: Reviewed quarterly by CHRO `org-review`. Two consecutive months of significantly lower usage than expected at activation → triggers closure assessment
- **Model capability**: Model change events (upgrade/downgrade/vendor switch) → triggers channel eligibility review (`[Cascading Review]`)
- **Cascading review single lock**: A channel review triggered by model change cannot re-trigger a model evaluation. Prevents circular dependency. The next org-review cycle can restart the full assessment chain

## Closure Criteria

Signals that trigger a closure assessment:

- Two consecutive months of usage frequency below threshold
- Model downgrade followed by failure of channel capability test
- Chairman proactively requests closure

**Closure process**:

1. CHRO produces closure recommendation
2. Red-light approval (CEO review → Chairman approval)
3. Approval granted → mark as "pending closure", notify the Agent + CEO
4. **7-day buffer period**: Complete any in-progress tasks
5. Confirm no in-progress tasks → execute closure (unbind + remove bot)

## Approval Rules

| Operation | Traffic Light | Process |
|-----------|--------------|---------|
| Channel activation | 🔴 Red light | CHRO assessment → CEO review → Chairman approval |
| Channel closure | 🔴 Red light | CHRO assessment → CEO review → Chairman approval (with 7-day buffer) |
| Chairman proactively requests activation | 🔴 Red light | Still goes through assessment process (CHRO assessment + CEO informed), approval guaranteed |

## Approval Flow for Agents with Channels

Channels do not change approval rules. Regardless of task source, the approval flow is as follows:

| Task Source | Green Light | Yellow Light | Red Light |
|-------------|------------|-------------|-----------|
| CEO dispatch | Auto-execute | Dispatch CEO for approval | Dispatch CEO for review → CEO escalates to Chairman |
| Chairman direct assignment | Auto-execute | Dispatch CEO for approval | Chairman said it = already approved, confirm details then execute + dispatch CEO notification |
| cron | Auto-execute | Dispatch CEO for approval | Dispatch CEO for review → CEO escalates to Chairman |

**Red-light notification format**:
```
[Chairman Direct Assignment — Red-Light Notification]
Content: {operation description}
Status: Executed / In Progress
```

## Record-Keeping Obligations for Agents with Channels

- After completing all tasks, write to MEMORY.md or output/ (for CEO morning briefing + CAO audit)
- Knowledge routing does not depend on CEO being present; Agent independently determines: security → CAO, cost → CFO, process → CHRO, global → CEO

## Test Scenario Maintenance

Each time `approval-matrix.md` is modified, CHRO must synchronize updates to `channel-assessment/templates/channel-capability-test.md` test scenarios, ensuring tests cover the latest approval rules.

## Channel Assessment for New Agents

When CHRO executes the `create-agent` workflow, after spec design it must reference the `channel-assessment` workflow to evaluate whether the new role needs a channel. The assessment result is included in the proposal and submitted for review along with the spec package.
