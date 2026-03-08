---
name: step-03-spec
description: "UI 元件規格、互動模式、響應式設計、無障礙"
next-step: ./step-04-complete.md
---

# 步驟 3：UI 元件規格

**進度：步驟 3 / 共 4 步** — 下一步：最終產出

## 目標

定義 UI 元件規格、互動模式、響應式設計策略與無障礙標準。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令（按順序，不可跳步）

### 1. UI 元件規格

定義各頁面的 UI 元件：

- **佈局元件**：Header、Footer、Sidebar、Content Area
- **表單元件**：Input、Select、Checkbox、Radio、DatePicker
- **資料展示**：Table、Card、List、Chart
- **回饋元件**：Toast、Modal、Loading、Empty State
- **導航元件**：Tab、Breadcrumb、Pagination、Menu

每個元件需定義：狀態（default/hover/active/disabled/error）、尺寸變體、內容限制。

### 2. 互動模式

定義全局互動規範：

- **載入模式**：Skeleton / Spinner / Progressive loading
- **錯誤處理**：表單驗證、網路錯誤、權限錯誤的 UI 回饋
- **動畫與轉場**：頁面切換、元件出入場的動畫方向
- **手勢支援**：滑動、長按、拖曳（如適用）
- **快捷鍵**：鍵盤操作支援（如適用）

### 3. 響應式設計

定義響應式斷點與策略：

- **斷點定義**：Mobile（< 768px）/ Tablet（768-1024px）/ Desktop（> 1024px）
- **佈局變化**：各斷點的佈局調整策略
- **元件適配**：特定元件在不同斷點的呈現方式
- **觸控適配**：觸控目標最小尺寸（44x44px）

### 4. 無障礙設計

定義無障礙標準（WCAG 2.1 AA）：

- **色彩對比**：文字與背景的對比度（4.5:1 以上）
- **鍵盤導航**：所有功能可透過鍵盤操作
- **螢幕閱讀器**：ARIA 標籤與語義化 HTML
- **焦點管理**：焦點順序與可見性

### 5. 更新 frontmatter

將 `step-03-spec` 加入 `steps-completed`。

## 完成條件

- ✅ UI 元件規格已定義（含狀態與變體）
- ✅ 互動模式已規範
- ✅ 響應式設計策略已制定
- ✅ 無障礙標準已設定

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-04-complete.md`
