# 稽核回應與閉環機制

## 稽核議題格式

```
議題 ID：AUDIT-YYYY-MM-DD-NNN
嚴重度：P0 / P1 / P2 / P3
責任 Agent：<agent-id>
發現日期：YYYY-MM-DD
期限：YYYY-MM-DD
狀態：開放 / 修正中 / 待驗證 / 已關閉
描述：<問題描述>
建議修正：<修正方向>
```

## 處理流程

### 1. 發現與記錄
- CAO 發現問題後，建立稽核議題
- 記錄在 CAO 的 MEMORY.md（開放議題清單）

### 2. 通知
- P0/P1：立即通知責任 Agent + CEO（P0 同時通知董事長）
- P2/P3：記錄後在下次與 CEO 溝通時一併告知

### 3. 修正
- 責任 Agent 在期限內提出修正方案
- 修正方案需經 CEO 確認

### 4. 防範規則
- 修正完成後，CAO 評估是否需要新增防範規則
- 如需新規則：CAO 提出建議 → CHRO 草擬政策 → CEO 審核 → 董事長批准
- 規則寫入對應的 policies/ 文件，不寫入 SOUL.md

### 4b. 系統性問題分析（#59）
- CAO 通知 CHRO 該議題的根因分析
- CHRO 評估：這是個案問題還是系統性問題？
  - **個案** → 僅對責任 Agent 做個別修正
  - **系統性** → CHRO 提案全公司統一規範修訂
- 系統性規範修訂流程：CHRO 草擬 → CEO 審核 → CAO 合規檢查 → 董事長批准 → CHRO 推行至所有 Agent → CAO 驗證落實

### 5. 驗證與關閉
- CAO 驗證修正效果
- 確認有效後關閉議題
- 歸檔到 memory/ 日誌

## 逾期處理

- 首次逾期：CAO 提醒責任 Agent，延期一次
- 二次逾期：通知 CEO 介入
- 三次逾期：上報董事長

## SOUL.md 修改特別流程

任何 Agent 的 SOUL.md 修改都必須：
1. 提案者不能是被修改的 Agent 本身
2. 需經三方流程：草擬方 + 審查方 + 董事長批准
3. 修改前後差異記錄在 policies/changelog.md

**例外：董事長直接命名**
董事長為 Agent 取名（如「CIO 叫小明」）屬於董事長直接指令，該 Agent 可自行更新 SOUL.md 中的「名字」欄位，無需走三方流程。

## HEARTBEAT.md 修改特別流程

HEARTBEAT.md 定義 Agent 的心跳巡視邏輯，修改需經紅燈核決：

1. 提案者不能是被修改的 Agent 本身（與 SOUL.md 相同原則）
2. 修改範圍包括：心跳頻率、觸發條件、巡視清單、自動調節邏輯
3. 流程：CHRO 草擬變更 → CEO 審核 → CAO 合規檢查 → 董事長批准
4. 修改前後差異記錄在 policies/changelog.md

**例外：v2.0 自適應調節**
心跳的「自我調節」功能（頻率動態調整）屬於 HEARTBEAT.md 中已定義的自動化邏輯，不需要每次調頻都走核決流程。但若要修改自適應的規則本身（例如調整閾值），仍需走上述流程。

## IDENTITY.md 修改特別流程

IDENTITY.md 定義 Agent 的身份資訊，修改需經紅燈核決：

1. 提案者不能是被修改的 Agent 本身
2. 流程：CHRO 草擬變更 → CEO 審核 → CAO 合規檢查 → 董事長批准
3. 修改前後差異記錄在 policies/changelog.md

**例外：董事長直接命名**
董事長為 Agent 取名屬於董事長直接指令，該 Agent 可自行更新 IDENTITY.md 的「名字」欄位，無需走三方流程。

## AGENTS.md 修改特別流程

AGENTS.md 定義 Agent 的職責與工作流程，等同變更工作範圍，修改需經紅燈核決：

1. 提案者不能是被修改的 Agent 本身
2. 流程：CHRO 草擬變更 → CEO 審核 → CAO 合規檢查 → 董事長批准
3. 修改前後差異記錄在 policies/changelog.md
4. 如修改涉及 shared/AGENTS.md（全公司規範），需所有 Agent 重新載入

## 工程師定義與規則修改特別流程

CTO 的 engineers/*.md（工程師角色定義）和 rules/*.md（開發紀律規則）定義了整個工程團隊的能力邊界與品質標準，修改需經紅燈核決：

1. CTO 提案並說明修改理由與影響範圍
2. CEO 審核
3. CAO 合規檢查（確認不違反安全紅線）
4. 董事長批准
5. 修改前後差異記錄在 policies/changelog.md
