---
name: step-02-generate
description: "Generate project-context.md"
next-step: ./step-03-validate.md
output-file: project-context.md
template: null
---

# Step 2: Generate Project Context

**Progress: Step 2 of 3** — Next: Validate accuracy

## Objective

Organize scan results into a structured project-context.md for AI Agents to quickly understand the project.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions

### 1. Write Project Context

Generate `project-context.md` with the following structure:

```markdown
# Project Context: {Project Name}

## Project Overview
- Purpose/goal
- Main features

## Tech Stack
- Languages and versions
- Frameworks
- Key dependencies

## Architecture
- Architecture pattern
- Directory structure (concise version)
- Main module descriptions

## Conventions
- Naming conventions
- Code style
- Git conventions

## Development Commands
- Install dependencies
- Start development server
- Run tests
- Build

## Important Notes
- Known limitations
- Special configurations
- Common pitfalls
```

### 2. Control Length

- Target length: 200-400 lines
- Distill important information, don't pile on details
- An AI Agent should be able to start development immediately after reading

### 3. Write File

Write project-context.md to the `output/implementation/` directory.

## Completion Criteria

- ✅ project-context.md generated
- ✅ All sections filled in
- ✅ Length within 200-400 lines
- ✅ File written to the specified directory

## Next Step

After confirming all completion criteria are met, read and follow: `./step-03-validate.md`
