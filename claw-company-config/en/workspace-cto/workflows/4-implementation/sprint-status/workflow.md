---
name: sprint-status
description: "Sprint status summary and risk report"
type: automatic
agent: cto
sub-agent: scrum-master
phase: implementation
approval: green
output-dir: output/implementation/
---

# Sprint Status Report

## Overview

The Scrum Master reads the sprint-status file, collects each story's status, analyzes progress and risks, and produces a Sprint status summary.

## Prerequisites

- An established sprint-status document
- Sprint-status file path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-collect.md | Read sprint-status, collect each story's status |
| 2 | steps/step-02-analyze.md | Analyze progress, identify blockers and risks |
| 3 | steps/step-03-report.md | Produce Sprint status summary |

## Execution Instructions

Read and follow the first step: `steps/step-01-collect.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Status summary | Green | Scrum Master completes independently, reports to CTO |
