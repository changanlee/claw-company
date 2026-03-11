#!/bin/bash
# install.js PM3 驗證腳本 — A1 + A3
# 在 VPS 上跑：bash verify-a1-a3.sh

echo "=========================================="
echo "  A1: agents list 輸出格式（P2）"
echo "=========================================="
echo ""
echo "--- openclaw agents list ---"
openclaw agents list
echo ""
echo "--- openclaw agents list --json（如支援）---"
openclaw agents list --json 2>&1
echo ""

echo "=========================================="
echo "  A3: 卸載流程完整性（P1）"
echo "=========================================="
echo ""

echo "[A3-0] 卸載前 agent 列表："
openclaw agents list
echo ""

echo "[A3-1] 執行卸載..."
cd ~/claw-company && node claw-company-config/install.js --uninstall
echo ""

echo "[A3-2] 卸載後 agent 列表："
openclaw agents list
echo ""

echo "[A3-3] 卸載後 cron 列表："
openclaw cron list 2>&1
echo ""

echo "[A3-4] openclaw.json 中 cc- 殘留數量："
grep -c "cc-" ~/.openclaw/openclaw.json
echo ""

echo "[A3-5] workspace 目錄狀態："
ls -la ~/.openclaw/claw-company/ 2>&1
echo ""

echo "[A3-6] openclaw.json 完整內容（供分析）："
cat ~/.openclaw/openclaw.json | python3 -m json.tool
echo ""

echo "=========================================="
echo "  驗證完成，請將此輸出貼回給 Claude"
echo "=========================================="
