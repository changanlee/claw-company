---
name: document-project
description: "Write or update project technical documentation"
type: execution
agent: cto
sub-agent: tech-writer
phase: operations
approval: green
output-dir: output/implementation/
---

# Project Documentation

## Overview

The Tech Writer analyzes the codebase and existing documentation, identifies documentation gaps, writes technical documentation in priority order, and verifies documentation accuracy.

## Prerequisites

- CTO provides the project path and documentation requirements when spawning
- Access to the project codebase

## Step Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-analyze.md | Analyze codebase and existing documentation |
| 2 | steps/step-02-write.md | Write documentation |
| 3 | steps/step-03-verify.md | Verify documentation accuracy |

## Execution Instructions

Read and follow the first step: `steps/step-01-analyze.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to the next step upon completion

## Approval Gate

| Output | Signal | Handling |
|--------|--------|----------|
| Technical documentation | Green | Tech Writer completes independently, reports to CTO |
