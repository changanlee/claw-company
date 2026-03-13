---
name: notify
description: "exec dispatch 通知 CEO"
next-step: null
output-file: null
template: null
---

# 步驟 3：通知

**進度：步驟 3 / 共 3 步**

## 目標

將異常支出分析結果通知 CEO。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 組合通知

使用 `exec dispatch` 通知 CEO（write 寫檔 → bash {{INSTALL_DIR}}/shared/dispatch.sh），內容包含：

- 異常類型
- 異常金額與對比基準
- 原因分析
- 影響評估
- 建議處理方式

### 2. 記錄

記錄異常事件到 memory/。

## 完成標準

- [ ] CEO 已收到通知
- [ ] 異常事件已記錄
