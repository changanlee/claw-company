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
