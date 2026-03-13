---
name: step-04-save
description: "儲存與回報"
next-step: null
output-file: "output/planning/prd.md"
---

# 步驟 4：儲存與回報

**進度：步驟 4 / 共 4 步** — 最後一步

## 目標

更新 PRD 的 frontmatter，儲存修改後的檔案，向 CTO 回報變更摘要。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 更新 frontmatter

更新 PRD 的 frontmatter：

- `status`: 維持 `draft` 或改為 `in-review`（視變更規模而定）
- 新增 `last-modified: {today}` 欄位

### 2. 儲存 PRD

將修改後的 PRD 寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md`。

### 3. 回報變更摘要

透過 `announce` 向 CTO 回報：

- 變更項目清單（新增 / 修改 / 刪除了什麼）
- 受影響的區段數量
- 如有重大變更，建議是否需要重新審核

## 完成條件

- ✅ Frontmatter 已更新
- ✅ PRD 已儲存
- ✅ 變更摘要已回報 CTO

## 下一步

此為最後一步，PRD 編輯流程完成。
