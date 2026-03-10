---
name: recommend
description: "產出記憶健康報告（建議清理/歸檔的項目清單）"
next-step: null
output-file: null
template: null
---

# 步驟 3：產出建議

**進度：步驟 3 / 共 3 步**

## 目標

產出記憶健康報告，列出建議清理或歸檔的項目清單。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 記憶健康報告

```markdown
# 記憶健康報告 — {日期}

## 總覽
- 整體健康度：良好 / 需注意 / 需清理
- 最需關注的 Agent：{Agent 名稱}

## 各 Agent 記憶健康
| Agent | 使用率 | 過期比例 | 結構評分 | 建議 |
|-------|--------|---------|---------|------|

## 清理建議
### 優先清理（危險/警告）
- {Agent}：{具體建議}

### 建議清理（注意）
- {Agent}：{具體建議}

### 結構改善
- {Agent}：{具體建議}
```

### 2. 具體清理建議

對每個需要清理的 Agent，列出：

- 建議刪除的條目（過期、冗餘）
- 建議歸檔的條目（有歷史價值但不常用，移至 memory/）
- 建議更新的條目（內容已過時）
- 結構調整建議

**注意**：CHRO 僅提供建議，不直接修改其他 Agent 的 MEMORY.md。各 Agent 自行執行清理。

### 3. 發送報告

> **注意**：此流程由 cron 觸發，`sessions_send` 不可用（v2026.3.8 cron tight isolation）。報告由 cron delivery announce 機制自動推送到通道。

- 報告作為最終輸出，由 cron announce 推送到通道（CEO 可見）
- 同時將報告存入 `output/reports/memory-health-YYYY-MM-DD.md`
- 對記憶使用率超過 80% 的 Agent，在報告中標記需清理（CEO heartbeat 會檢查並跟進）
- CTO 有自己的週度記憶自清理機制（cron），可參照但不重複

### 4. 更新記錄

- 更新 CHRO MEMORY.md 中的記憶健康趨勢
- 將完整報告存入 memory/

## 完成標準

- [ ] 記憶健康報告已產出
- [ ] 具體清理建議已列出
- [ ] 已送交 CEO 及需關注的 Agent
- [ ] 記錄已更新
