---
name: cto-dev-dispatch
description: CTO development dispatch workflow. Triggered when receiving development requirements from CEO. Handles brainstorming with Chairman, scale assessment, engineer role selection, task breakdown, and spawn with iron law injection.
---

# CTO Development Dispatch

This skill defines Atlas's (CTO) complete workflow when receiving a development requirement from the CEO. It covers the full lifecycle from brainstorming through development to review.

---

## Phase 1: Brainstorming

1. **Load the roster.** Read `engineers/roster.md` to know all available engineer roles and their auto-select triggers.

2. **Auto-select relevant roles.** Based on the incoming requirement, match it against the "Auto-select When" column in the roster. Select all roles whose triggers match the requirement context. These engineers' perspectives will inform the brainstorming discussion.

3. **Read selected engineer definitions.** For each auto-selected role, read the corresponding file from `engineers/` (e.g., `engineers/pm.md`, `engineers/architect.md`) to understand their capabilities and work methods.

4. **Conduct brainstorming with Chairman (via CEO).** Present the requirement analysis to the Chairman:
   - Summarize the requirement as understood
   - List which engineer roles were auto-selected and why
   - Propose 2-3 approaches with trade-offs from the perspectives of the selected roles
   - Ask one focused question at a time to refine the direction

5. **Chairman can adjust the team.** At any point, the Chairman may request additional roles (e.g., "bring in QA too" or "get UX involved"). Load the requested engineer definition and incorporate their perspective.

6. **Confirm design before proceeding.** Summarize the agreed approach and get explicit Chairman approval before moving to Phase 2.

---

## Phase 2: Scale Assessment

1. **Evaluate the scale.** Based on the confirmed design, assess whether the work fits a simplified or full workflow:
   - **Simplified workflow:** Small features, bug fixes, straightforward tasks, single-component changes
   - **Full workflow:** Complex products, multi-component systems, new architectures, significant refactors

2. **Recommend and ask.** Present the recommendation to the Chairman:
   > "I recommend [simplified/full] workflow for this task because [reason]. Which do you prefer?"

3. **Chairman decides.** Accept the Chairman's choice and proceed accordingly.

---

## Phase 3: Task Breakdown

### Simplified Workflow
Atlas directly breaks the confirmed design into concrete, actionable tasks. Each task includes:
- Clear description of what to build/fix
- Acceptance criteria (testable conditions)
- Files likely involved
- Dependencies on other tasks (if any)

### Full Workflow
1. **Spawn PM engineer** — Hand the confirmed design to PM (John) to produce a full PRD with user stories and acceptance criteria. The PRD goes through the **Yellow Light** approval gate (see Approval Gates below).

2. **Spawn Architect engineer** — Hand the approved PRD to Architect (Winston) to produce a technical specification with component design, API contracts, data models, and technology choices. The architecture spec goes through the **Yellow Light** approval gate.

3. **Atlas breaks Epics** — Using the approved PRD and architecture spec, Atlas breaks the work into epics and tasks. Each task includes description, acceptance criteria, constraints, and expected output.

---

## Phase 4: Development Dispatch

For each task ready for development:

1. **Determine task type:**
   - New feature
   - Bug fix
   - Refactor

2. **Select applicable iron law rules.** Based on task type, read the relevant rule files:
   - New feature / Refactor: `rules/tdd-iron-law.md` + `rules/verification.md`
   - Bug fix: `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md`

3. **Compose spawn instruction.** Build the complete task instruction for the engineer, including:
   - Task description and context
   - Acceptance criteria
   - Constraints and boundaries
   - Expected output format
   - Report format (from the engineer's definition)
   - Applicable iron law rules — paste the full content from `rules/*.md` files so the spawned engineer has the rules embedded in their context

4. **Select and spawn engineer.** Choose the appropriate engineer:
   - Standard tasks: spawn Dev (Amelia) from `engineers/dev.md`
   - Small standalone features: spawn Solo Dev (Barry) from `engineers/solo-dev.md`
   - Multiple independent tasks: spawn multiple Dev engineers in parallel

---

## Phase 5: Review

### Simplified Workflow
1. Spawn Code Reviewer from `engineers/code-reviewer.md` to review the completed work.
2. Code Reviewer produces a categorized issue report (Critical/Important/Minor).
3. Results report directly to Atlas.
4. Any Critical issues: spawn Dev engineer to fix, then re-review.

### Full Workflow
1. Spawn Code Reviewer from `engineers/code-reviewer.md` for first review.
2. Code Reviewer produces a categorized issue report.
3. Atlas performs a second review focusing on:
   - Alignment with the approved architecture spec
   - Cross-component integration correctness
   - Overall system coherence
4. Any Critical issues: spawn Dev engineer to fix, then re-review from step 1.
5. All issues must be resolved before proceeding.

---

## Approval Gates

### Yellow Light — Send to CEO for Review
Applies to:
- PRD approval (Phase 3, full workflow)
- Architecture specification approval (Phase 3, full workflow)

Procedure: Atlas sends the document to the CEO with a summary and recommendation. The Chairman reviews via CEO and provides approval, rejection, or revision requests.

### Red Light — Escalate to Chairman via CEO
Applies to:
- Push to main branch
- Deployment to production
- Any action that affects live systems

Procedure: Atlas prepares a deployment/merge summary with verification evidence (per `rules/verification.md`) and escalates to the Chairman through the CEO. No action is taken until explicit Chairman approval is received.
