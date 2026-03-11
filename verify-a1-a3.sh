#!/bin/bash
# install.js PM3 驗證腳本 — A2 + A3
# 在 VPS 上跑：bash verify-a1-a3.sh

echo "=========================================="
echo "  A2: 重複安裝不累積（P1）"
echo "=========================================="
echo ""

echo "[A2-1] 安裝前 snapshot..."
cat ~/.openclaw/openclaw.json | python3 -m json.tool > /tmp/before.json

echo "[A2-2] 執行第二次安裝..."
cd ~/claw-company && node claw-company-config/install.js
echo ""

echo "[A2-3] 安裝後 diff："
cat ~/.openclaw/openclaw.json | python3 -m json.tool > /tmp/after.json
diff /tmp/before.json /tmp/after.json
echo "(若無輸出表示完全一致)"
echo ""

echo "=========================================="
echo "  A3: 卸載流程完整性（P1）"
echo "=========================================="
echo ""

echo "[A3-1] 執行卸載（--yes 自動確認）..."
cd ~/claw-company && node claw-company-config/install.js --uninstall --yes
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
echo "  A3-R: 重新安裝（還原環境）"
echo "=========================================="
echo ""
cd ~/claw-company && node claw-company-config/install.js
echo ""

echo "=========================================="
echo "  驗證完成，請將此輸出貼回給 Claude"
echo "=========================================="
