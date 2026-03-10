# Skill Development and Approval Process

## What is a Skill

A Skill is an executable capability module for an Agent (defined as SKILL.md in the skills/ directory), enabling the Agent to handle specific task types. Examples: CFO's bookkeeping Skill, CIO's portfolio monitoring Skill.

Skills fall into two categories:
- **Tool-type Skills**: Wrap external CLIs or APIs (e.g., Gog for Gmail, Github for PRs), requiring external tool installation and account credentials
- **Behavioral Skills**: Pure prompt methodologies (e.g., self-improvement, prose guidelines), no external dependencies

## Skill Visibility and Isolation

Each cc-* Agent's Skill visibility is controlled via the per-agent `skills` allowlist in openclaw.json:

- **Omit `skills` field** → All Skills loaded (default; not recommended for cc-* Agents)
- **`skills: ["gog", "summarize"]`** → Only specified Skills loaded
- **`skills: []`** → Complete block, zero Skills

The allowlist configuration is stored in `skill-allowlist.json`, read and injected into openclaw.json by install.js. Changing the allowlist requires following this approval process.

## New Skill Proposal

### Trigger Sources

- CHRO weekly review discovers capability gaps (recurring task failures or no dedicated Skill)
- CAO audit discovers process deficiencies requiring new Skill reinforcement
- CEO raises requirements based on Chairman's instructions
- Chairman directly requests
- CAO scan discovers unregistered global Skills (present in `~/.openclaw/skills/` but not registered in allowlist)

### Proposal Format

```
Skill Name: <skill-name>
Target Agent: <agent-id>
Type: Tool-type / Behavioral
Source: Internal / External (with source link)
Problem Solved: <describe the capability gap or requirement>
Functionality: <what the Skill does, how it is triggered>
Input/Output: <expected input format and output results>
Dependencies: <required tools, APIs, or account credentials>
Estimated Token Cost Impact: <estimated consumption per execution>
```

## Discovery (CTO Responsibility)

CTO can use `npx skills find <keyword>` to search the OpenClaw community Skill Registry, or browse the category index at https://skills.sh/.

After discovering candidate Skills, proceed to the security audit phase. **Direct installation is prohibited; security audit must pass first.**

## Security Audit (CTO Responsibility)

<!-- Source: Skill Vetter v1.0.0 | Absorbed: 2026-03-10 -->

### Step 1: Source Check

- Author credibility (Official OpenClaw > High-star repo > Known author > Unknown source)
- Download count / Stars / Last update date
- Whether open-source and auditable

### Step 2: 14 Red Flag Scan

Check SKILL.md and accompanying scripts/, hooks/, etc. for each item:

| # | Red Flag | Severity |
|---|---------|----------|
| 1 | curl/wget to unknown URLs | HIGH |
| 2 | Sending data to external servers | HIGH |
| 3 | Requesting user API keys or passwords | MEDIUM |
| 4 | Reading MEMORY.md / USER.md / SOUL.md | HIGH |
| 5 | base64 decode then execute | EXTREME |
| 6 | eval / exec of external input | EXTREME |
| 7 | Modifying system files (openclaw.json, AGENTS.md, etc.) | HIGH |
| 8 | Network calls using IP addresses instead of domains | HIGH |
| 9 | Obfuscated or minified code | HIGH |
| 10 | Requiring sudo privileges | EXTREME |
| 11 | Reading ~/.ssh or other credential directories | EXTREME |
| 12 | Writing to .bashrc / .zshrc / .profile | HIGH |
| 13 | Installing unknown packages as dependencies | MEDIUM |
| 14 | Disabling or bypassing security checks | EXTREME |

### Step 3: Permission Scope Assessment

- Which files need to be read/written
- Which CLI commands need to be executed
- Which external APIs or services need to be connected

### Step 4: Risk Classification and Response

| Risk Level | Condition | Response |
|-----------|-----------|----------|
| LOW | No red flags, read-only operations | Normal approval process |
| MEDIUM | 1-2 MEDIUM red flags | Enhanced review + normal approval |
| HIGH | Any HIGH red flag | Requires Chairman's special approval |
| EXTREME | Any EXTREME red flag | **Reject outright, do not install** |

### Audit Report Format

```
Skill Name: <name>
Audit Date: <date>
Auditor: CTO
Red Flags Found: <list all red flags, or "None">
Permission Scope: <read/write/execute/network>
Risk Level: LOW / MEDIUM / HIGH / EXTREME
Verdict: Pass / Enhanced review required / Chairman special approval required / Reject
```

## Classification and Routing (Additional Step for Behavioral Skills)

After passing security audit, behavioral Skills require further evaluation for internalization:

<!-- Source: Self Improving Agent v3.0.0 — Promotion mechanism | Absorbed: 2026-03-10 -->

### Overlap Assessment

Compare Skill content against existing company-rules.md, policies/, rules/, principles/:

| Overlap | New Value | Verdict |
|---------|-----------|---------|
| > 70% | ≤ 3 new concepts | **ABSORB** — Refine and write into existing files |
| < 30% | Large volume | **KEEP AS SKILL** — Retain as standalone Skill |
| — | ≈ 0 | **SKIP** — Do not install |
| Edge case | — | Chairman decides |

### ABSORB Execution Rules

1. Refine new value using the company's existing terminology and format, write into target files
2. Mark source in target files: `<!-- Source: <Skill Name> v<version> | Absorbed: <date> -->`
3. Register in the "Internalized Skill Tracking Table" in changelog.md
4. CHRO checks for upstream updates during monthly memory audit

## Approval Process

| Phase | Owner | Description |
|-------|-------|-------------|
| Proposal | CHRO / CAO / CEO | Propose Skill requirements and specifications |
| Discovery | CTO | Search community registry or review downloaded Skills |
| Security Audit | CTO | Source check + 14 red flags + permission scope + risk classification |
| Compliance Review | CAO | Confirm Skill does not violate security red lines or approval authority |
| Classification | CTO + CHRO | Tool-type → routing / Behavioral → overlap assessment |
| Approval | CEO | Yellow-light approval (standard Skills) |
| Final Approval | Chairman | Red-light approval (all external Skills are red-light) |

## Deployment

### Tool-type Skills / KEEP AS SKILL

1. Install to `~/.openclaw/skills/` (global)
2. Update `skill-allowlist.json` — add to target Agent's allowlist
3. Run `node install.js --update-skills` to inject allowlist into openclaw.json
4. Notify the target Agent that the new Skill is ready
5. Record in policies/changelog.md (tier-2 notification)

### ABSORB (Behavioral Skill Internalization)

1. Refine and write into target files (with source markup)
2. Record in the "Internalized Skill Tracking Table" in policies/changelog.md
3. Tier-3 notification

## Modifying Existing Skills

- Modifying a deployed Skill follows the same approval process as creating a new one
- Exception: Pure text revisions (no functional logic changes) can be done directly by CHRO with tier-3 notification
- Changing allowlist routing (which Agents can use a Skill) is treated as a Skill modification

## Deactivating / Removing Skills

- CHRO discovers during weekly review that a Skill has not been used for over 30 days
- Propose deactivation → CEO approves → Remove from allowlist → Archive SKILL.md → Record in changelog.md

## Internalized Skill Tracking Table

CHRO checks this table during monthly memory audit to compare upstream versions for worthwhile updates.

| Source Skill | Version | Internalized Date | Target File | Last Upstream Check |
|-------------|---------|-------------------|-------------|---------------------|
| Proactive Agent | v3.1.0 | 2026-03-10 | memory-policy.md | — |
| Self Improving Agent | v3.0.0 | 2026-03-10 | memory-policy.md, skill-development.md | — |
| Humanizer | v1.0.0 | 2026-03-10 | editorial-prose.md | — |
| Skill Vetter | v1.0.0 | 2026-03-10 | skill-development.md | — |
| Find Skills | v0.1.0 | 2026-03-10 | skill-development.md, CTO TOOLS.md | — |
