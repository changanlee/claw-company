---
name: freeze
description: "凍結：立即凍結可疑 Agent spawn 權限"
next-step: ./step-03-escalate.md
output-file: null
template: null
---

# 步驟 2：凍結

**進度：步驟 2 / 共 3 步**

## 目標

立即凍結可疑 Agent 的 spawn 權限，記錄異常事件到 issues.md。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 凍結 spawn 權限

對可疑 Agent 執行凍結操作：
- 記錄凍結指令到 issues.md
- 標記被凍結的 Agent 和凍結時間
- 凍結範圍：Sub-Agent spawn 權限（不影響 Agent 本身的基本功能）

### 2. 記錄到 issues.md

在 `{{INSTALL_DIR}}/workspace-cao/issues.md` 建立緊急煞車記錄：

```
## 緊急煞車 — [日期時間]
- 觸發條件：[A/B/C]
- 可疑 Agent：[名稱]
- 異常數值：[實際值] vs [閾值]
- 凍結操作：[已凍結 spawn 權限]
- 狀態：Frozen（待 CEO 確認 + 根因分析）
```

### 3. 記錄證據

保存異常的詳細證據：
- Token 消耗時間線
- spawn 記錄（時間、類型、數量）
- 相關 memory/ 日誌片段

## 完成標準

- [ ] 已凍結可疑 Agent 的 spawn 權限
- [ ] 已記錄到 issues.md
- [ ] 已保存異常證據

## 下一步

👉 前往 [步驟 3：上報](./step-03-escalate.md)
