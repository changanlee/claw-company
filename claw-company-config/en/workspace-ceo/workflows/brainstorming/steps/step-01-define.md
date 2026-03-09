---
name: define
description: "Define topic + invite relevant executives"
next-step: ./step-02-select.md
output-file: null
template: null
---

# Step 1: Define Topic

**Progress: Step 1 of 5**

## Objective

Clearly define the brainstorming topic scope and invite relevant executives to join the discussion.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Reference Principle

Read `{{INSTALL_DIR}}/shared/principles/brainstorming.md` — Clarify the problem before acting, explore multiple possibilities before converging.

## Instructions

### 1. Define Topic

Confirm with the Chairman:

- Core question of the topic
- Expected output (decision direction / creative proposals / problem solutions)
- Scope boundaries (what is out of scope)

### 2. Invite Executives

Based on the topic nature, use `sessions_send` to invite relevant executives:

| Topic Type | Suggested Invitees |
|-----------|-------------------|
| Finance/Cost | CFO |
| Investment/Market | CIO |
| Lifestyle/Operations | COO |
| Technology/Product | CTO |
| Organization/HR | CHRO |
| Risk/Compliance | CAO |
| Strategic | All |

### 3. Brief Executives on the Topic

Send topic background and expected contribution direction to invited executives.

## Completion Criteria

- [ ] Topic clearly defined
- [ ] Relevant executives invited
- [ ] Executives received topic briefing

## Next Step

-> Proceed to [Step 2: Select Technique](./step-02-select.md)
