# Stage Phase C — 素材製作與 Spritesheet Pipeline 設計規格

建立日期：2026-03-14
狀態：設計確認

---

## 1. 目標

將 Stage 從色塊佔位圖升級為有辨識度的像素角色 sprite，建立完整的 spritesheet 載入 pipeline，並用 AI 生成精品素材覆蓋全部 4 主題。

## 2. 範圍

| 項目 | 數量 |
|------|------|
| 角色 spritesheet | 448 張（8 角色 × 7 姿勢 × 4 主題 × 2 性別） |
| 家具 sprite | 48 張（12 種 × 4 主題） |
| 背景底圖 | 4 張（1920×1080 × 4 主題） |
| 程式碼改動 | 10 個檔案（7 修改 + 2 新建 + 1 更新測試） |
| **合計** | **~500 PNG + 程式碼** |

## 3. 策略

### 3.1 混合製作策略

- **角色 sprite**：AI 生成（Nano Banana Pro），嚴格 prompt 控制一致性
- **家具 + 背景**：AI 生成（靜態圖品質可控）
- **程式生成 fallback**：`generate-sprites.js` 作為安全網，AI 品質不行時有可辨識版本可用

### 3.2 最小可視優先

先做最小批次驗證整條 pipeline，再量產：

1. modern-office 男版 idle（8 張）← 定風格的關鍵批次
2. modern-office 男版剩餘 6 姿勢（48 張）
3. palace → xianxia → medieval 男版（各 56 張 = 168 張）
4. 全 4 主題女版（224 張）
5. 家具 + 背景（52 張）

## 4. 程式碼改動

### 4.1 需改檔案清單

| 檔案 | 類型 | 改動內容 |
|------|------|----------|
| `public/js/game.js` | 修改 | preload 改為動態 spritesheet 載入（含 loaderror fallback） |
| `public/js/agents.js` | 修改 | 色塊矩形 → `this.scene.add.sprite()` + 動畫播放 + state-to-pose 映射 |
| `public/js/interactions.js` | 修改 | dispatch/approve 效果改用 sprite 座標系（container offset 調整） |
| `public/js/chairman.js` | 修改 | idle behavior 狀態對應 pose 播放 |
| `themes/modern-office/theme.json` | 修改 | 新增 `characterPattern`、`animationFps`，保留既有欄位 |
| `config/runtime-config.json` | 修改 | 新增 `defaultGender` 欄位 |
| `config/agents.json` | 修改 | 新增 `gender`、`personality` 欄位（保留所有既有欄位） |
| `server/index.js` | 修改 | `/api/config` 回傳 characterPattern 資訊 |
| `scripts/generate-sprites.js` | 新建 | 程式生成 fallback spritesheet（RGBA 透明背景） |
| `scripts/verify-assets.js` | 新建 | 掃描目錄驗證素材完整性 |
| `tests/theme-manager.test.js` | 修改 | 新增 characterPattern 驗證 |

> **server/theme-manager.js 不需改動**：它只是回傳 theme.json 原始物件，characterPattern 的模式解析在 client 端 game.js 完成。

### 4.2 State-to-Pose 映射表

遊戲中的 state（來自 WebSocket 事件）對應到 sprite pose（檔案名）：

| State | Pose | 說明 |
|-------|------|------|
| `idle` | `idle` | 待命 |
| `working` | `working` | 工作中 |
| `researching` | `researching` | 調研 |
| `executing` | `executing` | 執行 |
| `dispatching` | `dispatching` | 分派 |
| `awaiting` | `awaiting` | 等待回覆 |
| `error` | `error` | 錯誤 |
| `approving` | `executing` | 批准 → 複用 executing 姿勢 |
| `offline` | _(不需 sprite)_ | alpha 0.4 處理 |
| _(未知 state)_ | `idle` | 預設 fallback |

```javascript
// agents.js — state 到 pose 的映射
const STATE_TO_POSE = {
  idle: 'idle',
  working: 'working',
  researching: 'researching',
  executing: 'executing',
  dispatching: 'dispatching',
  awaiting: 'awaiting',
  error: 'error',
  approving: 'executing'  // 批准 = 執行姿勢
};

stateToPose(state) {
  return STATE_TO_POSE[state] || 'idle';
}
```

### 4.3 Spritesheet 載入邏輯

```javascript
// game.js preload — 動態載入當前主題的全部角色 spritesheet
const poses = ['idle','working','researching','executing','dispatching','awaiting','error'];

if (themeManifest.theme.characterPattern) {
  // Spritesheet 模式
  const pattern = themeManifest.theme.characterPattern;
  for (const agent of Object.values(config.agents)) {
    const gender = agent.gender || config.defaultGender || 'male';
    for (const pose of poses) {
      const key = `${agent.role}-${gender}-${pose}`;
      const path = pattern
        .replace('{gender}', gender)
        .replace('{role}', agent.role)
        .replace('{pose}', pose);
      this.load.spritesheet(key, `/themes/${config.theme}/${path}`, {
        frameWidth: 48, frameHeight: 64
      });
    }
  }

  // 載入失敗時記錄但不 crash（漸進式素材製作期間必要）
  this.load.on('loaderror', (file) => {
    console.warn(`Asset missing: ${file.key} (${file.url})`);
  });
} else {
  // Fallback：舊版單圖模式
  this.load.image('char_default', `/themes/${config.theme}/sprites/characters/default.png`);
}
```

### 4.4 動畫建立與播放

```javascript
// agents.js — createAgent 時建立動畫 + 儲存 role/gender
createAgent(agentId) {
  const def = this.agentDefs[agentId];
  const gender = def.gender || this._defaultGender || 'male';
  const fps = this.themeManifest.theme.animationFps || 8;

  // 嘗試用 spritesheet，fallback 到色塊
  const idleKey = `${def.role}-${gender}-idle`;
  const hasSpritesheet = this.scene.textures.exists(idleKey);

  let sprite;
  if (hasSpritesheet) {
    sprite = this.scene.add.sprite(0, 0, idleKey);
    sprite.setOrigin(0.5, 1);

    // 建立全部 pose 動畫
    for (const pose of POSES) {
      const key = `${def.role}-${gender}-${pose}`;
      if (this.scene.textures.exists(key)) {
        this.scene.anims.create({
          key,
          frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: 3 }),
          frameRate: fps,
          repeat: -1
        });
      }
    }
    sprite.play(idleKey);
  } else {
    // Fallback：色塊矩形（現有行為）
    const color = parseInt((def.color || '#888888').replace('#', ''), 16);
    sprite = this.scene.add.rectangle(0, 0, 40, 60, color);
    sprite.setOrigin(0.5, 1);
  }

  // 儲存 role + gender 供 updateState 查找動畫 key
  this.sprites[agentId] = {
    container, sprite, nameTag, statusDot, bubble,
    state: 'idle',
    role: def.role,       // ← 新增：動畫 key 用 role 不是 id
    gender,               // ← 新增
    hasSpritesheet        // ← 新增：決定 updateState 是否播動畫
  };
}

// updateState 播放對應 pose 動畫
updateState(agentId, newState, detail) {
  const entry = this.sprites[agentId];
  if (!entry) return;
  entry.state = newState;

  // 播放 spritesheet 動畫（有的話）
  if (entry.hasSpritesheet && newState !== 'offline') {
    const pose = this.stateToPose(newState);
    const key = `${entry.role}-${entry.gender}-${pose}`;
    if (this.scene.anims.exists(key)) {
      entry.sprite.play(key);
    }
  }

  // ... 其餘邏輯（status dot、alpha、break room）不變
}
```

> **Key mapping 重點**：sprite 用 `role`（如 `ceo`）不是 `id`（如 `cc-ceo`），因為檔案命名用 role。每個 sprites entry 儲存 `role` 和 `gender` 以正確組合 key。

### 4.5 theme.json 擴展

保留所有既有欄位，新增 `characterPattern` 和 `animationFps`：

```json
{
  "name": "modern-office",
  "displayName": { "en": "Modern Office", "zh-TW": "現代辦公室" },
  "version": "1.0.0",
  "background": "background.png",
  "characterPattern": "sprites/characters/{gender}/{role}-{pose}.png",
  "animationFps": 8,
  "characters": {
    "default": "sprites/characters/default.png"
  },
  "furniture": {
    "desk": "sprites/furniture/desk.png",
    "big-desk": "sprites/furniture/desk.png",
    "sofa": "sprites/furniture/sofa.png",
    "coffee-machine": "sprites/furniture/desk.png",
    "monitor": "sprites/furniture/desk.png",
    "chair": "sprites/furniture/desk.png",
    "monitor-wall": "sprites/furniture/desk.png",
    "bookshelf": "sprites/furniture/desk.png",
    "vending-machine": "sprites/furniture/desk.png"
  },
  "effects": {
    "document": "sprites/effects/document.png",
    "stamp": "sprites/effects/document.png",
    "green-sparkle": "sprites/effects/document.png"
  }
}
```

> **`characters` 欄位保留**供舊版 fallback，`characterPattern` 優先。`animationFps` 無值時預設 8。

### 4.6 agents.json 擴展

保留所有既有欄位（id, role, name, icon, area, sprite, color, appearance），新增 `gender` 和 `personality`：

```json
{
  "chairman": {
    "id": "chairman",
    "role": "chairman",
    "name": "",
    "icon": "🦁",
    "area": "chairman-office",
    "sprite": "chairman",
    "color": "#e11d48",
    "gender": "male",
    "personality": {
      "mbti": "ENTP",
      "archetype": "lion"
    },
    "appearance": {
      "base": "default",
      "color": "#e11d48",
      "accessory": "coffee-cup",
      "outfit": "executive"
    }
  }
}
```

> **name** 由 server/index.js 從 IDENTITY.md 動態載入，JSON 中為空字串。**gender** 無值時使用 runtime-config.json 的 `defaultGender`。

### 4.7 runtime-config.json 擴展

```json
{
  "theme": "modern-office",
  "locale": "zh-TW",
  "defaultGender": "male",
  "port": 19100,
  "mode": "simulator"
}
```

## 5. 素材規格（引用 Phase B Spec）

詳見 `2026-03-14-stage-sprite-design.md`，此處僅列關鍵規格：

| 項目 | 規格 |
|------|------|
| 角色尺寸 | 48×64 px |
| Spritesheet 尺寸 | 192×64（4 幀橫排） |
| 動畫幀率 | 8 FPS |
| 姿勢 | idle / working / researching / executing / dispatching / awaiting / error |
| offline | 程式端 alpha 0.4 處理，不需 sprite |

## 6. AI 生成策略

### 6.1 一致性控制

像素動畫幀的最大痛點是幀間一致性。控制方式：

1. **每角色先生 reference frame**（idle F1）確認風格
2. 後續幀 prompt 附上 reference 描述 + 嚴格約束
3. **同色板**：每角色鎖定 4-6 色（主色 + 膚色 + 髮色 + 配件色 + 描邊色）
4. **4 幀差異最小化**：F1 基準 → F2 微移 → F3 最大幅 → F4 回收
5. **統一約束詞**：`transparent background, clean pixel edges, no anti-aliasing, isometric 3/4 view`

### 6.2 Prompt 模板

```
48x64 pixel art, Q-style chibi 2-head ratio, isometric 3/4 view,
[服裝描述], [髮型描述],
[配件描述], [姿勢描述],
[動物原型暗示], [主色 hex] color scheme,
transparent background, clean pixel edges, no anti-aliasing
```

範例（CEO idle 男版現代）：
```
48x64 pixel art, Q-style chibi 2-head ratio, isometric 3/4 view,
blue suit white shirt, short dark brown side-parted hair,
holding phone in right hand, standing confident posture with arms crossed,
tiger-inspired sharp eyes, #3b82f6 blue color scheme,
transparent background, clean pixel edges, no anti-aliasing
```

### 6.3 品質閘門

每批次生成後檢查：
- [ ] 角色主色是否正確
- [ ] 配件是否可辨識
- [ ] 4 幀輪廓是否一致（允許 ±2px 偏移）
- [ ] 透明背景是否乾淨
- [ ] 尺寸是否為 192×64

## 7. Fallback：程式生成器

### 7.1 generate-sprites.js

新建 `scripts/generate-sprites.js`（不修改原 `generate-placeholders.js`，保留可用）：

- **輸入**：agents.json 的 color + accessory + outfit + personality
- **輸出**：每角色 7 姿勢的 192×64 spritesheet，輸出到 `themes/{theme}/sprites/characters/{gender}/`
- **格式**：RGBA（color type 6），透明背景（現有 placeholder 是 RGB 無透明，不適合 sprite 疊加）
- **零依賴**：延續 generate-placeholders.js 的純 Node.js 風格（fs + zlib）
- **特徵**：
  - 主色填充身體剪影（48×64）
  - 動物原型輪廓暗示（獅的蓬鬆髮、狼的尖耳等）
  - 關鍵配件（手機、眼鏡、帽子等，用 2-3 色像素表示）
  - 7 姿勢差異：身體傾斜角度 + 手臂位置 + 配件位置
  - 4 幀微動畫：±1px 身體偏移 + 配件微動
- **用途**：AI 品質不過關時的安全網 + pipeline 開發期間的快速測試素材

### 7.2 verify-assets.js

新建 `scripts/verify-assets.js`：

- 掃描 `themes/` 目錄，比對預期模式 `{theme}/sprites/characters/{gender}/{role}-{pose}.png`
- 報告：缺失檔案、多餘檔案、尺寸不符（非 192×64）
- 輸出 JSON 報告 + console 摘要

## 8. 目錄結構

```
stage/themes/
├── modern-office/
│   ├── theme.json              # 更新：加 characterPattern
│   ├── background.png          # AI 生成替換
│   ├── sprites/
│   │   ├── characters/
│   │   │   ├── male/
│   │   │   │   ├── chairman-idle.png      # 192×64 spritesheet
│   │   │   │   ├── chairman-working.png
│   │   │   │   ├── ...                    # 8角色 × 7姿勢 = 56 檔
│   │   │   └── female/
│   │   │       ├── chairman-idle.png
│   │   │       └── ...                    # 56 檔
│   │   ├── furniture/
│   │   │   ├── desk.png                   # AI 生成替換
│   │   │   ├── monitor.png
│   │   │   └── ...                        # 12 檔
│   │   ├── effects/
│   │   │   └── document.png
│   │   └── decorations/
│   ├── animations.json
│   ├── idle-behaviors.json
│   └── locales/
│       ├── en.json
│       └── zh-TW.json
├── palace/                     # 新建，結構同 modern-office
├── xianxia/                    # 新建
└── medieval/                   # 新建
```

## 9. 與現有程式碼的相容性

### 9.1 向後相容

- `theme.json` 無 `characterPattern` → 不跑 spritesheet 迴圈，fallback 到 `characters.default` 單圖
- `agents.json` 無 `gender` → 使用 `runtime-config.json` 的 `defaultGender`，再無則 `'male'`
- `agents.json` 無 `personality` → 不影響任何現有功能
- spritesheet 載入失敗 → `loaderror` 事件記錄 warning，該角色 fallback 到色塊矩形
- `animations.json` 和 `idle-behaviors.json` 不需改動（它們控制的是效果物件和 chairman idle 文字，與角色 sprite 獨立）

### 9.2 主題切換（Phase C 不實作 UI）

Phase C 僅建立 4 主題的目錄結構和素材，不實作執行時主題切換 UI。切換主題需修改 `runtime-config.json` 的 `theme` 欄位後重啟 server。

完整的主題切換 UI（selector + texture cleanup + scene restart）延後到 Phase D 或獨立 feature。

## 10. 測試計畫

| 測試項目 | 方式 |
|----------|------|
| characterPattern 解析 | 更新 `theme-manager.test.js`，驗證 theme.json 新欄位 |
| spritesheet 載入 | 手動：啟動 server 確認 modern-office 角色顯示動畫 |
| fallback 到色塊 | 手動：刪除一個 spritesheet PNG，確認該角色回退到矩形 |
| 素材完整性 | `node scripts/verify-assets.js`：掃描目錄 vs 預期模式，報告缺漏 |
| generate-sprites.js | `node scripts/generate-sprites.js`：驗證產出 56 張 192×64 RGBA PNG |
| state-to-pose 映射 | 手動：觸發 approve 事件，確認 chairman 播放 executing 姿勢 |
| 既有測試不 break | `npm test`：所有 3 個現有測試通過 |

## 11. 驗收標準

- [ ] modern-office 男版 8 角色 × 7 姿勢的 sprite 載入並播放動畫
- [ ] 每角色一眼可辨（主色 + 配件 + 體態）
- [ ] 4 幀動畫流暢無明顯跳幀
- [ ] 4 主題目錄結構建立，非 modern-office 主題 fallback 正常
- [ ] 女版 sprite 載入正常
- [ ] 家具和背景 AI 生成版替換佔位圖
- [ ] spritesheet 缺失時 graceful fallback 到色塊
- [ ] 所有現有測試通過
- [ ] generate-sprites.js 可獨立運行產出全套 spritesheet（RGBA 透明背景）
- [ ] verify-assets.js 可驗證素材完整性
