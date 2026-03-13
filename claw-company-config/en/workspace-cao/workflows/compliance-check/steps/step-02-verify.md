---
name: verify
description: "Verify: Verify compliance item by item"
next-step: ./step-03-assess.md
output-file: null
template: null
---

# Step 2: Verify

**Progress: Step 2 of 4**

## Goal

Compare the draft item by item against company-rules.md to verify compliance.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### 1. Decompose Draft Items

Break down the draft content into individually verifiable items.

### 2. Check Each Item

Perform the following checks for each item:

**Authority compliance:**
- Does it involve overstepping (Agent exceeding role scope)
- Does it maintain the three-tier approval system (green/yellow/red)
- Does it respect three-way checks and balances (CEO-CAO-CHRO)

**Security compliance:**
- Does it touch security red lines
- Does it contain clauses that weaken security controls
- Does it affect definition file protection

**Communication compliance:**
- Does it follow communication protocols (exec dispatch usage rules)
- Do all operation results report back to CEO (yellow approval / red notification / green write to MEMORY.md)

**Channel compliance:**
- Do Agents with channels follow the approval process in `policies/channel-governance.md`
- Do red-level operations directly assigned by Chairman include dispatch CEO notification
- Are task sources correctly labeled (`[Source: CEO dispatch]` / `[Source: Chairman direct]` / `[Source: cron]`)
- Are channel openings/closings subject to red-level approval

**Memory compliance:**
- Does it follow memory management rules (200-line cap, etc.)
- Does it contain improper memory access patterns

**Cost compliance:**
- Does it consider cost impact
- Does it contain unlimited resource usage clauses

### 3. Record Verification Results

Record the verification result for each item: compliant / needs amendment / non-compliant.

## Completion Criteria

- [ ] Decomposed draft into individual items
- [ ] Completed compliance verification for all items
- [ ] Recorded verification result for each item

## Next Step

👉 Proceed to [Step 3: Assess](./step-03-assess.md)
