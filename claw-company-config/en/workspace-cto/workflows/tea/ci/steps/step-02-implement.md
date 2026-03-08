---
name: step-02-implement
description: "Build CI configuration"
next-step: ./step-03-verify.md
output-file: null
template: null
---

# Step 2: Build CI Configuration

**Progress: Step 2 of 3** — Next: Verify pipeline operation

## Goal

Build CI/CD configuration files based on the gate design.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Identify CI Platform

Confirm the project's CI/CD platform:

- GitHub Actions (`.github/workflows/`)
- GitLab CI (`.gitlab-ci.yml`)
- Other (CircleCI, Jenkins, etc.)

### 2. Create PR Check Workflow

Build CI configuration triggered by PRs:

```yaml
# Trigger: PR created or updated
# Steps: checkout → install → lint → type-check → test:unit → coverage check
```

- Configure caching (node_modules / pip cache)
- Configure coverage threshold
- Configure status badges

### 3. Create Staging Deploy Workflow

Build CI configuration for merges to development branch:

```yaml
# Trigger: push to develop/staging
# Steps: checkout → install → test:all → build → deploy → smoke-test
```

- Configure environment variables and secrets
- Configure deployment steps
- Configure security scanning

### 4. Create Production Deploy Workflow

Build CI configuration for production deployment:

```yaml
# Trigger: push to main / release tag
# Steps: checkout → install → test:all → build → deploy → smoke-test
```

- Configure manual approval (if needed)
- Configure rollback mechanism
- Configure notifications

### 5. Configure Shared Settings

Create shared CI configuration elements:

- Shared environment variables
- Reusable workflows / jobs
- Matrix strategy (multi-version testing)

## Completion Criteria

- ✅ PR check workflow created
- ✅ Staging deploy workflow created
- ✅ Production deploy workflow created
- ✅ Shared settings configured

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-verify.md`
