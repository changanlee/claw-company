---
name: select
description: "Select technique mode (self-select / AI recommendation / random / direct discussion)"
next-step: ./step-03-diverge.md
output-file: null
template: null
---

# Step 2: Select Technique

**Progress: Step 2 / 7**

## Goal

Read the brainstorming technique library and let the Chairman choose a thinking technique mode.

## Execution Rules

- 📖 Read the entire step file before taking any action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Read the Technique Library

Read `{{INSTALL_DIR}}/shared/brain-methods.csv`.

### 2. Present Four Modes

Offer the Chairman a choice:

> Before we begin brainstorming, how would you like to select a thinking technique?
>
> 1. **Self-select** — Browse the 9 categories and pick a technique you're interested in
> 2. **AI recommendation** — I recommend 2-3 techniques best suited to this topic
> 3. **Random** — Pick randomly to spark unexpected inspiration
> 4. **Direct discussion** — Skip techniques and go straight into Q&A discussion

#### Mode 1 — Self-select

1. List all 9 categories with the number of techniques in each.
2. Once the Chairman picks a category, list all techniques in that category.
3. The Chairman selects 1-3 techniques.

#### Mode 2 — AI Recommendation

Recommend 2-3 techniques based on the nature of the topic, with reasoning for each recommendation.

#### Mode 3 — Random

Randomly pick 2 techniques and display their names and descriptions. Re-draw is allowed.

#### Mode 4 — Direct Discussion

Skip techniques and go directly into traditional Q&A-style discussion.

## Completion Criteria

- [ ] Technique library has been read
- [ ] Chairman has selected a mode and technique(s) (or chosen direct discussion)

## Next Step

👉 Go to [Step 3: Diverge](./step-03-diverge.md)
