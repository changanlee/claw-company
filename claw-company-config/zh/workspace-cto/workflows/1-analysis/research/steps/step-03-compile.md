---
name: step-03-compile
description: "編譯研究報告"
next-step: null
output-file: "output/planning/research-report.md"
template: "../../../templates/research-report.md"
---

# 步驟 3：編譯研究報告

**進度：步驟 3 / 共 3 步** — 最後一步

## 目標

將研究發現編譯為結構化報告，產出可行動的洞察與建議。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. 編譯報告結構

使用模板 `{{INSTALL_DIR}}/workspace-cto/templates/research-report.md` 的結構，按以下四段式組織報告：

**發現（Findings）：**
- 客觀的研究發現
- 關鍵數據與事實
- 按主題分類組織

**洞察（Insights）：**
- 從發現中提煉的洞察
- 模式與趨勢的解讀
- 跨領域的關聯分析

**建議（Recommendations）：**
- 基於洞察的具體建議
- 優先級排序（Must / Should / Could）
- 預期的影響與風險

**行動項目（Action Items）：**
- 具體的下一步行動
- 負責人建議（哪個角色/工程師）
- 時程估算

### 2. 更新 frontmatter

```yaml
status: in-review
steps-completed:
  - step-01-init
  - step-02-{type}
  - step-03-compile
```

### 3. 寫入產出目錄

將最終研究報告寫入 `{{INSTALL_DIR}}/workspace-cto/output/planning/research-report.md`。

### 4. 回報 CTO

透過 `sessions_send` 將完成的研究報告回報 CTO：

- 附上研究摘要（研究類型、關鍵發現數量、建議數量）
- 標註需要 CTO 關注的重要洞察
- 列出建議的行動項目

## 完成條件

- ✅ 研究報告結構完整（發現→洞察→建議→行動項目）
- ✅ Frontmatter 狀態為 `in-review`
- ✅ 檔案已寫入產出目錄
- ✅ 已回報 CTO

## 下一步

此為最後一步，研究流程完成。等待 CTO 回覆。
