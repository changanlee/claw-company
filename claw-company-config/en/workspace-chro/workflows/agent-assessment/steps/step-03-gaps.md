---
name: gaps
description: "Identify capability gaps and propose improvement suggestions"
next-step: ./step-04-report.md
output-file: null
template: null
---

# Step 3: Identify Gaps

**Progress: Step 3 of 4**

## Goal

Based on evaluation results, identify capability gaps for each Agent and propose specific improvement suggestions.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Identify Capability Gaps

For dimensions scoring below 3, analyze root causes:

- **SOUL.md Design Issues**: Role definition insufficiently precise, causing behavioral deviation
- **AGENTS.md Responsibility Ambiguity**: Unclear responsibility boundaries, causing omissions or overlap
- **Model Capability Insufficient**: Fast model unable to handle certain complex tasks
- **Knowledge Gaps**: MEMORY.md missing necessary background knowledge or historical decisions
- **Process Defects**: Workflow design has blind spots

### 2. Cross-Agent Issues

Identify systemic issues at the cross-department level:

- Responsibility overlaps or vacuum zones
- Coordination bottlenecks (which cross-department collaborations fail most often)
- Information gaps (important information not flowing between Agents)

### 3. Propose Improvement Suggestions

For each gap, propose specific suggestions:

| Gap | Affected Agent | Root Cause | Suggested Action | Priority |
|-----|---------------|-----------|-----------------|----------|
| | | | | High/Med/Low |

Suggested action types:
- Adjust SOUL.md / AGENTS.md
- Model upgrade/downgrade (trigger model-evaluation workflow)
- Supplement MEMORY.md knowledge
- Adjust workflow
- Create/modify policy (trigger policy-drafting workflow)

## Completion Criteria

- [ ] Capability gaps identified with root cause analysis
- [ ] Cross-Agent systemic issues listed
- [ ] Specific improvement suggestions proposed for each gap

## Next Step

👉 Proceed to [Step 4: Generate Report](./step-04-report.md)
