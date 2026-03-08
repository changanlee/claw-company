---
name: step-02-review
description: "Review code changes item by item"
next-step: ./step-03-report.md
output-file: null
template: null
---

# Step 2: Review Item by Item

**Progress: Step 2 of 3** — Next: Produce review report

## Goal

Review code changes across all review dimensions, tagging each issue with its severity level.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions

### 1. Architecture Review

Check if code changes conform to the architecture design:

- Are module boundaries correct?
- Are dependency directions reasonable (no reverse dependencies)?
- Does it introduce unnecessary coupling?
- Are naming conventions consistent?

### 2. Logic Review

Check code logic correctness:

- Does business logic match Story requirements?
- Are boundary conditions handled?
- Is error handling complete?
- Are there potential race conditions or state issues?

### 3. Test Review

Check test quality:

- Do tests cover acceptance criteria?
- Are tests meaningful (not just happy path)?
- Are there boundary tests?
- Are test names clear?

### 4. Style Review

Check code style:

- Does it follow the project's existing style?
- Are names clear and meaningful?
- Are comments appropriate (not too many, not too few)?
- Is the code concise (no redundancy)?

### 5. Security Review

Check for security issues:

- Are there hardcoded secrets or sensitive information?
- Is input validation complete?
- Are there injection risks?
- Is permission control correct?

### 6. Tag Issues

Tag each discovered issue with severity:

| Level | Description | Handling |
|-------|-------------|----------|
| **Critical** | Must fix to pass | Blocks merge |
| **Important** | Strongly recommended to fix | Recommend fixing before merge |
| **Minor** | Can improve but not blocking | Can be addressed later |

## Completion Criteria

- ✅ All five dimensions reviewed
- ✅ All issues tagged with severity
- ✅ Each issue has a specific fix suggestion

## Next Step

After confirming completion criteria are met, read and follow: `./step-03-report.md`
