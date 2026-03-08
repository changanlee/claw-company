---
name: step-03-verify
description: "驗證管線運作（dry-run）"
next-step: null
output-file: null
template: null
---

# 步驟 3：驗證管線運作

**進度：步驟 3 / 共 3 步** — 最終步驟

## 目標

驗證 CI/CD 管線配置正確，能正常運作。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 語法驗證

驗證 CI 配置檔案語法：

- YAML 語法正確性
- 平台特定語法（GitHub Actions / GitLab CI）
- 引用的 secrets 和變數是否存在
- 引用的 actions/images 版本是否有效

### 2. 本地 Dry-Run

在本地執行可行的驗證：

- 執行 lint 指令，確認指令有效
- 執行 test 指令，確認測試通過
- 執行 build 指令，確認建構成功
- 使用 `act`（如 GitHub Actions）或類似工具做本地模擬

### 3. 檢查閘門邏輯

確認每個閘門的行為符合設計：

- blocking 閘門是否正確阻擋
- warning 閘門是否正確標記
- 覆蓋率門檻是否正確計算
- 失敗通知是否配置正確

### 4. 交付回報

向 CTO 回報（黃燈 — 需 CEO 審批）：

- CI/CD 配置檔案路徑清單
- 閘門設計摘要
- 本地驗證結果
- 需要配置的 secrets 清單
- 建議的後續步驟（推送到 repo 後實際測試）

## 完成條件

- ✅ CI 配置語法驗證通過
- ✅ 本地 dry-run 驗證通過
- ✅ 閘門邏輯確認正確
- ✅ 已向 CTO 回報結果（提交 CEO 審批）
