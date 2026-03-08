---
name: step-02-write
description: "撰寫完整 story file"
next-step: ./step-03-ready.md
output-file: story-{id}.md
template: ../../templates/story.md
---

# 步驟 2：撰寫 Story File

**進度：步驟 2 / 共 3 步** — 下一步：確認 story 可開發

## 目標

使用模板撰寫完整的 story file，包含所有開發所需資訊。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入模板

讀取 Story 模板：`{{INSTALL_DIR}}/workspace-cto/templates/story.md`

### 2. 撰寫 Story 描述

根據 Epic 上下文撰寫：

- **Story 標題**：清晰描述功能
- **Story 描述**：用戶角度的功能需求（As a... I want... So that...）
- **背景說明**：為什麼需要這個功能

### 3. 定義驗收標準

撰寫具體、可驗證的驗收標準：

- 每個標準必須可以透過測試驗證
- 包含正常路徑和邊界情況
- 使用 Given/When/Then 格式（如適用）

### 4. 拆解任務清單

將 Story 拆解為有序的開發任務：

- 每個任務粒度適中（1-2 小時可完成）
- 任務之間有清晰的順序
- 標記任務的初始狀態為 `[ ]`

### 5. 撰寫開發備註

提供開發工程師需要的技術提示：

- 相關的代碼位置
- 架構約束
- 測試策略建議
- 需要注意的邊界情況

### 6. 寫入文件

將完成的 story file 寫入 `output/implementation/` 目錄。

## 完成條件

- ✅ Story 描述完整
- ✅ 驗收標準具體可驗證
- ✅ 任務清單已拆解
- ✅ 開發備註已撰寫
- ✅ 文件已寫入指定目錄

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-ready.md`
