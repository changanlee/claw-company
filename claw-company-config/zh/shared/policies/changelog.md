# 政策與配置變更日誌

## 格式

```
## YYYY-MM-DD — 變更摘要
- 提案者：<agent-id>
- 審查者：<agent-id>
- 批准者：董事長
- 變更內容：<說明>
- 影響範圍：<哪些文件/Agent 受影響>
- 原因：<變更原因>
```

## 變更通知機制

政策變更完成後，依嚴重程度分三級通知董事長：

| 級別 | 觸發條件 | 通知方式 |
|------|---------|---------|
| 第一級（即時） | 安全紅線修改、核決權限修改、Boundaries 變更 | 立即推送 Telegram + 附 diff |
| 第二級（晨間） | 記憶規則調整、成本標準調整、心跳頻率變更 | 納入晨間簡報「公司治理更新」區塊 |
| 第三級（週報） | 文字修訂、格式優化 | 納入 CHRO 週報 |

CHRO 負責在記錄變更時標記通知級別，CEO 負責執行對應的通知動作。

---

## 2026-03-10 — Skill 管理系統建立
- 提案者：人工設定（Claude Code 輔助）
- 審查者：Party Mode 兩輪審查（First Principles → Reverse Engineering → Critique & Refine）
- 批准者：董事長
- 變更內容：
  - skill-development.md 重構：加入發現、安全審查（14 紅旗）、分類路由、allowlist 管理、已內化 Skill 追蹤表
  - memory-policy.md 擴充：加入 WAL 協議、Working Buffer、Reverse Prompting、學習分類與晉升機制
  - editorial-prose.md 擴充：加入 24 AI 寫作反模式檢查 + 注入靈魂準則
  - company-rules.md 修改：openclaw.json 加入紅燈保護、安裝外部 Skill 加入情境觸發規則
  - CTO TOOLS.md 擴充：加入 Find Skills 指令參考
  - install.js 修改：注入 per-agent skills allowlist + --update-skills 輕量模式
  - 新增 skill-allowlist.json：per-agent Skill 白名單配置檔
- 影響範圍：所有 Agent（allowlist 硬隔離）、CTO（安全審查職責）、CAO（合規覆核）、CHRO（追蹤維護）
- 原因：建立 Skill 安全隔離與審批機制，內化 5 個社群行為型 Skill 的精華
- 內化來源：Proactive Agent v3.1.0、Self Improving Agent v3.0.0、Humanizer v1.0.0、Skill Vetter v1.0.0、Find Skills v0.1.0

## 2026-03-06 — 初始建立
- 提案者：人工設定（Claude Code 輔助）
- 審查者：N/A（初始建立）
- 批准者：董事長
- 變更內容：建立完整 OpenClaw 多代理人架構配置
- 影響範圍：所有 Agent、所有 policies
- 原因：一人公司草創期初始設定
