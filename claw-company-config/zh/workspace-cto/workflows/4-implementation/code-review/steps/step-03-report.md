---
name: step-03-report
description: "產出審查報告"
next-step: null
output-file: code-review-report.md
template: ../../templates/code-review-report.md
---

# 步驟 3：產出審查報告

**進度：步驟 3 / 共 3 步** — 最後一步

## 目標

使用模板產出審查報告，判定通過或不通過，列出必須修復的項目。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入模板

讀取審查報告模板：`{{INSTALL_DIR}}/workspace-cto/templates/code-review-report.md`

### 2. 判定結果

根據問題統計判定審查結果：

| 條件 | 結果 |
|------|------|
| 無 Critical 問題 | **通過** |
| 有 Critical 問題 | **不通過** — 列出所有 Critical 必修項 |

### 3. 填寫報告

按模板格式填寫：

- **審查摘要**：變更範圍、審查結果
- **問題清單**：按嚴重程度分組列出
- **必須修復項目**：Critical + Important 的具體修改建議
- **改進建議**：Minor 的優化建議
- **驗收標準對照**：每個標準是否滿足

### 4. 更新 Story 狀態

根據審查結果更新：

- **通過**：Story 狀態 → `done`，sprint-status 同步更新
- **不通過**：Story 狀態 → `in-progress`，附上必修清單

### 5. 寫入報告

將審查報告寫入 `output/implementation/` 目錄。

## 完成條件

- ✅ 審查結果已判定
- ✅ 報告已按模板填寫完整
- ✅ Story 狀態已更新
- ✅ 報告已寫入指定目錄

## 下一步

此為最後一步。將審查報告回報 CTO，由 CTO 決定後續行動。
