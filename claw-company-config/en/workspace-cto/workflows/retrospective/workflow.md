---
name: retrospective
description: "Retrospective after Epic or Sprint completion"
type: interactive
agent: cto
sub-agent: null
phase: implementation
approval: green
output-dir: output/planning/
---

# Retrospective

## Overview

After an Epic or Sprint is completed, the CTO conducts a retrospective analyzing what went well, what needs improvement, action items, and lessons learned. Produces a retrospective report and writes lessons into MEMORY.md.

## Prerequisites

- A completed Epic or Sprint
- sprint-status file (with all stories' final statuses)
- Retrospective template: `../../templates/retrospective.md`

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-collect.md | Collect data |
| 2 | steps/step-02-analyze.md | Analyze and synthesize |
| 3 | steps/step-03-document.md | Produce retrospective report |

## Execution Instructions

Read and follow the first step: `steps/step-01-collect.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Retrospective report | Green | CTO completes independently |
