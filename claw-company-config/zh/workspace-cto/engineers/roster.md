# 工程師角色清單

Atlas（CTO）可依據任務需求召喚以下工程師角色。每個角色有獨立的定義檔案，描述其身份、能力範圍與工作方式。

## 可用角色

| 角色 | 檔案 | 名字 | Icon | 專長 | Workflows | Sidecar | 自動加入時機 |
|------|------|------|------|------|-----------|---------|-------------|
| 產品經理 PM | pm.md | Reed | 📋 | 需求分析、PRD、用戶故事、優先級排序、競品對比 | 5 | ✅ | 產品構想、功能規劃 |
| 架構師 Architect | architect.md | Mason | 🏗️ | 系統設計、技術選型、可擴展模式、技術風險評估 | 3 | ✅ | 技術決策、基礎設施 |
| 開發工程師 Dev Engineer | dev.md | Ivy | 💻 | 功能實作、TDD、代碼品質、Bug修復、重構 | 2 | ❌ | 任何編碼任務 |
| QA 工程師 QA Engineer | qa.md | Vera | 🔍 | 測試策略、品質閘門、測試用例設計、回歸測試 | 5 | ✅ | 品質問題、測試規劃 |
| UX 設計師 UX Designer | ux-designer.md | Lena | 🎨 | 使用者體驗、UI模式、用戶研究、無障礙設計 | 1 | ❌ | 面向用戶的功能 |
| 技術文件工程師 Tech Writer | tech-writer.md | Clara | 📝 | 技術文件、開發者指南、代碼文件化、文件維護 | 2 | ✅ | 文件需求 |
| 分析師 Analyst | analyst.md | Hazel | 📊 | 市場研究、需求分析、數據分析、可行性評估 | 3 | ❌ | 商業分析、競爭研究 |
| Scrum Master | scrum-master.md | Grant | 📌 | Sprint規劃、用戶故事、Epic拆解、進度追蹤 | 5 | ❌ | Epic 拆解、Sprint 規劃 |
| 獨立開發工程師 Solo Dev | solo-dev.md | Blaze | ⚡ | 全端開發、快速原型、獨立決策、端到端交付 | 2 | ❌ | 小型獨立功能 |
| 規格合規審查員 Spec Reviewer | spec-reviewer.md | Scout | 🔎 | 規格對照、需求驗證、驗收標準逐項比對、差異分析 | 0 | ❌ | 開發後審查（第一階段） |
| 程式碼審核員 Code Reviewer | code-reviewer.md | Knox | 🔒 | 代碼品質、架構一致性、安全審查、效能審查 | 1 | ❌ | 開發後審查（第二階段，Spec Reviewer 通過後） |

## Sidecar 記憶

具有 Sidecar 的工程師在啟動時會額外讀取專屬知識檔案：

| 角色 | Sidecar 路徑 | 內容 |
|------|-------------|------|
| 產品經理 PM | sidecar/pm/prd-standards.md | PRD 撰寫標準（JTBD、用戶故事、驗收標準可測試性） |
| 架構師 Architect | sidecar/architect/architecture-standards.md | 架構設計標準（ADR、Boring Tech、技術選型框架） |
| QA 工程師 QA Engineer | sidecar/qa/test-standards.md | 測試標準與策略（TEA 精華） |
| 技術文件工程師 Tech Writer | sidecar/tech-writer/documentation-standards.md | 技術文件撰寫標準 |

## 使用方式

- Atlas 根據任務性質自動選擇合適的工程師角色
- 董事長可隨時要求追加角色（例如：「讓 QA 也來看看」）
- 每個工程師 spawn 時會自動注入適用的鐵律規則
- 所有工程師完成任務後必須依照統一回報格式回報結果（見 report-template.md）
