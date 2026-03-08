---
name: framework
description: "Initialize test framework (Playwright/Cypress/Jest)"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Test Framework Initialization

## Overview

The QA engineer selects the appropriate test framework based on the project's tech stack, completes installation and configuration, and creates foundational test scripts and examples.

## Prerequisites

- Project tech stack information (language, framework, build tools)
- Project path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-select.md | Select test framework based on tech stack |
| 2 | steps/step-02-setup.md | Install and configure test framework |
| 3 | steps/step-03-scaffold.md | Create foundational test scripts and examples |

## Execution Instructions

Read and follow the first step: `steps/step-01-select.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Test framework configuration | Green | QA completes independently, reports to CTO |
