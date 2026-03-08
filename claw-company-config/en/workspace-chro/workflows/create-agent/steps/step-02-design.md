---
name: design
description: "Design role spec (responsibilities, model tier, cost estimate, which Agents responsibilities are split from)"
next-step: ./step-03-build.md
output-file: null
template: null
---

# Step 2: Design Spec

**Progress: Step 2 of 5**

## Goal

Design the new Agent's role specifications including responsibilities, model, cost estimate, and responsibility sources.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Role Positioning

- **Role Name**: Chinese name + English abbreviation
- **Reports To**: Direct superior (CEO / Independent)
- **Position in Organization**: Reference company-rules.md org chart
- **Relationship with Existing Agents**: Collaboration patterns, information flow

### 2. Responsibility Design

- **Core Responsibilities**: 3-5 primary duties
- **Responsibility Sources**: Split from which existing Agents
  - Agents losing responsibilities need AGENTS.md updates
  - Confirm splitting does not impact original Agent's core functions
- **Responsibility Boundaries**: Clearly define "what NOT to do"
- **Heartbeat Logic**: What to check during periodic inspections

### 3. Model Selection

- **Recommended Model Tier**: smart / fast
- **Selection Rationale**: Based on task complexity and quality requirements
- **Estimated Monthly Token Consumption**: Reference similar Agent consumption

### 4. Cost Estimate

| Item | Estimate |
|------|----------|
| Monthly Token Consumption | |
| Monthly Cost (based on model pricing) | |
| Percentage of Total Budget | |
| Expected Benefits (time saved / quality improvement) | |

### 5. Channel Configuration

- Whether an independent Telegram Bot is needed (like CAO)
- Or share CEO's channel
- Cron schedule requirements

## Completion Criteria

- [ ] Role positioning defined
- [ ] Responsibilities designed with sources confirmed
- [ ] Model selected with rationale
- [ ] Cost estimated
- [ ] Channel configuration planned

## Next Step

👉 Proceed to [Step 3: Build Package](./step-03-build.md)
