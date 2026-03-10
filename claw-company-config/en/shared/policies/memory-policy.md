# Memory Management Policy

## Memory Pyramid

### Layer 1: MEMORY.md (Hot Memory) — Source of Truth
- **Limit**: 200 lines
- **Load timing**: Automatically loaded at the start of every session
- **Writer**: Agent proactively decides what to write
- **Content**: Refined principles, patterns, preferences, key decisions
- **Role**: Source of truth for refined conclusions
- **Maintenance**: Check for duplicates before writing; archive old entries when approaching the limit

### Layer 2: memory/YYYY-MM-DD.md (Warm Memory)
- **Load timing**: Today's and yesterday's logs are automatically loaded
- **Writer**: Agent proactively writes
- **Content**: Daily events, conversation summaries, execution results
- **Role**: Timeline record
- **Format**: Timestamp + concise entry
- **Retention**: Archived by a cleanup cron job after 30 days

### Layer 2.5: Supabase (Structured Data) — Future Expansion
- **Load timing**: Agent queries on demand via Skills
- **Content**: CFO accounting records, CIO investment portfolio, COO schedule data
- **Status**: Not enabled during the founding phase; to be set up as data volume grows
- **Setup guide**: See shared/setup-guides/database-setup.md

### Layer 3: LanceDB (Cold Memory) — memory-lancedb-pro Plugin
- **Load timing**: autoRecall automatically injects relevant memories at session start (up to 3 entries)
- **Writer**: autoCapture automatically captures and settles memories at agent_end; Agents do not need to write manually
- **Settling granularity**: At each session end, the plugin automatically extracts key summaries (decisions, errors and solutions, important discoveries) from the conversation, not the raw conversation transcript. Settling is handled by the plugin's built-in summarization mechanism; Agents do not need to intervene
- **Content**: Conversation context, errors and solutions, discussion threads, historical experience
- **Role**: Automatic settling pool (supplementary layer, not source of truth)
- **Capacity**: Unlimited
- **Filtering**: Noise filtering + Time Decay (60-day half-life) + access reinforcement (frequently retrieved memories get extended lifespan) + MMR deduplication (cosine > 0.85 downranked)
- **Isolation**: Multi-Scope isolation (each Agent has a private scope, cc-* shares the project:claw-company scope, main is fully isolated)
- **Setup guide**: See shared/setup-guides/database-setup.md

## Write Rules

1. First determine the information's time relevance:
   - Long-term (preferences, principles) -> MEMORY.md
   - Same-day (events, results) -> memory/YYYY-MM-DD.md
   - Cold memory settling -> **Handled automatically by autoCapture; Agents do not need to write to LanceDB manually**
2. Before writing to MEMORY.md:
   - Check whether an identical or similar entry already exists
   - If so, update rather than add a new entry
   - If MEMORY.md exceeds 180 lines, clean up outdated entries first
3. Unified log format: `HH:MM — [Category] Content summary`
4. **Three-layer separation principle**: MEMORY.md stores refined conclusions, memory/*.md stores event records, LanceDB stores conversation context. The three layers differ in granularity and are not duplicates.

## Proactive Memory Strategies

<!-- Source: Proactive Agent v3.1.0 — WAL + Working Buffer | Absorbed: 2026-03-10 -->

### WAL (Write-Ahead Logging)

Before executing important decisions or complex operations, first write the intent and plan summary to the memory/ log, then begin execution. This ensures decision context is not lost even if the session is interrupted or compaction occurs.

Applicable contexts:
- About to execute a multi-step plan
- Making decisions that affect multiple Agents
- Processing important instructions from Chairman

Format: `HH:MM — [WAL] Intent: <plan summary>` → Execute → `HH:MM — [WAL] Result: <execution result>`

### Working Buffer (Context Threshold Trigger)

When you sense that context usage is high (conversation has been going on for a long time or processing large amounts of data), activate high-frequency memory mode: write key information to memory/ log after each important response, ensuring compaction does not cause information loss.

Trigger signals:
- Conversation has exceeded 20+ rounds
- Processing multiple documents or large amounts of code
- Feeling that "if this session were interrupted now, I would forget important details"

### Reverse Prompting (Proactive Anticipation)

Don't just passively answer questions — proactively anticipate what Chairman or other Agents might need next in terms of information or decisions. When completing tasks, include "next step suggestions" or "related pending items."

Applicable contexts:
- After completing a task assigned by Chairman
- Discovering issues related to the current task but not mentioned
- Heartbeat check reveals anomalous trends

## Learning Classification and Promotion

<!-- Source: Self Improving Agent v3.0.0 — Error Log + Promotion | Absorbed: 2026-03-10 -->

### Memory Classification Tags

When writing to memory/ logs, use the following tags to distinguish memory types:

| Tag | Purpose | Example |
|-----|---------|---------|
| `[ERROR]` | Execution failures and solutions | API call failure workaround |
| `[LEARNING]` | Verified lessons learned | A particular technique proved effective |
| `[FEATURE-REQ]` | Discovered capability gaps | A needed but non-existent Skill |

### Promotion Trigger Conditions

When a `[LEARNING]` entry meets ALL of the following conditions, it should be promoted from memory/ to MEMORY.md:

1. **Recurring** — Same pattern appears in different tasks 2+ times
2. **Verified** — Not a guess, but actually executed and confirmed effective
3. **Broadly applicable** — Not limited to a single specific context

When a `[FEATURE-REQ]` recurs 2+ times, notify CHRO to assess whether a new Skill is needed (follow skill-development.md process).

## Cleanup Rules

- On the first day of each month, CHRO reviews the health of each Agent's MEMORY.md and LanceDB cold layer statistics (`memory stats`)
- memory/ logs older than 30 days are moved to archive (or deleted, depending on data value)
- For duplicate or contradictory memory entries, the newer entry takes precedence
- The cold layer is automatically managed by Time Decay + access reinforcement; CHRO monitors autoRecall hit rate as a signal-to-noise ratio metric (obtained via the `memory stats` command and recorded in CHRO's monthly report)

## Contingency & Rollback

- **Revert to built-in memory**: Remove the `plugins` section from openclaw.json and restart the gateway to revert to built-in SQLite memory
- **LanceDB data is not deleted**; it can be re-enabled at any time after rollback
- **MEMORY.md and memory/*.md are unaffected by the LanceDB plugin**; regardless of plugin state, hot/warm memory layers operate normally

## VP Layer Activation Criteria

When any of the following conditions are met, CHRO proposes VP layer activation during the monthly audit:
- autoRecall hit rate < 70% for 2 consecutive months (signal-to-noise ratio issue)
- A single C-level is managing > 3 distinct domains
- CTO Sub-Agent spawn frequency shows one domain accounting for > 60%

The value of VPs is not capacity expansion (LanceDB already solves that), but **domain focus** — giving each VP a narrower scope so that autoRecall precision is higher.
