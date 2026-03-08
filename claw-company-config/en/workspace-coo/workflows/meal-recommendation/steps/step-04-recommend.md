---
name: recommend
description: "Recommend: Produce 2-3 meal recommendations with reasons and cost estimates"
next-step: null
output-file: output/meals/recommendation-{{DATE}}.md
template: ../../templates/meal-recommendation.md
---

# Step 4: Recommend

**Progress: Step 4 of 4**

## Goal

Combine all collected information to produce 2-3 meal recommendations with reasons and estimated costs.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Synthesize Analysis

Integrate information from the previous three steps:
- Context (time, location, weather)
- Exclusion list and preference trends
- Budget range

### 2. Produce Recommendations

Read `{{INSTALL_DIR}}/workspace-coo/templates/meal-recommendation.md` and produce **2-3 recommendations** per template format, each including:
- Restaurant/dish name
- Recommendation reason (why it suits the current context)
- Estimated cost
- Highlights

### 3. Present to Chairman

Present recommendations to the Chairman via CEO, in a concise and clear format.

### 4. Record Result

After the Chairman decides, record the dining choice in `memory/` logs for future reference.

## Completion Criteria

- [ ] Produced 2-3 recommendations with reasons and costs
- [ ] Output formatted per template
- [ ] Presented to Chairman
- [ ] Recorded Chairman's choice to memory/

## Workflow Complete
