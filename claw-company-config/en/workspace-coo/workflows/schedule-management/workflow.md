---
name: schedule-management
description: "Schedule Management Workflow: Parse → Execute → Confirm"
type: execution
agent: coo
approval: green
output-dir: output/schedules/
---

# Schedule Management Workflow

## Overview

COO's execution workflow upon receiving schedule management commands (add/delete/modify/query). Parses the command, executes the operation, checks for conflicts, and reports results.

## Prerequisites

- Chairman's schedule command (relayed via CEO or direct)
- Existing schedule records (in memory/ logs)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Parse | Parse schedule command (add/delete/modify/query) | — |
| 02 | Execute | Execute operation, check for time conflicts | Green |
| 03 | Confirm | Report results, update memory/ | — |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-parse.md
```
