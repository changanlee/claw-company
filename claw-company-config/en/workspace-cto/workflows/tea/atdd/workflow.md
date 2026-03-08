---
name: atdd
description: "Acceptance Test-Driven Development: generate failing acceptance tests"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Acceptance Test-Driven Development

## Overview

The QA engineer generates expected-to-fail acceptance test code based on story acceptance criteria (Given/When/Then), to be handed off to dev engineers for implementation.

## Prerequisites

- Story file (with acceptance criteria in Given/When/Then format)
- Story file path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-parse.md | Load story acceptance criteria |
| 2 | steps/step-02-generate.md | Generate acceptance test code |
| 3 | steps/step-03-verify.md | Run tests to confirm all fail |

## Execution Instructions

Read and follow the first step: `steps/step-01-parse.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Acceptance test code | Green | QA completes independently, reports to CTO |
