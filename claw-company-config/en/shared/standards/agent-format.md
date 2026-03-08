# Agent Definition Format Standard

This document defines the standard file formats for all Agents (C-suite and Sub-Agents), mapping BMAD Method structures to OpenClaw native files.

---

## Scope

- **Level 1 — C-suite Agents:** CEO, CFO, CIO, COO, CTO, CHRO, CAO
- **Level 2 — Sub-Agents:** 10 engineer role types under CTO (created via `sessions_spawn`)

---

## C-suite Agent Format

OpenClaw automatically loads the following files into the system prompt. Each file corresponds to a BMAD concept.

### IDENTITY.md (maps to BMAD Agent Metadata)

```yaml
---
name: "Display Name"
title: "Role Title"
icon: "emoji"
---
```

Free-form self-introduction. The IDENTITY.md frontmatter provides structured metadata queryable by other Agents or the system.

### SOUL.md (maps to BMAD Persona)

```markdown
# {title}

## Identity
You are the {title} of Chairman's one-person company, responsible for {one-line description}.
(= BMAD role + identity)

## Principles
(= BMAD principles, structured list, 5-8 core principles)
- Principle 1 — Explanation
- Principle 2 — Explanation

## Communication Style
(= BMAD communication_style)
- Language preferences
- Expression style
- Format preferences

## Boundaries (OpenClaw-specific, no BMAD equivalent)
- Prohibited action 1
- Prohibited action 2

## Memory Management
- MEMORY.md usage strategy
- memory/ logging strategy
```

**Design rationale:**
- The Principles section is the core BMAD upgrade — converting prose descriptions into structured, enumerated items
- Each principle should be verifiable (CAO can audit against them item by item)
- The Boundaries section is our governance-specific design, explicitly defining lines an Agent must not cross

### AGENTS.md (maps to BMAD Activation + Menu)

```markdown
## Required Reading on Startup — Company Rules
(= BMAD activation step 1-2)

At the start of every session, you must first use the read tool to load and follow all rules in:
- `{{INSTALL_DIR}}/shared/company-rules.md`

Only begin executing tasks after reading and understanding the company rules.

---

### Path Configuration
(replaces BMAD config.yaml — embedded in AGENTS.md for automatic bootstrap loading)

| Item | Path |
|------|------|
| Workflows | {{INSTALL_DIR}}/workspace-xxx/workflows/ |
| Templates | {{INSTALL_DIR}}/workspace-xxx/templates/ |
| Output | {{INSTALL_DIR}}/workspace-xxx/output/ |
| Shared Tasks | {{INSTALL_DIR}}/shared/tasks/ |

### Available Workflows
(= BMAD Menu — context-triggered routing)

When receiving instructions or events, trigger the appropriate workflow based on context. Use the read tool to load workflow.md and follow its instructions.

| Trigger Context | Workflow | Type | Description |
|----------------|---------|------|-------------|
| {context description} | workflows/xxx/workflow.md | Interactive/Executable/Automatic | {one-liner} |

**Workflow Type Definitions:**
- **Interactive:** Requires interaction with Chairman or other Agents; executed directly by this Agent
- **Executable:** Well-defined input and output; can be delegated to a spawned Sub-Agent
- **Automatic:** Triggered by heartbeat or cron; no human intervention needed

### {Role} Responsibilities and Workflows
(existing content, upgraded as needed)
```

**Design rationale:**
- Path configuration replaces BMAD's config.yaml, since OpenClaw does not auto-load yaml files
- The workflow table replaces BMAD's XML menu for better readability
- Workflow type classification determines execution method (direct execution vs spawn)

### TOOLS.md (maps to BMAD Capabilities)

Maintains existing structure:
- Required reading on startup → shared/tools-policy.md
- Domain-specific tool operation guidelines

### HEARTBEAT.md (OpenClaw-specific)

Maintains existing structure. No BMAD equivalent.

### MEMORY.md (maps to BMAD Sidecar Memory)

Maintains existing three-tier memory system. Our memory system already surpasses BMAD's design.

---

## Sub-Agent (Engineer) Format

Sub-Agents are created via `sessions_spawn` and automatically receive 5 standard files (AGENTS.md, TOOLS.md, SOUL.md, IDENTITY.md, USER.md). Engineer definition files (engineers/*.md) are injected through the spawn `task` field.

### Engineer Definition File Format (engineers/*.md)

```markdown
---
name: "engineer-id"
title: "Role Title"
icon: "emoji"
capabilities: "capability description"
rules:
  - tdd-iron-law.md
  - verification.md
sidecar: false
---

# {Display Name} ({title})

## Activation Steps
(= BMAD activation, executed sequentially upon receiving the definition)

1. Read this definition; load identity and working methods.
2. Read CTO-injected iron rules (rules/ content included in the spawn task).
3. If a workflow is specified, read the first step file of that workflow.
4. {role-specific activation steps}

## Identity
- **Communication style:** {description}
- **Principles:**
  - {principle 1}
  - {principle 2}

## Capabilities
- {capability 1}
- {capability 2}

## Available Workflows
(= BMAD menu, listing workflows this engineer can execute)

| Code | Workflow | Description |
|------|---------|-------------|
| {CODE} | workflows/path/workflow.md | {description} |

## Working Methods
- {behavior 1}
- {behavior 2}

## Report Format
(standardized across all engineers)

- [Task Result] Completed/Failed + specific deliverable description
- [Issues Encountered] Obstacles faced and how they were resolved
- [Recommendations & Lessons] Reusable insights or pitfalls to note
- [Verification Evidence] {role-relevant verification items}

## Applicable Rules
- `rules/{rule}.md` — {description}
```

**Design rationale:**
- YAML frontmatter provides machine-parseable metadata (referenced by CTO's roster.md)
- Activation steps are linear, not BMAD's XML activation format (better suited for LLM comprehension)
- Available workflows let the Sub-Agent know its capabilities; CTO can specify a particular workflow at spawn time
- The sidecar field indicates whether this engineer has a dedicated memory directory (e.g., tech-writer's documentation-standards.md)

---

## Format Reference Index

| File | BMAD Concept | Auto-loaded | Applies To |
|------|-------------|-------------|------------|
| IDENTITY.md | Agent Metadata | Yes | All |
| SOUL.md | Persona | Yes | All |
| AGENTS.md | Activation + Menu + Config | Yes | All |
| TOOLS.md | Capabilities | Yes | All |
| HEARTBEAT.md | (no equivalent) | Yes (main session) | C-suite |
| MEMORY.md | Sidecar Memory | Yes (main session) | C-suite |
| engineers/*.md | Agent Definition | No (spawn injection) | Sub-Agent |
| workflows/*/workflow.md | Workflow Entry | No (Agent read) | All |
| workflows/*/steps/*.md | Workflow Steps | No (Agent read) | All |
| templates/*.md | Output Templates | No (Agent read) | All |
| output/*/ | Output Directory | No (Agent write) | All |

---

## Character Limit Considerations

OpenClaw bootstrap files are subject to the following limits:
- Single file maximum: 20,000 characters (`bootstrapMaxChars`)
- Truncation strategy: 70% from head + 20% from tail
- Total bootstrap maximum: 150,000 characters (`bootstrapTotalMaxChars`)

**Therefore:**
- The "Available Workflows" table in AGENTS.md should be concise (list only trigger contexts and paths; detailed descriptions belong in workflow.md)
- Use tables instead of prose for path configuration to save characters
- Place complex process logic in workflow micro-files, not in AGENTS.md
