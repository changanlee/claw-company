---
name: build
description: "使用模板建立完整 6 檔規格包"
next-step: ./step-04-review.md
output-file: null
template: null
---

# 步驟 3：建立規格包

**進度：步驟 3 / 共 5 步**

## 目標

使用新 Agent 模板建立完整的 6 檔規格包。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 讀取模板與格式標準

讀取 `{{INSTALL_DIR}}/shared/templates/new-agent/` 目錄下的所有模板檔案。

同時讀取格式標準以確保產出符合規範：
- `{{INSTALL_DIR}}/shared/standards/agent-format.md` — Agent 定義檔案格式規範
- `{{INSTALL_DIR}}/shared/standards/workflow-format.md` — 工作流程檔案格式規範（若新角色含 workflow）

### 2. 建立 6 檔規格包

依據步驟 2 的設計規格，填入模板生成以下檔案：

#### IDENTITY.md
- Agent 名字（英文名）
- Emoji 標識
- 一句話角色描述

#### SOUL.md
- 人格特質與風格
- 行為邊界（必做/不做）
- 記憶規則
- 與其他 Agent 的互動風格

#### AGENTS.md
- 啟動必讀指令（指向 shared/company-rules.md）
- 核心職責清單
- 核決權限
- 與其他 Agent 的協作關係

#### TOOLS.md
- 啟動必讀指令（指向 shared/tools-policy.md）
- 領域工具操作規範

#### HEARTBEAT.md
- 心跳頻率
- 巡檢項目
- 智慧靜默判斷規則

#### MEMORY.md
- 初始化為空白結構
- 預設分類標題

### 3. 自我檢查

- 6 檔案是否完整
- `{{INSTALL_DIR}}` 路徑是否正確使用
- 與 company-rules.md 是否一致
- 職責邊界是否與現有 Agent 無衝突

## 完成標準

- [ ] 6 檔規格包已建立
- [ ] 自我檢查已通過
- [ ] 所有 `{{INSTALL_DIR}}` 路徑已正確引用

## 下一步

👉 前往 [步驟 4：三方審核](./step-04-review.md)
