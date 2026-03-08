---
name: step-01-scan
description: "Scan project structure, tech stack, and key files"
next-step: ./step-02-generate.md
output-file: null
template: null
---

# Step 1: Scan Project

**Progress: Step 1 of 3** — Next: Generate project-context.md

## Objective

Perform a comprehensive project scan to collect information on architecture, tech stack, conventions, etc.

## Execution Rules

- 📖 Read the entire step before acting
- 🚫 Don't pre-read next steps
- 🚫 Don't skip steps

## Execution Instructions

### 1. Scan Project Structure

- List the top-level directory structure
- Identify major modules and components
- Note the directory organization pattern (by feature / by layer / other)

### 2. Identify Tech Stack

- **Languages**: Primary languages and versions
- **Frameworks**: Frameworks used and versions
- **Package Management**: package.json / requirements.txt / go.mod etc.
- **Build Tools**: webpack / vite / make etc.
- **Testing Frameworks**: jest / pytest / go test etc.
- **CI/CD**: GitHub Actions / GitLab CI etc.

### 3. Scan Key Files

Read the following files (if they exist):

- Configuration files (package.json, tsconfig.json, etc.)
- Entry files (main.ts, app.py, cmd/main.go, etc.)
- Environment configuration (.env.example, docker-compose.yml)
- CI configuration (.github/workflows/)

### 4. Identify Architecture Patterns

- Application architecture (MVC / microservices / serverless / monorepo)
- Data flow patterns
- State management approach
- API style (REST / GraphQL / gRPC)

### 5. Identify Conventions

- Naming conventions (files, variables, functions)
- Code style (ESLint / Prettier configuration)
- Git conventions (branch strategy, commit message style)
- Directory conventions

## Completion Criteria

- ✅ Project structure scanned
- ✅ Tech stack identified
- ✅ Key files read
- ✅ Architecture patterns identified
- ✅ Conventions identified

## Next Step

After confirming all completion criteria are met, read and follow: `./step-02-generate.md`
