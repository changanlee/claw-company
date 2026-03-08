# Agent 定義格式規範

本文件定義所有 Agent（C-suite 與 Sub-Agent）的標準檔案格式，映射 BMAD Method 結構到 OpenClaw 原生檔案。

---

## 適用範圍

- **Level 1 — C-suite Agent：** CEO, CFO, CIO, COO, CTO, CHRO, CAO
- **Level 2 — Sub-Agent：** CTO 下的 10 種工程師角色（透過 `sessions_spawn` 建立）

---

## C-suite Agent 格式

OpenClaw 自動載入以下檔案到 system prompt。每個檔案對應 BMAD 的一個概念。

### IDENTITY.md（對應 BMAD Agent Metadata）

```yaml
---
name: "顯示名"
title: "角色職稱"
icon: "emoji"
---
```

自由格式自我介紹。IDENTITY.md 的 frontmatter 提供結構化 metadata，供其他 Agent 或系統查詢。

### SOUL.md（對應 BMAD Persona）

```markdown
# {title}

## 身份
你是 Chairman 一人公司的{title}，負責{一句話職責描述}。
（= BMAD role + identity）

## 原則
（= BMAD principles，條列式，5-8 條核心原則）
- 原則 1 — 解釋
- 原則 2 — 解釋

## 溝通風格
（= BMAD communication_style）
- 語言偏好
- 表達風格
- 格式偏好

## 邊界（OpenClaw 獨有，BMAD 無此概念）
- 不能做的事 1
- 不能做的事 2

## 記憶管理
- MEMORY.md 使用策略
- memory/ 日誌策略
```

**設計原則：**
- 原則段落是 BMAD 升級的核心 — 將散文式描述改為結構化條列
- 每條原則應可驗證（CAO 稽核時可逐條檢查）
- 邊界段落是我們獨有的治理設計，明確劃定 Agent 不可踰越的紅線

### AGENTS.md（對應 BMAD Activation + Menu）

```markdown
## 啟動必讀 — 公司規範
（= BMAD activation step 1-2）

每次 session 開始時，你必須先用 read 工具讀取以下檔案並遵守其中所有規範：
- `{{INSTALL_DIR}}/shared/company-rules.md`

只有在讀取並理解公司規範後，才開始執行任何任務。

---

### 路徑配置
（取代 BMAD config.yaml — 寫在 AGENTS.md 中隨 bootstrap 自動載入）

| 項目 | 路徑 |
|------|------|
| Workflows | {{INSTALL_DIR}}/workspace-xxx/workflows/ |
| Templates | {{INSTALL_DIR}}/workspace-xxx/templates/ |
| Output | {{INSTALL_DIR}}/workspace-xxx/output/ |
| 共用 Tasks | {{INSTALL_DIR}}/shared/tasks/ |

### 可用工作流程
（= BMAD Menu — 情境觸發式路由）

收到指令或事件時，根據情境觸發對應 workflow。用 read 工具讀取 workflow.md 後遵循指示。

| 觸發情境 | Workflow | 類型 | 說明 |
|----------|---------|------|------|
| {情境描述} | workflows/xxx/workflow.md | 互動式/執行式/自動 | {一句話} |

**Workflow 類型說明：**
- **互動式**：需要與董事長或其他 Agent 互動，由本 Agent 直接執行
- **執行式**：輸入明確、產出明確，可由 Sub-Agent spawn 執行
- **自動**：由 heartbeat 或 cron 觸發，不需人類介入

### {角色}職責與工作流程
（現有內容，按需升級）
```

**設計原則：**
- 路徑配置取代 BMAD 的 config.yaml，因為 OpenClaw 不會自動載入 yaml
- 可用工作流程表格取代 BMAD 的 XML menu，更直觀
- Workflow 類型分類決定執行方式（直接執行 vs spawn）

### TOOLS.md（對應 BMAD Capabilities）

維持現有結構不變：
- 啟動必讀 → shared/tools-policy.md
- 領域工具操作規範

### HEARTBEAT.md（OpenClaw 獨有）

維持現有結構不變。BMAD 無此概念。

### MEMORY.md（對應 BMAD Sidecar Memory）

維持現有三層記憶系統不變。我們的記憶系統已超越 BMAD。

---

## Sub-Agent（工程師）格式

Sub-Agent 透過 `sessions_spawn` 建立，自動收到 5 個標準檔案（AGENTS.md, TOOLS.md, SOUL.md, IDENTITY.md, USER.md）。但工程師定義檔案（engineers/*.md）是透過 spawn 的 `task` 欄位注入的。

### 工程師定義檔案格式（engineers/*.md）

```markdown
---
name: "engineer-id"
title: "角色標題"
icon: "emoji"
capabilities: "能力描述"
rules:
  - tdd-iron-law.md
  - verification.md
sidecar: false
---

# {顯示名}（{title}）

## 啟動指令
（= BMAD activation，Sub-Agent 收到定義後依序執行）

1. 讀取本定義，載入身份與工作方式。
2. 讀取 CTO 注入的鐵律規則（rules/ 內容已包含在 spawn task 中）。
3. 如有指定 workflow，讀取該 workflow 的第一個 step 檔案。
4. {角色特有啟動步驟}

## 身份
- **溝通風格：** {描述}
- **原則：**
  - {原則 1}
  - {原則 2}

## 能力範圍
- {能力 1}
- {能力 2}

## 可用工作流程
（= BMAD menu，列出此工程師可執行的 workflow）

| 代碼 | Workflow | 說明 |
|------|---------|------|
| {CODE} | workflows/path/workflow.md | {描述} |

## 工作方式
- {行為 1}
- {行為 2}

## 回報格式
（統一格式，所有工程師一致）

- 【任務結果】完成/失敗 + 具體產出描述
- 【遇到的問題】過程中遇到的障礙與解法
- 【建議與教訓】可複用的經驗或需注意的陷阱
- 【驗證證據】{角色相關的驗證項目}

## 適用規則
- `rules/{rule}.md` — {說明}
```

**設計原則：**
- YAML frontmatter 提供機器可解析的 metadata（CTO 的 roster.md 可引用）
- 啟動指令是線性步驟，不是 BMAD 的 XML activation（更適合 LLM 理解）
- 可用工作流程讓 Sub-Agent 知道自己能做什麼，CTO spawn 時可指定具體 workflow
- sidecar 欄位標記此工程師是否有專屬記憶目錄（如 tech-writer 的 documentation-standards.md）

---

## 格式規範索引

| 檔案 | 對應 BMAD 概念 | 自動載入 | 適用對象 |
|------|--------------|---------|---------|
| IDENTITY.md | Agent Metadata | ✅ | 全部 |
| SOUL.md | Persona | ✅ | 全部 |
| AGENTS.md | Activation + Menu + Config | ✅ | 全部 |
| TOOLS.md | Capabilities | ✅ | 全部 |
| HEARTBEAT.md | （無對應） | ✅ 主 Agent | C-suite |
| MEMORY.md | Sidecar Memory | ✅ 主 Agent | C-suite |
| engineers/*.md | Agent Definition | ❌（spawn 注入） | Sub-Agent |
| workflows/*/workflow.md | Workflow Entry | ❌（Agent read） | 全部 |
| workflows/*/steps/*.md | Workflow Steps | ❌（Agent read） | 全部 |
| templates/*.md | Output Templates | ❌（Agent read） | 全部 |
| output/*/ | Output Directory | ❌（Agent write） | 全部 |

---

## 字元限制注意事項

OpenClaw bootstrap 檔案有以下限制：
- 單檔上限：20,000 字元（`bootstrapMaxChars`）
- 截斷策略：70% 頭部 + 20% 尾部
- 全部 bootstrap 總上限：150,000 字元（`bootstrapTotalMaxChars`）

**因此：**
- AGENTS.md 的「可用工作流程」表格應精簡（只列觸發情境和路徑，詳細說明在 workflow.md 內）
- 路徑配置用表格而非散文，節省字元
- 複雜的流程邏輯放在 workflow 微檔案中，不放在 AGENTS.md
