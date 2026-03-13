#!/bin/bash
# dispatch.sh — Secure cross-Agent dispatch script
# CEO uses write tool to save task to file, then exec to call this script
# Prevents shell injection: messages are passed via file, not parsed by shell
#
# Usage: dispatch.sh <agent-id> <message-file> [timeout]
# Example: dispatch.sh cc-coo /tmp/claw-task.txt 60

set -euo pipefail

AGENT="${1:?Usage: dispatch.sh <agent-id> <message-file> [timeout]}"
MSG_FILE="${2:?Usage: dispatch.sh <agent-id> <message-file> [timeout]}"
TIMEOUT="${3:-60}"

# Validate agent-id format (must start with cc-)
if [[ ! "$AGENT" =~ ^cc- ]]; then
  echo "ERROR: agent-id must start with cc-, received: $AGENT" >&2
  exit 1
fi

# Validate agent-id against whitelist
ALLOWED="cc-ceo cc-cfo cc-cio cc-coo cc-cto cc-chro cc-cao"
if [[ ! " $ALLOWED " =~ " $AGENT " ]]; then
  echo "ERROR: disallowed agent-id: $AGENT" >&2
  exit 1
fi

# Validate message file exists
if [[ ! -f "$MSG_FILE" ]]; then
  echo "ERROR: message file not found: $MSG_FILE" >&2
  exit 1
fi

# Read message (safe: passed via variable, not parsed by shell)
MSG=$(cat "$MSG_FILE")

if [[ -z "$MSG" ]]; then
  echo "ERROR: message file is empty" >&2
  exit 1
fi

# Detect caller agent-id (from environment variable or default to CEO)
CALLER="${OPENCLAW_AGENT_ID:-cc-ceo}"

# Add source tag so receiver can identify task origin
TAGGED_MSG="[Source: ${CALLER} dispatch]
${MSG}"

# Execute dispatch
openclaw agent --agent "$AGENT" -m "$TAGGED_MSG" --timeout "$TIMEOUT"

# Clean up temp file
rm -f "$MSG_FILE"
