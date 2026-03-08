---
name: sprint-planning
description: "Generate Sprint status tracking from Epics"
type: execution
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# Sprint Planning

## Overview

The Scrum Master discovers and parses all Stories from established Epic files, generates a Sprint status tracking document, and builds a complete Sprint backlog.

## Prerequisites

- Established Epic files (with Story breakdowns)
- Epic file path or directory provided by CTO at spawn time
- Sprint status template: `../../templates/sprint-status.md`

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-discover.md | Discover and load all Epic files |
| 2 | steps/step-02-parse.md | Parse Epics → Stories, build complete list |
| 3 | steps/step-03-generate.md | Generate Sprint status document |
| 4 | steps/step-04-validate.md | Validate completeness and produce report |

## Execution Instructions

Read and follow the first step: `steps/step-01-discover.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Sprint status document | Green | Scrum Master completes independently, reports to CTO |
