#!/bin/bash
# skill-install.sh — OpenClaw skill installer with ClawHub → GitHub fallback
# Usage: skill-install.sh <skill-slug> [--yes]
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: skill-install.sh <skill-slug> [--yes]"
  echo "  --yes    Skip confirmation prompts"
  exit 1
fi

SKILL_SLUG="$1"
AUTO_YES="${2:-}"
SKILLS_DIR="$HOME/.openclaw/skills"
TMP_DIR="/tmp/openclaw-skills-$$"

mkdir -p "$SKILLS_DIR"

# === Step 1: Check if already installed ===
if [ -d "$SKILLS_DIR/$SKILL_SLUG" ]; then
  echo "⚠️  $SKILL_SLUG already installed at $SKILLS_DIR/$SKILL_SLUG"
  if [ "$AUTO_YES" != "--yes" ] && [ "$AUTO_YES" != "-y" ]; then
    read -p "Reinstall? (y/N): " CONFIRM
    if [ "$CONFIRM" != "y" ]; then
      echo "Cancelled."
      exit 0
    fi
  fi
  rm -rf "${SKILLS_DIR:?}/$SKILL_SLUG"
fi

# === Step 2: Try clawhub install ===
echo "▶ Trying clawhub install $SKILL_SLUG ..."
if command -v clawhub &>/dev/null && clawhub install "$SKILL_SLUG" 2>&1; then
  echo "✅ Installed via clawhub"
  exit 0
fi

echo "⚠️  clawhub failed or unavailable, falling back to GitHub ..."

# === Step 3: Sparse checkout from GitHub ===
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/openclaw/skills.git "$TMP_DIR" 2>&1

cd "$TMP_DIR"

# Find skill path (format: skills/<author>/<slug>)
SKILL_PATH=$(git ls-tree -r --name-only HEAD \
  | grep "skills/.*/${SKILL_SLUG}/SKILL.md$" \
  | head -1 \
  | xargs dirname 2>/dev/null || true)

if [ -z "$SKILL_PATH" ]; then
  echo "❌ Skill not found: $SKILL_SLUG"
  echo "   Check available skills at: https://github.com/openclaw/skills"
  exit 1
fi

echo "📦 Found: $SKILL_PATH"
git sparse-checkout set "$SKILL_PATH"

# === Step 4: Security review ===
echo ""
echo "========== SECURITY REVIEW =========="

# Show SKILL.md
if [ -f "$SKILL_PATH/SKILL.md" ]; then
  echo "📄 SKILL.md:"
  echo "---"
  head -80 "$SKILL_PATH/SKILL.md"
  echo "---"
fi

# List all files
echo ""
echo "📁 Files:"
find "$SKILL_PATH" -type f | sort

# Count lines of code (non-md files)
echo ""
echo "📊 Code stats:"
find "$SKILL_PATH" -type f ! -name "*.md" -exec wc -l {} + 2>/dev/null || echo "   (no code files)"

# Scan for suspicious patterns
echo ""
SUSPICIOUS=$(grep -riEn \
  '(curl.*\|.*sh|wget.*\|.*sh|eval\s|eval\(|exec\(|rm\s+-rf\s+[/~]|sudo\s|chmod\s+777|\/etc\/passwd|\.ssh\/|base64\s+-d|nc\s+-|mkfifo|\/dev\/tcp)' \
  "$SKILL_PATH/" 2>/dev/null || true)

if [ -n "$SUSPICIOUS" ]; then
  echo "🚨 SUSPICIOUS PATTERNS FOUND:"
  echo "$SUSPICIOUS"
  echo ""
  if [ "$AUTO_YES" != "--yes" ] && [ "$AUTO_YES" != "-y" ]; then
    read -p "⚠️  Install anyway? (y/N): " CONFIRM
    if [ "$CONFIRM" != "y" ]; then
      echo "❌ Cancelled"
      exit 1
    fi
  else
    echo "❌ Auto-mode refuses to install suspicious skills. Review manually."
    exit 1
  fi
else
  echo "✅ No suspicious patterns detected"
fi

# === Step 5: Confirm & install ===
if [ "$AUTO_YES" != "--yes" ] && [ "$AUTO_YES" != "-y" ]; then
  echo ""
  read -p "Install $SKILL_SLUG? (Y/n): " CONFIRM
  if [ "$CONFIRM" = "n" ]; then
    echo "❌ Cancelled"
    exit 1
  fi
fi

# === Step 6: Install ===
cp -r "$SKILL_PATH" "$SKILLS_DIR/$SKILL_SLUG"

echo ""
echo "✅ Installed: $SKILLS_DIR/$SKILL_SLUG"
echo ""
echo "📁 Contents:"
ls -la "$SKILLS_DIR/$SKILL_SLUG/"

# Check for required env vars
if [ -f "$SKILLS_DIR/$SKILL_SLUG/SKILL.md" ]; then
  ENV_VARS=$(grep -oE '[A-Z_]{3,}_KEY|[A-Z_]{3,}_TOKEN|[A-Z_]{3,}_SECRET|[A-Z_]{3,}_API' \
    "$SKILLS_DIR/$SKILL_SLUG/SKILL.md" 2>/dev/null | sort -u || true)
  if [ -n "$ENV_VARS" ]; then
    echo ""
    echo "⚠️  This skill may require these env vars:"
    echo "$ENV_VARS"
  fi
fi
