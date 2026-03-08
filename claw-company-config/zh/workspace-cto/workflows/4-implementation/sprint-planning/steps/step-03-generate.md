---
name: step-03-generate
description: "生成 Sprint 狀態文件"
next-step: ./step-04-validate.md
output-file: sprint-status.md
template: ../../templates/sprint-status.md
---

# 步驟 3：生成 Sprint 狀態文件

**進度：步驟 3 / 共 4 步** — 下一步：驗證完整性

## 目標

使用模板生成 Sprint 狀態追蹤文件，包含所有 Story 的狀態追蹤。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入模板

讀取 Sprint 狀態模板：`{{INSTALL_DIR}}/workspace-cto/templates/sprint-status.md`

### 2. 填充 Sprint 資訊

根據模板格式填充：

- **Sprint 名稱**：由 CTO 指定或自動生成
- **Sprint 目標**：從 Epic 目標彙整
- **開始日期 / 結束日期**：如 CTO 有指定則填入
- **Story 列表**：從步驟 2 的 backlog 清單填入

### 3. 建立 Story 狀態追蹤表

為每個 Story 建立狀態追蹤：

| 欄位 | 說明 |
|------|------|
| Story ID | 唯一識別碼 |
| Story 標題 | 簡明描述 |
| 所屬 Epic | 來源 Epic 名稱 |
| 狀態 | `backlog` / `in-progress` / `review` / `done` |
| 指派 | 開發工程師（待指派） |
| 依賴 | 前置 Story ID |

### 4. 寫入文件

將完成的 Sprint 狀態文件寫入 `output/implementation/` 目錄。

## 完成條件

- ✅ Sprint 狀態文件已生成
- ✅ 所有 Story 狀態已初始化為 `backlog`
- ✅ 文件已寫入指定目錄

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-04-validate.md`
