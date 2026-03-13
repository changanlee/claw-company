---
name: recommend
description: "產出建議：彙整評估結果，產出通道配置建議並送審"
next-step: null
output-file: output/assessments/channel-assessment-{date}.md
template: null
---

# 步驟 4：產出建議

**進度：步驟 4 / 共 4 步**

## 目標

彙整前面步驟的評估結果，產出通道配置建議報告，送 CEO 審查和董事長核決。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 撰寫評估報告

報告格式：

```
# 通道評估報告

- 日期：{date}
- 評估對象：{Agent 名稱}（{Agent ID}）
- 觸發來源：{觸發類型}
- 判斷結果：{開通/維持/關閉/不需}

## 評估依據
{列出比對的標準與數據}

## 能力測試結果（若有）
{測試項目與結果}

## 建議
{具體建議，含模型要求、預估影響}

## 關閉緩衝（若為關閉建議）
- 緩衝期：7 天
- 進行中任務確認：{待確認}
```

### 2. 送審

透過 `exec dispatch` 送交 CEO 審查：

write 寫檔 → `bash {{INSTALL_DIR}}/shared/dispatch.sh cc-ceo /tmp/claw-task-cc-ceo.txt 60`

訊息格式：
```
[通道評估報告 — 需審查]
對象：{Agent 名稱}
建議：{開通/關閉/維持}
{報告摘要}
```

CEO 審查後呈報董事長核決（紅燈）。

### 3. 儲存報告

將完整報告儲存到 `output/assessments/channel-assessment-{date}.md`。

## 完成標準

- [ ] 已撰寫完整評估報告
- [ ] 已送交 CEO 審查
- [ ] 已儲存報告

## 連動覆核提醒

若本次為 `[連動覆核]`（模型變更觸發），評估結果不得再觸發 model-evaluation workflow。此輪到此為止。
