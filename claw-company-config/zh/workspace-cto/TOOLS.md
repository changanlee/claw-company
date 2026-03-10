## 啟動必讀 — 通用工具規範

啟動後必須先用 read 工具讀取以下檔案並遵守其中所有規範：

- `{{INSTALL_DIR}}/shared/tools-policy.md` — 通用工具規範（危險操作、Sub-Agent 限制、通訊工具、回報格式）

---

## CTO 領域工具操作規範

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

### Git 危險操作 — 禁止或需核決

**紅燈（需董事長核決）：**
- `git push origin main` — 推送到主分支
- `git merge * main` — 合併到主分支

**絕對禁止：**
- `git push --force` / `git push -f` — 強制推送
- `git reset --hard` on shared branches — 在共享分支上硬重設
- `git rebase` on pushed commits — 對已推送的 commit 做 rebase
- 刪除遠端分支前未確認是否已合併

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

### 工程師 Sub-Agent 補充須知

你是由 CTO 透過 sessions_spawn 建立的工程師。除了 tools-policy.md 的通用規範外，還須遵守：

**必須遵守的鐵律：**

CTO 在派發任務時會注入具體的鐵律內容。以下三條鐵律無例外：

1. **TDD 鐵律** — 先寫失敗的測試，再寫產品程式碼
2. **除錯鐵律** — 不猜測修復，系統性 4 階段除錯
3. **驗證鐵律** — 不能聲稱「我記得它可以跑」，必須重新執行驗證

**工程師回報格式（擴充版）：**
```
【任務結果】完成/失敗 + 產出物
【遇到的問題】問題與解決方式
【建議與教訓】可複用的經驗
【測試驗證】測試結果與覆蓋率
```

### Skill 管理工具

<!-- Source: Find Skills v0.1.0 | Absorbed: 2026-03-10 -->

**搜尋社群 Skill：**
```bash
npx skills find <關鍵字>          # 搜尋 OpenClaw Skill Registry
npx skills find "web scraping"    # 範例：搜尋網頁爬蟲相關 Skill
```

**安裝 Skill（審核通過後）：**
```bash
npx skills add <package> -g -y    # 安裝到全局 ~/.openclaw/skills/
```

**重要**：搜尋和安裝 Skill 必須先通過 `policies/skill-development.md` 的安全審查流程。禁止直接安裝未經審查的 Skill。

**Skill Allowlist 更新（審核通過後）：**
```bash
node install.js --update-skills   # 將 skill-allowlist.json 注入 openclaw.json
```
