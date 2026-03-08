---
name: step-02-assess
description: "Assess test strategies and tool requirements"
next-step: ./step-03-plan.md
output-file: null
template: null
---

# Step 2: Assess NFR Test Strategies

**Progress: Step 2 of 3** — Next: Produce NFR test plan

## Goal

Evaluate appropriate test strategies and required tools for each NFR.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Performance Test Strategy

For each performance-related NFR:

- **Load testing**: Simulate normal load, verify response time
- **Stress testing**: Simulate overload scenarios, verify system behavior
- **Capacity testing**: Determine system capacity limits
- **Tool selection**: k6 / Artillery / Locust / JMeter
- **Environment requirements**: Test environment specs, test data volume

### 2. Security Test Strategy

For each security-related NFR:

- **Static analysis**: SAST tools to scan code vulnerabilities
- **Dynamic analysis**: DAST tools to scan running applications
- **Dependency scanning**: Check third-party package vulnerabilities
- **Penetration testing**: Simulate attack scenarios
- **Tool selection**: Snyk / OWASP ZAP / SonarQube / npm audit

### 3. Reliability Test Strategy

For each reliability-related NFR:

- **Fault injection**: Simulate service outages, network anomalies
- **Recovery testing**: Verify fault recovery procedures
- **Backup verification**: Verify backup and restore procedures
- **Tool selection**: Chaos Engineering tools (if applicable)

### 4. Scalability Test Strategy

For each scalability-related NFR:

- **Horizontal scaling verification**: Performance after adding nodes
- **Data growth simulation**: Performance under large data volumes
- **Tool selection**: Same as performance testing tools + container orchestration tools

### 5. Feasibility Assessment

For each NFR test strategy, assess:

- **Automation feasibility**: Can it be integrated into CI/CD?
- **Cost**: Tool licenses, environment resources
- **Dependencies**: Required external resources or coordination

## Completion Criteria

- ✅ Every NFR has a corresponding test strategy
- ✅ Tool requirements identified
- ✅ Feasibility assessed

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-plan.md`
