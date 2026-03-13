#!/bin/bash
# dispatch.sh — 安全的跨 Agent 分派腳本
# CEO 使用 write 工具寫任務到檔案，再用 exec 呼叫此腳本
# 防止 shell injection：訊息透過檔案傳遞，不經 shell 解析
#
# 用法：dispatch.sh <agent-id> <message-file> [timeout]
# 範例：dispatch.sh cc-coo /tmp/claw-task.txt 60

set -euo pipefail

AGENT="${1:?用法: dispatch.sh <agent-id> <message-file> [timeout]}"
MSG_FILE="${2:?用法: dispatch.sh <agent-id> <message-file> [timeout]}"
TIMEOUT="${3:-60}"

# 驗證 agent-id 格式（只允許 cc-* 開頭）
if [[ ! "$AGENT" =~ ^cc- ]]; then
  echo "ERROR: agent-id 必須以 cc- 開頭，收到: $AGENT" >&2
  exit 1
fi

# 驗證 agent-id 在白名單中
ALLOWED="cc-ceo cc-cfo cc-cio cc-coo cc-cto cc-chro cc-cao"
if [[ ! " $ALLOWED " =~ " $AGENT " ]]; then
  echo "ERROR: 不允許的 agent-id: $AGENT" >&2
  exit 1
fi

# 驗證訊息檔案存在
if [[ ! -f "$MSG_FILE" ]]; then
  echo "ERROR: 訊息檔案不存在: $MSG_FILE" >&2
  exit 1
fi

# 讀取訊息（安全：透過變數傳遞，不經 shell 解析）
MSG=$(cat "$MSG_FILE")

if [[ -z "$MSG" ]]; then
  echo "ERROR: 訊息檔案為空" >&2
  exit 1
fi

# 偵測呼叫者 agent-id（從環境變數或預設 CEO）
CALLER="${OPENCLAW_AGENT_ID:-cc-ceo}"

# 加上來源標記，讓接收方能辨識任務來源
TAGGED_MSG="[來源: ${CALLER} dispatch]
${MSG}"

# 執行分派
openclaw agent --agent "$AGENT" -m "$TAGGED_MSG" --timeout "$TIMEOUT"

# 清理暫存檔
rm -f "$MSG_FILE"
