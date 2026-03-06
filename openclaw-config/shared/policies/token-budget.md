# Token 預算與成本管理

## 模型分級

| 角色 | 模型 | 原因 |
|------|------|------|
| CEO | Sonnet 4.6 | 需要高推理能力：任務拆解、資訊精煉 |
| CFO | Sonnet 4.6 | 需要精確的財務分析 |
| CIO | Sonnet 4.6 | 需要複雜的投資分析 |
| COO | Haiku 4.5 | 生活管理任務較結構化 |
| CTO | Sonnet 4.6 | 需要高推理能力：架構決策 |
| CHRO | Haiku 4.5 | 政策撰寫與評估較結構化 |
| CAO | Sonnet 4.6 | 需要高推理能力：風險判斷 |
| 工兵 Sub-Agent | Haiku 4.5 | 執行層級，明確任務指令 |

## 節約原則

1. **回報精煉**：向上回報時精煉為摘要，不傳遞完整原始資料
2. **明確指令**：spawn sub-agent 時給予明確 task，避免模糊導致重複 spawn
3. **按需載入**：policies/ 文件只在觸發情境時才讀取
4. **記憶分層**：MEMORY.md 控制在 200 行內，避免每次載入過多 token

## 異常監控

- CFO 每週統計 Token 使用量（如 OpenClaw 提供用量數據）
- 如某 Agent 單日 Token 使用量超過日均 3 倍，通知 CEO 調查原因
- Sub-Agent spawn 數量異常（單任務超過 5 個）時，CTO 需說明原因

## 調整機制

- Token 預算分配由 CEO 根據業務需求調整
- 模型升降級（如 Haiku → Sonnet）需 CEO 提案 + 董事長同意
- 草創期以觀察為主，累積足夠數據後再設定硬性上限
