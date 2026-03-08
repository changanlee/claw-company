---
name: step-01-identify
description: "Identify non-functional requirements from documents"
next-step: ./step-02-assess.md
output-file: null
template: null
---

# Step 1: Identify Non-Functional Requirements

**Progress: Step 1 of 3** — Next: Assess test strategies

## Goal

Identify all non-functional requirements (NFR) from PRD and architecture documents.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Load Related Documents

Receive file paths provided by CTO at spawn time. Read PRD and architecture documents.

### 2. Scan NFR Categories

Identify NFRs in the following categories:

**Performance:**
- Response time requirements (API latency, page load)
- Throughput requirements (TPS, QPS, concurrent users)
- Resource usage limits (CPU, memory, bandwidth)

**Security:**
- Authentication and authorization requirements
- Data encryption needs
- OWASP Top 10 protection
- Compliance requirements (GDPR, PCI-DSS, etc.)

**Reliability:**
- Availability targets (SLA: 99.9%, 99.99%)
- Recovery time (RTO/RPO)
- Backup strategy

**Scalability:**
- Horizontal scaling capability
- Data volume growth expectations
- User growth expectations

**Other NFRs:**
- Maintainability
- Observability (monitoring, logging, tracing)
- Internationalization/Localization
- Accessibility

### 3. Compile NFR List

Produce a structured NFR list:

| ID | Category | Description | Source | Priority |
|----|----------|-------------|--------|----------|

### 4. Identify Implicit NFRs

Beyond explicitly documented NFRs, identify potentially missed implicit requirements:

- Infer from project type (e.g., e-commerce → high availability, payment security)
- Infer from user scale (e.g., large user base → performance, scalability)
- Mark as "implicit" for subsequent confirmation

## Completion Criteria

- ✅ All explicit NFRs identified
- ✅ Implicit NFRs flagged
- ✅ NFR list structured and organized

## Next Step

After confirming completion criteria are met, read and follow: `./step-02-assess.md`
