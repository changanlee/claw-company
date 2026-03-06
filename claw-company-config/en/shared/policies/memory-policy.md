# Memory Management Policy

## Three-Layer Memory Pyramid

### Layer 1: MEMORY.md (Hot Memory)
- **Limit**: 200 lines
- **Load timing**: Automatically loaded at the start of every session
- **Content**: Long-term principles, patterns, preferences, key decisions
- **Maintenance**: Check for duplicates before writing; archive old entries when approaching the limit

### Layer 2: memory/YYYY-MM-DD.md (Warm Memory)
- **Load timing**: Today's and yesterday's logs are automatically loaded
- **Content**: Daily events, conversation summaries, execution results
- **Format**: Timestamp + concise entry
- **Retention**: Archived by a cleanup cron job after 30 days

### Layer 2.5: Supabase (Structured Data) — Future Expansion
- **Load timing**: Agent queries on demand via Skills
- **Content**: CFO accounting records, CIO investment portfolio, COO schedule data
- **Status**: Not enabled during the founding phase; to be set up as data volume grows
- **Setup guide**: See shared/setup-guides/database-setup.md

### Layer 3: LanceDB (Cold Memory) — Future Expansion
- **Load timing**: On-demand semantic search
- **Content**: Archived historical logs, long-term knowledge base
- **Status**: Not enabled during the founding phase; to be set up by CTO as data volume grows
- **Setup guide**: See shared/setup-guides/database-setup.md

## Write Rules

1. First determine the information's time relevance:
   - Long-term (preferences, principles) -> MEMORY.md
   - Same-day (events, results) -> memory/YYYY-MM-DD.md
2. Before writing to MEMORY.md:
   - Check whether an identical or similar entry already exists
   - If so, update rather than add a new entry
   - If MEMORY.md exceeds 180 lines, clean up outdated entries first
3. Unified log format: `HH:MM — [Category] Content summary`

## Cleanup Rules

- On the first day of each month, CHRO reviews the health of each Agent's MEMORY.md
- memory/ logs older than 30 days are moved to archive (or deleted, depending on data value)
- For duplicate or contradictory memory entries, the newer entry takes precedence
