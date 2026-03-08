---
name: step-06-nfr
description: "Non-functional requirements"
next-step: ./step-07-edge-cases.md
---

# Step 6: Non-Functional Requirements

**Progress: Step 6 of 8** — Next: Edge Cases and Risks

## Objective

Define the system's non-functional requirements (NFR) with clear, measurable metrics.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Performance requirements

Define key performance metrics:

- Response time (P50 / P95 / P99)
- Throughput (RPS / TPS)
- Startup time
- Resource usage limits (memory, CPU)

### 2. Security requirements

- Authentication and authorization mechanisms
- Data encryption (in-transit / at-rest)
- Input validation and defense
- Audit logging requirements

### 3. Scalability requirements

- Expected user scale
- Data growth projections
- Horizontal / vertical scaling strategy

### 4. Availability requirements

- SLA target (99.9% / 99.99%)
- Fault tolerance and recovery
- Backup strategy

### 5. Compliance requirements (if applicable)

- Data protection regulations (GDPR, local privacy laws)
- Industry-specific regulations
- Data retention policies

### 6. Write to PRD

Write non-functional requirements into the PRD "Non-Functional Requirements" section. Each requirement must be measurable.

### 7. Update PRD frontmatter

Add `step-06-nfr` to `steps-completed`.

## Completion Criteria

- ✅ Performance, security, scalability, and availability requirements defined
- ✅ Each NFR has measurable metrics
- ✅ Compliance requirements assessed (if applicable)
- ✅ PRD updated

## Next Step

After confirming completion criteria are met, read and follow: `./step-07-edge-cases.md`
