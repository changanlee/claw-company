---
name: quick-spec
description: "Quickly create implementation specs for small features"
type: execution
agent: cto
sub-agent: solo-dev
phase: planning
approval: green
output-dir: output/planning/
---

# Quick Spec

## Overview

A rapid specification process for small features or changes. No full PRD needed — go directly from requirements to actionable technical specs. Suitable for well-scoped, low-impact development tasks.

## Prerequisites

- A clear small feature requirement

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-understand.md | Understand requirement scope |
| 2 | steps/step-02-investigate.md | Deep-dive into code impact |
| 3 | steps/step-03-generate.md | Generate complete technical spec |
| 4 | steps/step-04-review.md | Review and confirm |

## Execution Instructions

Read and follow the first step: `steps/step-01-understand.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| quick-spec document | Green | Solo-Dev completes independently, reports to CTO |
