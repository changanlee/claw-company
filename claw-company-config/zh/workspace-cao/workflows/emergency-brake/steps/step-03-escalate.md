---
name: escalate
description: "上報：通知 CEO，30 分鐘無回應則直接推送董事長"
next-step: null
output-file: null
template: null
---

# 步驟 3：上報

**進度：步驟 3 / 共 3 步**

## 目標

通知 CEO 調查異常情況。若 CEO 30 分鐘內未回應，直接推送董事長。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 通知 CEO

使用 `exec dispatch` 通知 CEO（write 寫檔 → bash {{INSTALL_DIR}}/shared/dispatch.sh）：

> 「CEO，緊急煞車已啟動：
> - 可疑 Agent：[名稱]
> - 異常類型：[描述]
> - 已凍結：[Agent] 的 spawn 權限
> - 需要：調查根因並提出分析
> - 解凍條件：CEO 確認 + 根因分析」

### 2. 等待回應

等待 CEO 回應（最多 30 分鐘）：

**CEO 回應：**
- 記錄 CEO 的調查結果和根因分析
- 若 CEO 確認可解凍 → 更新 issues.md 狀態為 Resolved
- 若需要進一步調查 → 維持凍結狀態

**CEO 30 分鐘未回應：**
- 直接透過 CAO 獨立通道推送董事長

### 3. 推送董事長（如需要）

透過獨立通道通知董事長：

> 「董事長，緊急煞車通報：
> - 異常：[描述]
> - 已凍結：[Agent] 的 spawn 權限
> - CEO 尚未回應
> - 需要您的指示」

### 4. 記錄結果

更新 issues.md 和 memory/ 日誌：
- 通知時間
- 回應情況
- 最終處理結果
- 解凍記錄（如有）

## 完成標準

- [ ] 已通知 CEO
- [ ] CEO 已回應或已推送董事長
- [ ] 已記錄完整處理過程

## 流程結束
