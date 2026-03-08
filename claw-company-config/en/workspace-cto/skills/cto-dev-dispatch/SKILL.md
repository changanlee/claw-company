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
5. After confirming the design direction, proceed to 1.5 Implementation Plan.

### 1.5 Implementation Plan Draft

After the technical design document is approved, Atlas organizes key decisions, component structure, and constraints into a **structured implementation plan** as the single source of truth for all subsequent phases.

The implementation plan includes:
1. **Goals & Constraints** (from brainstorming conclusions)
2. **Component/Module List** (from the technical design document)
3. **Dependencies & Execution Order** (Atlas's judgment)
4. **Risk Items** (risks identified during brainstorming)
5. **Scale Pre-assessment** (large/small, providing input for Phase 2)

This plan does not require additional approval (already covered by the design document approval), but must be completed before entering scale assessment.

> Reference: Superpowers methodology: writing-plans — have a structured plan first, then assess scale and dispatch.

### ⛔ Brainstorming Hard Gate

Before the Chairman approves the design document, the following are **forbidden**:
- Entering the task breakdown phase
- Spawning any engineer Sub-Agent
- Writing any production code or scaffolding

Violation check: If you find yourself thinking "the design is clear enough, no need to discuss," that is your signal that discussion is needed.

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

### ⛔ SDD Hard Gate (Full Flow Only)

Before entering Phase 4, **all** of the following must be confirmed:

1. PRD approved by CEO (yellow light passed)
2. Architecture spec approved by CEO (yellow light passed)
3. Epic breakdown complete, each story includes testable acceptance criteria
4. Execute check-readiness verification (spawn PM or Architect to run `workflows/3-solutioning/check-readiness/workflow.md`)
5. check-readiness result is **PASS**

❌ If any condition is unmet, **entering Phase 4 is FORBIDDEN**.

Violation check: If you're thinking "the spec is good enough, let's start coding," that is exactly what the SDD iron law is designed to intercept. Read `rules/sdd-iron-law.md` to confirm.

### Lean Flow SDD Check

Lean flow does not run the check-readiness workflow, but tasks broken down by Atlas **must**:
- Include testable acceptance criteria for each task
- Have clearly defined and verifiable expected output
- Comply with `rules/sdd-iron-law.md` clause 7

### Test Strategy Decision (Full Flow Optional)

After check-readiness passes, decide whether to plan a test strategy upfront based on requirement complexity:

- **High risk/complexity**: Spawn QA engineer (`engineers/qa.md`) to execute `workflows/tea/test-design/workflow.md`, producing a test plan as reference input for Dev engineers
- **Normal requirements**: Skip — Dev engineers handle coverage within the TDD workflow
- **Mandatory triggers**: If security, payments, multi-system integration, or user data processing is involved → always spawn QA for test strategy planning

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

3. **Sub-Agent dispatch principles:**
   - **Fresh agent per task** — Spawn a new engineer for each task. Never reuse a previous task's sub-agent. Prevents context pollution.
   - **Controller does not fix** — When a reviewer finds issues, spawn a new implementer to fix. Atlas never modifies code directly.
   - Engineers should ask Atlas when uncertain rather than guessing.

4. **Compose spawn instruction.** Each spawn task's task field **must** include the following structure:

```
【Task Description】
{Specific goals, scope, constraints}

【Expected Output】
{Deliverable list}

【Workflow】
Read and follow: `workflows/{path}/workflow.md`

【Iron Law Injection】
Before starting work, read the following iron law rules and strictly comply:
{Rule paths from the reference table below}

【Report Format】
Use the standard report format from the engineer's definition file.
```

#### Iron Law Injection Reference Table

| Task Type | Injected Rules |
|-----------|---------------|
| New Feature (Dev) | `rules/tdd-iron-law.md` + `rules/verification.md` + `rules/sdd-iron-law.md` |
| Bug Fix (Dev) | `rules/debugging-iron-law.md` + `rules/tdd-iron-law.md` + `rules/verification.md` |
| Refactor (Dev) | `rules/tdd-iron-law.md` + `rules/verification.md` |
| Spec Tasks (PM/Architect) | `rules/sdd-iron-law.md` + `rules/verification.md` |
| Test Tasks (QA) | `rules/tdd-iron-law.md` + `rules/verification.md` |
| Review Tasks (Scout/Knox) | Per the `rules` field in the engineer's definition file |

Iron law path format: `{{INSTALL_DIR}}/workspace-cto/rules/{rule-name}.md`

⚠️ **No-exception rule**: Regardless of engineer seniority or task simplicity, iron law injection is executed 100% of the time. "This engineer is senior enough to skip injection" is an anti-rationalization excuse.

5. **Select and spawn engineer.** Choose the appropriate engineer:
   - Standard tasks: spawn Dev (Amelia) from `engineers/dev.md`
   - Small standalone features: spawn Solo Dev (Barry) from `engineers/solo-dev.md`
   - Multiple independent tasks: spawn multiple Dev engineers in parallel

---

## Phase 5: Two-Phase Review

### Simplified Workflow (Single Phase)
1. Spawn Code Reviewer from `engineers/code-reviewer.md` to review the completed work.
2. Code Reviewer produces a categorized issue report (Critical/Important/Minor).
3. Results report directly to Atlas.
4. Any Critical issues: spawn a new Dev engineer to fix (Atlas does not fix directly), then re-review.
5. After passing, Atlas summarizes results and reports to CEO.

### Full Workflow (Two Phases)

**Phase 1: Spec Compliance Review**
1. Spawn Spec Reviewer from `engineers/spec-reviewer.md`.
2. Spec Reviewer independently reads the code and verifies acceptance criteria item by item.
3. Non-compliant: spawn a new Dev engineer to fix (Atlas does not fix directly), then re-submit for Spec Review.
4. After compliance, proceed to Phase 2.

**Phase 2: Code Quality Review**
1. Spawn Code Reviewer from `engineers/code-reviewer.md`.
2. Code Reviewer reviews code quality, architecture, security, performance.
3. Any Critical or Important issues: spawn a new Dev engineer to fix (Atlas does not fix directly), then re-review.
4. After all issues resolved, Atlas summarizes results and reports to CEO.

**After all tasks complete**, optionally spawn a final reviewer to check overall implementation consistency.

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

### Quality Gate
- All tests passing (zero failures).
- Spec compliance review passed (full workflow).
- Code review with no Critical issues.
- Acceptance criteria verified item by item.
- Verification evidence included in report.

### Test Quality Review (Full Flow Optional)

After the quality gate passes, Atlas may optionally spawn QA engineer to execute `workflows/tea/test-review/workflow.md`:
- **Trigger conditions**: Insufficient test coverage, complex logic not covered by tests, or a test plan from Phase 3 that needs verification
- **Output**: Test quality report with improvement recommendations
- **Non-blocking**: Test quality review results do not block delivery, but recommendations should be included in the next Sprint's improvement items
