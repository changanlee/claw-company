---
name: audit-issue
description: "Audit Issue Workflow: Create → Notify → Track → Verify → Close"
type: execution
agent: cao
approval: green
output-dir: output/issues/
---

# Audit Issue Workflow

## Overview

CAO's complete audit lifecycle after discovering a problem. From creating an issue, notifying responsible parties, tracking remediation, verifying effectiveness, to closing the issue with prevention recommendations.

## Prerequisites

- Problem discovered during security scan, compliance check, or routine inspection
- issues.md (existing issues list)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Create | Create audit issue (ID, description, severity, responsible Agent, deadline) | — |
| 02 | Notify | exec dispatch to notify responsible Agent and CEO | — |
| 03 | Track | Track remediation progress | — |
| 04 | Verify | Verify remediation effectiveness | — |
| 05 | Close | Close issue, propose prevention rules | Green |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-create.md
```
