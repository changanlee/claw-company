---
name: brainstorm
description: "Brainstorm: Select thinking techniques, diverge then converge to a technical design"
next-step: ./step-02-scale-assessment.md
output-file: output/planning/technical-design.md
template: null
---

# Step 1: Brainstorm

**Progress: Step 1 of 5**

## Goal

Through a structured brainstorming process, explore technical possibilities from the requirement, then converge to 2-3 technical solutions for the Chairman to choose from, producing a technical design document.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Preparation

1. Read `engineers/roster.md` to understand all available engineer roles.
2. Based on the requirement, automatically select relevant engineer roles to join the discussion (e.g., include UX Designer for frontend work, Architect for architecture decisions).
3. The Chairman may request additional roles at any time (e.g., "Have QA take a look too"), Atlas adjusts immediately.

### 2. Select Technique Mode

Read `{{INSTALL_DIR}}/shared/brain-methods.csv` and offer the Chairman four modes:

> Before we start brainstorming, which approach would you like for selecting thinking techniques?
>
> 1. **Self-select** — Browse 9 categories and pick techniques that interest you
> 2. **AI Recommend** — I'll recommend 2-3 techniques best suited to the requirement
> 3. **Random** — Random selection for surprise inspiration
> 4. **Direct Discussion** — Skip techniques, go straight to Q&A-style design discussion

#### Mode 1 — Self-select

1. List 9 categories with the number of techniques in each.
2. After the Chairman selects a category, list all techniques with name and brief description.
3. Chairman picks 1-3 techniques.

#### Mode 2 — AI Recommend

Analyze the following dimensions to recommend 2-3 techniques:
- **Goal analysis**: Innovation exploration → creative/wild types; Problem solving → deep/structured types
- **Complexity**: Complex/abstract → deep/structured; Concrete/clear → creative/theatrical
- **Time**: Short timeframe → 1 technique; Long timeframe → chain multiple techniques
- Include reasoning. Chairman may accept or choose alternatives.

#### Mode 3 — Random

Randomly select 2 techniques from the CSV, showing name, category, and description. Chairman may accept or re-roll.

#### Mode 4 — Direct Discussion

Skip technique selection, proceed directly to traditional Q&A-style design discussion (backward compatible with original flow).

### 3. Execute Techniques

For each selected technique (Mode 4 skips this step):

1. Explain the technique's rules and guiding questions to the Chairman (from the CSV description field).
2. Incorporate perspectives from selected engineer roles to guide divergent thinking.
3. Execute **1-2 rounds** of dialogue per technique, recording generated ideas.
4. **Anti-bias mechanism**: After every 10 accumulated ideas, deliberately switch thinking angles.

### 4. Converge to Design Solutions

Regardless of mode, this step is consistent:

1. Based on brainstorming (or direct discussion) results, propose **2-3 technical solutions** with pros/cons analysis.
2. Ask only **one question** at a time, wait for answer before continuing.
3. After Chairman approval, produce a **technical design document** containing:
   - Confirmed solution overview
   - Key decision points and rationale
   - Technical constraints and boundaries
   - Expected component/module structure
4. The technical design document serves as input for subsequent phases (scale assessment, task breakdown).

## Completion Criteria

- [ ] Read roster.md and selected relevant engineer roles
- [ ] Completed brainstorming (technique mode or direct discussion)
- [ ] Converged to 2-3 technical solutions with pros/cons analysis
- [ ] Chairman approved design direction
- [ ] Produced technical design document

## Next Step

👉 Proceed to [Step 2: Scale Assessment](./step-02-scale-assessment.md)
