---
name: nfr
description: "Non-functional requirements test assessment"
type: execution
agent: cto
sub-agent: qa
phase: implementation
approval: green
output-dir: output/implementation/
---

# Non-Functional Requirements Test Assessment

## Overview

The QA engineer identifies non-functional requirements (performance, security, reliability, scalability) from PRD and architecture documents, evaluates test strategies, and produces an NFR test plan.

## Prerequisites

- PRD or architecture document (with NFR-related descriptions)
- Related file paths provided by CTO at spawn time

## Steps Overview

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-identify.md | Identify non-functional requirements |
| 2 | steps/step-02-assess.md | Assess test strategies and tool requirements |
| 3 | steps/step-03-plan.md | Produce NFR test plan |

## Execution Instructions

Read and follow the first step: `steps/step-01-identify.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- Each step will direct you to read the next step upon completion

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| NFR test plan | Green | QA completes independently, reports to CTO |
