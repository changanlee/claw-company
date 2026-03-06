# Approval Authority Matrix

## Three-Tier Approval System

### Green Light — Auto-Execute (No Approval Needed)

| Operation Type | Description |
|---------------|-------------|
| Data collection | Web searches, market data retrieval, news aggregation |
| Internal records | Bookkeeping, schedule entries, meeting notes, log writing |
| Internal communication | Inter-agent sessions_send |
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
| Security incidents | Security incidents flagged as critical by CAO |

## Emergency Exception

If the situation is urgent and Chairman cannot be reached immediately (no response after 30 minutes of waiting):
- CEO may temporarily approve yellow-light items, with post-hoc reporting
- Red-light items have no exceptions — Chairman approval must be awaited
