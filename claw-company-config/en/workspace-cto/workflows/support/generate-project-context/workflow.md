---
name: generate-project-context
description: "Generate project context summary for AI Agent use"
type: execution
agent: cto
sub-agent: tech-writer
phase: operations
approval: green
output-dir: output/implementation/
---

# Generate Project Context

## Overview

The Tech Writer scans the project structure, tech stack, and key files to generate project-context.md, enabling AI Agents to quickly understand the full project picture.

## Prerequisites

- CTO provides the project path when spawning
- Access to the project codebase

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-scan.md | Scan project structure and tech stack |
| 2 | steps/step-02-generate.md | Generate project-context.md |
| 3 | steps/step-03-validate.md | Validate context accuracy |

## Execution Instructions

Read and follow the first step: `steps/step-01-scan.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gate

| Output | Signal | Handling |
|--------|--------|----------|
| project-context.md | Green | Tech Writer completes independently, reports to CTO |
