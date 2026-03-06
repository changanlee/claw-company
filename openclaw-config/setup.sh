#!/bin/bash
# ============================================
# Chairman一人公司 — OpenClaw 多代理人架構部署腳本
# 版本：v0.1 草創期
# 日期：2026-03-06
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENCLAW_DIR="$HOME/.openclaw"

echo "=========================================="
echo "  Chairman一人公司 — OpenClaw 部署"
echo "=========================================="
echo ""

# --------------------------------------------
# 0. 前置檢查
# --------------------------------------------
if ! command -v openclaw &> /dev/null; then
    echo "[ERROR] 找不到 openclaw 指令，請先安裝 OpenClaw"
    echo "  參考: https://github.com/openclaw/openclaw"
    exit 1
fi

echo "[INFO] OpenClaw 已安裝"
echo ""

# --------------------------------------------
# 1. 備份現有配置
# --------------------------------------------
if [ -f "$OPENCLAW_DIR/openclaw.json" ]; then
    BACKUP="$OPENCLAW_DIR/openclaw.json.backup.$(date +%Y%m%d%H%M%S)"
    echo "[INFO] 備份現有 openclaw.json → $BACKUP"
    cp "$OPENCLAW_DIR/openclaw.json" "$BACKUP"
fi

# --------------------------------------------
# 2. 複製主配置
# --------------------------------------------
echo "[INFO] 部署 openclaw.json..."
cp "$SCRIPT_DIR/openclaw.json" "$OPENCLAW_DIR/openclaw.json"

# --------------------------------------------
# 3. 建立共用 policies 目錄
# --------------------------------------------
SHARED_POLICIES="$OPENCLAW_DIR/shared/policies"
echo "[INFO] 部署共用 policies → $SHARED_POLICIES"
mkdir -p "$SHARED_POLICIES"
cp "$SCRIPT_DIR/shared/AGENTS.md" "$OPENCLAW_DIR/shared/AGENTS.md"
cp "$SCRIPT_DIR/shared/USER.md" "$OPENCLAW_DIR/shared/USER.md"
cp "$SCRIPT_DIR/shared/policies/"*.md "$SHARED_POLICIES/"

# --------------------------------------------
# 4. 部署各 Agent Workspace
# --------------------------------------------
AGENTS=("ceo" "cfo" "cio" "coo" "cto" "chro" "cao")

for AGENT in "${AGENTS[@]}"; do
    WS="$OPENCLAW_DIR/workspace-$AGENT"
    echo "[INFO] 部署 $AGENT workspace → $WS"
    mkdir -p "$WS/memory" "$WS/policies"

    # 複製 Agent 專屬文件
    cp "$SCRIPT_DIR/workspace-$AGENT/SOUL.md" "$WS/SOUL.md"
    cp "$SCRIPT_DIR/workspace-$AGENT/MEMORY.md" "$WS/MEMORY.md"

    # 複製 HEARTBEAT.md（如果存在）
    if [ -f "$SCRIPT_DIR/workspace-$AGENT/HEARTBEAT.md" ]; then
        cp "$SCRIPT_DIR/workspace-$AGENT/HEARTBEAT.md" "$WS/HEARTBEAT.md"
    fi

    # 軟連結共用文件到各 workspace
    ln -sf "$OPENCLAW_DIR/shared/AGENTS.md" "$WS/AGENTS.md"
    ln -sf "$OPENCLAW_DIR/shared/USER.md" "$WS/USER.md"

    # 軟連結 policies 目錄
    for POLICY in "$SHARED_POLICIES/"*.md; do
        POLICY_NAME="$(basename "$POLICY")"
        ln -sf "$POLICY" "$WS/policies/$POLICY_NAME"
    done
done

echo ""
echo "[INFO] 所有 workspace 部署完成"

# --------------------------------------------
# 5. 新增 Agent（使用 openclaw CLI）
# --------------------------------------------
echo ""
echo "[INFO] 註冊 Agent..."
echo ""
echo "  以下指令需要手動執行（openclaw agents add 可能需要互動）："
echo ""

cat << 'COMMANDS'
# ---- 註冊 7 個 Full Agent ----

openclaw agents add ceo \
  --workspace ~/.openclaw/workspace-ceo \
  --model anthropic/claude-sonnet-4-6 \
  --default

openclaw agents add cfo \
  --workspace ~/.openclaw/workspace-cfo \
  --model anthropic/claude-sonnet-4-6

openclaw agents add cio \
  --workspace ~/.openclaw/workspace-cio \
  --model anthropic/claude-sonnet-4-6

openclaw agents add coo \
  --workspace ~/.openclaw/workspace-coo \
  --model anthropic/claude-haiku-4-5-20251001

openclaw agents add cto \
  --workspace ~/.openclaw/workspace-cto \
  --model anthropic/claude-sonnet-4-6

openclaw agents add chro \
  --workspace ~/.openclaw/workspace-chro \
  --model anthropic/claude-haiku-4-5-20251001

openclaw agents add cao \
  --workspace ~/.openclaw/workspace-cao \
  --model anthropic/claude-sonnet-4-6

COMMANDS

# --------------------------------------------
# 6. 設定 Cron 排程
# --------------------------------------------
echo ""
echo "# ---- Cron 排程 ----"
echo ""

cat << 'CRON_COMMANDS'
# 晨間會報：每天 06:30，CEO 匯整各部門狀態後推送董事長
openclaw cron add morning-briefing \
  --agent ceo \
  --at "06:30" \
  --task "執行晨間會報：向 CFO 取得財務摘要、向 CIO 取得投資組合狀態、向 COO 取得今日行程、向 CAO 取得開放稽核議題。精煉後產生簡潔的每日報告，推送給董事長。" \
  --deliver telegram:default

# 投資監控：每天開盤時間每小時檢查（週一至週五 09:00-16:00）
openclaw cron add investment-monitor \
  --agent cio \
  --cron "0 9-16 * * 1-5" \
  --task "檢查投資組合持倉的市場狀態，如有重大波動（單日漲跌超過設定閾值），通知 CEO。"

# 記憶清理：每月 1 日 03:00
openclaw cron add memory-cleanup \
  --agent chro \
  --at "03:00" \
  --cron "0 3 1 * *" \
  --task "審視所有 Agent 的 MEMORY.md 健康度：檢查行數是否接近 200 行上限、是否有過時條目、是否有重複。產出審視報告給 CEO。"

# CHRO 週度審核：每週一 08:00
openclaw cron add weekly-org-review \
  --agent chro \
  --cron "0 8 * * 1" \
  --task "執行週度組織健康審核：審視各 Agent 本週的表現摘要、能力缺口、政策遵循情況。產出週報給 CEO。"

# CAO 安全掃描：每週三 02:00
openclaw cron add security-scan \
  --agent cao \
  --cron "0 2 * * 3" \
  --task "執行週度安全掃描：檢查開放稽核議題進度、審視各 Agent 的 MEMORY.md 是否有敏感資訊外洩風險、檢查 policies 是否被未授權修改。產出安全報告。"

CRON_COMMANDS

echo ""
echo "=========================================="
echo "  部署完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "  1. 編輯 ~/.openclaw/openclaw.json，填入真實的 Bot Token"
echo "  2. 手動執行上述 'openclaw agents add' 指令註冊 Agent"
echo "  3. 手動執行上述 'openclaw cron add' 指令設定排程"
echo "  4. 執行 'openclaw gateway start' 啟動服務"
echo "  5. 透過 Telegram 向 CEO Bot 發送第一條訊息測試"
echo ""
