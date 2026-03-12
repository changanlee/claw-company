---
name: build
description: "Build complete 6-file spec package using templates"
next-step: ./step-04-review.md
output-file: null
template: null
---

# Step 3: Build Package

**Progress: Step 3 of 5**

## Goal

Build a complete 6-file spec package using the new Agent templates.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Read Templates and Format Standards

Read all template files in `{{INSTALL_DIR}}/shared/templates/new-agent/`.

Also read format standards to ensure outputs comply with conventions:
- `{{INSTALL_DIR}}/shared/standards/agent-format.md` — Agent definition file format standard
- `{{INSTALL_DIR}}/shared/standards/workflow-format.md` — Workflow file format standard (if new role includes workflows)

### 2. Build 6-File Spec Package

Based on the design spec from Step 2, fill in the templates to generate:

#### IDENTITY.md
- Agent name (English)
- Emoji identifier
- One-line role description

#### SOUL.md
- Personality traits and style
- Behavioral boundaries (must-do / must-not-do)
- Memory rules
- Interaction style with other Agents

#### AGENTS.md
- Startup read instructions (pointing to shared/company-rules.md)
- Core responsibilities list
- Approval authorities
- Collaboration relationships with other Agents

#### TOOLS.md
- Startup read instructions (pointing to shared/tools-policy.md)
- Domain tool operating guidelines

#### HEARTBEAT.md
- Heartbeat frequency
- Inspection items
- Smart silence judgment rules

#### MEMORY.md
- Initialize with blank structure
- Default category headings

### 3. Self-Review

- Are all 6 files complete
- Are `{{INSTALL_DIR}}` paths correctly used
- Is it consistent with company-rules.md
- Do responsibility boundaries conflict with existing Agents

## Completion Criteria

- [ ] 6-file spec package built
- [ ] Self-review passed
- [ ] All `{{INSTALL_DIR}}` paths correctly referenced

## Next Step

👉 Proceed to [Step 4: Tripartite Review](./step-04-review.md)
