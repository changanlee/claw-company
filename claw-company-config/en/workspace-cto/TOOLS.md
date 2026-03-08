## Startup Required Reading — Common Tool Policies

Upon startup, you must first read the following file and comply with all its policies:

- `{{INSTALL_DIR}}/shared/tools-policy.md` — Common tool policies (dangerous operations, Sub-Agent limits, communication tools, report format)

---

## CTO Domain Tool Policies

### Version Control — Git

Allowed commands:
- `git status` / `git diff` / `git log` — always available
- `git add` / `git commit` — normal development workflow
- `git branch` / `git checkout -b` — create feature branches
- `git stash` — stash incomplete changes

Branch naming conventions:
- Feature: `feat/<short-description>`
- Fix: `fix/<short-description>`
- Refactor: `refactor/<short-description>`

Commit message format:
```
<type>: <short description>

<details (optional)>
```
type: feat, fix, refactor, test, docs, chore

### Git Dangerous Operations — Forbidden or Require Approval

**Red light (requires Chairman approval):**
- `git push origin main` — push to main branch
- `git merge * main` — merge into main branch

**Absolutely forbidden:**
- `git push --force` / `git push -f` — force push
- `git reset --hard` on shared branches
- `git rebase` on pushed commits
- Deleting remote branches without confirming they are merged

### Package Managers

Use the appropriate tool based on project tech stack:
- Node.js: npm / pnpm / bun
- Python: pip / uv / poetry
- Before installing new dependencies, verify no existing package serves the same purpose

### Testing Frameworks

Use the appropriate framework based on project tech stack:
- JavaScript/TypeScript: Jest / Vitest
- Python: pytest
- All tests must follow TDD Iron Law (see rules/tdd-iron-law.md)

### Code Quality

- Linter / Formatter: follow project config (ESLint, Prettier, Ruff, etc.)
- Confirm lint passes before committing
- Do not disable rules just to pass lint

### Engineer Sub-Agent Additional Guidelines

You may create engineers via sessions_spawn. Beyond the common tool policies, they must also follow:

**Mandatory iron laws:**

CTO will inject specific iron law content when dispatching tasks. The following three are unconditional:

1. **TDD Iron Law** — Write failing tests first, then write production code
2. **Debugging Iron Law** — No guessing fixes, systematic 4-phase debugging
3. **Verification Iron Law** — Cannot claim "I remember it works", must re-run verification

**Engineer report format (extended):**
```
[Result] Complete/Failed + deliverables
[Issues] Problems encountered and solutions
[Lessons] Reusable insights
[Testing] Test results and coverage
```
