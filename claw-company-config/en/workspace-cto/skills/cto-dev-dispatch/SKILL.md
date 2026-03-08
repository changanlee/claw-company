---
name: cto-dev-dispatch
description: CTO development dispatch workflow. Triggered when receiving development requirements from CEO. Handles brainstorming with Chairman, scale assessment, engineer role selection, task breakdown, and spawn with iron law injection.
---

# CTO Development Dispatch

This skill defines Atlas's (CTO) complete workflow when receiving a development requirement from the CEO. It covers the full lifecycle from brainstorming through development to review.

---

## Phase 1: Brainstorming

### 1.1 Preparation

1. **Load the roster.** Read `engineers/roster.md` to know all available engineer roles and their auto-select triggers.
2. **Auto-select relevant roles.** Based on the incoming requirement, match it against the "Auto-select When" column in the roster. Select all roles whose triggers match the requirement context.
3. **Read selected engineer definitions.** For each auto-selected role, read the corresponding file from `engineers/` to understand their capabilities and work methods.
4. **Chairman can adjust the team.** At any point, the Chairman may request additional roles (e.g., "bring in QA too"). Load the requested engineer definition and incorporate their perspective.

### 1.2 Select Technique Mode

Read `{{INSTALL_DIR}}/shared/brain-methods.csv` and present four modes to the Chairman:

> Before we start brainstorming, how would you like to select thinking techniques?
>
> 1. **Self-select** — Browse 9 categories and pick techniques that interest you
> 2. **AI-recommended** — I'll recommend 2-3 techniques best suited to this requirement
> 3. **Random** — Randomly draw techniques for serendipitous inspiration
> 4. **Direct discussion** — Skip techniques and go straight to Q&A-style design discussion

#### Mode 1 — Self-select

1. List all 9 categories with technique counts.
2. After Chairman selects a category, list all techniques with name and brief description.
3. Chairman picks 1-3 techniques.

#### Mode 2 — AI-recommended

Analyze the requirement across these dimensions and recommend 2-3 techniques:
- **Goal analysis**: Innovation exploration → creative/wild categories; problem-solving → deep/structured
- **Complexity**: Complex/abstract → deep/structured; concrete/clear → creative/theatrical
- **Time**: Short session → 1 technique; longer → multi-technique chain
- Include reasoning for each recommendation. Chairman may accept or re-select.

#### Mode 3 — Random

Randomly draw 2 techniques from the CSV. Show name, category, and description. Chairman may accept or request re-draw.

#### Mode 4 — Direct discussion

Skip technique selection and go straight to traditional Q&A-style design discussion (backward-compatible with original flow).

### 1.3 Execute Techniques

For each selected technique (Mode 4 skips this step):

1. Explain the technique's rules and facilitation prompts to the Chairman (from the CSV description field).
2. Incorporate perspectives from the auto-selected engineer roles to guide divergent thinking.
3. Execute **1-2 rounds** of dialogue per technique, recording all generated ideas.
4. **Anti-bias mechanism**: Every 10 accumulated ideas, deliberately shift the thinking angle.

### 1.4 Converge into Design

Regardless of which mode was used, this step is consistent:

1. Based on brainstorming (or direct discussion) results, propose **2-3 technical approaches** with trade-off analysis.
2. Ask **one focused question at a time**, wait for an answer before continuing.
3. After Chairman approval, produce a **technical design document** containing:
   - Confirmed approach overview
   - Key decision points and rationale
   - Technical constraints and boundaries
   - Expected component/module structure
4. The technical design document serves as input for subsequent phases (scale assessment, task breakdown).
5. After confirming the design direction, proceed to the next phase.

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
