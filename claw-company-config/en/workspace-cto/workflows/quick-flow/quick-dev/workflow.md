---
name: quick-dev
description: "Quickly implement small features based on quick-spec"
type: execution
agent: cto
sub-agent: solo-dev
phase: implementation
approval: green
output-dir: output/implementation/
---

# Quick Dev

## Overview

A solo dev engineer quickly implements small features based on a quick-spec. Suitable for small, independent features — a complete TDD development process from spec to delivery.

## Prerequisites

- A quick-spec document or clear direct instructions

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-setup.md | Prepare dev environment |
| 2 | steps/step-02-implement.md | TDD implementation |
| 3 | steps/step-03-test.md | Comprehensive testing |
| 4 | steps/step-04-deliver.md | Delivery |

## Execution Instructions

Read and follow the first step: `steps/step-01-setup.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| Feature implementation | Green | Solo-Dev completes independently, reports to CTO |
