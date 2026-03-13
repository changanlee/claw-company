---
name: propose
description: "產出升降級提案（受影響 Agent、當前 vs 建議模型、理由、預估成本變化、風險）"
next-step: ./step-04-capability.md
output-file: output/assessments/model-evaluation-YYYY-MM-DD.md
template: ../../templates/model-evaluation.md
---

# 步驟 3：產出提案

**進度：步驟 3 / 共 5 步**

## 目標

根據對比分析結果，產出結構化的模型升降級提案。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步

## 執行指令

### 1. 使用模板

讀取 `{{INSTALL_DIR}}/workspace-chro/templates/model-evaluation.md`，填入分析數據。

### 2. 提案必備要素

- **受影響 Agent**：列出需要調整模型的 Agent
- **當前模型 vs 建議模型**：每個 Agent 的變更對照
- **變更理由**：基於觸發條件和對比分析
- **預估成本變化**：月度 / 年化
- **風險評估**：
  - 升級：成本增加、是否真的需要
  - 降級：品質下降風險、回滾計畫
- **過渡計畫**：如何安全切換（參考 knowledge-migration 流程）
- **建議核決層級**：黃燈（降級）或紅燈（升級/換供應商）

### 3. 提案分類

根據變更類型決定核決層級：

| 變更類型 | 核決層級 | 理由 |
|---------|---------|------|
| fast → fast（同級換型） | 黃燈 | 成本中性，CEO 可決 |
| smart → fast（降級） | 黃燈 | 節省成本，CEO 可決 |
| fast → smart（升級） | 紅燈 | 成本增加，需董事長核決 |
| 更換供應商 | 紅燈 | 重大變更，需董事長核決 |

## 完成標準

- [ ] 提案已依模板完成
- [ ] 所有必備要素已包含
- [ ] 核決層級已確認

## 下一步

👉 前往 [步驟 4：能力測試](./step-04-capability.md)
