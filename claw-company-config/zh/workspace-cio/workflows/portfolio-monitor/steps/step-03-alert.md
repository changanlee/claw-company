---
name: alert
description: "有警報則寫入 output/alerts/；無異常則靜默"
next-step: null
output-file: null
template: null
---

# 步驟 3：通知

**進度：步驟 3 / 共 3 步**

## 目標

根據警報判斷結果決定是否產出警報檔案。

> **注意**：此流程由 cron 觸發。使用 exec dispatch 分派（write 寫檔 → bash {{INSTALL_DIR}}/shared/dispatch.sh）。Cron 環境下 exec 可用。此流程改為寫入 output/alerts/ 檔案，CEO heartbeat 會自動檢查並處理。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步
- 寫入 output/alerts/ 檔案（如需跨 Agent 通訊可用 exec dispatch）

## 執行指令

### 1. 處理方式

- **無警報**：靜默，僅記錄到 memory/。
- **一級警報**：記錄到 memory/，累積到週報。
- **二級/三級警報**：寫入警報檔案到 `output/alerts/investment-alert-YYYY-MM-DD-HHMM.md`。CEO heartbeat 會自動檢查此目錄並處理警報。

### 2. 警報檔案內容

警報檔案包含：

- 觸發警報的標的
- 當前價格與變化率
- 警報級別
- 建議行動（觀望/減倉/加倉/止損）
- 時間戳

### 3. 更新持倉記錄

將本次檢查價格更新到 memory/ 作為下次比較基準。

## 完成標準

- [ ] 已根據警報級別處理
- [ ] 二級/三級警報已寫入 output/alerts/（若有）
- [ ] 持倉記錄已更新
