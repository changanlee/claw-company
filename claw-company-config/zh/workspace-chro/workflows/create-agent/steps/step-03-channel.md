---
name: channel
description: "通道評估：評估新角色是否需要獨立通道"
next-step: ./step-04-build.md
output-file: null
template: null
---

# 步驟 3：通道評估

**進度：步驟 3 / 共 6 步**

## 目標

根據步驟 2 的角色規格，評估新 Agent 是否需要獨立通道，並執行 channel-assessment 流程。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 判斷是否需要通道評估

根據步驟 2 的通道配置結論，判斷是否需要啟動完整評估：

- **不需要獨立通道**：記錄理由，跳至完成標準
- **可能需要獨立通道**：進入下一步

### 2. 啟動 channel-assessment 流程

讀取並執行 `{{INSTALL_DIR}}/workspace-chro/workflows/channel-assessment/workflow.md`，以新角色的規格作為評估輸入。

評估重點：
- 該角色的任務是否需要即時回應（時效性）
- 是否有高頻的董事長直接互動需求
- 模型能力是否足以支撐獨立運作（參考 channel-capability-test 模板）
- 成本效益比

### 3. 整合評估結果

將 channel-assessment 的結果納入規格包：

- **建議開通**：在步驟 4（建立規格包）中加入通道配置
- **不建議開通**：記錄評估結果，使用 CEO dispatch 通道
- **延後評估**：記錄條件，待角色運作一段時間後再評估

### 4. 制衡檢查

- 確認通道評估結果不影響模型選擇決策（單向觸發鎖：模型變更可觸發通道審查，但通道結果不回頭觸發模型評估）
- 確認評估結果與 `policies/channel-governance.md` 一致

## 完成標準

- [ ] 已判斷是否需要通道評估
- [ ] 已完成 channel-assessment（如適用）
- [ ] 評估結果已記錄
- [ ] 制衡檢查已通過

## 下一步

👉 前往 [步驟 4：建立規格包](./step-04-build.md)
