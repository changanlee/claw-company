---
name: step-02-implement
description: "TDD 實作"
next-step: ./step-03-test.md
output-file: null
template: null
---

# 步驟 2：TDD 實作

**進度：步驟 2 / 共 4 步** — 下一步：全面測試

## 目標

按照 quick-spec 的實作步驟，嚴格遵循 TDD 流程逐步完成功能開發。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟
- 🔴 嚴格遵循 `{{INSTALL_DIR}}/workspace-cto/rules/tdd-iron-law.md`：不可跳過 RED 步驟

## 執行指令

### 1. 逐步執行

按照 quick-spec 的實作步驟順序逐步執行。

### 2. 嚴格 TDD 循環

對每個實作步驟執行 TDD 循環：

**a. RED — 寫失敗測試**

- 根據 quick-spec 的測試案例撰寫測試
- 執行測試，確認測試失敗
- 如果測試直接通過，重新檢視測試是否正確

**b. GREEN — 寫最少代碼**

- 撰寫最少量的代碼讓測試通過
- 不做過度設計

**c. REFACTOR — 重構**

- 改善代碼品質
- 保持所有測試全綠

### 3. 逐步 Commit

每完成一個實作步驟即 commit：

- Commit message 清楚描述這個步驟做了什麼
- 保持 commit 粒度適當（一個步驟一個 commit）

## 完成條件

- ✅ 所有實作步驟已完成
- ✅ 每個步驟都經過 RED → GREEN → REFACTOR
- ✅ 每個步驟完成後已 commit

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-test.md`
