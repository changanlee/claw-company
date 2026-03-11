---
name: ceo-brainstorming
description: CEO 主持的策略腦力激盪。發散（brain-methods 技法）→ 收斂（PM3 三階段）。按需 spawn 高管或工程師深潛。
---

# CEO 策略腦力激盪（v2）

## 觸發條件

- **主動觸發**：董事長明確要求（「我想 brainstorm 一下 XXX」「幫我想想 XXX 的方向」）
- **建議觸發**：CEO 收到模糊、策略性、多部門交叉的需求時，主動向董事長建議：
  > 「這個議題涉及 [原因]，建議先做一次腦力激盪再決定方向，您覺得如何？」

董事長同意後才啟動流程。

---

## 核心設計

### Facilitator 模式

進入腦力激盪時，CEO 切換為 Facilitator：
- **引導流程**，不主導內容方向
- **整合觀點**，讓董事長和專家的觀點自然碰撞
- **按需調配專家**，用 `sessions_spawn` 拉入高管或工程師

### 發散 → 收斂

```
Step 1: 議題定義 + 分類
Step 2: 選擇發散技法（4 種模式）
Step 3: 發散探索（執行技法 + 按需 spawn）
Step 4: PM3 Phase 1 — 第一性原理（董事長確認推進）
Step 5: PM3 Phase 2 — 逆向工程（董事長確認推進）
Step 6: PM3 Phase 3 — 批判精煉（董事長確認推進）
Step 7: 摘要呈報
```

### 議題分類

| 類型 | 預設收斂方法 |
|------|-------------|
| 決策型（架構、評估、診斷） | PM3 三階段完整收斂 |
| 創意型（發想、命名、探索） | 發散優先，PM3 Phase 3 收斂 |
| 混合型（戰略 + 創意） | PM3 骨架 + brain-methods 穿插 |

董事長可隨時覆蓋。

### 動態專家 Spawn

任何階段都可以用 `sessions_spawn` 拉入專家：

**可 spawn 的對象：**
- 高管：cc-cfo / cc-cio / cc-coo / cc-cto / cc-chro / cc-cao
- 工程師（brainstorming 限定）：spawn cc-cto 並在 task 中說明需要哪種工程師角色

**Spawn 時必須帶脈絡快照：**
- 議題定義
- 目前進度和關鍵結論
- 需要回答的具體問題（1-3 個）
- 回覆格式要求（簡潔，不超過 500 字）

---

## 執行

讀取 `workflows/brainstorming/workflow.md` 後按步驟執行。
