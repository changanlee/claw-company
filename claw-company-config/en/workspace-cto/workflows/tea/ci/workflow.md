---
name: ci
description: "Build CI/CD quality pipeline"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: yellow
output-dir: output/implementation/
---

# CI/CD Quality Pipeline

## Overview

The QA engineer designs and builds CI/CD quality pipelines, including quality gates at PR, Staging, and Production stages, ensuring automated code quality enforcement.

## Prerequisites

- Project CI/CD environment info (GitHub Actions / GitLab CI etc.)
- Test framework already initialized
- Project path provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-design.md | Design quality gates |
| 2 | steps/step-02-implement.md | Build CI configuration |
| 3 | steps/step-03-verify.md | Verify pipeline operation |

## Execution Instructions

Read and follow the first step: `steps/step-01-design.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| CI/CD pipeline configuration | Yellow | QA completes then submits for CEO approval |
