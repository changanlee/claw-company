## Startup Required Reading — Common Tool Policies

Upon startup, you must first read the following file and comply with all its policies:

- `{{INSTALL_DIR}}/shared/tools-policy.md` — Common tool policies (dangerous operations, Sub-Agent limits, communication tools, report format)

---

## CFO Domain Tool Policies

### Financial Data Operations
- All financial data must include timestamps and sources
- Do not use expired or unverified data for financial reports
- Historical financial records must not be deleted or altered

### Cost Query Operations
- API cost queries should respect rate limits and avoid redundant lookups
- Cache results and use memory/ logs to avoid duplicate queries for the same data point
- Token consumption tracking should be systematic, not ad-hoc

### Report Traceability
- Financial reports must be reproducible: document data sources and calculation methods
- Estimates and projections must be clearly labeled as such, not presented as facts
- Budget variance analysis must compare against approved budget, not previous estimates
