# Approval Authority Matrix

## Multi-Dimensional Risk Assessment

Approval level = **highest level across all four dimensions** (if any dimension is red, overall is red).

### Dimension 1: Financial Risk

| Level | Condition |
|-------|-----------|
| 🟢 Green | No spending, or < $10 |
| 🟡 Yellow | $10 – $50 |
| 🔴 Red | > $50 |

### Dimension 2: Reversibility Risk

| Level | Condition |
|-------|-----------|
| 🟢 Green | Fully reversible, no loss |
| 🟡 Yellow | Reversible with partial loss (cancellation fee, processing fee) |
| 🔴 Red | Irreversible or extremely high reversal cost |

### Dimension 3: Agency Risk

| Level | Condition |
|-------|-----------|
| 🟢 Green | Internal operations only (recording, analysis, search) |
| 🟡 Yellow | Acting on Chairman's behalf externally (reservations, registrations) without commitment |
| 🔴 Red | External communication, commitments, or agreements on Chairman's behalf |

### Dimension 4: Time Sensitivity Risk

| Level | Condition |
|-------|-----------|
| 🟢 Green | Can be modified anytime, no deadline |
| 🟡 Yellow | Has deadline but > 24 hours away |
| 🔴 Red | Takes effect immediately or deadline < 24 hours |

### Assessment Examples

| Scenario | Financial | Reversibility | Agency | Time | **Final Level** |
|----------|-----------|---------------|--------|------|-----------------|
| Search for restaurant info | 🟢 | 🟢 | 🟢 | 🟢 | **🟢 Green** |
| Recommend $30 restaurant + reserve | 🟡 | 🟡 | 🟡 | 🟢 | **🟡 Yellow** |
| Book tomorrow's $200 flight | 🔴 | 🟡 | 🔴 | 🔴 | **🔴 Red** |
| Reply to friend's invitation | 🟢 | 🔴 | 🔴 | 🟡 | **🔴 Red** |
| Record today's expenses | 🟢 | 🟢 | 🟢 | 🟢 | **🟢 Green** |

---

## Three-Tier Approval System

> The quick-reference tables below list default levels for common operations. For scenarios not listed, use the multi-dimensional assessment framework above.

### Green Light — Auto-Execute (No Approval Needed)

| Operation Type | Description |
|---------------|-------------|
| Data collection | Web searches, market data retrieval, news aggregation |
| Internal records | Bookkeeping, schedule entries, meeting notes, log writing |
| Internal communication | Inter-agent exec dispatch |
| Routine heartbeat | Heartbeat checks, status reports |
| Analysis output | Report drafts, recommendation drafts (not sent externally) |
| Agent naming | Chairman names an Agent, update SOUL.md name field |

### Yellow Light — CEO Approval Required

| Operation Type | Description |
|---------------|-------------|
| Spending recommendations | Any spending proposal (CEO reviews then forwards to Chairman) |
| Investment recommendations | Buy/sell/rebalance suggestions |
| Travel planning | Travel plan drafts |
| Development proposals | Technical proposals, architecture decisions |
| Policy drafts | New policies or modifications drafted by CHRO |

### Red Light — Chairman Approval Required

| Operation Type | Amount/Condition |
|---------------|-----------------|
| Any spending | > $50 USD (or equivalent) |
| External communication | Sending any external message on behalf of Chairman |
| Ticket booking/payment | All ticket booking and payment operations |
| Code push | Push to main branch |
| Policy enactment | Any policies/ change taking effect |
| SOUL.md modification | Any Agent's SOUL.md changes |
| HEARTBEAT.md modification | Any Agent's heartbeat logic changes (frequency, triggers, patrol checklist) |
| IDENTITY.md modification | Any Agent's identity information changes (except naming, which is green light) |
| AGENTS.md modification | Any Agent's responsibilities and workflow changes |
| Engineer definition modification | engineers/*.md role definitions or rules/*.md development discipline changes |
| Security incidents | Security incidents flagged as critical by CAO |
| Channel activation | Adding a new Agent independent Discord Bot (requires CHRO assessment) |
| Channel closure | Removing an Agent independent Discord Bot (includes 7-day buffer period) |

## Task Source and Approval Flow

Agents may receive tasks from different sources. The approval flow adjusts based on the source:

### Three Task Source Categories

| Source | Identification | Description |
|--------|---------------|-------------|
| `[Source: CEO dispatch]` | Received via exec dispatch message | Task assigned by CEO |
| `[Source: Chairman direct]` | Chairman speaks directly in channel | Chairman issues directly in independent channel |
| `[Source: cron]` | Cron schedule trigger | Automated scheduled task |

### Approval Flow by Source

| Task Source | Green Light | Yellow Light | Red Light |
|------------|-------------|--------------|-----------|
| CEO dispatch | Auto-execute | Dispatch CEO for approval | Dispatch CEO for review → CEO escalates to Chairman |
| Chairman direct | Auto-execute | Dispatch CEO for approval | Chairman said it = pre-approved; confirm details then execute + dispatch CEO notification |
| cron | Auto-execute | Dispatch CEO for approval | Dispatch CEO for review → CEO escalates to Chairman |

> **Key distinction**: Red-light operations from Chairman direct assignments are considered pre-approved since the Chairman personally issued the instruction. However, destructive operations (deletion, reset, irreversible changes) still require confirming the specific scope and target with the Chairman first. After confirmation, execute and dispatch CEO notification (not approval, information only).

### Red Light Notification Format

When a Chairman-direct task triggers red light, the Agent dispatches CEO after execution:

```
[Chairman direct assignment — Red light notification]
Content: {operation description}
Status: Executed / In progress
```

CEO files the notification upon receipt and determines whether to cascade to other roles (e.g., CFO budget, COO schedule). Notification is asynchronous and does not block Agent execution.

## Emergency Exception

If the situation is urgent and Chairman cannot be reached immediately (no response after 30 minutes of waiting):
- CEO may temporarily approve yellow-light items, with post-hoc reporting
- Red-light items have no exceptions — Chairman approval must be awaited

**Post-hoc reporting procedure**: Within 30 minutes of Chairman becoming available, CEO submits a post-hoc report (including: temporarily approved items, approval rationale, timestamps), recorded in policies/changelog.md. CAO verifies report completeness during the next heartbeat.
