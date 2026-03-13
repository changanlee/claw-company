---
name: step-01-collect
description: "收集所有必要文件"
next-step: ./step-02-validate.md
---

# 步驟 1：收集文件

**進度：步驟 1 / 共 3 步** — 下一步：驗證完整性

## 目標

收集所有進入開發階段所需的文件，標記缺失項目。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 檢查必要文件

逐一檢查以下文件是否存在並可讀取：

| 文件 | 路徑 | 必要性 |
|------|------|--------|
| PRD | `{{INSTALL_DIR}}/workspace-cto/output/planning/prd.md` | 必要 |
| UX 設計 | `{{INSTALL_DIR}}/workspace-cto/output/planning/ux-design.md` | 必要 |
| 架構文件 | `{{INSTALL_DIR}}/workspace-cto/output/planning/architecture.md` | 必要 |
| Epic/Story | `{{INSTALL_DIR}}/workspace-cto/output/planning/epics-and-stories.md` | 必要 |
| 產品簡介 | `{{INSTALL_DIR}}/workspace-cto/output/planning/product-brief.md` | 選配 |
| 研究報告 | `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md` | 選配 |

### 2. 載入所有存在的文件

讀取所有存在的文件，準備進入驗證步驟。

### 3. 記錄文件狀態

建立文件收集清單：

```markdown
## 文件收集狀態

| 文件 | 狀態 | 備註 |
|------|------|------|
| PRD | ✅ 已收集 / ❌ 缺失 | |
| UX 設計 | ✅ 已收集 / ❌ 缺失 | |
| 架構文件 | ✅ 已收集 / ❌ 缺失 | |
| Epic/Story | ✅ 已收集 / ❌ 缺失 | |
```

### 4. 缺失文件處理

如有必要文件缺失：

- 透過 `announce` 通知 CTO 缺失的文件
- 等待 CTO 指示：補充文件 或 繼續檢查已有文件

## 完成條件

- ✅ 所有必要文件的存在性已檢查
- ✅ 存在的文件已全部載入
- ✅ 文件收集清單已建立

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-02-validate.md`
