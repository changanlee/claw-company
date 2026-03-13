# 通用工具規範

本文件是全公司所有 Agent 及 Sub-Agent 的工具使用規範。
所有角色在使用工具時必須遵守以下規範，無例外。

## Sub-Agent 執行限制

- 超時：15 分鐘（超時後強制終止）
- 不可再 spawn 子 Agent（Sub-Agent 已在第 2 層）
- 完成後必須回報上級
- 遇到 TOOLS.md 未涵蓋的操作情境，預設保守處理（不執行），回報上級並建議新增規範

## Sub-Agent 回報格式

```
【任務結果】完成/失敗 + 產出物
【遇到的問題】問題與解決方式
【建議與教訓】可複用的經驗
```

## 危險操作 — 絕對禁止

### 檔案系統
- `rm -rf /` 或任何大範圍刪除
- 刪除其他 Agent 的 workspace 檔案
- 未經確認的覆蓋寫入

### 資料安全
- 絕對不輸出、記錄、或傳送 API Key / Token / 密碼
- 金鑰只從環境變數讀取，永不硬編碼
- 記憶檔案中不得出現任何密鑰

### 系統指令
- 不得修改系統設定（crontab、hosts、sudoers 等）
- 不得安裝系統層級軟體
- 不得開啟對外網路連接（除了已授權的 API 呼叫）

## 通訊工具使用規範

### exec dispatch — 跨 Agent 分派（主要方式）

CEO 分派任務給其他高管時，使用安全的 dispatch.sh 腳本：

```
1. write("/tmp/claw-task-<agent-id>.txt", "結構化任務描述")
2. exec("bash {{INSTALL_DIR}}/shared/dispatch.sh <agent-id> /tmp/claw-task-<agent-id>.txt 60")
```

- 任務描述必須結構化：任務目標 + 預期輸出格式 + 急迫度
- **絕對禁止在 exec 命令中直接拼接訊息文字**（防止 shell injection）
- 嚴禁製造迴圈分派（A→B→A→B）
- dispatch.sh 會自動驗證 agent-id 白名單（cc-* 格式）
- 其他高管若需要跨 Agent 分派，也必須使用相同的 dispatch.sh 流程

### sessions_send — ⚠️ 已棄用
- sessions_send 無法喚醒無活躍 session 的 Agent，不可作為分派工具
- 所有跨 Agent 分派改用 exec dispatch

### sessions_spawn — 生成 Sub-Agent（CTO 專用）
- 僅限 CTO 用於 spawn 工程師 Sub-Agent（在 CTO workspace 下執行）
- spawn 前必須確認任務明確：目標、約束、預期產出
- 一個 Sub-Agent 只做一個明確任務，避免模糊指令
- Sub-Agent 的回報內容要即時處理，提取有價值的資訊
- 其他角色不應使用 sessions_spawn 進行跨 Agent 通訊

## 記憶路徑慣例

| 路徑 | 用途 |
|------|------|
| MEMORY.md | 熱記憶（≤200 行），存原則與模式 |
| memory/YYYY-MM-DD.md | 每日事件日誌 |
| policies/*.md | 公司政策（按需讀取，見 company-rules.md 情境觸發規則） |

## 領域工具規範修改流程

各角色可在工作中提案新增或修改自己的領域工具規範（workspace TOOLS.md）。

**提案來源：**
- 董事長主動訂定
- 角色本人在工作中發現需要規範某些操作
- CHRO 在週度巡檢中建議

**審批流程：** 提案 → CEO 初審 → CAO 合規檢查 → 董事長核決（紅燈）
