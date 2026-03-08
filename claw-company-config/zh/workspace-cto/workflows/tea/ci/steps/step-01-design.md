---
name: step-01-design
description: "設計品質閘門"
next-step: ./step-02-implement.md
output-file: null
template: null
---

# 步驟 1：設計品質閘門

**進度：步驟 1 / 共 3 步** — 下一步：建立 CI 配置

## 目標

設計 PR、Staging、Production 各階段的品質閘門和檢查點。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 定義 PR 階段閘門

PR 提交時的自動檢查：

- **Lint 檢查**：代碼風格和靜態分析
- **型別檢查**：TypeScript / Flow 等
- **單元測試**：所有單元測試必須通過
- **覆蓋率門檻**：新代碼覆蓋率不低於設定值
- **提交訊息格式**：Conventional Commits 等

### 2. 定義 Staging 階段閘門

合併到 staging/develop 分支時：

- **整合測試**：所有整合測試通過
- **E2E 測試**：關鍵路徑 E2E 測試通過
- **建構驗證**：確認建構成功
- **安全掃描**：依賴漏洞掃描

### 3. 定義 Production 階段閘門

部署到 production 前：

- **全量測試**：所有測試（unit + integration + e2e）通過
- **效能基準**：關鍵指標不低於基準值
- **Smoke 測試**：部署後快速驗證

### 4. 設計失敗處理

定義閘門失敗時的處理策略：

- 哪些閘門是 blocking（必須通過才能繼續）
- 哪些閘門是 warning（允許繼續但標記警告）
- 失敗通知機制（如何通知相關人員）

### 5. 記錄閘門設計

整理為結構化的閘門設計文件，作為後續實作的依據。

## 完成條件

- ✅ PR 閘門已定義
- ✅ Staging 閘門已定義
- ✅ Production 閘門已定義
- ✅ 失敗處理策略已定義

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-implement.md`
