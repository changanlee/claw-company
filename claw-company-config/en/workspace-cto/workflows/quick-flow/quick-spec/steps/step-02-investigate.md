---
name: step-02-investigate
description: "Deep-dive into code impact"
next-step: ./step-03-generate.md
output-file: null
template: null
---

# Step 2: Deep-Dive into Code Impact

**Progress: Step 2 of 4** — Next: Generate complete technical spec

## Goal

Deeply analyze the code to determine all modification points, dependencies, and testing strategy.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Identify Modification Points

Find all files and functions that need modification:

- Primary files and functions to modify
- Files to add (if any)
- Code to delete or deprecate (if any)

### 2. Analyze Dependencies

Analyze the impact scope of modifications:

- Modules that directly depend on this code
- Indirectly affected functionality
- Potential side effects

### 3. Determine Testing Strategy

Define testing strategy based on modification scope:

- Unit tests to add
- Existing tests to modify
- Integration test requirements
- Boundary conditions and error scenarios

### 4. Update Spec File

Update the WIP spec file with technical investigation results.

## Completion Criteria

- ✅ All files and functions to modify identified
- ✅ Dependencies and side effects analyzed
- ✅ Testing strategy determined
- ✅ WIP spec file updated with technical details

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-generate.md`
