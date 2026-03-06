# Token Budget and Cost Management

## Model Tiering

| Role | Model | Rationale |
|------|-------|-----------|
| CEO | Sonnet 4.6 | Requires high reasoning capability: task decomposition, information distillation |
| CFO | Sonnet 4.6 | Requires precise financial analysis |
| CIO | Sonnet 4.6 | Requires complex investment analysis |
| COO | Haiku 4.5 | Lifestyle management tasks are more structured |
| CTO | Sonnet 4.6 | Requires high reasoning capability: architecture decisions |
| CHRO | Haiku 4.5 | Policy drafting and evaluation are more structured |
| CAO | Sonnet 4.6 | Requires high reasoning capability: risk assessment |
| Engineer Sub-Agent | Haiku 4.5 | Execution level, clear task instructions |

## Cost-Saving Principles

1. **Concise reporting**: Distill summaries when reporting upward; never pass along complete raw data
2. **Explicit instructions**: Provide clear tasks when spawning sub-agents to avoid vague instructions leading to redundant spawns
3. **On-demand loading**: policies/ files are only read when triggered by a relevant context
4. **Layered memory**: Keep MEMORY.md under 200 lines to avoid loading excessive tokens each time

## Anomaly Monitoring

- CFO compiles weekly token usage statistics (if OpenClaw provides usage data)
- If any Agent's daily token usage exceeds 3x the daily average, notify CEO to investigate the cause
- When sub-agent spawn count is abnormal (more than 5 per single task), CTO must explain the reason

## Budget Allocation Ratios (#49)

Based on the monthly API total budget, the default allocation ratios are as follows:

| Agent | Ratio | Description |
|-------|-------|-------------|
| CEO | 15% | Daily heartbeat + morning briefing + coordination |
| CFO | 10% | Bookkeeping + financial analysis + token auditing |
| CIO | 10% | Investment monitoring (hourly on business days) |
| COO | 15% | High-frequency lifestyle interactions (dining, schedule) |
| CTO + Engineers | 40% | Development tasks (compute-intensive) |
| CHRO | 5% | Weekly reviews (low frequency) |
| CAO | 5% | Security scans + audits (low frequency) |

**Note:** These are reference ratios. During the founding phase, the focus is on observing actual consumption. After accumulating 1 month of data, CFO will recommend adjustments.

## Dynamic Budget Adjustment Mechanism (#52)

CEO can dynamically adjust allocations based on current business priorities:

| Scenario | Adjustment |
|----------|-----------|
| Intensive development period | Increase CTO resources to 50-60%, reduce COO/CIO |
| Month-end closing | CFO priority, ensure accurate financial statements |
| Quiet days | Reduce overall consumption, extend heartbeat intervals |
| Travel planning period | Temporarily increase COO resources |

**Adjustment process:**
1. CEO assesses current priorities
2. Adjust spawn strategy and heartbeat frequency
3. Record adjustment rationale in memory/ logs
4. CFO tracks adjustment effectiveness in weekly report

## Adjustment Mechanism

- Token budget allocation is adjusted by CEO based on business needs
- Model upgrades/downgrades (e.g., Haiku -> Sonnet) require CEO proposal + Chairman approval
- During the founding phase, the focus is on observation; hard limits will be set after accumulating sufficient data
