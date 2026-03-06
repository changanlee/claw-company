#!/bin/bash
# ============================================
# One-Person Company — OpenClaw Multi-Agent Deployment Script
# 一人公司 — OpenClaw 多代理人架構部署腳本
# Version: v0.4
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
# Fetch latest recommended models
# --------------------------------------------
RECOMMENDED_PRIMARY=""
RECOMMENDED_LIGHT=""

if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 正在查詢最新推薦模型..."
else
    echo "[INFO] Fetching latest recommended models..."
fi

if command -v curl &> /dev/null; then
    LATEST_MODELS=$(curl -sf --max-time 10 \
        "https://raw.githubusercontent.com/changanlee/claw-company/main/claw-company-config/recommended-models.json" 2>/dev/null)

    if [ -n "$LATEST_MODELS" ]; then
        RECOMMENDED_PRIMARY=$(echo "$LATEST_MODELS" | grep -o '"primary"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')
        RECOMMENDED_LIGHT=$(echo "$LATEST_MODELS" | grep -o '"light"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')
    fi
fi

# Detect existing OpenClaw config
DETECTED_PRIMARY=""
DETECTED_LIGHT=""

if [ -f "$OPENCLAW_DIR/openclaw.json" ]; then
    ALL_MODELS=$(grep -o '"model"[[:space:]]*:[[:space:]]*"[^"]*"' "$OPENCLAW_DIR/openclaw.json" 2>/dev/null \
        | sed 's/.*"model"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' | sort | uniq -c | sort -rn)
    DETECTED_PRIMARY=$(echo "$ALL_MODELS" | head -1 | awk '{print $2}')
    DETECTED_LIGHT=$(echo "$ALL_MODELS" | sed -n '2p' | awk '{print $2}')
    if [ -z "$DETECTED_LIGHT" ]; then
        DETECTED_LIGHT="$DETECTED_PRIMARY"
    fi
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

# Fallback logic
FETCH_FAILED=false
if [ -z "$RECOMMENDED_PRIMARY" ]; then
    FETCH_FAILED=true
    if [ -n "$DETECTED_PRIMARY" ]; then
        RECOMMENDED_PRIMARY="$DETECTED_PRIMARY"
        RECOMMENDED_LIGHT="$DETECTED_LIGHT"
        if [ "$LANG_DIR" = "zh" ]; then
            echo "[WARN] 無法取得最新模型資訊，將使用你現有的模型配置"
        else
            echo "[WARN] Could not fetch latest models, will use your existing config"
        fi
    else
        if [ "$LANG_DIR" = "zh" ]; then
            echo "[ERROR] 無法取得最新模型資訊，且未偵測到現有 OpenClaw 配置。"
            echo ""
            echo "  首次安裝需要網路連線來取得推薦模型配置。"
            echo "  請確認網路連線後重新執行 ./setup.sh"
        else
            echo "[ERROR] Could not fetch latest model info and no existing OpenClaw config found."
            echo ""
            echo "  A network connection is required for first-time installation."
            echo "  Please check your network connection and re-run ./setup.sh"
        fi
        exit 1
    fi
else
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[INFO] 已取得最新推薦模型"
    else
        echo "[INFO] Latest recommended models fetched"
    fi
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

if [ -n "$DETECTED_PRIMARY" ] && [ "$FETCH_FAILED" = true ]; then
    MODEL_PRIMARY="$DETECTED_PRIMARY"
    MODEL_LIGHT="$DETECTED_LIGHT"
    if [ "$LANG_DIR" = "zh" ]; then
        echo "  將使用你現有的模型配置："
        echo "       主要模型：$MODEL_PRIMARY"
        echo "       輕量模型：$MODEL_LIGHT"
    else
        echo "  Using your existing model configuration:"
        echo "       Primary: $MODEL_PRIMARY"
        echo "       Light:   $MODEL_LIGHT"
    fi

elif [ -n "$DETECTED_PRIMARY" ]; then
    if [ "$DETECTED_PRIMARY" = "$RECOMMENDED_PRIMARY" ] && [ "$DETECTED_LIGHT" = "$RECOMMENDED_LIGHT" ]; then
        MODEL_PRIMARY="$RECOMMENDED_PRIMARY"
        MODEL_LIGHT="$RECOMMENDED_LIGHT"
        if [ "$LANG_DIR" = "zh" ]; then
            echo "  ✓ 你目前的配置已經是最新推薦配置！"
        else
            echo "  ✓ Your current config matches the latest recommendation!"
        fi
    else
        if [ "$LANG_DIR" = "zh" ]; then
            echo "  你目前的配置："
            echo "       主要模型：$DETECTED_PRIMARY"
            echo "       輕量模型：$DETECTED_LIGHT"
            echo ""
            echo "  claw-company 推薦配置（最新）："
            echo "       主要模型：$RECOMMENDED_PRIMARY（CEO/CFO/CIO/CTO/CAO）"
            echo "       輕量模型：$RECOMMENDED_LIGHT（COO/CHRO）"
            echo ""
            echo "  1) 使用推薦配置（最新版）"
            echo "  2) 保持現有配置（$DETECTED_PRIMARY）"
            echo ""
            while true; do
                read -r -p "請選擇 1 或 2: " MODEL_CHOICE
                case "$MODEL_CHOICE" in
                    1) MODEL_PRIMARY="$RECOMMENDED_PRIMARY"; MODEL_LIGHT="$RECOMMENDED_LIGHT"; break ;;
                    2) MODEL_PRIMARY="$DETECTED_PRIMARY"; MODEL_LIGHT="$DETECTED_LIGHT"; break ;;
                    *) echo "無效輸入，請輸入 1 或 2。" ;;
                esac
            done
        else
            echo "  Your current config:"
            echo "       Primary: $DETECTED_PRIMARY"
            echo "       Light:   $DETECTED_LIGHT"
            echo ""
            echo "  claw-company recommended (latest):"
            echo "       Primary: $RECOMMENDED_PRIMARY (CEO/CFO/CIO/CTO/CAO)"
            echo "       Light:   $RECOMMENDED_LIGHT (COO/CHRO)"
            echo ""
            echo "  1) Use recommended config (latest)"
            echo "  2) Keep current config ($DETECTED_PRIMARY)"
            echo ""
            while true; do
                read -r -p "Select 1 or 2: " MODEL_CHOICE
                case "$MODEL_CHOICE" in
                    1) MODEL_PRIMARY="$RECOMMENDED_PRIMARY"; MODEL_LIGHT="$RECOMMENDED_LIGHT"; break ;;
                    2) MODEL_PRIMARY="$DETECTED_PRIMARY"; MODEL_LIGHT="$DETECTED_LIGHT"; break ;;
                    *) echo "Invalid input. Please enter 1 or 2." ;;
                esac
            done
        fi
    fi
else
    MODEL_PRIMARY="$RECOMMENDED_PRIMARY"
    MODEL_LIGHT="$RECOMMENDED_LIGHT"
    if [ "$LANG_DIR" = "zh" ]; then
        echo "  使用推薦配置："
    else
        echo "  Using recommended configuration:"
    fi
fi

MODEL_PROVIDER="${MODEL_PRIMARY%%/*}"

echo ""
if [ "$LANG_DIR" = "zh" ]; then
    echo "[INFO] 主要模型：$MODEL_PRIMARY"
    echo "[INFO] 輕量模型：$MODEL_LIGHT"
else
    echo "[INFO] Primary: $MODEL_PRIMARY"
    echo "[INFO] Light:   $MODEL_LIGHT"
fi
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
    cp "$SOURCE_DIR/workspace-$AGENT/MEMORY.md" "$WS/MEMORY.md"

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
        cp "$EXISTING_AUTH_FILE" "$AGENT_DIR/auth-profiles.json"
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
  --model $MODEL_PRIMARY --default

openclaw agents add cfo \\
  --workspace $INSTALL_DIR/workspace-cfo \\
  --model $MODEL_PRIMARY

openclaw agents add cio \\
  --workspace $INSTALL_DIR/workspace-cio \\
  --model $MODEL_PRIMARY

openclaw agents add coo \\
  --workspace $INSTALL_DIR/workspace-coo \\
  --model $MODEL_LIGHT

openclaw agents add cto \\
  --workspace $INSTALL_DIR/workspace-cto \\
  --model $MODEL_PRIMARY

openclaw agents add chro \\
  --workspace $INSTALL_DIR/workspace-chro \\
  --model $MODEL_LIGHT

openclaw agents add cao \\
  --workspace $INSTALL_DIR/workspace-cao \\
  --model $MODEL_PRIMARY
COMMANDS

if [ "$LANG_DIR" = "zh" ]; then
    echo ""
    echo "  3. 執行 'openclaw gateway start' 啟動服務"
    echo "  4. 透過 Telegram 向 CEO Bot 發送第一條訊息測試"
    echo ""
    echo "管理指令："
    echo "  移除 claw-company：./setup.sh --uninstall"
    echo "  重新安裝：        ./setup.sh"
else
    echo ""
    echo "  3. Run 'openclaw gateway start' to start the service"
    echo "  4. Send a test message to the CEO Bot via Telegram"
    echo ""
    echo "Management:"
    echo "  Uninstall: ./setup.sh --uninstall"
    echo "  Reinstall: ./setup.sh"
fi

if [ -z "$EXISTING_AUTH_FILE" ]; then
    echo ""
    if [ "$LANG_DIR" = "zh" ]; then
        echo "[WARN] 未偵測到 auth 配置，請先設定 API Key："
        echo "  openclaw agents auth ceo --provider $MODEL_PROVIDER --api-key YOUR_API_KEY"
        echo ""
        echo "  設定完後，複製給所有 Agent："
        echo "  for AGENT in cfo cio coo cto chro cao; do"
        echo "    cp $INSTALL_DIR/agents/ceo/agent/auth-profiles.json \\"
        echo "       $INSTALL_DIR/agents/\$AGENT/agent/auth-profiles.json"
        echo "  done"
    else
        echo "[WARN] No auth config detected. Please set up your API key:"
        echo "  openclaw agents auth ceo --provider $MODEL_PROVIDER --api-key YOUR_API_KEY"
        echo ""
        echo "  Then copy to all Agents:"
        echo "  for AGENT in cfo cio coo cto chro cao; do"
        echo "    cp $INSTALL_DIR/agents/ceo/agent/auth-profiles.json \\"
        echo "       $INSTALL_DIR/agents/\$AGENT/agent/auth-profiles.json"
        echo "  done"
    fi
fi

echo ""
