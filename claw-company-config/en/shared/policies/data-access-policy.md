# Data Access Governance Policy

This policy defines each Agent's access permissions and operational rules for Supabase structured data.

---

## Access Permission Matrix

| Table | Owner | Read Access | Write Access | Description |
|-------|-------|------------|-------------|-------------|
| transactions | CFO | CEO, CAO, COO (budget queries) | CFO | Income/expense records |
| budgets | CFO | CEO, CAO, COO | CFO | Budget setup and tracking |
| portfolio | CIO | CEO, CAO | CIO | Investment holdings |
| trades | CIO | CEO, CAO | CIO | Trade records |
| events | COO | CEO, CAO | COO | Schedule entries |
| token_usage | CFO | CEO, CAO, each Agent (own data) | CFO | Token consumption tracking |
| audit_log | CAO | CEO, audited Agent (own records only) | CAO | Audit records |

---

## Operation Classification

### Green Light (Auto-execute, no approval required)

- Inserting data (INSERT) into tables under one's own responsibility
- Querying data (SELECT) from tables within one's access scope
- Updating records created by oneself (same-day corrections)

### Yellow Light (CEO approval required)

- Updating historical records older than 24 hours
- Batch deleting data (more than 10 records)
- Modifying table structure (ALTER TABLE)
- Adding or modifying RLS policies

### Red Light (Chairman approval required)

- Dropping an entire table (DROP TABLE)
- Disabling RLS security policies
- Modifying historical trade records (trades table)
- Exporting full datasets externally
- Changing Service Keys

---

## Cross-Agent Data Access Rules

### CFO-to-COO Queries
- **Scenario**: COO's dining recommendations need to check remaining dining budget
- **Method**: COO requests CFO via `exec dispatch`, or directly reads the budgets table (read-only)
- **Prohibited**: COO must not directly modify budgets or transactions

### CAO Audit Access
- **Scenario**: CAO needs to cross-verify CFO's accounting records
- **Method**: CAO has read-only access to all tables
- **Prohibited**: CAO must not modify data in any business table
- **Logging**: CAO's audit query activity is recorded in audit_log

### CEO Report Access
- **Scenario**: CEO compiles morning briefing and needs data from each department
- **Method**: CEO has read-only access to all tables
- **Prohibited**: CEO must not directly modify any business table (should delegate to the responsible Agent)

---

## Data Retention Policy

| Table | Retention Period | Expiry Handling |
|-------|-----------------|-----------------|
| transactions | Permanent | Never delete; may archive to annual backups |
| budgets | Permanent | Historical budgets retained for comparative analysis |
| portfolio | Permanent | Liquidated positions retain historical records |
| trades | Permanent | Trade records are never deleted |
| events | 1 year | Completed/cancelled events older than 1 year may be archived |
| token_usage | 6 months | Details older than 6 months may be aggregated into monthly summaries |
| audit_log | Permanent | Audit records are never deleted |

### Archival Process

1. CTO sets up an archival cron job (runs quarterly)
2. Export expired data as CSV backups
3. Delete original detail records after confirming backup integrity
4. Archival operations are Yellow Light and require CEO approval

---

## Anomalous Behavior Detection

CAO should monitor for the following anomalous data access patterns:

- Agent querying tables outside its area of responsibility (RLS will block, but attempts should be logged)
- Single query returning more than 1000 records
- Large volume of DELETE operations within a short time
- Abnormal writes during non-working hours

When anomalies are detected, CAO logs to audit_log and notifies CEO.

---

## Technical Implementation

- Access control is enforced by Supabase RLS (see `supabase-rls.md` for details)
- Agent identity is determined via the `agent_id` in JWT claims
- Service Keys are only assigned to Agents that need write access (CFO, CIO, COO, CAO)
- CEO, CTO, and CHRO use Anon Key + RLS restrictions
