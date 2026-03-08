---
name: step-02-design
description: "System architecture design (component decomposition, protocols, data flow)"
next-step: ./step-03-adr.md
---

# Step 2: System Architecture Design

**Progress: Step 2 of 5** — Next: Architecture Decision Records

## Objective

Design the system architecture including component decomposition, communication protocols, and data flow.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. System boundary definition

- System boundaries with the external world
- External dependencies (third-party services, APIs, data sources)
- User access points

### 2. Component decomposition

Decompose the system into high-cohesion, low-coupling components:

- **Frontend layer**: UI components, state management, routing
- **API layer**: Endpoint design, authentication middleware, rate limiting
- **Business logic layer**: Core business services, domain models
- **Data layer**: Database, cache, file storage
- **Infrastructure layer**: Logging, monitoring, queues

Each component needs: responsibilities, inputs/outputs, dependencies.

### 3. Communication protocols

Define inter-component communication:

- **Synchronous**: REST / GraphQL / gRPC
- **Asynchronous**: Message Queue / Event Bus / WebSocket
- **Data formats**: JSON / Protocol Buffers / Other
- **Error handling**: Retry strategy, timeout settings, circuit breaker

### 4. Data flow design

Describe core data flows (Mermaid or ASCII):

- Complete data path for user requests
- Data write and read paths
- Cache strategy and invalidation mechanism
- Data consistency strategy

### 5. Data model

Design core data models:

- Entity relationship diagram (ER diagram)
- Core table structures
- Index strategy
- Data migration strategy

### 6. Update frontmatter

Add `step-02-design` to `steps-completed`.

## Completion Criteria

- ✅ System boundaries defined
- ✅ Component decomposition complete (with responsibilities and dependencies)
- ✅ Communication protocols selected
- ✅ Data flow designed
- ✅ Data model defined

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-adr.md`
