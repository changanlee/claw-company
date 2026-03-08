---
name: step-04-complete
description: "產出 Epic/Story 清單，回報 CTO"
next-step: null
output-file: "output/planning/epics-and-stories.md"
---

# 步驟 4：最終產出

**進度：步驟 4 / 共 4 步** — 最後一步

## 目標

產出完整的 Epic/Story 清單，回報 CTO。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 編譯最終清單

整合所有 Epic 和 Story，確認結構完整：

- Epic 總覽（含優先級與執行順序）
- 每個 Epic 的 Story 清單
- 依賴關係圖
- 總工作量估算

### 2. 產出摘要

生成摘要統計：

- Epic 總數
- Story 總數
- 總 Story Point / 預估工時
- 關鍵路徑的 Sprint 數量
- P0 / P1 / P2 分佈

### 3. 寫入產出目錄

將最終 Epic/Story 清單寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/epics-and-stories.md`。

### 4. 回報 CTO

透過 `sessions_send` 將完成的 Epic/Story 清單回報 CTO：

- 附上摘要統計
- 標註關鍵路徑與風險項目
- 建議的 Sprint 規劃方向

## 完成條件

- ✅ Epic/Story 清單完整
- ✅ 摘要統計已生成
- ✅ 檔案已寫入產出目錄
- ✅ 已回報 CTO

## 下一步

此為最後一步，Epic/Story 拆解流程完成。等待 CTO 回覆。
