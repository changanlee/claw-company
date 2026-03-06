#!/bin/bash
# ============================================
# One-Person Company — OpenClaw Multi-Agent Deployment Script
# 一人公司 — OpenClaw 多代理人架構部署腳本
# Version: v0.3
# Date: 2026-03-06
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENCLAW_DIR="$HOME/.openclaw"

# --------------------------------------------
# Language Selection / 語言選擇
# --------------------------------------------
echo ""
echo "=========================================="
echo "  OpenClaw One-Person Company Setup"
echo "  OpenClaw 一人公司部署"
echo "=========================================="
echo ""
echo "Please select your language / 請選擇語言："
echo ""
echo "  1) English"
echo "  2) 繁體中文"
echo ""

while true; do
    read -r -p "Enter 1 or 2 / 輸入 1 或 2: " LANG_CHOICE
    case "$LANG_CHOICE" in
        1)
            LANG_DIR="en"
            echo ""
            echo "[INFO] Selected: English"
            break
            ;;
        2)
            LANG_DIR="zh"
            echo ""
            echo "[INFO] 已選擇：繁體中文"
            break
            ;;
        *)
            echo "Invalid input. Please enter 1 or 2. / 無效輸入，請輸入 1 或 2。"
            ;;
    esac
done

SOURCE_DIR="$SCRIPT_DIR/$LANG_DIR"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "[ERROR] Language directory not found: $SOURCE_DIR"
    exit 1
fi

echo ""

# --------------------------------------------
# Model Detection / 模型偵測
# --------------------------------------------
# Detect existing OpenClaw model configuration
DETECTED_PRIMARY=""
DETECTED_FALLBACK=""
EXISTING_AUTH=""

# 1. Check existing openclaw.json for model config
if [ -f "$OPENCLAW_DIR/openclaw.json" ]; then
    # Extract the first model found in agent list (most likely the primary)
    DETECTED_PRIMARY=$(grep -o '"model"[[:space:]]*:[[:space:]]*"[^"]*"' "$OPENCLAW_DIR/openclaw.json" 2>/dev/null \
        | head -1 | sed 's/.*"model"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/')
fi

# 2. Check existing agents for auth profiles
EXISTING_AUTH_FILE=""
for AUTH_FILE in "$OPENCLAW_DIR/agents/"*/agent/auth-profiles.json; do
    if [ -f "$AUTH_FILE" ]; then
        EXISTING_AUTH_FILE="$AUTH_FILE"
        break
    fi
done

# 3. Check for main/default agent auth
if [ -z "$EXISTING_AUTH_FILE" ] && [ -f "$OPENCLAW_DIR/auth-profiles.json" ]; then
    EXISTING_AUTH_FILE="$OPENCLAW_DIR/auth-profiles.json"
fi

echo "=========================================="
if [ "$LANG_DIR" = "zh" ]; then
    echo "  模型配置"
else
    echo "  Model Configuration"
fi
echo "=========================================="
echo ""

# Show detected config
if [ -n "$DETECTED_PRIMARY" ]; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[INFO] 偵測到現有模型配置：$DETECTED_PRIMARY"
    else
        echo "[INFO] Detected existing model config: $DETECTED_PRIMARY"
    fi
fi

if [ -n "$EXISTING_AUTH_FILE" ]; then
    DETECTED_PROVIDER=$(grep -o '"[^"]*"[[:space:]]*:' "$EXISTING_AUTH_FILE" 2>/dev/null \
        | head -1 | tr -d '": ')
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[INFO] 偵測到現有 auth 配置（provider: ${DETECTED_PROVIDER:-unknown}）"
    else
        echo "[INFO] Detected existing auth config (provider: ${DETECTED_PROVIDER:-unknown})"
    fi
fi

echo ""

if [ "$LANG_DIR" = "zh" ]; then
    echo "請選擇模型配置方式："
    echo ""
    if [ -n "$DETECTED_PRIMARY" ]; then
        echo "  1) 使用現有配置：$DETECTED_PRIMARY"
    fi
    echo "  2) Anthropic Claude（推薦）"
    echo "  3) OpenAI GPT"
    echo "  4) Google Gemini"
    echo "  5) MiniMax"
    echo "  6) 自訂（手動輸入 model ID）"
    echo ""
    read -r -p "請選擇: " MODEL_CHOICE
else
    echo "Select model configuration:"
    echo ""
    if [ -n "$DETECTED_PRIMARY" ]; then
        echo "  1) Use existing config: $DETECTED_PRIMARY"
    fi
    echo "  2) Anthropic Claude (recommended)"
    echo "  3) OpenAI GPT"
    echo "  4) Google Gemini"
    echo "  5) MiniMax"
    echo "  6) Custom (enter model ID manually)"
    echo ""
    read -r -p "Select: " MODEL_CHOICE
fi

# Set model based on choice
case "$MODEL_CHOICE" in
    1)
        if [ -n "$DETECTED_PRIMARY" ]; then
            MODEL_PRIMARY="$DETECTED_PRIMARY"
            MODEL_LIGHT="$DETECTED_PRIMARY"
            # Try to detect if there's a lighter model in use
            SECOND_MODEL=$(grep -o '"model"[[:space:]]*:[[:space:]]*"[^"]*"' "$OPENCLAW_DIR/openclaw.json" 2>/dev/null \
                | sed 's/.*"model"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' | sort -u | grep -v "$MODEL_PRIMARY" | head -1)
            if [ -n "$SECOND_MODEL" ]; then
                MODEL_LIGHT="$SECOND_MODEL"
            fi
        else
            echo "[WARN] No existing config found, defaulting to Anthropic Claude"
            MODEL_PRIMARY="anthropic/claude-sonnet-4-6"
            MODEL_LIGHT="anthropic/claude-haiku-4-5-20251001"
        fi
        ;;
    2)
        MODEL_PRIMARY="anthropic/claude-sonnet-4-6"
        MODEL_LIGHT="anthropic/claude-haiku-4-5-20251001"
        ;;
    3)
        MODEL_PRIMARY="openai/gpt-4o"
        MODEL_LIGHT="openai/gpt-4o-mini"
        ;;
    4)
        MODEL_PRIMARY="google/gemini-2.5-pro"
        MODEL_LIGHT="google/gemini-2.5-flash"
        ;;
    5)
        MODEL_PRIMARY="minimax/minimax-m1"
        MODEL_LIGHT="minimax/minimax-m1"
        ;;
    6)
        echo ""
        if [ "$LANG_DIR" = "zh" ]; then
            read -r -p "請輸入主要模型 ID（用於 CEO/CFO/CIO/CTO/CAO）: " MODEL_PRIMARY
            read -r -p "請輸入輕量模型 ID（用於 COO/CHRO，留空則與主要模型相同）: " MODEL_LIGHT
        else
            read -r -p "Enter primary model ID (for CEO/CFO/CIO/CTO/CAO): " MODEL_PRIMARY
            read -r -p "Enter light model ID (for COO/CHRO, leave empty to use primary): " MODEL_LIGHT
        fi
        if [ -z "$MODEL_LIGHT" ]; then
            MODEL_LIGHT="$MODEL_PRIMARY"
        fi
        ;;
    *)
        MODEL_PRIMARY="anthropic/claude-sonnet-4-6"
        MODEL_LIGHT="anthropic/claude-haiku-4-5-20251001"
        ;;
esac

# Extract provider name from model ID (e.g., "anthropic/claude-sonnet-4-6" → "anthropic")
MODEL_PROVIDER="${MODEL_PRIMARY%%/*}"

echo ""
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 主要模型：$MODEL_PRIMARY"
    echo "[INFO] 輕量模型：$MODEL_LIGHT"
else
    echo "[INFO] Primary model: $MODEL_PRIMARY"
    echo "[INFO] Light model: $MODEL_LIGHT"
fi
echo ""

# --------------------------------------------
# Messages based on language
# --------------------------------------------
if [ "$LANG_DIR" = "zh" ]; then
    MSG_DEPLOY="Chairman一人公司 — OpenClaw 部署"
    MSG_NOT_FOUND="[ERROR] 找不到 openclaw 指令，請先安裝 OpenClaw"
    MSG_INSTALLED="[INFO] OpenClaw 已安裝"
    MSG_BACKUP="[INFO] 備份現有 openclaw.json →"
    MSG_DEPLOY_JSON="[INFO] 部署 openclaw.json..."
    MSG_DEPLOY_POLICIES="[INFO] 部署共用 policies →"
    MSG_DEPLOY_WS="[INFO] 部署 %s workspace →"
    MSG_WS_DONE="[INFO] 所有 workspace 部署完成"
    MSG_REGISTER="[INFO] 註冊 Agent..."
    MSG_MANUAL="  以下指令需要手動執行（openclaw agents add 可能需要互動）："
    MSG_DONE="  部署完成！"
    MSG_NEXT="下一步："
    MSG_NEXT_1="  1. 編輯 ~/.openclaw/openclaw.json，填入真實的 Bot Token"
    MSG_NEXT_2="  2. 手動執行上述 'openclaw agents add' 指令註冊 Agent"
    MSG_NEXT_3="  3. 手動執行上述 'openclaw cron add' 指令設定排程"
    MSG_NEXT_4="  4. 執行 'openclaw gateway start' 啟動服務"
    MSG_NEXT_5="  5. 透過 Telegram 向 CEO Bot 發送第一條訊息測試"
    MSG_AUTH_COPY="[INFO] 複製現有 auth 配置到所有 Agent..."
    MSG_AUTH_DONE="[INFO] Auth 配置已複製"
    MSG_AUTH_WARN="[WARN] 未偵測到現有 auth 配置，請手動設定："
    MSG_CRON_MORNING="晨間會報：每天 06:30，CEO 匯整各部門狀態後推送董事長"
    MSG_CRON_INVEST="投資監控：每天開盤時間每小時檢查（週一至週五 09:00-16:00）"
    MSG_CRON_MEMORY="記憶清理：每月 1 日 03:00"
    MSG_CRON_ORG="CHRO 週度審核：每週一 08:00"
    MSG_CRON_SECURITY="CAO 安全掃描：每週三 02:00"
    TASK_MORNING="執行晨間會報：向 CFO 取得財務摘要、向 CIO 取得投資組合狀態、向 COO 取得今日行程、向 CAO 取得開放稽核議題。精煉後產生簡潔的每日報告，推送給董事長。"
    TASK_INVEST="檢查投資組合持倉的市場狀態，如有重大波動（單日漲跌超過設定閾值），通知 CEO。"
    TASK_MEMORY="審視所有 Agent 的 MEMORY.md 健康度：檢查行數是否接近 200 行上限、是否有過時條目、是否有重複。產出審視報告給 CEO。"
    TASK_ORG="執行週度組織健康審核：審視各 Agent 本週的表現摘要、能力缺口、政策遵循情況。產出週報給 CEO。"
    TASK_SECURITY="執行週度安全掃描：檢查開放稽核議題進度、審視各 Agent 的 MEMORY.md 是否有敏感資訊外洩風險、檢查 policies 是否被未授權修改。產出安全報告。"
else
    MSG_DEPLOY="One-Person Company — OpenClaw Deployment"
    MSG_NOT_FOUND="[ERROR] openclaw command not found. Please install OpenClaw first."
    MSG_INSTALLED="[INFO] OpenClaw is installed"
    MSG_BACKUP="[INFO] Backing up existing openclaw.json →"
    MSG_DEPLOY_JSON="[INFO] Deploying openclaw.json..."
    MSG_DEPLOY_POLICIES="[INFO] Deploying shared policies →"
    MSG_DEPLOY_WS="[INFO] Deploying %s workspace →"
    MSG_WS_DONE="[INFO] All workspaces deployed"
    MSG_REGISTER="[INFO] Registering Agents..."
    MSG_MANUAL="  The following commands need to be run manually (openclaw agents add may require interaction):"
    MSG_DONE="  Deployment complete!"
    MSG_NEXT="Next steps:"
    MSG_NEXT_1="  1. Edit ~/.openclaw/openclaw.json and fill in your real Bot Tokens"
    MSG_NEXT_2="  2. Manually run the 'openclaw agents add' commands above to register Agents"
    MSG_NEXT_3="  3. Manually run the 'openclaw cron add' commands above to set up schedules"
    MSG_NEXT_4="  4. Run 'openclaw gateway start' to start the service"
    MSG_NEXT_5="  5. Send a test message to the CEO Bot via Telegram"
    MSG_AUTH_COPY="[INFO] Copying existing auth config to all Agents..."
    MSG_AUTH_DONE="[INFO] Auth config copied"
    MSG_AUTH_WARN="[WARN] No existing auth config detected. Please set up manually:"
    MSG_CRON_MORNING="Morning briefing: Daily at 06:30, CEO aggregates all department status and pushes to Chairman"
    MSG_CRON_INVEST="Investment monitor: Hourly during market hours (Mon-Fri 09:00-16:00)"
    MSG_CRON_MEMORY="Memory cleanup: 1st of each month at 03:00"
    MSG_CRON_ORG="CHRO weekly review: Every Monday at 08:00"
    MSG_CRON_SECURITY="CAO security scan: Every Wednesday at 02:00"
    TASK_MORNING="Execute morning briefing: Get financial summary from CFO, portfolio status from CIO, today's schedule from COO, and open audit issues from CAO. Refine into a concise daily report and push to Chairman."
    TASK_INVEST="Check market status of portfolio holdings. If significant volatility detected (daily change exceeds threshold), notify CEO."
    TASK_MEMORY="Review MEMORY.md health for all Agents: check if line count approaches 200-line limit, check for outdated entries, check for duplicates. Produce review report for CEO."
    TASK_ORG="Execute weekly organizational health review: review each Agent's performance summary, capability gaps, and policy compliance. Produce weekly report for CEO."
    TASK_SECURITY="Execute weekly security scan: check open audit issue progress, review each Agent's MEMORY.md for sensitive information leak risks, check if policies have been modified without authorization. Produce security report."
fi

echo "=========================================="
echo "  $MSG_DEPLOY"
echo "=========================================="
echo ""

# --------------------------------------------
# 0. Prerequisites check
# --------------------------------------------
if ! command -v openclaw &> /dev/null; then
    echo "$MSG_NOT_FOUND"
    echo "  https://github.com/openclaw/openclaw"
    exit 1
fi

echo "$MSG_INSTALLED"
echo ""

# --------------------------------------------
# 1. Backup existing config
# --------------------------------------------
if [ -f "$OPENCLAW_DIR/openclaw.json" ]; then
    BACKUP="$OPENCLAW_DIR/openclaw.json.backup.$(date +%Y%m%d%H%M%S)"
    echo "$MSG_BACKUP $BACKUP"
    cp "$OPENCLAW_DIR/openclaw.json" "$BACKUP"
fi

# --------------------------------------------
# 2. Deploy main config (with model substitution)
# --------------------------------------------
echo "$MSG_DEPLOY_JSON"
sed -e "s|anthropic/claude-sonnet-4-6|$MODEL_PRIMARY|g" \
    -e "s|anthropic/claude-haiku-4-5-20251001|$MODEL_LIGHT|g" \
    "$SOURCE_DIR/openclaw.json" > "$OPENCLAW_DIR/openclaw.json"

# --------------------------------------------
# 3. Deploy shared policies
# --------------------------------------------
SHARED_POLICIES="$OPENCLAW_DIR/shared/policies"
echo "$MSG_DEPLOY_POLICIES $SHARED_POLICIES"
mkdir -p "$SHARED_POLICIES"
cp "$SOURCE_DIR/shared/AGENTS.md" "$OPENCLAW_DIR/shared/AGENTS.md"
cp "$SOURCE_DIR/shared/USER.md" "$OPENCLAW_DIR/shared/USER.md"
cp "$SOURCE_DIR/shared/policies/"*.md "$SHARED_POLICIES/"

# Deploy setup guides if they exist
if [ -d "$SOURCE_DIR/shared/setup-guides" ]; then
    SETUP_GUIDES="$OPENCLAW_DIR/shared/setup-guides"
    mkdir -p "$SETUP_GUIDES"
    cp "$SOURCE_DIR/shared/setup-guides/"*.md "$SETUP_GUIDES/"
fi

# --------------------------------------------
# 4. Deploy Agent Workspaces
# --------------------------------------------
AGENTS=("ceo" "cfo" "cio" "coo" "cto" "chro" "cao")

for AGENT in "${AGENTS[@]}"; do
    WS="$OPENCLAW_DIR/workspace-$AGENT"
    printf "$MSG_DEPLOY_WS\n" "$AGENT" "$WS"
    mkdir -p "$WS/memory" "$WS/policies"

    # Copy Agent-specific files
    cp "$SOURCE_DIR/workspace-$AGENT/SOUL.md" "$WS/SOUL.md"
    cp "$SOURCE_DIR/workspace-$AGENT/MEMORY.md" "$WS/MEMORY.md"

    # Copy HEARTBEAT.md if exists
    if [ -f "$SOURCE_DIR/workspace-$AGENT/HEARTBEAT.md" ]; then
        cp "$SOURCE_DIR/workspace-$AGENT/HEARTBEAT.md" "$WS/HEARTBEAT.md"
    fi

    # Copy additional agent-specific files
    for EXTRA in briefing-template.md status.md issues.md; do
        if [ -f "$SOURCE_DIR/workspace-$AGENT/$EXTRA" ]; then
            cp "$SOURCE_DIR/workspace-$AGENT/$EXTRA" "$WS/$EXTRA"
        fi
    done

    # Symlink shared files into each workspace
    ln -sf "$OPENCLAW_DIR/shared/AGENTS.md" "$WS/AGENTS.md"
    ln -sf "$OPENCLAW_DIR/shared/USER.md" "$WS/USER.md"

    # Symlink policies
    for POLICY in "$SHARED_POLICIES/"*.md; do
        POLICY_NAME="$(basename "$POLICY")"
        ln -sf "$POLICY" "$WS/policies/$POLICY_NAME"
    done
done

# Deploy skills if they exist
if [ -d "$SOURCE_DIR/skills" ]; then
    SKILLS_DIR="$OPENCLAW_DIR/skills"
    mkdir -p "$SKILLS_DIR"
    for SKILL_DIR in "$SOURCE_DIR/skills/"*/; do
        SKILL_NAME="$(basename "$SKILL_DIR")"
        mkdir -p "$SKILLS_DIR/$SKILL_NAME"
        cp "$SKILL_DIR"*.md "$SKILLS_DIR/$SKILL_NAME/" 2>/dev/null || true
    done
fi

echo ""
echo "$MSG_WS_DONE"

# --------------------------------------------
# 5. Auth configuration
# --------------------------------------------
echo ""

if [ -n "$EXISTING_AUTH_FILE" ]; then
    echo "$MSG_AUTH_COPY"
    for AGENT in "${AGENTS[@]}"; do
        AGENT_DIR="$OPENCLAW_DIR/agents/$AGENT/agent"
        mkdir -p "$AGENT_DIR"
        cp "$EXISTING_AUTH_FILE" "$AGENT_DIR/auth-profiles.json"
    done
    echo "$MSG_AUTH_DONE"
else
    echo "$MSG_AUTH_WARN"
    echo ""
    if [ "$LANG_DIR" = "zh" ]; then
        echo "  # 方法 1：用 openclaw CLI 為每個 Agent 設定 auth"
        echo "  openclaw agents auth ceo --provider $MODEL_PROVIDER --api-key YOUR_API_KEY"
        echo ""
        echo "  # 方法 2：設定完一個後，複製給所有 Agent"
        echo "  for AGENT in cfo cio coo cto chro cao; do"
        echo "    mkdir -p ~/.openclaw/agents/\$AGENT/agent"
        echo "    cp ~/.openclaw/agents/ceo/agent/auth-profiles.json \\"
        echo "       ~/.openclaw/agents/\$AGENT/agent/auth-profiles.json"
        echo "  done"
        echo ""
        echo "  # 方法 3：設定環境變數（視 provider 而定）"
        case "$MODEL_PROVIDER" in
            anthropic) echo "  export ANTHROPIC_API_KEY=\"your-key-here\"" ;;
            openai)    echo "  export OPENAI_API_KEY=\"your-key-here\"" ;;
            google)    echo "  export GOOGLE_API_KEY=\"your-key-here\"" ;;
            minimax)   echo "  export MINIMAX_API_KEY=\"your-key-here\"" ;;
            *)         echo "  export ${MODEL_PROVIDER^^}_API_KEY=\"your-key-here\"" ;;
        esac
    else
        echo "  # Option 1: Use openclaw CLI to set auth for each Agent"
        echo "  openclaw agents auth ceo --provider $MODEL_PROVIDER --api-key YOUR_API_KEY"
        echo ""
        echo "  # Option 2: Set up one, then copy to all Agents"
        echo "  for AGENT in cfo cio coo cto chro cao; do"
        echo "    mkdir -p ~/.openclaw/agents/\$AGENT/agent"
        echo "    cp ~/.openclaw/agents/ceo/agent/auth-profiles.json \\"
        echo "       ~/.openclaw/agents/\$AGENT/agent/auth-profiles.json"
        echo "  done"
        echo ""
        echo "  # Option 3: Set environment variable (depends on provider)"
        case "$MODEL_PROVIDER" in
            anthropic) echo "  export ANTHROPIC_API_KEY=\"your-key-here\"" ;;
            openai)    echo "  export OPENAI_API_KEY=\"your-key-here\"" ;;
            google)    echo "  export GOOGLE_API_KEY=\"your-key-here\"" ;;
            minimax)   echo "  export MINIMAX_API_KEY=\"your-key-here\"" ;;
            *)         echo "  export ${MODEL_PROVIDER^^}_API_KEY=\"your-key-here\"" ;;
        esac
    fi
fi

# --------------------------------------------
# 6. Register Agents (manual commands with selected model)
# --------------------------------------------
echo ""
echo "$MSG_REGISTER"
echo ""
echo "$MSG_MANUAL"
echo ""

cat << COMMANDS
# ---- Register 7 Full Agents ----

openclaw agents add ceo \\
  --workspace ~/.openclaw/workspace-ceo \\
  --model $MODEL_PRIMARY \\
  --default

openclaw agents add cfo \\
  --workspace ~/.openclaw/workspace-cfo \\
  --model $MODEL_PRIMARY

openclaw agents add cio \\
  --workspace ~/.openclaw/workspace-cio \\
  --model $MODEL_PRIMARY

openclaw agents add coo \\
  --workspace ~/.openclaw/workspace-coo \\
  --model $MODEL_LIGHT

openclaw agents add cto \\
  --workspace ~/.openclaw/workspace-cto \\
  --model $MODEL_PRIMARY

openclaw agents add chro \\
  --workspace ~/.openclaw/workspace-chro \\
  --model $MODEL_LIGHT

openclaw agents add cao \\
  --workspace ~/.openclaw/workspace-cao \\
  --model $MODEL_PRIMARY

COMMANDS

# --------------------------------------------
# 7. Cron schedules
# --------------------------------------------
echo ""
echo "# ---- Cron ----"
echo ""

echo "# $MSG_CRON_MORNING"
cat << CRON1
openclaw cron add morning-briefing \\
  --agent ceo \\
  --at "06:30" \\
  --task "$TASK_MORNING" \\
  --deliver telegram:default

CRON1

echo "# $MSG_CRON_INVEST"
cat << CRON2
openclaw cron add investment-monitor \\
  --agent cio \\
  --cron "0 9-16 * * 1-5" \\
  --task "$TASK_INVEST"

CRON2

echo "# $MSG_CRON_MEMORY"
cat << CRON3
openclaw cron add memory-cleanup \\
  --agent chro \\
  --at "03:00" \\
  --cron "0 3 1 * *" \\
  --task "$TASK_MEMORY"

CRON3

echo "# $MSG_CRON_ORG"
cat << CRON4
openclaw cron add weekly-org-review \\
  --agent chro \\
  --cron "0 8 * * 1" \\
  --task "$TASK_ORG"

CRON4

echo "# $MSG_CRON_SECURITY"
cat << CRON5
openclaw cron add security-scan \\
  --agent cao \\
  --cron "0 2 * * 3" \\
  --task "$TASK_SECURITY"

CRON5

echo ""
echo "=========================================="
echo "  $MSG_DONE"
echo "=========================================="
echo ""
echo "$MSG_NEXT"
echo "$MSG_NEXT_1"
echo "$MSG_NEXT_2"
echo "$MSG_NEXT_3"
echo "$MSG_NEXT_4"
echo "$MSG_NEXT_5"
echo ""
