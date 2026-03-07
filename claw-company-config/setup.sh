#!/bin/bash
# ============================================
# One-Person Company — OpenClaw Multi-Agent Deployment Script
# 一人公司 — OpenClaw 多代理人架構部署腳本
# Version: v0.6
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENCLAW_DIR="$HOME/.openclaw"
INSTALL_DIR="$OPENCLAW_DIR/claw-company"
AGENTS=("ceo" "cfo" "cio" "coo" "cto" "chro" "cao")

# ============================================
# Uninstall mode
# ============================================
if [ "$1" = "--uninstall" ] || [ "$1" = "uninstall" ]; then
    echo ""
    echo "=========================================="
    echo "  Uninstall claw-company / 移除 claw-company"
    echo "=========================================="
    echo ""
    if [ -d "$INSTALL_DIR" ]; then
        echo "This will remove: $INSTALL_DIR"
        echo "這將移除：$INSTALL_DIR"
        echo ""
        # Check if openclaw.json is our symlink
        if [ -L "$OPENCLAW_DIR/openclaw.json" ]; then
            LINK_TARGET=$(readlink "$OPENCLAW_DIR/openclaw.json")
            if echo "$LINK_TARGET" | grep -q "claw-company"; then
                echo "Will also remove symlink: $OPENCLAW_DIR/openclaw.json"
                echo "也會移除 symlink：$OPENCLAW_DIR/openclaw.json"
            fi
        fi
        echo ""
        read -r -p "Confirm? / 確認？ (y/N): " CONFIRM
        if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
            # Remove symlink if it points to claw-company
            if [ -L "$OPENCLAW_DIR/openclaw.json" ]; then
                LINK_TARGET=$(readlink "$OPENCLAW_DIR/openclaw.json")
                if echo "$LINK_TARGET" | grep -q "claw-company"; then
                    rm "$OPENCLAW_DIR/openclaw.json"
                    echo "[INFO] Removed symlink / 已移除 symlink"
                fi
            fi
            rm -rf "$INSTALL_DIR"
            echo "[INFO] Removed $INSTALL_DIR"
            echo "[INFO] 已移除 $INSTALL_DIR"
            echo ""
            echo "Done. OpenClaw is back to its original state."
            echo "完成。OpenClaw 已恢復原始狀態。"
        else
            echo "Cancelled. / 已取消。"
        fi
    else
        echo "claw-company is not installed. / claw-company 未安裝。"
    fi
    exit 0
fi

# ============================================
# Install mode
# ============================================
echo ""
echo "=========================================="
echo "  OpenClaw One-Person Company Setup"
echo "  OpenClaw 一人公司部署"
echo "=========================================="
echo ""

# --------------------------------------------
# Language Selection / 語言選擇
# --------------------------------------------
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
# Check if already installed
# --------------------------------------------
if [ -d "$INSTALL_DIR" ]; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[WARN] 偵測到已安裝的 claw-company：$INSTALL_DIR"
        echo ""
        echo "  1) 覆蓋安裝（保留 memory/ 和 auth 資料）"
        echo "  2) 完全重裝（清空後重新安裝）"
        echo "  3) 取消"
        echo ""
        while true; do
            read -r -p "請選擇: " REINSTALL_CHOICE
            case "$REINSTALL_CHOICE" in
                1) echo "[INFO] 將覆蓋安裝"; break ;;
                2)
                    echo "[INFO] 清空 $INSTALL_DIR ..."
                    rm -rf "$INSTALL_DIR"
                    break ;;
                3) echo "已取消。"; exit 0 ;;
                *) echo "無效輸入。" ;;
            esac
        done
    else
        echo "[WARN] Existing claw-company installation found: $INSTALL_DIR"
        echo ""
        echo "  1) Overwrite (keep memory/ and auth data)"
        echo "  2) Clean reinstall (wipe and start fresh)"
        echo "  3) Cancel"
        echo ""
        while true; do
            read -r -p "Select: " REINSTALL_CHOICE
            case "$REINSTALL_CHOICE" in
                1) echo "[INFO] Overwriting..."; break ;;
                2)
                    echo "[INFO] Removing $INSTALL_DIR ..."
                    rm -rf "$INSTALL_DIR"
                    break ;;
                3) echo "Cancelled."; exit 0 ;;
                *) echo "Invalid input." ;;
            esac
        done
    fi
    echo ""
fi

# --------------------------------------------
# Prerequisites check
# --------------------------------------------
if ! command -v openclaw &> /dev/null; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[ERROR] 找不到 openclaw 指令，請先安裝 OpenClaw"
    else
        echo "[ERROR] openclaw command not found. Please install OpenClaw first."
    fi
    echo "  https://github.com/openclaw/openclaw"
    exit 1
fi

# --------------------------------------------
# Detect available models from existing OpenClaw config
# --------------------------------------------

# Determine which openclaw.json to read models from:
# If reinstalling (symlink exists pointing to claw-company), read from backup or resolve the real source.
# Otherwise read from the original file.
OPENCLAW_CONFIG_SOURCE=""
if [ -L "$OPENCLAW_DIR/openclaw.json" ]; then
    LINK_TARGET=$(readlink "$OPENCLAW_DIR/openclaw.json")
    if echo "$LINK_TARGET" | grep -q "claw-company"; then
        # It's our symlink — check if target still exists (may have been wiped by clean reinstall)
        if [ -f "$LINK_TARGET" ]; then
            OPENCLAW_CONFIG_SOURCE="$LINK_TARGET"
        fi
        # Also check for a backup
        if [ -z "$OPENCLAW_CONFIG_SOURCE" ]; then
            LATEST_BACKUP=$(ls -t "$OPENCLAW_DIR"/openclaw.json.backup.* 2>/dev/null | head -1)
            if [ -n "$LATEST_BACKUP" ]; then
                OPENCLAW_CONFIG_SOURCE="$LATEST_BACKUP"
            fi
        fi
    else
        OPENCLAW_CONFIG_SOURCE="$OPENCLAW_DIR/openclaw.json"
    fi
elif [ -f "$OPENCLAW_DIR/openclaw.json" ]; then
    OPENCLAW_CONFIG_SOURCE="$OPENCLAW_DIR/openclaw.json"
fi

if [ -z "$OPENCLAW_CONFIG_SOURCE" ]; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[ERROR] 找不到 $OPENCLAW_DIR/openclaw.json"
        echo ""
        echo "  請先完成 OpenClaw 的初始設定（包括模型配置）："
        echo "  openclaw onboard"
    else
        echo "[ERROR] $OPENCLAW_DIR/openclaw.json not found."
        echo ""
        echo "  Please complete OpenClaw's initial setup (including model configuration) first:"
        echo "  openclaw onboard"
    fi
    exit 1
fi

AVAILABLE_MODELS=()

# Extract model IDs from "model": "provider/name" fields
while IFS= read -r m; do
    [ -n "$m" ] && AVAILABLE_MODELS+=("$m")
done < <(grep -o '"model"[[:space:]]*:[[:space:]]*"[^"]*"' "$OPENCLAW_CONFIG_SOURCE" 2>/dev/null \
    | sed 's/.*"model"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' \
    | grep '/' | sort -u)

# Extract from "primary": "provider/name" and fallbacks array values
while IFS= read -r m; do
    [ -n "$m" ] && AVAILABLE_MODELS+=("$m")
done < <(grep -oE '"(primary)"[[:space:]]*:[[:space:]]*"[^"]*"' "$OPENCLAW_CONFIG_SOURCE" 2>/dev/null \
    | sed 's/.*:[[:space:]]*"\([^"]*\)"/\1/' \
    | grep '/' | sort -u)

# Extract from models.allowlist — match lines with both "id" and a provider/model pattern
while IFS= read -r m; do
    [ -n "$m" ] && AVAILABLE_MODELS+=("$m")
done < <(grep '"alias"' "$OPENCLAW_CONFIG_SOURCE" 2>/dev/null \
    | grep -o '"id"[[:space:]]*:[[:space:]]*"[^"]*"' \
    | sed 's/.*"id"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' \
    | grep '/' | sort -u)

# Deduplicate
if [ ${#AVAILABLE_MODELS[@]} -gt 0 ]; then
    AVAILABLE_MODELS=($(printf '%s\n' "${AVAILABLE_MODELS[@]}" | sort -u))
fi

if [ ${#AVAILABLE_MODELS[@]} -eq 0 ]; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[ERROR] 在 $OPENCLAW_DIR/openclaw.json 中找不到任何模型配置。"
        echo ""
        echo "  請先在 OpenClaw 中設定至少一個模型："
        echo "  openclaw models set <model-id>"
        echo ""
        echo "  設定完成後再重新執行 ./setup.sh"
    else
        echo "[ERROR] No models found in $OPENCLAW_DIR/openclaw.json"
        echo ""
        echo "  Please configure at least one model in OpenClaw first:"
        echo "  openclaw models set <model-id>"
        echo ""
        echo "  Then re-run ./setup.sh"
    fi
    exit 1
fi

# Detect existing auth profiles
EXISTING_AUTH_FILE=""
for AUTH_FILE in "$OPENCLAW_DIR/agents/"*/agent/auth-profiles.json "$INSTALL_DIR/agents/"*/agent/auth-profiles.json; do
    if [ -f "$AUTH_FILE" ]; then
        EXISTING_AUTH_FILE="$AUTH_FILE"
        break
    fi
done
if [ -z "$EXISTING_AUTH_FILE" ] && [ -f "$OPENCLAW_DIR/auth-profiles.json" ]; then
    EXISTING_AUTH_FILE="$OPENCLAW_DIR/auth-profiles.json"
fi

# --------------------------------------------
# Model selection
# --------------------------------------------
echo ""
echo "=========================================="
if [ "$LANG_DIR" = "zh" ]; then
    echo "  模型配置"
else
    echo "  Model Configuration"
fi
echo "=========================================="
echo ""

if [ "$LANG_DIR" = "zh" ]; then
    echo "  偵測到你的 OpenClaw 中有以下模型："
else
    echo "  Found the following models in your OpenClaw config:"
fi
echo ""
for i in "${!AVAILABLE_MODELS[@]}"; do
    echo "    $((i+1))) ${AVAILABLE_MODELS[$i]}"
done
echo ""

if [ "$LANG_DIR" = "zh" ]; then
    echo "  smart 和 fast 是兩個模型別名，分別分配給各角色。"
    echo "  請從上面的模型中選擇。"
    echo ""
else
    echo "  smart and fast are two model aliases assigned to each agent."
    echo "  Please select from the models above."
    echo ""
fi

# Helper: let user pick a model from the available list
# All display output goes to stderr (&2), only the result goes to stdout
pick_model() {
    local ALIAS_NAME="$1"
    local PICKED=""
    local MODEL_COUNT=${#AVAILABLE_MODELS[@]}

    if [ "$LANG_DIR" = "zh" ]; then
        echo "  --- 選擇 $ALIAS_NAME 模型 ---" >&2
    else
        echo "  --- Select $ALIAS_NAME model ---" >&2
    fi

    while true; do
        if [ "$LANG_DIR" = "zh" ]; then
            read -r -p "  請輸入編號 (1-$MODEL_COUNT): " PICK </dev/tty
        else
            read -r -p "  Enter number (1-$MODEL_COUNT): " PICK </dev/tty
        fi

        if [ "$PICK" -ge 1 ] 2>/dev/null && [ "$PICK" -le "$MODEL_COUNT" ] 2>/dev/null; then
            PICKED="${AVAILABLE_MODELS[$((PICK-1))]}"
            break
        fi

        if [ "$LANG_DIR" = "zh" ]; then
            echo "  無效輸入。" >&2
        else
            echo "  Invalid input." >&2
        fi
    done

    echo "" >&2
    echo "$PICKED"
}

# Run model selection
MODEL_PRIMARY=$(pick_model "smart")
MODEL_LIGHT=$(pick_model "fast")

echo ""
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 模型別名："
    echo "       smart → $MODEL_PRIMARY"
    echo "       fast  → $MODEL_LIGHT"
else
    echo "[INFO] Model aliases:"
    echo "       smart → $MODEL_PRIMARY"
    echo "       fast  → $MODEL_LIGHT"
fi
if [ "$MODEL_PRIMARY" = "$MODEL_LIGHT" ]; then
    echo ""
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[WARN] smart 和 fast 指向同一個模型，所有角色將使用相同模型。"
    else
        echo "[WARN] smart and fast point to the same model. All agents will use the same model."
    fi
fi
echo ""

# --------------------------------------------
# Per-agent tier selection
# --------------------------------------------

# Defaults: core agents = smart, auxiliary = fast
TIER_CEO="smart"; TIER_CFO="smart"; TIER_CIO="smart"
TIER_COO="fast";  TIER_CTO="smart"; TIER_CHRO="fast"; TIER_CAO="smart"
TIER_CTO_SUB="fast"

# Helper: set tier for a role without eval
set_tier() {
    local ROLE="$1" VAL="$2"
    case "$ROLE" in
        CEO)  TIER_CEO="$VAL" ;;
        CFO)  TIER_CFO="$VAL" ;;
        CIO)  TIER_CIO="$VAL" ;;
        COO)  TIER_COO="$VAL" ;;
        CTO)      TIER_CTO="$VAL" ;;
        CTO_SUB)  TIER_CTO_SUB="$VAL" ;;
        CHRO)     TIER_CHRO="$VAL" ;;
        CAO)      TIER_CAO="$VAL" ;;
    esac
}

get_tier() {
    local ROLE="$1"
    case "$ROLE" in
        CEO)      echo "$TIER_CEO" ;;
        CFO)      echo "$TIER_CFO" ;;
        CIO)      echo "$TIER_CIO" ;;
        COO)      echo "$TIER_COO" ;;
        CTO)      echo "$TIER_CTO" ;;
        CTO_SUB)  echo "$TIER_CTO_SUB" ;;
        CHRO)     echo "$TIER_CHRO" ;;
        CAO)      echo "$TIER_CAO" ;;
    esac
}

pick_tier_zh() {
    echo ""
    echo "  對每個角色選擇 smart 或 fast："
    echo "  （smart = 高能力模型，fast = 輕量快速模型）"
    echo ""
    for ROLE in CEO CFO CIO COO CTO CTO_SUB CHRO CAO; do
        DEFAULT=$(get_tier "$ROLE")
        while true; do
            read -r -p "  $ROLE [$DEFAULT]: " INPUT
            INPUT="${INPUT:-$DEFAULT}"
            if [ "$INPUT" = "smart" ] || [ "$INPUT" = "fast" ]; then
                set_tier "$ROLE" "$INPUT"
                break
            else
                echo "    請輸入 smart 或 fast"
            fi
        done
    done
}

pick_tier_en() {
    echo ""
    echo "  Choose smart or fast for each agent:"
    echo "  (smart = high capability, fast = lightweight)"
    echo ""
    for ROLE in CEO CFO CIO COO CTO CTO_SUB CHRO CAO; do
        DEFAULT=$(get_tier "$ROLE")
        while true; do
            read -r -p "  $ROLE [$DEFAULT]: " INPUT
            INPUT="${INPUT:-$DEFAULT}"
            if [ "$INPUT" = "smart" ] || [ "$INPUT" = "fast" ]; then
                set_tier "$ROLE" "$INPUT"
                break
            else
                echo "    Please enter smart or fast"
            fi
        done
    done
}

echo "=========================================="
if [ "$LANG_DIR" = "zh" ]; then
    echo "  各角色模型等級配置"
else
    echo "  Per-Agent Model Tier"
fi
echo "=========================================="
echo ""

if [ "$LANG_DIR" = "zh" ]; then
    echo "  預設配置："
    echo "       CEO  = smart    CFO  = smart     CIO  = smart"
    echo "       CTO  = smart    CTO_SUB = fast  CAO  = smart"
    echo "       COO  = fast     CHRO = fast"
    echo ""
    echo "  1) 使用預設配置"
    echo "  2) 自訂每個角色的模型等級"
    echo ""
    while true; do
        read -r -p "請選擇 1 或 2: " TIER_CHOICE
        case "$TIER_CHOICE" in
            1) break ;;
            2)
                echo ""
                echo "  對每個角色選擇 smart 或 fast："
                echo "  （smart = 高能力模型，fast = 輕量快速模型）"
                echo ""
                pick_tier_zh
                break ;;
            *) echo "無效輸入，請輸入 1 或 2。" ;;
        esac
    done
else
    echo "  Default assignment:"
    echo "       CEO  = smart    CFO  = smart     CIO  = smart"
    echo "       CTO  = smart    CTO_SUB = fast  CAO  = smart"
    echo "       COO  = fast     CHRO = fast"
    echo ""
    echo "  1) Use defaults"
    echo "  2) Customize per-agent model tier"
    echo ""
    while true; do
        read -r -p "Select 1 or 2: " TIER_CHOICE
        case "$TIER_CHOICE" in
            1) break ;;
            2)
                pick_tier_en
                break ;;
            *) echo "Invalid input. Please enter 1 or 2." ;;
        esac
    done
fi

echo ""
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 各角色模型等級："
else
    echo "[INFO] Agent model tiers:"
fi
echo "       CEO=$TIER_CEO  CFO=$TIER_CFO  CIO=$TIER_CIO  COO=$TIER_COO"
echo "       CTO=$TIER_CTO  CTO_SUB=$TIER_CTO_SUB  CHRO=$TIER_CHRO  CAO=$TIER_CAO"
echo ""

# ============================================
# Deploy — all files go into $INSTALL_DIR
# ============================================
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 安裝到 $INSTALL_DIR ..."
else
    echo "[INFO] Installing to $INSTALL_DIR ..."
fi
echo ""

# 1. Deploy openclaw.json (with model substitution)
mkdir -p "$INSTALL_DIR"
sed -e "s|{{MODEL_PRIMARY}}|$MODEL_PRIMARY|g" \
    -e "s|{{MODEL_LIGHT}}|$MODEL_LIGHT|g" \
    -e "s|{{TIER_CEO}}|$TIER_CEO|g" \
    -e "s|{{TIER_CFO}}|$TIER_CFO|g" \
    -e "s|{{TIER_CIO}}|$TIER_CIO|g" \
    -e "s|{{TIER_COO}}|$TIER_COO|g" \
    -e "s|{{TIER_CTO}}|$TIER_CTO|g" \
    -e "s|{{TIER_CTO_SUB}}|$TIER_CTO_SUB|g" \
    -e "s|{{TIER_CHRO}}|$TIER_CHRO|g" \
    -e "s|{{TIER_CAO}}|$TIER_CAO|g" \
    "$SOURCE_DIR/openclaw.json" > "$INSTALL_DIR/openclaw.json"

# 2. Deploy shared
SHARED_DIR="$INSTALL_DIR/shared"
SHARED_POLICIES="$SHARED_DIR/policies"
mkdir -p "$SHARED_POLICIES"
cp "$SOURCE_DIR/shared/AGENTS.md" "$SHARED_DIR/AGENTS.md"
cp "$SOURCE_DIR/shared/USER.md" "$SHARED_DIR/USER.md"
cp "$SOURCE_DIR/shared/policies/"*.md "$SHARED_POLICIES/"

if [ -d "$SOURCE_DIR/shared/setup-guides" ]; then
    mkdir -p "$SHARED_DIR/setup-guides"
    cp "$SOURCE_DIR/shared/setup-guides/"*.md "$SHARED_DIR/setup-guides/"
fi

# 3. Deploy workspaces
for AGENT in "${AGENTS[@]}"; do
    WS="$INSTALL_DIR/workspace-$AGENT"
    mkdir -p "$WS/memory" "$WS/policies"

    cp "$SOURCE_DIR/workspace-$AGENT/SOUL.md" "$WS/SOUL.md"
    # Preserve user's accumulated memory on overwrite install
    if [ ! -f "$WS/MEMORY.md" ]; then
        cp "$SOURCE_DIR/workspace-$AGENT/MEMORY.md" "$WS/MEMORY.md"
    fi

    if [ -f "$SOURCE_DIR/workspace-$AGENT/HEARTBEAT.md" ]; then
        cp "$SOURCE_DIR/workspace-$AGENT/HEARTBEAT.md" "$WS/HEARTBEAT.md"
    fi

    for EXTRA in briefing-template.md status.md issues.md; do
        if [ -f "$SOURCE_DIR/workspace-$AGENT/$EXTRA" ]; then
            cp "$SOURCE_DIR/workspace-$AGENT/$EXTRA" "$WS/$EXTRA"
        fi
    done

    # Symlink shared files into workspace
    ln -sf "$SHARED_DIR/AGENTS.md" "$WS/AGENTS.md"
    ln -sf "$SHARED_DIR/USER.md" "$WS/USER.md"

    for POLICY in "$SHARED_POLICIES/"*.md; do
        ln -sf "$POLICY" "$WS/policies/$(basename "$POLICY")"
    done

    if [ "$LANG_DIR" = "zh" ]; then
        echo "  [OK] workspace-$AGENT"
    else
        echo "  [OK] workspace-$AGENT"
    fi
done

# 4. Deploy skills
if [ -d "$SOURCE_DIR/skills" ]; then
    for SKILL_DIR in "$SOURCE_DIR/skills/"*/; do
        SKILL_NAME="$(basename "$SKILL_DIR")"
        mkdir -p "$INSTALL_DIR/skills/$SKILL_NAME"
        cp "$SKILL_DIR"*.md "$INSTALL_DIR/skills/$SKILL_NAME/" 2>/dev/null || true
    done
fi

# 5. Auth — copy existing auth to all agents inside install dir
echo ""
if [ -n "$EXISTING_AUTH_FILE" ]; then
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[INFO] 複製現有 auth 配置..."
    else
        echo "[INFO] Copying existing auth config..."
    fi
    for AGENT in "${AGENTS[@]}"; do
        AGENT_DIR="$INSTALL_DIR/agents/$AGENT/agent"
        mkdir -p "$AGENT_DIR"
        # Don't overwrite if agent already has auth configured
        if [ ! -f "$AGENT_DIR/auth-profiles.json" ]; then
            cp "$EXISTING_AUTH_FILE" "$AGENT_DIR/auth-profiles.json"
        fi
    done
fi

# 6. Symlink openclaw.json to main OpenClaw location
echo ""
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 連結配置到 OpenClaw..."
else
    echo "[INFO] Linking config to OpenClaw..."
fi

# Backup existing openclaw.json if it's a real file (not a symlink)
if [ -f "$OPENCLAW_DIR/openclaw.json" ] && [ ! -L "$OPENCLAW_DIR/openclaw.json" ]; then
    BACKUP="$OPENCLAW_DIR/openclaw.json.backup.$(date +%Y%m%d%H%M%S)"
    cp "$OPENCLAW_DIR/openclaw.json" "$BACKUP"
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[INFO] 備份原配置 → $BACKUP"
    else
        echo "[INFO] Backed up original config → $BACKUP"
    fi
fi

mkdir -p "$OPENCLAW_DIR"
ln -sf "$INSTALL_DIR/openclaw.json" "$OPENCLAW_DIR/openclaw.json"

# ============================================
# Done
# ============================================
echo ""
echo "=========================================="
if [ "$LANG_DIR" = "zh" ]; then
    echo "  安裝完成！"
    echo "=========================================="
    echo ""
    echo "  安裝位置：$INSTALL_DIR"
    echo ""
    echo "  所有 claw-company 的檔案都在這個資料夾裡。"
    echo "  OpenClaw 透過 symlink 讀取配置："
    echo "  $OPENCLAW_DIR/openclaw.json → $INSTALL_DIR/openclaw.json"
    echo ""
    echo "下一步："
    echo "  1. 編輯 $INSTALL_DIR/openclaw.json，填入真實的 Bot Token"
    echo "  2. 執行以下指令註冊 Agent："
else
    echo "  Installation complete!"
    echo "=========================================="
    echo ""
    echo "  Installed to: $INSTALL_DIR"
    echo ""
    echo "  All claw-company files are contained in this directory."
    echo "  OpenClaw reads config via symlink:"
    echo "  $OPENCLAW_DIR/openclaw.json → $INSTALL_DIR/openclaw.json"
    echo ""
    echo "Next steps:"
    echo "  1. Edit $INSTALL_DIR/openclaw.json and fill in your Bot Tokens"
    echo "  2. Register Agents with the following commands:"
fi

echo ""
cat << COMMANDS
openclaw agents add ceo \\
  --workspace $INSTALL_DIR/workspace-ceo \\
  --model $TIER_CEO --default

openclaw agents add cfo \\
  --workspace $INSTALL_DIR/workspace-cfo \\
  --model $TIER_CFO

openclaw agents add cio \\
  --workspace $INSTALL_DIR/workspace-cio \\
  --model $TIER_CIO

openclaw agents add coo \\
  --workspace $INSTALL_DIR/workspace-coo \\
  --model $TIER_COO

openclaw agents add cto \\
  --workspace $INSTALL_DIR/workspace-cto \\
  --model $TIER_CTO

openclaw agents add chro \\
  --workspace $INSTALL_DIR/workspace-chro \\
  --model $TIER_CHRO

openclaw agents add cao \\
  --workspace $INSTALL_DIR/workspace-cao \\
  --model $TIER_CAO
COMMANDS

if [ "$LANG_DIR" = "zh" ]; then
    echo ""
    echo "  3. 執行 'openclaw gateway start' 啟動服務"
    echo "  4. 透過你設定的通訊平台向 CEO Bot 發送第一條訊息測試"
    echo ""
    echo "管理指令："
    echo "  移除 claw-company：./setup.sh --uninstall"
    echo "  重新安裝：        ./setup.sh"
else
    echo ""
    echo "  3. Run 'openclaw gateway start' to start the service"
    echo "  4. Send a test message to the CEO Bot via your configured platform"
    echo ""
    echo "Management:"
    echo "  Uninstall: ./setup.sh --uninstall"
    echo "  Reinstall: ./setup.sh"
fi


echo ""
