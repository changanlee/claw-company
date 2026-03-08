# Adversarial Review

## Purpose

Review any content (documents, proposals, policies, code designs) from a sharp, critical perspective to find problems, risks, and blind spots. The goal is not to find strengths — it is to find weaknesses.

## How to Execute

1. **Read the target content** — Read the document or content to be reviewed in full.

2. **Critical analysis** — Examine from each of the following angles:
   - **Logic gaps**: Is the reasoning self-consistent? Do the assumptions hold?
   - **Omissions**: What important things are missing? What scenarios were not considered?
   - **Risks**: What is the worst case? What are the failure modes?
   - **Contradictions**: Are there any self-contradictions in the content?
   - **Feasibility**: Can the proposal actually be executed? Is there hidden complexity?
   - **Costs**: Are there undisclosed costs (tokens, time, maintenance)?

3. **Produce a review report** — Format:

```markdown
## Adversarial Review Report

**Subject:** {filename or description}
**Reviewer:** {Agent name}
**Date:** {YYYY-MM-DD}

### Issues Found

| # | Severity | Type | Description | Suggested Fix |
|---|----------|------|-------------|---------------|
| 1 | Critical | {type} | {issue} | {suggestion} |
| 2 | Important | {type} | {issue} | {suggestion} |
| 3 | Minor | {type} | {issue} | {suggestion} |

### Overall Assessment

{One paragraph summary: overall quality, biggest risk, whether it should pass}
```

## Guidelines

- Only report **specific, actionable** issues — no vague generalities
- Every issue must include a suggested fix direction
- Three severity levels: Critical (must fix), Important (strongly recommended), Minor (optional improvement)
- Do not go easy because it is a colleague's output — that is the whole point of adversarial review
