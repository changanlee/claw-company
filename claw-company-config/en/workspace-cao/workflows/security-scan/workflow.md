---
name: security-scan
description: "Security Scan Workflow: Scope → Scan → Assess → Report"
type: automatic
agent: cao
approval: green
output-dir: output/scans/
---

# Security Scan Workflow

## Overview

CAO's periodic (weekly Wednesday cron) or manual security scan workflow. Checks all Agents for SOUL.md tampering, prompt injection, and abnormal behavior, producing a security scan report.

## Prerequisites

- Cron schedule trigger or manual initiation
- All Agent workspaces accessible

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Scope | Determine scan scope (all/specific Agents) | — |
| 02 | Scan | Check SOUL.md tampering, prompt injection, abnormal behavior | — |
| 03 | Assess | Severity classification | — |
| 04 | Report | Produce security scan report; push Critical directly to Chairman | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-scope.md
```
