---
name: deliver
description: "推送晨間簡報給董事長"
next-step: null
output-file: null
template: null
---

# 步驟 4：推送

**進度：步驟 4 / 共 4 步**

## 目標

將格式化完成的晨間簡報推送給董事長。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 輸出簡報

將格式化完成的晨間簡報作為最終輸出。

> **注意**：此流程由 cron 觸發，簡報的推送由 cron delivery announce 機制自動處理，會推送到 CEO 綁定的通道（董事長可見）。不需要手動使用 message tool 推送。

### 2. 存檔

將簡報存入 `output/briefings/morning-briefing-YYYY-MM-DD.md`。

## 完成標準

- [ ] 簡報已作為最終輸出（cron announce 自動推送）
- [ ] 簡報已存檔
