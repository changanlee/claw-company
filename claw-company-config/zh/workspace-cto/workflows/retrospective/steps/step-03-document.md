---
name: step-03-document
description: "產出回顧報告，寫入教訓"
next-step: null
output-file: retrospective.md
template: ../../templates/retrospective.md
---

# 步驟 3：產出回顧報告

**進度：步驟 3 / 共 3 步** — 最後一步

## 目標

使用模板產出回顧報告，將教訓寫入 CTO MEMORY.md。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 載入模板

讀取回顧模板：`{{INSTALL_DIR}}/workspace-cto/templates/retrospective.md`

### 2. 填寫報告

按模板格式填寫：

- **Sprint/Epic 概覽**：名稱、時間範圍、目標
- **指標摘要**：完成率、審查退回率、阻塞次數
- **做得好的**：Keep 清單
- **需要改進的**：Improve 清單
- **行動項目**：含負責人和時間
- **教訓**：分類整理

### 3. 寫入回顧報告

將回顧報告寫入 `output/planning/` 目錄。

### 4. 更新 CTO MEMORY.md

將教訓精煉後寫入 CTO MEMORY.md：

- 只寫入有長期價值的教訓（非一次性問題）
- 按現有 MEMORY.md 格式整理
- 確保 MEMORY.md 不超過 200 行上限

### 5. 路由教訓

將需要路由的教訓透過 `sessions_send` 發送：

- 安全相關 → CAO
- 成本相關 → CFO
- 流程相關 → CHRO
- 戰略相關 → CEO

## 完成條件

- ✅ 回顧報告已按模板填寫
- ✅ 報告已寫入指定目錄
- ✅ CTO MEMORY.md 已更新
- ✅ 教訓已路由到相關 Agent

## 下一步

此為最後一步。回顧完成，教訓已沉澱。
