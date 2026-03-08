# 新角色模板使用說明

本模板供 CHRO 在提案新增角色時使用。

## 包含檔案

| 檔案 | 用途 | 必填佔位符 |
|------|------|-----------|
| IDENTITY.md | 角色身份 | `{{ROLE_TITLE}}`, `{{NAME}}`, `{{EMOJI}}` |
| SOUL.md | 角色人格與邊界 | `{{ROLE_ID}}`, `{{ROLE_TITLE}}`, `{{ROLE_DESCRIPTION}}`, `{{COMMUNICATION_STYLE}}` |
| AGENTS.md | 職責與工作流程 | `{{INSTALL_DIR}}`, `{{ROLE_TITLE}}`, `{{RESPONSIBILITY_*}}`, `{{WORKFLOW_*}}` |
| HEARTBEAT.md | 心跳巡檢邏輯 | `{{ROLE_ID}}`, `{{ALERT_CONDITION_*}}` |
| MEMORY.md | 初始記憶 | `{{ROLE_TITLE}}`, `{{DATE}}` |
| TOOLS.md | Sub-Agent 執行規範 | 無（通用，直接使用） |

## 使用流程

1. **CHRO 提案**：填寫所有 `{{...}}` 佔位符，產出完整的角色規格
2. **CEO 審核**：評估角色必要性與職責邊界
3. **CAO 合規檢查**：確認不違反現有安全政策
4. **董事長核決**：紅燈操作，需董事長批准
5. **部署**：
   - 在 `workspace-{role_id}/` 建立目錄，放入所有檔案
   - 執行 `openclaw agents add {role_id} --workspace <path> --model <tier>`
   - 如需通道綁定：`openclaw agents bind --agent {role_id} --bind <channel>`
   - 更新 `openclaw.json` 中的 `agents.list` 和 `tools.agentToAgent.allow`
   - 更新 `shared/company-rules.md` 的組織架構段落

## 注意事項

- AGENTS.md 的「啟動必讀」段落不可刪除（確保新角色遵守公司規範）
- TOOLS.md 可直接使用通用版，或根據角色需求擴充（如 CTO 加入開發工具段落）
- 新角色預設模型建議為 `fast`，經驗證後再考慮升級為 `smart`
