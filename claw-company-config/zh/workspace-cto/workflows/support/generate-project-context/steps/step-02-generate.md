---
name: step-02-generate
description: "生成 project-context.md"
next-step: ./step-03-validate.md
output-file: project-context.md
template: null
---

# 步驟 2：生成 Project Context

**進度：步驟 2 / 共 3 步** — 下一步：驗證準確性

## 目標

將掃描結果整理為結構化的 project-context.md，供 AI Agent 快速理解專案。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 撰寫 Project Context

按以下結構生成 `project-context.md`：

```markdown
# Project Context: {專案名稱}

## 專案概覽
- 用途/目的
- 主要功能

## 技術棧
- 語言與版本
- 框架
- 關鍵依賴

## 架構
- 架構模式
- 目錄結構（精簡版）
- 主要模組說明

## 慣例
- 命名慣例
- 代碼風格
- Git 慣例

## 開發指令
- 安裝依賴
- 啟動開發伺服器
- 執行測試
- 建構

## 重要注意事項
- 已知限制
- 特殊設定
- 常見陷阱
```

### 2. 控制長度

- 目標長度：200-400 行
- 精煉重要資訊，不堆積細節
- AI Agent 應能在讀完後立即開始開發

### 3. 寫入文件

將 project-context.md 寫入 `output/implementation/` 目錄。

## 完成條件

- ✅ project-context.md 已生成
- ✅ 所有段落已填寫
- ✅ 長度在 200-400 行
- ✅ 文件已寫入指定目錄

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-validate.md`
