# OpenClaw 煙霧測試驗證計畫

來源：2026-03-09 Party Mode 架構審查
目標：驗證 Claw Company 配置在 OpenClaw 上的實際可行性

---

## 前置條件

- [ ] OpenClaw >= 2026.3.7 已安裝
- [ ] 至少一個通道已設定（Telegram 或其他）
- [ ] 至少一個模型已設定（smart/fast）
- [ ] `node install.js` 成功執行
- [ ] `openclaw gateway start` 可啟動

---

## 測試 1：安裝完整性（T3）

**驗證目標**：`{{INSTALL_DIR}}` 替換後路徑正確

```bash
# 執行測試腳本
node tests/smoke-test.js --test install-paths
```

**手動驗證方式**：
1. 檢查 `~/.openclaw/claw-company/` 目錄存在
2. 任意打開一個 AGENTS.md，確認 `{{INSTALL_DIR}}` 已被替換為實際路徑
3. 確認替換後的路徑指向存在的檔案

**預期結果**：所有 `{{INSTALL_DIR}}` 已替換，所有引用路徑可存取

---

## 測試 2：Agent 基本啟動（T1 部分）

**驗證目標**：7 個 Agent 都能正常啟動並回應

```bash
node tests/smoke-test.js --test agent-boot
```

**手動驗證方式**：
1. 透過 Telegram 發送「@CEO 你好」
2. 確認 CEO 回應（證明 Agent 啟動成功）
3. 透過 CEO 發送「@CTO 你好」（測試 sessions_send）
4. 確認 CTO 回應

**預期結果**：Agent 收到訊息並回應，sessions_send 正常運作

---

## 測試 3：啟動必讀行為（T2）

**驗證目標**：Agent 是否在啟動時讀取 company-rules.md 和 tools-policy.md

```bash
node tests/smoke-test.js --test bootstrap-read
```

**手動驗證方式**：
1. 向 CEO 發送：「你的 Agent ID 是什麼？」
   - 如果回答 `cc-ceo` → 讀了 company-rules.md ✅
   - 如果回答不知道 → 沒讀 ❌
2. 向 CEO 發送：「目前公司有幾個 Agent？列出 Agent ID」
   - 能正確列出 7 個 → 讀了 company-rules.md ✅
3. 向 CTO 發送：「Sub-Agent 的執行時間上限是多少？」
   - 如果回答 15 分鐘 → 讀了 tools-policy.md ✅

**預期結果**：Agent 能回答 company-rules.md 中的內容

---

## 測試 4：Sub-Agent Spawn 全流程（T1 + T2 核心）

**驗證目標**：CTO → spawn Dev Sub-Agent → 完成任務 → 回報

```bash
node tests/smoke-test.js --test subagent-spawn
```

**手動驗證方式**：
1. 向 CTO 發送：
   ```
   幫我建立一個最簡單的 hello world Node.js 專案。
   只需要一個 index.js 輸出 "Hello World"，加一個測試。
   使用精簡流程，直接拆解和派發。
   ```
2. 觀察 CTO 是否：
   - 執行 dev-dispatch skill
   - 選擇精簡流程
   - spawn Dev (Ivy) Sub-Agent
3. 觀察 Ivy 是否：
   - 讀取 engineers/dev.md（看回報是否提到 Ivy 的身份）
   - 讀取 tdd-iron-law.md（看是否用 TDD 流程）
   - 完成後用標準回報格式
4. 觀察 CTO 是否：
   - 收到 Ivy 的回報
   - spawn Code Reviewer (Knox)
   - 最終回報給董事長

**預期結果**：完整 spawn → 執行 → 回報 → 審查 流程跑通

---

## 測試 5：Heartbeat 心跳（T1 部分）

**驗證目標**：自動心跳巡檢正常執行

**手動驗證方式**：
1. 啟動 gateway 後等待 30 分鐘
2. 檢查是否有 Agent 發送心跳訊息
3. CEO 心跳應為「智慧靜默」— 正常時不打擾

**預期結果**：心跳觸發但無異常時不發送訊息

---

## 測試 6：15 分鐘 Timeout 驗證（T4）

**驗證目標**：確認 timeout 是 tools-policy 軟限制還是 OpenClaw 平台硬限制

**手動驗證方式**：
1. 查 OpenClaw 文件或原始碼，搜尋 `timeout`、`maxDuration`、`spawn` 相關設定
2. 如果 OpenClaw 有自己的 timeout → 記錄預設值
3. 如果 OpenClaw 無 timeout → 15 分鐘僅為我們的自訂規則

**預期結果**：明確 timeout 來源，決定是否放寬

---

## 測試 7：Cron 排程驗證

**驗證目標**：6 個 cron job 正確註冊並觸發

```bash
node tests/smoke-test.js --test cron-jobs
```

**手動驗證方式**：
1. `openclaw cron list` — 確認 6 個 cron job 已註冊
2. 等待 morning-briefing 觸發時間（06:30）或手動觸發
3. 確認 CEO 發送晨間簡報

**預期結果**：cron job 註冊正確且可觸發

---

## 結果記錄模板

| 測試 | 結果 | 備註 | 日期 |
|------|------|------|------|
| T1 安裝完整性 | | | |
| T2 Agent 基本啟動 | | | |
| T3 啟動必讀行為 | | | |
| T4 Sub-Agent Spawn | | | |
| T5 Heartbeat | | | |
| T6 Timeout 驗證 | | | |
| T7 Cron 排程 | | | |

---

## 測試後行動

- 全部通過 → 更新 architecture-overview.md 的 OpenClaw 可行性為 95%
- 部分失敗 → 依失敗項目建立修復計畫
- T4（Sub-Agent Spawn）失敗 → 最高優先修復，這是核心功能
