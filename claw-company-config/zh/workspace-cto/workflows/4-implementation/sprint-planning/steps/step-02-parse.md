---
name: step-02-parse
description: "解析 Epic → Story，建立完整清單"
next-step: ./step-03-generate.md
output-file: null
template: null
---

# 步驟 2：解析 Story 清單

**進度：步驟 2 / 共 4 步** — 下一步：生成 Sprint 狀態文件

## 目標

從所有 Epic 中解析出 Story，建立完整的 Sprint backlog 清單。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 解析每個 Epic 的 Story

逐一解析每個 Epic，提取以下資訊：

- **Story 標題**：簡明描述
- **Story 描述**：功能需求摘要
- **驗收標準數量**：條件總數
- **預估規模**：小 / 中 / 大（若 Epic 中有標註）
- **依賴關係**：是否依賴其他 Story

### 2. 排序與優先級

根據以下因素排列 Story 順序：

- Epic 中定義的優先級
- Story 間的依賴關係（被依賴的先做）
- 預估規模（優先完成高價值小任務）

### 3. 建立完整清單

整合所有 Epic 的 Story，建立統一的 backlog 清單：

- 每個 Story 標記所屬 Epic
- 標記初始狀態為 `backlog`
- 標記依賴關係

## 完成條件

- ✅ 所有 Epic 的 Story 已解析
- ✅ Story 已排序並標記優先級
- ✅ 依賴關係已識別
- ✅ 統一 backlog 清單已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-generate.md`
