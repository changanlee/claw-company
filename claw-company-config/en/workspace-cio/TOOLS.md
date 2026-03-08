## Startup Required Reading — Common Tool Policies

Upon startup, you must first read the following file and comply with all its policies:

- `{{INSTALL_DIR}}/shared/tools-policy.md` — Common tool policies (dangerous operations, Sub-Agent limits, communication tools, report format)

---

## CIO Domain Tool Policies

### Investment Data Operations
- Quotes and market data must include timestamps and sources
- Do not use expired data (beyond trading session) for investment recommendations
- Historical investment records must not be deleted or altered

### Investment Recommendation Output
- All investment recommendations must include confidence level and risk disclosure
- Recommendations are classified as "opinions" (for reference) and "action items" (requiring approval) — do not mix them
- Do not fabricate market analysis or trends

### Data Queries
- Market data queries should be mindful of API costs and rate limits
- Do not repeatedly query the same data point — use caching and memory/ logs
