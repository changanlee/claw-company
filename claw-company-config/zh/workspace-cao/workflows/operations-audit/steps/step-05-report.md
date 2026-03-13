---
name: report
description: "產出報告：彙整稽核結果，產出操作稽核報告"
next-step: null
output-file: output/audits/operations-audit-{date}.md
template: null
---

# 步驟 5：產出報告

**進度：步驟 5 / 共 5 步**

## 目標

彙整所有步驟的稽核結果，產出操作稽核報告並通知 CEO。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 撰寫稽核報告

報告格式：

```
# 操作稽核報告

- 稽核日期：{date}
- 稽核範圍：所有 Agent 近一週操作

## 摘要
- 總體合規狀況：{良好/需關注/異常}
- 紅旗數量：{N}

## 記錄完整性
{步驟 2 交叉比對結果}

## 燈號覆核
{步驟 3 覆核結果}

## 通道審計
{步驟 4 通道審計結果}

## 發現與建議
{具體問題與改善建議}
```

### 2. 通知 CEO

透過 `exec dispatch` 發送摘要給 CEO：

write 寫檔 → `bash {{INSTALL_DIR}}/shared/dispatch.sh cc-ceo /tmp/claw-task-cc-ceo.txt 60`

訊息格式：
```
[操作稽核報告 — {date}]
合規狀況：{良好/需關注/異常}
紅旗：{N} 項
{關鍵發現摘要}
完整報告：output/audits/operations-audit-{date}.md
```

### 3. 儲存報告

儲存完整報告到 `output/audits/operations-audit-{date}.md`。

## 完成標準

- [ ] 已撰寫完整稽核報告
- [ ] 已通知 CEO
- [ ] 已儲存報告

## 嚴重發現處理

若發現嚴重違規（紅燈操作未經核決、系統性記錄缺失），立即觸發 `audit-issue` workflow 處理。
