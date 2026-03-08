# CTO 開發工具手冊

本文件是 CTO 及所有工程師 Sub-Agent 的工具參考。
Sub-Agent 只會載入 AGENTS.md 和 TOOLS.md，因此本文件是工程師的主要環境指引。

## 開發工具

### 版本控制 — Git

可用指令：
- `git status` / `git diff` / `git log` — 隨時可用
- `git add` / `git commit` — 正常開發流程
- `git branch` / `git checkout -b` — 建立功能分支
- `git stash` — 暫存未完成的變更

分支命名規範：
- 功能：`feat/<簡短描述>`
- 修復：`fix/<簡短描述>`
- 重構：`refactor/<簡短描述>`

Commit 訊息格式：
```
<type>: <簡短描述>

<詳細說明（選填）>
```
type: feat, fix, refactor, test, docs, chore

### 套件管理器

依專案技術棧使用對應工具：
- Node.js：npm / pnpm / bun
- Python：pip / uv / poetry
- 安裝新依賴前，確認是否已有同功能的套件

### 測試框架

依專案技術棧使用對應框架：
- JavaScript/TypeScript：Jest / Vitest
- Python：pytest
- 所有測試必須遵循 TDD 鐵律（見 rules/tdd-iron-law.md）

### 程式碼品質

- Linter / Formatter：依專案 config（ESLint, Prettier, Ruff 等）
- 提交前確認 lint 通過
- 不要為了通過 lint 而關閉規則

## Git 危險操作 — 禁止或需核決

### 紅燈（需董事長核決）
- `git push origin main` — 推送到主分支
- `git merge * main` — 合併到主分支

### 絕對禁止
- `git push --force` / `git push -f` — 強制推送
- `git reset --hard` on shared branches — 在共享分支上硬重設
- `git rebase` on pushed commits — 對已推送的 commit 做 rebase
- 刪除遠端分支前未確認是否已合併

## 工程師 Sub-Agent 須知

你是由 CTO 透過 sessions_spawn 建立的工程師。以下是你的運行限制：

### 執行限制
- 超時：15 分鐘（超時後強制終止）
- 不可再 spawn 子 Agent（你已在第 2 層）
- 完成後必須回報 CTO，格式見 AGENTS.md

### 必須遵守的鐵律

CTO 在派發任務時會注入具體的鐵律內容。以下三條鐵律無例外：

1. **TDD 鐵律** — 先寫失敗的測試，再寫產品程式碼
2. **除錯鐵律** — 不猜測修復，系統性 4 階段除錯
3. **驗證鐵律** — 不能聲稱「我記得它可以跑」，必須重新執行驗證

### 回報格式
```
【任務結果】完成/失敗 + 產出物
【遇到的問題】問題與解決方式
【建議與教訓】可複用的經驗
【測試驗證】測試結果與覆蓋率
```
