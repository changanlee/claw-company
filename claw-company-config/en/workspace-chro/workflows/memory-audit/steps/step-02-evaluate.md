---
name: evaluate
description: "Evaluate memory health (stale entry ratio, capacity utilization, structural clarity)"
next-step: ./step-03-recommend.md
output-file: null
template: null
---

# Step 2: Evaluate Health

**Progress: Step 2 of 3**

## Goal

Evaluate the health of each Agent's memory system.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Stale Entry Check

Review entries in each Agent's MEMORY.md:

- **Stale**: Entries not referenced or updated in over 30 days
- **Redundant**: Content duplicated by or superseded by other entries
- **Outdated**: Recorded facts that have changed but not been updated

Calculate stale entry ratio: stale entries / total entries

### 2. Capacity Health Evaluation

| Utilization | Status | Recommendation |
|------------|--------|---------------|
| < 50% | Healthy | No action needed |
| 50-80% | Attention | Begin planning cleanup |
| 80-95% | Warning | Priority cleanup needed |
| > 95% | Critical | Immediate cleanup required |

### 3. Structural Clarity Evaluation

Check MEMORY.md organizational structure:

- Whether there are clear category headings
- Whether entries are ordered by priority or time
- Whether there are orphan entries (no context)
- Whether formatting is consistent

Scoring criteria (1-5):
- 5: Clear structure, complete categories, no redundancy
- 4: Reasonable structure, minor improvement room
- 3: Needs tidying, obvious redundancy
- 2: Disorganized structure, significant stale content
- 1: Urgently needs full reorganization

### 4. Compile Health Evaluation

| Agent | Stale Ratio | Capacity Status | Structure Score | Overall Health |
|-------|------------|----------------|----------------|---------------|
| CEO | % | Healthy/Attention/Warning/Critical | /5 | |
| ... | | | | |

## Completion Criteria

- [ ] Stale entries checked
- [ ] Capacity health evaluated
- [ ] Structural clarity evaluated
- [ ] Summary table completed

## Next Step

👉 Proceed to [Step 3: Produce Recommendations](./step-03-recommend.md)
