---
name: trip-planning
description: "Trip Planning Workflow: Gather → Transport → Accommodation → Itinerary → Compile → Submit"
type: interactive
agent: coo
approval: red
output-dir: output/trips/
---

# Trip Planning Workflow

## Overview

The complete planning workflow when COO receives a travel request from the Chairman. Six steps cover the full lifecycle from requirement gathering, transport and accommodation comparison, itinerary drafting, to Chairman approval.

## Prerequisites

- Chairman's travel intention (destination, approximate dates)
- CFO available to respond to travel budget queries
- Chairman preferences (recorded in MEMORY.md)

## Steps Overview

| Step | Name | Description | Approval |
|------|------|-------------|----------|
| 01 | Gather | Confirm destination, dates, duration, budget | — |
| 02 | Transport | Collect transport options (2-3 plans with prices) | — |
| 03 | Accommodation | Collect accommodation options | — |
| 04 | Itinerary | Draft daily itinerary | — |
| 05 | Compile | Consolidate trip plan draft | — |
| 06 | Submit | Submit to CEO → Chairman approval | Red |

## Execution

Start from the first step:

```
👉 Begin → Read steps/step-01-gather.md
```

## Approval Gates Overview

| Decision Item | Level | Handling |
|--------------|-------|---------|
| Trip plan approval | Red | Escalate to Chairman via CEO |
| Booking & payment | Red | Escalate to Chairman via CEO |

- **Red**: Requires explicit Chairman approval. Neither COO nor CEO may decide independently.
