---
name: step-01-load
description: "Load existing PRD"
next-step: ./step-02-identify.md
---

# Step 1: Load Existing PRD

**Progress: Step 1 of 4** — Next: Identify Changes

## Objective

Find and load the existing PRD file, parse its current content structure.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Find existing PRD

Search the `{{INSTALL_DIR}}/workspace-cto/output/planning/` directory for the PRD file to edit.

If the CTO specified a file path, use that path directly.

### 2. Load PRD content

Read the complete PRD file, including frontmatter and all sections.

### 3. Parse content structure

Identify the PRD's current structure:

- Section titles and content summaries
- Number of functional requirements and priority distribution
- Number of user stories
- Non-functional requirements list
- Known risks list

## Completion Criteria

- ✅ PRD file loaded
- ✅ Content structure parsed and understood

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-identify.md`
