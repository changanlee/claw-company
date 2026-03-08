---
name: research
description: "Unified research entry point: market / domain / technical research"
type: execution
agent: cto
sub-agent: analyst
phase: analysis
approval: green
output-dir: output/planning/
---

# Unified Research Workflow

## Overview

Unified research workflow executed by the analyst, supporting three research modes: Market, Domain, and Technical. The mode is automatically determined based on the research topic, producing a structured research report.

## Prerequisites

- Research topic and direction
- Research task description from CTO

## Mode Overview

| Mode | Step | Use Case |
|------|------|----------|
| Market | step-02-market.md | Competitor analysis, market size, trends, user needs |
| Domain | step-02-domain.md | Industry depth, regulations, best practices |
| Technical | step-02-technical.md | Technology selection, architecture comparison, PoC feasibility |

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-init.md | Determine research type, load context |
| 2a | steps/step-02-market.md | Market research mode |
| 2b | steps/step-02-domain.md | Domain research mode |
| 2c | steps/step-02-technical.md | Technical research mode |
| 3 | steps/step-03-compile.md | Compile research report |

## Execution

Read and follow the first step: `steps/step-01-init.md`

⚠️ **Just-In-Time loading rules:**
- Only read the current step file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gates

| Output | Level | Process |
|--------|-------|---------|
| Research report | Green | Report to CTO |
