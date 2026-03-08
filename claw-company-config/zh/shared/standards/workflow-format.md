# Workflow 格式規範

本文件定義所有 workflow（工作流程）的標準檔案格式，包含主檔案、步驟微檔案、以及產出檔案格式。

---

## 目錄結構

每個 workflow 是一個目錄，包含主檔案和步驟子目錄：

```
workflows/
└── {workflow-name}/
    ├── workflow.md          # 主檔案：概述、前置條件、步驟總覽
    └── steps/               # 步驟微檔案目錄
        ├── step-01-init.md
        ├── step-02-xxx.md
        ├── step-03-xxx.md
        └── step-0N-complete.md
```

**特殊情況 — 多模式 workflow：**

如果一個 workflow 有多種執行模式（如 create/edit/validate），使用子目錄區分：

```
workflows/
└── create-prd/
    ├── workflow.md
    ├── steps-c/             # Create 模式
    │   ├── step-01-init.md
    │   └── ...
    ├── steps-e/             # Edit 模式
    │   └── ...
    └── steps-v/             # Validate 模式
        └── ...
```

---

## 主檔案格式（workflow.md）

```markdown
---
name: workflow-id
description: "一句話描述"
type: interactive | execution | automatic
agent: ceo | cfo | cio | coo | cto | chro | cao
sub-agent: pm | dev | qa | null
phase: analysis | planning | solutioning | implementation | operations
approval: green | yellow | red
output-dir: output/{category}/
---

# {Workflow 名稱}

## 概述

一段話說明此 workflow 的目的、適用場景、預期產出。

## 前置條件

- 需要的輸入文件（如有）
- 需要完成的前序 workflow（如有）
- 特殊工具需求（如有）

## 步驟總覽

| 步驟 | 檔案 | 說明 |
|------|------|------|
| 1 | steps/step-01-init.md | 初始化與狀態檢測 |
| 2 | steps/step-02-xxx.md | {說明} |
| ... | ... | ... |
| N | steps/step-0N-complete.md | 完成與產出 |

## 執行指令

讀取並遵循第一個步驟：`steps/step-01-init.md`

⚠️ **Just-In-Time 載入規則：**
- 只讀取當前步驟的檔案
- 不要預讀後續步驟
- 每個步驟完成後，該步驟會指示你讀取下一個步驟

## 核決閘門

| 產出 | 燈號 | 處理方式 |
|------|------|---------|
| {產出名} | {綠/黃/紅} | {處理方式} |
```

### Frontmatter 欄位說明

| 欄位 | 說明 | 可選值 |
|------|------|--------|
| name | 唯一識別碼 | kebab-case |
| description | 一句話描述 | 自由文字 |
| type | 執行類型 | `interactive`（需互動，Agent 直接執行）、`execution`（Sub-Agent spawn mode:"run"）、`automatic`（heartbeat/cron） |
| agent | 所屬 Agent | 7 個 C-suite ID |
| sub-agent | 執行的 Sub-Agent | 10 個工程師 ID 或 null |
| phase | 所屬階段 | BMAD 四階段 + operations（營運） |
| approval | 核決燈號 | green / yellow / red |
| output-dir | 產出目錄 | 相對於 workspace 的路徑 |

---

## 步驟微檔案格式（step-0N-xxx.md）

```markdown
---
name: step-0N-xxx
description: "步驟說明"
next-step: ./step-0{N+1}-xxx.md | null
output-file: "{output-dir}/filename.md"
template: "../../templates/xxx.md"
---

# 步驟 N：{標題}

**進度：步驟 N / 共 M 步** — 下一步：{下一步標題}

## 目標

一句話說明本步驟要完成什麼。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟
- {步驟特有規則}

## 執行指令（按順序，不可跳步）

### 1. {第一個動作}

{詳細說明}

### 2. {第二個動作}

{詳細說明}

### N. {最後一個動作}

{詳細說明}

## 完成條件

- ✅ {成功標準 1}
- ✅ {成功標準 2}

## 下一步

確認完成條件滿足後，讀取並遵循：`{next-step}`

（如果 next-step 為 null，表示此為最後一步，回報完成。）
```

### Frontmatter 欄位說明

| 欄位 | 說明 | 備註 |
|------|------|------|
| name | 步驟識別碼 | step-0N-xxx 格式 |
| description | 步驟說明 | 自由文字 |
| next-step | 下一步檔案路徑 | 相對路徑或 null（最後一步） |
| output-file | 本步驟的產出檔案 | 只有會產生檔案的步驟才填 |
| template | 使用的模板路徑 | 只有需要模板的步驟才填 |

---

## 產出檔案 Frontmatter 格式

所有 workflow 產出的檔案都必須包含標準化的 YAML frontmatter，便於追蹤狀態和未來匯入資料庫。

```yaml
---
type: product-brief | prd | architecture | epic | story | sprint-status |
      code-review | retrospective | research | ux-design | quick-spec |
      expense | report | analysis | portfolio | trip-plan | schedule |
      assessment | policy-draft | audit | security-scan
status: draft | in-review | approved | archived
created: YYYY-MM-DD
agent: {agent-id}
workflow: {workflow-name}
steps-completed:
  - step-01-init
  - step-02-xxx
approved-by: null | ceo | chairman
related: []
tags: []
---
```

### 欄位說明

| 欄位 | 必填 | 說明 |
|------|------|------|
| type | ✅ | 文件類型，用於分類和未來 DB schema |
| status | ✅ | 當前狀態 |
| created | ✅ | 建立日期 |
| agent | ✅ | 建立此文件的 Agent |
| workflow | ✅ | 使用的 workflow 名稱 |
| steps-completed | ✅ | 已完成的步驟列表（用於 continuation detection） |
| approved-by | 選填 | 核決者（完成核決後填入） |
| related | 選填 | 相關文件路徑列表 |
| tags | 選填 | 自由標籤 |

### Continuation Detection（中斷恢復）

當 Agent session 被 reset（daily 04:00 或 idle 60 分鐘）後重新啟動 workflow 時：

1. 檢查 `output-file` 是否已存在
2. 如已存在，讀取其 frontmatter 的 `steps-completed`
3. 跳到最後完成步驟的下一步繼續執行
4. 不要從頭重新開始

---

## 三種 Workflow 類型的執行差異

### 互動式（interactive）

- C-suite Agent 直接執行（利用持續 session 與董事長互動）
- 步驟間可能需要等待使用者輸入
- 範例：brainstorming, purchase-analysis, trip-planning

### 執行式（execution）

- Sub-Agent 透過 `sessions_spawn` mode:"run" 一次性執行
- 所有步驟在單次 spawn 內完成，不暫停等互動
- CTO spawn 時在 task 欄位指定 workflow 路徑
- 範例：create-prd, dev-story, code-review

### 自動（automatic）

- 由 heartbeat 或 cron 觸發
- 不需要人類介入
- 產出自動寫入 output/ 或透過 sessions_send 通知
- 範例：portfolio-monitor, security-scan, morning-briefing

---

## 命名慣例

| 項目 | 規則 | 範例 |
|------|------|------|
| Workflow 目錄 | kebab-case | create-prd/, trip-planning/ |
| 步驟檔案 | step-{NN}-{描述}.md | step-01-init.md, step-03-draft.md |
| 步驟目錄（多模式） | steps-{mode}/ | steps-c/ (create), steps-e/ (edit) |
| 產出檔案 | {type}-{date}.md 或 {type}.md | prd-2026-03-08.md |
| 模板檔案 | {type}.md | prd.md, trip-plan.md |
