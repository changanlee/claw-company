---
name: step-03-verify
description: "Verify pipeline operation (dry-run)"
next-step: null
output-file: null
template: null
---

# Step 3: Verify Pipeline Operation

**Progress: Step 3 of 3** — Final step

## Goal

Verify CI/CD pipeline configuration is correct and operates properly.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Syntax Validation

Validate CI configuration file syntax:

- YAML syntax correctness
- Platform-specific syntax (GitHub Actions / GitLab CI)
- Referenced secrets and variables exist
- Referenced actions/images versions are valid

### 2. Local Dry-Run

Perform feasible local verification:

- Run lint command to confirm it works
- Run test command to confirm tests pass
- Run build command to confirm build succeeds
- Use `act` (for GitHub Actions) or similar tools for local simulation

### 3. Check Gate Logic

Confirm each gate behaves as designed:

- Blocking gates correctly block
- Warning gates correctly flag
- Coverage thresholds calculate correctly
- Failure notifications are configured properly

### 4. Delivery Report

Report to CTO (Yellow — requires CEO approval):

- CI/CD configuration file path list
- Gate design summary
- Local verification results
- List of secrets that need configuration
- Recommended next steps (push to repo for actual testing)

## Completion Criteria

- ✅ CI configuration syntax validated
- ✅ Local dry-run verification passed
- ✅ Gate logic confirmed correct
- ✅ Results reported to CTO (submitted for CEO approval)
