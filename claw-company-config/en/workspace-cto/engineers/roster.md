# Engineer Roster

Atlas (CTO) selects engineers from this roster based on task requirements. Each role has an independent definition file describing identity, capabilities, and work methods.

## Available Roles

| Role | File | Name | Icon | Specialty | Workflows | Sidecar | Auto-select When |
|------|------|------|------|-----------|-----------|---------|-----------------|
| PM | pm.md | Reed | 📋 | Requirements, PRD, user stories, prioritization, competitive analysis | 5 | ❌ | Product concept, feature planning |
| Architect | architect.md | Mason | 🏗️ | System design, tech selection, scalable patterns, risk assessment | 3 | ❌ | Technical decisions, infrastructure |
| Dev | dev.md | Ivy | 💻 | Implementation, TDD, code quality, bug fixing, refactoring | 2 | ❌ | Any coding task |
| QA | qa.md | Vera | 🔍 | Test strategy, quality gates, test design, regression, perf/security | 5 | ✅ | Quality concerns, test planning |
| UX Designer | ux-designer.md | Lena | 🎨 | User experience, UI patterns, user research, accessibility | 1 | ❌ | User-facing features |
| Tech Writer | tech-writer.md | Clara | 📝 | Technical docs, developer guides, code docs, doc maintenance | 2 | ✅ | Documentation needs |
| Analyst | analyst.md | Hazel | 📊 | Market research, requirements, data analysis, feasibility | 3 | ❌ | Business analysis, competitive research |
| Scrum Master | scrum-master.md | Grant | 📌 | Sprint planning, user stories, epic breakdown, progress tracking | 5 | ❌ | Epic breakdown, sprint planning |
| Solo Dev | solo-dev.md | Blaze | ⚡ | Full-stack, rapid prototyping, independent decisions, end-to-end | 2 | ❌ | Small standalone features |
| Spec Reviewer | spec-reviewer.md | Scout | 🔎 | Spec comparison, requirements verification, acceptance criteria validation, gap analysis | 0 | ❌ | Post-development review (phase 1) |
| Code Reviewer | code-reviewer.md | Knox | 🔒 | Code quality, architectural consistency, security review, performance review | 1 | ❌ | Post-development review (phase 2, after Spec Reviewer passes) |

## Sidecar Memory

Engineers with Sidecar load additional domain knowledge files on startup:

| Role | Sidecar Path | Content |
|------|-------------|---------|
| QA | sidecar/qa/test-standards.md | Test standards and strategy (TEA essentials) |
| Tech Writer | sidecar/tech-writer/documentation-standards.md | Technical documentation standards |

## Usage

- Atlas automatically selects the appropriate engineer based on task nature
- Chairman can request additional roles at any time (e.g., "Have QA take a look too")
- Each engineer receives applicable iron rules automatically on spawn
- All engineers must follow the unified report format after task completion (see report-template.md)
