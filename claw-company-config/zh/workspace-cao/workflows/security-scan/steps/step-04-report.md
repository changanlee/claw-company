---
name: report
description: "產出報告：產出安全掃描報告，Critical 直接推送董事長"
next-step: null
output-file: output/scans/security-scan-{{DATE}}.md
template: ../../templates/security-scan-report.md
---

# 步驟 4：產出報告

**進度：步驟 4 / 共 4 步**

## 目標

產出安全掃描報告。Critical 等級直接推送董事長，其他等級依標準流程處理。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 產出報告

讀取 `{{INSTALL_DIR}}/workspace-cao/templates/security-scan-report.md`，按模板格式產出報告：
- 掃描時間與範圍
- 發現摘要（按嚴重度分組）
- 每項發現的詳細說明、影響評估、處理建議
- 與上次掃描的比較（新增/已解決/持續）
- 整體安全健康評分

### 2. Critical 處理

若有 Critical 等級發現：
- 立即透過 CAO 獨立通道推送董事長
- 同時透過 `sessions_send` 通知 CEO
- 自動觸發 `workflows/audit-issue/workflow.md` 建立稽核議題

### 3. 一般處理

非 Critical 發現：
- High：建立稽核議題，透過 `sessions_send` 通知 CEO
- Medium/Low/Info：記錄報告，下次掃描追蹤

### 4. 歸檔

- 報告存檔到 `output/scans/`
- 更新 MEMORY.md 中的掃描摘要
- 記錄到 memory/ 日誌

## 完成標準

- [ ] 已按模板格式產出完整報告
- [ ] Critical 發現已推送董事長（如有）
- [ ] 已建立必要的稽核議題（如有）
- [ ] 已歸檔報告

## 流程結束
