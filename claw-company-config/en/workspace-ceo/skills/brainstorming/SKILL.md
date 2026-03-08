---
name: ceo-brainstorming
description: CEO-led executive strategic brainstorming. Triggered when Chairman requests or CEO identifies the need. Pulls in relevant executives and uses the methodology technique library for structured creative exploration.
---

# CEO Executive Strategic Brainstorming

## Trigger Conditions

- **Direct trigger**: Chairman explicitly requests (e.g., "Let's brainstorm about XXX", "Help me think through directions for XXX")
- **Suggested trigger**: When CEO receives vague, strategic, or cross-departmental requirements, proactively suggest to the Chairman:
  > "This topic involves [reason], I recommend a brainstorming session before deciding on direction. What do you think?"

Only start the process after Chairman agrees.

---

## Step 1: Topic Definition

1. Confirm the brainstorming **topic** and **goal**.
2. Determine the topic type:
   - **Decision-type**: Need to choose among several directions (output: decision summary + action items)
   - **Exploration-type**: Open-ended exploration of possibilities (output: idea list + insights)
3. Based on the topic, use `sessions_send` to invite relevant executives to join:
   - Technical direction → CTO
   - Investment/business → CIO
   - Financial impact → CFO
   - Operations impact → COO
   - Organization/talent → CHRO
   - Pull in at least **2** relevant executives.

---

## Step 2: Select Technique Mode

Read `{{INSTALL_DIR}}/shared/brain-methods.csv` and present four modes to the Chairman:

> For the brainstorming session, how would you like to select thinking techniques?
>
> 1. **Self-select** — Browse 9 categories and pick techniques that interest you
> 2. **AI-recommended** — I'll recommend 2-3 techniques best suited to the topic
> 3. **Random** — Randomly draw techniques for serendipitous inspiration
> 4. **Progressive** — Automatically chain techniques from divergent to convergent

---

## Step 3: Technique Selection

### Mode 1 — Self-select

1. List all 9 categories with technique counts:
   - collaborative (5), creative (11), deep (8), introspective_delight (6), structured (7), theatrical (6), wild (8), biomimetic (3), quantum (3), cultural (4)
2. After Chairman selects a category, list all techniques in that category with name and brief description.
3. Chairman picks 1-3 techniques.

### Mode 2 — AI-recommended

Analyze the topic across these dimensions and recommend 2-3 techniques:
- **Goal analysis**: Innovation exploration → creative/wild categories; problem-solving → deep/structured
- **Complexity**: Complex/abstract → deep/structured; concrete/clear → creative/theatrical
- **Time**: Short session (< 30 min) → 1 technique; longer → multi-technique chain
- Include reasoning for each recommendation. Chairman may accept or re-select.

### Mode 3 — Random

Randomly draw 2 techniques from the CSV and present to Chairman:
- Show name, category, and description
- Chairman may accept or request re-draw

### Mode 4 — Progressive

Automatically design a multi-phase sequence:
1. **Divergent foundation** — Select 1 technique from creative or collaborative categories
2. **Deep exploration** — Select 1 technique from deep or structured categories
3. **Convergent synthesis** — Select 1 technique from structured category
Automatically progress to the next phase after each completes.

---

## Step 4: Execute Techniques

For each selected technique:

1. Explain the technique's rules and facilitation prompts to participants (from the CSV description field).
2. CEO facilitates the discussion:
   - First, collect perspectives from each executive's professional viewpoint (via `sessions_send`).
   - Consolidate executive perspectives and present to the Chairman.
   - Guide the Chairman to respond, extend, and build on ideas.
3. Execute **1-2 rounds** of dialogue per technique, recording all generated ideas.
4. **Anti-bias mechanism**: Every 10 accumulated ideas, deliberately shift the thinking domain to avoid semantic clustering.

---

## Step 5: Organize Output

Based on the topic type determined in Step 1:

### Decision-type Output

```
## Brainstorming Summary

### Topic
[Subject]

### Participants
CEO + [Executive list]

### Techniques Used
[Technique list]

### Key Insights
- [Insight 1]
- [Insight 2]

### Decision Options
| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| A      |      |      |                |
| B      |      |      |                |

### Recommended Action Items
1. [Action 1] — Owner: [Role]
2. [Action 2] — Owner: [Role]
```

### Exploration-type Output

```
## Brainstorming Summary

### Topic
[Subject]

### Participants
CEO + [Executive list]

### Techniques Used
[Technique list]

### Idea List
Grouped by theme:
#### Group A: [Theme]
- [Idea 1]
- [Idea 2]

#### Group B: [Theme]
- [Idea 3]

### Discovered Patterns & Insights
- [Insight 1]
- [Insight 2]

### Directions Worth Deeper Exploration
- [Direction 1]
- [Direction 2]
```

---

## Step 6: Report and Follow-up

1. Present the organized summary to the Chairman.
2. Based on Chairman's feedback, determine next steps:
   - Needs execution → Assign to relevant executives per assignment principles
   - Needs deeper exploration → Re-run this process or initiate targeted research
   - Archive for reference → Record in CEO memory
