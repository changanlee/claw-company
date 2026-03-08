# Workflow Format Standard

This document defines the standard file format for all workflows, including the main file, step micro-files, and output file formats.

---

## Directory Structure

Each workflow is a directory containing a main file and a steps subdirectory:

```
workflows/
└── {workflow-name}/
    ├── workflow.md          # Main file: overview, prerequisites, step summary
    └── steps/               # Step micro-files directory
        ├── step-01-init.md
        ├── step-02-xxx.md
        ├── step-03-xxx.md
        └── step-0N-complete.md
```

**Special Case — Multi-mode Workflows:**

If a workflow has multiple execution modes (e.g., create/edit/validate), use subdirectories to separate them:

```
workflows/
└── create-prd/
    ├── workflow.md
    ├── steps-c/             # Create mode
    │   ├── step-01-init.md
    │   └── ...
    ├── steps-e/             # Edit mode
    │   └── ...
    └── steps-v/             # Validate mode
        └── ...
```

---

## Main File Format (workflow.md)

```markdown
---
name: workflow-id
description: "One-line description"
type: interactive | execution | automatic
agent: ceo | cfo | cio | coo | cto | chro | cao
sub-agent: pm | dev | qa | null
phase: analysis | planning | solutioning | implementation | operations
approval: green | yellow | red
output-dir: output/{category}/
---

# {Workflow Name}

## Overview

A paragraph describing the purpose, applicable scenarios, and expected output of this workflow.

## Prerequisites

- Required input documents (if any)
- Prerequisite workflows that must be completed (if any)
- Special tool requirements (if any)

## Step Summary

| Step | File | Description |
|------|------|-------------|
| 1 | steps/step-01-init.md | Initialization and state detection |
| 2 | steps/step-02-xxx.md | {Description} |
| ... | ... | ... |
| N | steps/step-0N-complete.md | Completion and output |

## Execution Instructions

Read and follow the first step: `steps/step-01-init.md`

⚠️ **Just-In-Time Loading Rules:**
- Only read the current step's file
- Do not pre-read subsequent steps
- After completing each step, that step will instruct you to read the next one

## Approval Gates

| Output | Level | Handling |
|--------|-------|----------|
| {Output name} | {green/yellow/red} | {How to handle} |
```

### Frontmatter Field Descriptions

| Field | Description | Valid Values |
|-------|-------------|--------------|
| name | Unique identifier | kebab-case |
| description | One-line description | Free text |
| type | Execution type | `interactive` (requires interaction, Agent runs directly), `execution` (Sub-Agent spawn mode:"run"), `automatic` (heartbeat/cron) |
| agent | Owning Agent | 7 C-suite IDs |
| sub-agent | Executing Sub-Agent | 10 engineer IDs or null |
| phase | Phase | BMAD four phases + operations |
| approval | Approval level | green / yellow / red |
| output-dir | Output directory | Path relative to workspace |

---

## Step Micro-file Format (step-0N-xxx.md)

```markdown
---
name: step-0N-xxx
description: "Step description"
next-step: ./step-0{N+1}-xxx.md | null
output-file: "{output-dir}/filename.md"
template: "../../templates/xxx.md"
---

# Step N: {Title}

**Progress: Step N of M** — Next: {Next step title}

## Objective

One sentence describing what this step should accomplish.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps
- {Step-specific rules}

## Execution Instructions (sequential, no skipping)

### 1. {First action}

{Detailed description}

### 2. {Second action}

{Detailed description}

### N. {Final action}

{Detailed description}

## Completion Criteria

- ✅ {Success criterion 1}
- ✅ {Success criterion 2}

## Next Step

After confirming all completion criteria are met, read and follow: `{next-step}`

(If next-step is null, this is the final step — report completion.)
```

### Frontmatter Field Descriptions

| Field | Description | Notes |
|-------|-------------|-------|
| name | Step identifier | step-0N-xxx format |
| description | Step description | Free text |
| next-step | Next step file path | Relative path or null (final step) |
| output-file | Output file for this step | Only for steps that produce files |
| template | Template file path | Only for steps that require templates |

---

## Output File Frontmatter Format

All files produced by workflows must include standardized YAML frontmatter for status tracking and future database migration.

```yaml
---
type: product-brief | prd | architecture | epic | story | sprint-status |
      code-review | retrospective | research | ux-design | quick-spec |
      expense | report | analysis | portfolio | trip-plan | schedule |
      assessment | policy-draft | audit | security-scan
status: draft | in-review | approved | archived
created: YYYY-MM-DD
agent: {agent-id}
workflow: {workflow-name}
steps-completed:
  - step-01-init
  - step-02-xxx
approved-by: null | ceo | chairman
related: []
tags: []
---
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| type | Yes | Document type, used for classification and future DB schema |
| status | Yes | Current status |
| created | Yes | Creation date |
| agent | Yes | Agent that created this document |
| workflow | Yes | Workflow name used |
| steps-completed | Yes | List of completed steps (used for continuation detection) |
| approved-by | Optional | Approver (filled after approval) |
| related | Optional | List of related document paths |
| tags | Optional | Free-form tags |

### Continuation Detection

When an Agent session is reset (daily at 04:00 or after 60 minutes idle) and a workflow is restarted:

1. Check if the `output-file` already exists
2. If it exists, read the `steps-completed` from its frontmatter
3. Skip to the step after the last completed step
4. Do not restart from the beginning

### Example: Resuming create-prd workflow after session interruption

PM completed step-05-scope, then the session was reset. On restart:

1. CTO spawns PM to execute `workflows/2-planning/create-prd/workflow.md`
2. PM checks `output/planning/prd-2026-03-08.md` → file already exists
3. Reads its frontmatter:
   ```yaml
   steps-completed:
     - step-01-init
     - step-02-discovery
     - step-03-success
     - step-04-journeys
     - step-05-scope
   ```
4. Determines: last completed step is step-05, next step is step-06-innovation
5. Reads `steps-c/step-06-innovation.md` and continues execution
6. **Does not restart from step-01**, avoiding duplicate work and data overwriting

---

## Execution Differences by Workflow Type

### Interactive

- C-suite Agent runs directly (using persistent session to interact with the Chairman)
- Steps may require waiting for user input
- Examples: brainstorming, purchase-analysis, trip-planning

### Execution

- Sub-Agent runs via `sessions_spawn` mode:"run" as a one-shot execution
- All steps are completed within a single spawn, no pausing for interaction
- CTO specifies the workflow path in the task field when spawning
- Examples: create-prd, dev-story, code-review

### Automatic

- Triggered by heartbeat or cron
- No human intervention required
- Output is written to output/ or sent via sessions_send notifications
- Examples: portfolio-monitor, security-scan, morning-briefing

---

## Naming Conventions

| Item | Rule | Example |
|------|------|---------|
| Workflow directory | kebab-case | create-prd/, trip-planning/ |
| Step file | step-{NN}-{description}.md | step-01-init.md, step-03-draft.md |
| Steps directory (multi-mode) | steps-{mode}/ | steps-c/ (create), steps-e/ (edit) |
| Output file | {type}-{date}.md or {type}.md | prd-2026-03-08.md |
| Template file | {type}.md | prd.md, trip-plan.md |
