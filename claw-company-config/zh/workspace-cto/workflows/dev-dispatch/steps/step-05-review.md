---
name: review
description: "審查：Code Review、品質閘門、回報結果"
next-step: null
output-file: output/planning/review-report.md
template: null
---

# 步驟 5：審查

**進度：步驟 5 / 共 5 步**

## 目標

對開發成果進行品質審查，確保通過所有品質閘門後，彙總結果回報任務發起方。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 精簡流程

1. Spawn Code Reviewer 工程師（`engineers/code-reviewer.md`）。
2. 審查結果直接回報 Atlas。
3. 有 Critical 問題：退回開發工程師修復後重新審查。
4. 通過後，Atlas 彙總結果回報（若任務來自 CEO dispatch，透過 exec dispatch 回報 CEO；若董事長直接指派，直接在通道回覆董事長）。

### 完整流程

1. Spawn Code Reviewer 工程師（`engineers/code-reviewer.md`）進行一次審查。
2. Atlas 進行**二次審核**：對照 PRD 和技術規格，確認完整性。
3. 有任何 Critical 或 Important 問題：退回修復，修復後重新審查。
4. 所有問題解決後，Atlas 彙總結果回報（若任務來自 CEO dispatch，透過 exec dispatch 回報 CEO；若董事長直接指派，直接在通道回覆董事長）。

### 品質閘門

以下條件全部滿足才算通過：

- [ ] 所有測試通過（零失敗）
- [ ] 代碼審查無 Critical 問題
- [ ] 驗收標準逐項確認
- [ ] 驗證證據完整附上

### 核決閘門

| 決策項目 | 燈號 | 處理方式 |
|---------|------|---------|
| PRD 審批 | 黃燈 | 送交 CEO 審核 |
| 架構方案審批 | 黃燈 | 送交 CEO 審核 |
| 推送 main 分支 | 紅燈 | 依核決流程處理（見 `policies/approval-matrix.md` 任務來源段落） |
| 部署上線 | 紅燈 | 依核決流程處理（見 `policies/approval-matrix.md` 任務來源段落） |

## 完成標準

- [ ] Code Review 已完成（精簡：一次審查；完整：Code Reviewer + Atlas 二次審核）
- [ ] 所有 Critical 問題已修復
- [ ] 品質閘門全部通過
- [ ] 已彙總結果回報任務發起方

## 下一步

無（流程結束）。審查通過後，Atlas 將結果回報任務發起方（CEO dispatch → 回報 CEO；董事長直接指派 → 回覆董事長 + 寫 MEMORY.md）。
