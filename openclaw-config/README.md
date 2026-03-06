# 長安一人公司 — OpenClaw 多代理人架構

## 架構總覽

```
董事長（長安）
  ↕ Telegram / WhatsApp / Discord
CEO（總經理）— 統籌、分派、精煉回報
  ├── CFO（財務長）— 記帳、預算、成本審計
  ├── CIO（投資長）— 投資組合監控、市場分析
  ├── COO（營運長）— 行程、飲食、出行、生活管理
  ├── CTO（技術長）— 產品開發、工兵 Sub-Agent 管理
  └── CHRO（人資長）— Agent 能力評估、政策撰寫

CAO（稽核長）— 獨立監督，直接向董事長報告
```

## 文件結構

```
openclaw-config/
├── openclaw.json              # 主配置（JSON5）
├── setup.sh                   # 部署腳本
├── README.md                  # 本文件
├── shared/
│   ├── AGENTS.md              # 共用營運規範（軟連結到各 workspace）
│   ├── USER.md                # 董事長資訊（軟連結到各 workspace）
│   └── policies/              # 共用政策文件（軟連結到各 workspace）
│       ├── approval-matrix.md # 核決權限矩陣
│       ├── security-rules.md  # 安全規範
│       ├── memory-policy.md   # 記憶管理政策
│       ├── audit-response.md  # 稽核回應與閉環機制
│       ├── token-budget.md    # Token 預算與成本管理
│       └── changelog.md       # 政策變更日誌
└── workspace-{agent}/         # 各 Agent 的 workspace 模板
    ├── SOUL.md                # 角色定義、職責、邊界
    ├── MEMORY.md              # 熱記憶（≤200 行）
    ├── HEARTBEAT.md           # 心跳任務定義
    ├── AGENTS.md              # → shared/AGENTS.md（軟連結）
    ├── USER.md                # → shared/USER.md（軟連結）
    ├── policies/              # → shared/policies/（軟連結）
    └── memory/                # 每日日誌（memory/YYYY-MM-DD.md）
```

## 部署步驟

### 1. 前置條件

- 已安裝 OpenClaw（https://github.com/openclaw/openclaw）
- 已有 Telegram Bot Token（至少一個給 CEO）
- 已有 Anthropic API Key

### 2. 配置 Token

編輯 `openclaw.json`，替換以下佔位符：
- `YOUR_CEO_BOT_TOKEN` — CEO 的 Telegram Bot Token
- `YOUR_CAO_BOT_TOKEN` — CAO 的 Telegram Bot Token（可選，稽核獨立通道）
- `YOUR_TELEGRAM_ID` — 你的 Telegram User ID
- `YOUR_DISCORD_BOT_TOKEN` — Discord Bot Token
- `YOUR_GATEWAY_TOKEN` — Gateway 認證 Token（自行設定一個安全字串）

### 3. 執行部署

```bash
chmod +x setup.sh
./setup.sh
```

腳本會：
- 備份現有 openclaw.json
- 部署配置到 `~/.openclaw/`
- 建立所有 workspace 並設定軟連結
- 印出需要手動執行的 `openclaw agents add` 和 `openclaw cron add` 指令

### 4. 手動註冊 Agent 和 Cron

複製 setup.sh 輸出的指令逐一執行。

### 5. 啟動

```bash
openclaw gateway start
```

### 6. 測試

透過 Telegram 向 CEO Bot 發送一條訊息，例如：「你好，請自我介紹」

## 設計原則

| 原則 | 說明 |
|------|------|
| 三級核決 | 綠燈自動 → 黃燈 CEO 審 → 紅燈董事長核決 |
| 三方制衡 | CEO（執行）↔ CAO（監督）↔ CHRO（政策），僵局由董事長裁決 |
| 記憶分層 | MEMORY.md（熱）→ memory/ 日誌（溫）→ LanceDB（冷，未來） |
| 治理分層 | AGENTS.md（索引）→ SOUL.md（角色）→ policies/（詳細規範） |
| 按需載入 | policies/ 只在觸發情境時讀取，節省 Token |
| 精煉回報 | 逐層精煉，董事長只收到摘要，不收原始資料 |

## Cron 排程總覽

| 名稱 | Agent | 時間 | 用途 |
|------|-------|------|------|
| morning-briefing | CEO | 每天 06:30 | 晨間會報推送 |
| investment-monitor | CIO | 週一至五 09-16 每小時 | 投資組合監控 |
| memory-cleanup | CHRO | 每月 1 日 03:00 | 記憶健康度審視 |
| weekly-org-review | CHRO | 每週一 08:00 | 組織健康週報 |
| security-scan | CAO | 每週三 02:00 | 安全掃描 |

## 草創期注意事項

- 目前優先驗證生活面功能（COO、CFO、CIO）
- 產品開發（CTO）暫緩，待生活面驗證穩定後啟動
- 各 Agent 的偏好與規則會隨互動逐步精煉
- LanceDB 冷記憶層待資料量增長後由 CTO 建置
