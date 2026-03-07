# Skill 開發與審批流程

## 什麼是 Skill

Skill 是 Agent 的可執行能力模組（定義在 skills/ 目錄下的 SKILL.md），讓 Agent 能處理特定任務類型。例如：CFO 的記帳 Skill、CIO 的投資組合監控 Skill。

## 新增 Skill 提案

### 觸發來源

- CHRO 週度巡視發現能力缺口（任務反覆失敗或無專責 Skill 處理）
- CAO 稽核發現流程缺陷，需新 Skill 補強
- CEO 根據董事長指示提出需求
- 董事長直接要求

### 提案格式

```
Skill 名稱：<skill-name>
目標 Agent：<agent-id>
解決的問題：<描述能力缺口或需求>
功能描述：<Skill 做什麼、怎麼觸發>
輸入/輸出：<預期的輸入格式與輸出結果>
依賴：<需要哪些工具或外部服務>
預估 Token 成本影響：<每次執行的預估消耗>
```

## 審批流程

| 階段 | 負責人 | 說明 |
|------|--------|------|
| 提案 | CHRO / CAO / CEO | 提出 Skill 需求與規格 |
| 草擬 | CHRO | 撰寫 SKILL.md 草稿 |
| 技術審查 | CTO | 確認技術可行性、安全性、與現有架構的相容性 |
| 合規審查 | CAO | 確認 Skill 不違反安全紅線或核決權限 |
| 審批 | CEO | 黃燈核決（一般 Skill） |
| 最終核決 | 董事長 | 紅燈核決（涉及外部 API 串接、付款操作、或高成本 Skill） |

## 部署

1. CHRO 將審批通過的 SKILL.md 放入對應的 skills/ 目錄
2. 通知目標 Agent 新 Skill 已就緒
3. 記錄到 policies/changelog.md（第二級通知）

## 修改現有 Skill

- 修改已部署的 Skill 需走與新增相同的審批流程
- 例外：純文字修訂（不影響功能邏輯）由 CHRO 直接修改，第三級通知

## 停用 / 移除 Skill

- CHRO 在週度巡視中發現某 Skill 長期未被使用（超過 30 天）
- 提出停用建議 → CEO 審批 → 歸檔 SKILL.md → 記錄到 changelog.md
