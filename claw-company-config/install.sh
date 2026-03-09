#!/bin/bash
# ============================================
# One-Person Company — OpenClaw Supplement Pack Installer
# Thin wrapper: delegates to install.js (cross-platform Node.js)
# ============================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec node "$SCRIPT_DIR/install.js" "$@"
