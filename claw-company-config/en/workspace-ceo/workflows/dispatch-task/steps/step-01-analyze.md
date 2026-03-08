---
name: analyze
description: "Analyze chairman's directive: type, urgency, involved departments"
next-step: ./step-02-route.md
output-file: null
template: null
---

# Step 1: Analyze Directive

**Progress: Step 1 of 3**

## Objective

Parse the chairman's directive to determine type, urgency, and involved departments, providing the basis for subsequent routing.

## Execution Rules

- Read the entire step file before acting
- Do not pre-read subsequent steps
- Do not skip or merge steps

## Instructions

### 1. Directive Type Classification

Classify the chairman's directive into one of the following types:

| Type | Description | Corresponding Executive |
|------|-------------|------------------------|
| Finance | Bookkeeping, budget, spending, costs | CFO |
| Investment | Portfolio, market analysis, buy/sell decisions | CIO |
| Lifestyle | Schedule, meals, travel, weather | COO |
| Technology | Product development, code, system design | CTO |
| Agent Management | Capability assessment, policies, model tuning | CHRO |
| Security/Audit | Security scans, compliance checks | CAO |
| Composite | Involves multiple departments | CEO splits then dispatches |

### 2. Urgency Assessment

- **Urgent**: Contains keywords like "immediately," "right now," "ASAP," or chairman explicitly requests
- **Normal**: No special time pressure
- **Low Priority**: Information gathering, long-term planning

### 3. Department Identification

- Single department: Route directly
- Multiple departments: Split into sub-tasks, route individually

## Completion Criteria

- [ ] Directive type determined
- [ ] Urgency assessed
- [ ] Involved departments identified

## Next Step

-> Proceed to [Step 2: Route Target](./step-02-route.md)
