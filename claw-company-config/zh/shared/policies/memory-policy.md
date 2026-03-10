# 記憶管理政策

## 記憶金字塔

### 第一層：MEMORY.md（熱記憶）— Source of Truth
- **上限**：200 行
- **載入時機**：每次 session 自動載入
- **寫入者**：Agent 主動判斷寫入
- **內容**：提煉過的原則、模式、偏好、關鍵決策
- **角色**：精煉結論的 source of truth
- **維護**：寫入前檢查重複，接近上限時歸檔舊條目

### 第二層：memory/YYYY-MM-DD.md（溫記憶）
- **載入時機**：今天 + 昨天的日誌自動載入
- **寫入者**：Agent 主動寫入
- **內容**：當日事件、對話摘要、執行結果
- **角色**：時間線紀錄
- **格式**：時間戳 + 簡潔條目
- **保留**：30 天後由清理 cron job 歸檔

### 第二點五層：Supabase（結構化資料）— 未來擴展
- **載入時機**：Agent 透過 Skill 按需查詢
- **內容**：CFO 帳務記錄、CIO 投資組合、COO 行程資料
- **狀態**：草創期暫不啟用，待資料量增長後建置
- **建置指南**：參閱 shared/setup-guides/database-setup.md

### 第三層：LanceDB（冷記憶）— memory-lancedb-pro 插件
- **載入時機**：autoRecall 在 session 開始時自動注入相關記憶（最多 3 條）
- **寫入者**：autoCapture 在 agent_end 自動沉澱，Agent 不需手動操作
- **內容**：對話語境、錯誤與解法、討論脈絡、歷史經驗
- **角色**：自動沉澱池（補充層，非 source of truth）
- **容量**：無限制
- **過濾機制**：噪音過濾 + Time Decay（60 天半衰期）+ 存取強化（常被檢索的記憶延壽）+ MMR 去重（cosine > 0.85 降權）
- **隔離**：Multi-Scope 隔離（每個 Agent 有私有 scope，cc-* 共享 project:claw-company scope，main 完全隔離）
- **建置指南**：參閱 shared/setup-guides/database-setup.md

## 寫入規則

1. 先判斷資訊的時效性：
   - 長期有效（偏好、原則）→ MEMORY.md
   - 當日有效（事件、結果）→ memory/YYYY-MM-DD.md
   - 冷記憶沉澱 → **由 autoCapture 自動處理，Agent 不需手動寫入 LanceDB**
2. 寫入 MEMORY.md 前：
   - 檢查是否已有相同或相似條目
   - 如有，更新而非新增
   - 如 MEMORY.md 超過 180 行，先清理過時條目
3. 日誌格式統一：`HH:MM — [類別] 內容摘要`
4. **三層分工原則**：MEMORY.md 存精煉結論，memory/*.md 存事件紀錄，LanceDB 存對話語境。三者粒度不同，不是重複。

## 主動記憶策略

<!-- Source: Proactive Agent v3.1.0 — WAL + Working Buffer | Absorbed: 2026-03-10 -->

### WAL（Write-Ahead Logging）

在執行重要決策或複雜操作前，先將意圖和計畫摘要寫入 memory/ 日誌，再開始執行。這確保即使 session 中斷或 compaction 發生，決策脈絡不會遺失。

適用情境：
- 即將執行多步驟計畫
- 做出影響多個 Agent 的決策
- 處理董事長的重要指示

格式：`HH:MM — [WAL] 意圖：<計畫摘要>` → 執行 → `HH:MM — [WAL] 結果：<執行結果>`

### Working Buffer（Context 閾值觸發）

當感知到 context 使用量較高（對話已持續較長時間或處理大量資料）時，啟動高頻記憶模式：每次重要回覆後都將關鍵資訊寫入 memory/ 日誌，確保 compaction 不會造成資訊遺失。

觸發信號：
- 對話已超過 20 輪以上
- 處理多份文件或大量程式碼
- 感覺到「如果現在 session 中斷，我會忘記重要細節」

### Reverse Prompting（主動預判）

不只被動回答問題，主動預判董事長或其他 Agent 接下來可能需要什麼資訊或決策。在完成任務時，附帶「下一步建議」或「相關的待處理事項」。

適用情境：
- 完成董事長交辦的任務後
- 發現與當前任務相關但未被提及的問題
- 心跳巡檢發現異常趨勢

## 學習分類與晉升

<!-- Source: Self Improving Agent v3.0.0 — Error Log + Promotion | Absorbed: 2026-03-10 -->

### 記憶分類標籤

寫入 memory/ 日誌時，使用以下標籤區分記憶類型：

| 標籤 | 用途 | 範例 |
|------|------|------|
| `[ERROR]` | 執行失敗與解決方式 | API 呼叫失敗的 workaround |
| `[LEARNING]` | 驗證過的經驗教訓 | 某個技法特別有效 |
| `[FEATURE-REQ]` | 發現的能力缺口 | 需要但不存在的 Skill |

### 晉升觸發條件

當一條 `[LEARNING]` 滿足以下全部條件時，應從 memory/ 晉升到 MEMORY.md：

1. **重複出現** — 相同模式在不同任務中出現 2 次以上
2. **已驗證** — 不是猜測，而是實際執行過並確認有效
3. **廣泛適用** — 不局限於單一特定情境

當一條 `[FEATURE-REQ]` 重複出現 2 次以上，應通知 CHRO 評估是否需要新 Skill（走 skill-development.md 流程）。

## 清理規則

- 每月第一天，CHRO 審視各 Agent 的 MEMORY.md 健康度及 LanceDB 冷層統計（`memory stats`）
- 超過 30 天的 memory/ 日誌，移至歸檔（或刪除，視資料價值而定）
- 重複或矛盾的記憶條目，以較新的為準
- 冷層由 Time Decay + 存取強化自動管理，CHRO 監控 autoRecall 命中率作為信噪比指標

## 備案與回退

- **回退到內建記憶**：從 openclaw.json 移除 `plugins` 區段，重啟 gateway 即可恢復內建 SQLite 記憶
- **LanceDB 資料不會被刪除**，回退後可隨時重新啟用
- **MEMORY.md 和 memory/*.md 不受 LanceDB 插件影響**，無論插件狀態如何，熱/溫記憶層皆正常運作

## VP 層啟動條件

當以下任一條件達成時，由 CHRO 月度審計提案啟動 VP 層：
- autoRecall 命中率連續 2 個月 < 70%（信噪比問題）
- 單一 C-level 管理的領域 > 3 個明確分支
- CTO Sub-Agent spawn 頻率顯示某領域佔比 > 60%

VP 的價值不是擴充容量（LanceDB 已解決），而是**領域聚焦**——讓每個 VP 的 scope 更窄，autoRecall 精度更高。
