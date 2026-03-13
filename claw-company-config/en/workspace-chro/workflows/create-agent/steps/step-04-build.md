---
name: build
description: "Build complete 6-file spec package using templates"
next-step: ./step-05-review.md
output-file: null
template: null
---

# Step 4: Build Spec Package

**Progress: Step 4 / 6 total**

## Objective

Build the complete 6-file spec package using the new Agent templates.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Execution Instructions

### 1. Read Templates and Format Standards

Read all template files under the `{{INSTALL_DIR}}/shared/templates/new-agent/` directory.

Also read format standards to ensure output meets specifications:
- `{{INSTALL_DIR}}/shared/standards/agent-format.md` — Agent definition file format specification
- `{{INSTALL_DIR}}/shared/standards/workflow-format.md` — Workflow file format specification (if new role includes workflows)

### 2. Build 6-File Spec Package

Based on the design spec from Step 2, populate templates to generate the following files:

#### IDENTITY.md
- Agent name (English name)
- Emoji identifier
- One-sentence role description

#### SOUL.md
- Personality traits and style
- Behavioral boundaries (must-do/must-not-do)
- Memory rules
- Interaction style with other Agents

#### AGENTS.md
- Startup required reading (pointing to shared/company-rules.md)
- Core responsibilities list
- Approval authority
- Collaboration relationships with other Agents

#### TOOLS.md
- Startup required reading (pointing to shared/tools-policy.md)
- Domain tool operating specifications

#### HEARTBEAT.md
- Heartbeat frequency
- Inspection items
- Smart silence judgment rules

#### MEMORY.md
- Initialized as blank structure
- Default category headings

### 3. Self-Check

- Are all 6 files complete
- Are `{{INSTALL_DIR}}` paths used correctly
- Is it consistent with company-rules.md
- Are responsibility boundaries free from conflicts with existing Agents

## Completion Criteria

- [ ] 6-file spec package has been built
- [ ] Self-check has passed
- [ ] All `{{INSTALL_DIR}}` paths are correctly referenced

## Next Step

👉 Proceed to [Step 5: Three-Party Review](./step-05-review.md)
