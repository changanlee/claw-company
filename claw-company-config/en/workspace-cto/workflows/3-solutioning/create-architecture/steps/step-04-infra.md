---
name: step-04-infra
description: "Infrastructure, deployment, security, performance strategy"
next-step: ./step-05-complete.md
---

# Step 4: Infrastructure and Deployment Strategy

**Progress: Step 4 of 5** — Next: Final Output

## Objective

Design infrastructure architecture, deployment strategy, security measures, and performance optimization strategy.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. Infrastructure design

- **Compute resources**: Server/container/serverless selection and specifications
- **Storage resources**: Database, object storage, CDN
- **Network architecture**: VPC, subnets, load balancing
- **Environment planning**: Development / Testing / Staging / Production

### 2. Deployment strategy

- **CI/CD pipeline**: Build, test, deploy automation flow
- **Deployment method**: Blue-Green / Canary / Rolling update
- **Version management**: Versioning rules, rollback strategy
- **Environment variable management**: Secret management, config separation

### 3. Security strategy

- **Authentication and authorization**: OAuth2 / JWT / RBAC design
- **Data security**: Transport encryption (TLS), at-rest encryption
- **API security**: Rate limiting, input validation, CORS
- **Security monitoring**: Intrusion detection, anomaly behavior alerts
- **Backup strategy**: Backup frequency, retention period, recovery testing

### 4. Performance strategy

- **Caching strategy**: CDN / Redis / Application-level caching
- **Database optimization**: Read-write splitting, connection pooling, query optimization
- **Frontend performance**: Code splitting, lazy loading, asset compression
- **Monitoring and alerting**: Performance metrics, thresholds, alert channels

### 5. Cost estimation

- Monthly infrastructure cost estimate
- Cost curve as scale grows
- Cost optimization recommendations

### 6. Update frontmatter

Add `step-04-infra` to `steps-completed`.

## Completion Criteria

- ✅ Infrastructure design complete
- ✅ Deployment strategy defined
- ✅ Security measures planned
- ✅ Performance strategy established
- ✅ Costs estimated

## Next Step

After confirming completion criteria are met, read and follow: `./step-05-complete.md`
