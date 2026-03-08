# Test Standards and Strategy

Core testing standards for QA Engineer (Vera), incorporating TEA (Test Engineering & Architecture) module essentials.

---

## Test Architecture Principles

### Principle 1: Architecture First

Design test architecture and automation framework before writing individual test cases. Test architecture determines maintainability and scalability.

### Principle 2: Risk-Driven

Test priority based on risk assessment:

1. **Critical paths** — Core business flows, failure = system unusable
2. **Boundary conditions** — Extreme values, nulls, overflows, type boundaries
3. **Exception handling** — Error recovery, timeouts, network interruptions
4. **Normal scenarios** — Standard usage

### Principle 3: Quality Gates Are Non-Negotiable

Every stage has clear quality thresholds:
- Test coverage meets agreed standards
- Critical paths 100% passing
- Zero known Critical/High defects
- Performance baselines within acceptable range

---

## Test Pyramid

```
        /   E2E   \        ← Few: verify end-to-end flows
       / Integration \      ← Some: verify component interaction
      /  Unit Tests    \    ← Many: verify individual function logic
```

**Recommended ratio:** 70% unit / 20% integration / 10% E2E

---

## Test Design Patterns

### AAA Pattern (Arrange-Act-Assert)

Every test case follows:
1. **Arrange** — Prepare test data and environment
2. **Act** — Execute the function under test
3. **Assert** — Verify results match expectations

### Test Naming

Format: `test_[function]_[scenario]_[expected_result]`

Example: `test_login_invalidPassword_returnsError`

### Test Independence

- Each test runs independently, no dependency on execution order
- Tests don't share mutable state
- Use setup/teardown to manage test environment

---

## Test Type Reference

| Type | Purpose | Tool Reference |
|------|---------|---------------|
| Unit | Verify individual function/method logic | Jest, pytest, JUnit |
| Integration | Verify component interaction | Supertest, TestContainers |
| E2E | Verify end-to-end flows | Playwright, Cypress |
| Performance | Verify response time and throughput | k6, Artillery |
| Security | Identify security vulnerabilities | OWASP ZAP, Snyk |
| Accessibility | Verify accessibility | axe, Lighthouse |

---

## Traceability Matrix

Every requirement must trace to at least one test case:

| Req ID | Test Case | Type | Status |
|--------|-----------|------|--------|
| REQ-001 | test_xxx | Unit | ✅ Pass |

---

## Defect Severity

| Level | Definition | Handling |
|-------|-----------|----------|
| Critical | System crash, data loss, security vulnerability | Fix immediately, blocks release |
| High | Core feature failure, no workaround | Fix in current Sprint |
| Medium | Feature issue with workaround available | Schedule for next Sprint |
| Low | Cosmetic issues, typos | Backlog |

---

## CI/CD Quality Gates

Recommended quality gate checkpoints:

1. **Before PR merge** — Unit tests pass, lint clean
2. **Before staging deploy** — Integration tests pass, security scan no Critical
3. **Before production deploy** — E2E tests pass, performance baselines met
4. **Post-deploy** — Smoke tests, monitoring alerts normal

---

## Non-Functional Requirements (NFR) Assessment

Assessment checklist:

- **Performance**: Response time p95, throughput, concurrent users
- **Reliability**: Availability target, recovery time (RTO/RPO)
- **Security**: OWASP Top 10, authentication, data encryption
- **Scalability**: Horizontal/vertical scaling strategy
- **Maintainability**: Code complexity, test coverage, documentation completeness
