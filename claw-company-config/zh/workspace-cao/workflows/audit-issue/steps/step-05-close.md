---
name: close
description: "關閉：關閉議題並提出防範規則建議"
next-step: null
output-file: output/issues/issue-{{ID}}-closed.md
template: null
---

# 步驟 5：關閉

**進度：步驟 5 / 共 5 步**

## 目標

關閉已驗證的稽核議題，並提出防範規則建議以避免同類問題再發。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 關閉議題

更新 issues.md：
- 狀態：Closed
- 關閉日期
- 修正摘要
- 驗證結果

### 2. 提出防範建議

分析議題根因，提出防範規則建議：
- 是否需要新增政策規則
- 是否需要修改現有政策
- 是否需要加強檢查項目
- 是否需要調整 heartbeat 巡檢頻率

### 3. 路由建議

根據建議內容決定路由：
- **需要新增/修改政策** → 透過 `sessions_send` 交由 CHRO 草擬
- **需要修改安全規則** → CAO 自行草擬，送 CEO → 董事長核決
- **需要調整技術配置** → 透過 `sessions_send` 通知 CTO

### 4. 記錄與歸檔

- 將議題完整生命週期記錄歸檔到 `output/issues/`
- 更新 MEMORY.md 中的稽核統計
- 記錄到 memory/ 日誌

## 完成標準

- [ ] 已更新 issues.md 狀態為 Closed
- [ ] 已提出防範規則建議
- [ ] 已路由建議給對應 Agent
- [ ] 已歸檔議題記錄

## 流程結束
