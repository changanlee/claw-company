# Stage Sprite 設計規格

建立日期：2026-03-14
狀態：設計確認

---

## 1. 基礎規格

| 項目 | 規格 |
|------|------|
| 風格 | Q版像素風 2-3 頭身（等距 3/4 視角） |
| 角色尺寸 | 48×64 px |
| 姿勢數 | 7 種需製作（idle/working/researching/executing/dispatching/awaiting/error），offline 用程式處理（alpha 0.4） |
| 動畫幀率 | 8 FPS（每幀 125ms，像素風標準節奏） |
| 每姿勢幀數 | 4 幀循環 |
| 主題 | 4 套：現代辦公室、中國宮廷、仙俠、中世紀 |
| 性別 | 每主題男女各一版 |
| 畫布 | 1920×1080，Phaser 3 FIT 自適應 |
| 環境 | 分層混合（底圖 + 家具 sprite 疊加） |

---

## 2. 角色 MBTI 人格與視覺辨識系統

每個角色有**不變量**（跨主題/跨性別一致）和**可變量**（按主題/性別調整）。

### 2.1 不變量（辨識核心）

| 角色 | ID | MBTI | 動物原型 | 主色 | 辨識符號 | 體態氣質 |
|------|-----|------|---------|------|---------|---------|
| 董事長 | chairman | ENTP | 獅 🦁 | #e11d48 紅 | 獅系髮量、最大位 | 自信隨性、嘴角帶笑、俯視全場 |
| CEO | cc-ceo | ESTJ | 虎 🐯 | #3b82f6 藍 | 通訊器（手機/令牌/傳音符/信使卷） | 挺胸端正、果斷站姿、指揮若定 |
| CFO | cc-cfo | ISTJ | 牛 🐂 | #fbbf24 琥珀 | 眼鏡 + 帳本/計算機 | 端正坐姿、專注低頭、一絲不苟 |
| CIO | cc-cio | INTJ | 鷹 🦅 | #a78bfa 紫 | 圖表/預測工具 | 靠椅背、手托下巴、冷靜觀察 |
| CTO | cc-cto | ISTP | 狼 🐺 | #34d399 綠 | 耳機/技術裝備 | 前傾盯螢幕、手速快、沉浸忘我 |
| COO | cc-coo | ESFJ | 犬 🐕 | #fb923c 橙 | 帽飾（鴨舌帽/官帽/斗笠/皮帽） | 站著走動、手上拿東西、隨時跑腿 |
| CHRO | cc-chro | ENFJ | 鶴 🦢 | #f472b6 粉 | 馬尾 + 文件板 | 優雅坐姿、面帶微笑、傾身傾聽 |
| CAO | cc-cao | INFJ | 貓頭鷹 🦉 | #facc15 黃 | 放大鏡/審查工具 | 雙手背後、微瞇眼、審視一切 |

### 2.2 MBTI 對動畫的影響

每個姿勢的表演方式因性格不同：

| 姿勢 | ENTP 董事長 | ESTJ CEO | ISTJ CFO | INTJ CIO | ISTP CTO | ESFJ COO | ENFJ CHRO | INFJ CAO |
|------|-----------|----------|----------|----------|----------|----------|-----------|----------|
| idle | 翹腳泡茶 | 叉腰巡視 | 整理文件 | 窗邊沉思 | 趴桌小睡 | 四處走動 | 看花澆水 | 窗邊觀察 |
| working | 邊喝茶邊批示 | 講電話+打字 | 端正打字 | 雙螢幕切換 | 瘋狂寫code | 整理收發 | 寫評估報告 | 審計文件 |
| researching | 翻閱報告 | 聽取匯報 | 核對數字 | 看圖表分析 | 查技術文件 | 調查流程 | 翻人事檔案 | 交叉比對 |
| executing | 蓋印批准 | 下達指令 | 記帳結算 | 執行交易 | 部署上線 | 安排行程 | 發布政策 | 發出稽核 |
| dispatching | 遞公文出去 | 拿文件走向人 | 送帳本 | 傳遞報告 | 丟任務出去 | 跑腿傳遞 | 分派文件 | 送審查報告 |
| awaiting | 坐著等+看錶 | 雙手交叉等 | 整理桌面等 | 盯數據等 | 戴耳機等 | 焦急踱步 | 喝茶等 | 靜靜站著等 |
| error | 搖頭嘆氣 | 拍桌 | 推眼鏡皺眉 | 皺眉看螢幕 | 冷靜除錯 | 急得團團轉 | 擔心看向別人 | 嘆氣搖頭 |
| offline | 不在座位 | 不在座位 | 不在座位 | 不在座位 | 不在座位 | 不在座位 | 不在座位 | 不在座位 |

> **offline** 統一處理：角色消失或半透明殘影（alpha 0.4），不需獨立 sprite。實際需製作 **7 姿勢 × 4 幀 = 28 幀/角色/主題/性別**。

---

## 3. 可變量：4 主題 × 2 性別服裝表

### 3.1 董事長（ENTP 獅）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 紅色西裝+金領帶+咖啡杯、俐落背梳黑髮 | 紅色套裝+金耳環+咖啡杯、大波浪黑長髮 |
| 宮廷 | 龍袍+玉帶+茶盞、束冠黑髮 | 鳳冠霞帔+玉簪+茶盞、高髻黑髮 |
| 仙俠 | 宗主仙袍(紅金)+靈茶杯、散髮披肩 | 宗主仙裙(紅金)+靈茶杯、長髮飛揚 |
| 中世紀 | 國王紅斗篷+皇冠+酒杯、蓬鬆鬈髮 | 女王禮服+王冠+酒杯、編辮金冠 |

### 3.2 CEO Adrian（ESTJ 虎）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 藍西裝+白襯衫+手機、側分深棕短髮 | 藍色襯衫裙+手機、利落深棕鮑伯頭 |
| 宮廷 | 丞相蟒袍(藍)+令牌、烏紗帽 | 女官朝服(藍)+令牌、官帽低髻 |
| 仙俠 | 大長老道袍(藍)+傳音符、束髮冠 | 大長老仙裙(藍)+傳音符、雙環髻 |
| 中世紀 | 將軍藍甲+信使卷軸、短髮頭盔 | 女騎士藍甲+信使卷軸、編辮頭盔 |

### 3.3 CFO Sterling（ISTJ 牛）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 琥珀背心+領帶+計算機+圓框眼鏡、整齊金色短髮 | 琥珀色開襟外套+計算機+圓框眼鏡、整齊金色低馬尾 |
| 宮廷 | 戶部尚書服(琥珀)+算盤+單片鏡、方巾帽 | 女官服(琥珀)+算盤+玳瑁眼鏡、低髻簪花 |
| 仙俠 | 聚寶閣主袍(金)+玉算盤+靈視鏡、束髮 | 聚寶閣主裙(金)+玉算盤+靈視鏡、雙髻 |
| 中世紀 | 財務大臣袍(金)+帳本+夾鼻鏡、禿頂環髮 | 財務大臣裙(金)+帳本+夾鼻鏡、頭巾低髻 |

### 3.4 CIO Archer（INTJ 鷹）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 紫色高領毛衣+圖表板、微捲銀紫蓬鬆髮 | 紫色針織長裙+圖表板、銀紫短鮑伯 |
| 宮廷 | 太傅袍(紫)+星象圖、長鬚白髮(男改銀紫短鬚) | 女太傅服(紫)+星象圖、銀紫高髻 |
| 仙俠 | 天機閣主袍(紫)+命盤+望遠鏡、銀紫長髮 | 天機閣主裙(紫)+命盤+望遠鏡、銀紫雙馬尾 |
| 中世紀 | 占星師紫袍+星圖卷軸、兜帽銀紫髮 | 女占星師紫袍+星圖卷軸、兜帽銀紫長髮 |

### 3.5 CTO Atlas（ISTP 狼）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 綠色帽T+耳機掛頸、亂翹深綠刺蝟頭 | 綠色運動外套+耳機掛頸、深綠短層次髮 |
| 宮廷 | 工部尚書匠服(綠)+工具腰帶、散亂束髮 | 女匠官服(綠)+工具腰帶、雙丫髻 |
| 仙俠 | 煉器堂主服(綠)+鍛造護目鏡、狼尾辮 | 煉器堂主裙(綠)+鍛造護目鏡、高馬尾 |
| 中世紀 | 鍛造師圍裙(綠)+護目鏡+鐵錘、蓬亂短髮 | 女鍛造師圍裙(綠)+護目鏡+鐵錘、紮辮短髮 |

### 3.6 COO Felix（ESFJ 犬）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 橙色polo+卡其褲+鴨舌帽、棕色短髮 | 橙色運動上衣+短裙+棒球帽、棕色馬尾 |
| 宮廷 | 宮廷總管服(橙)+管事腰牌+圓帽、棕色短髮 | 女管事服(橙)+管事腰牌+圓帽、棕色低髻 |
| 仙俠 | 內務堂主服(橙)+斗笠+包裹、棕色束髮 | 內務堂主裙(橙)+斗笠+包裹、棕色雙環 |
| 中世紀 | 管家服(橙)+皮帽+鑰匙串、棕色短髮 | 女管家服(橙)+皮帽+鑰匙串、棕色編辮 |

### 3.7 CHRO Sage（ENFJ 鶴）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 粉色西裝外套+寫字板+珍珠袖扣、粉紅高馬尾 | 粉色套裝+寫字板+珍珠耳環、粉紅高馬尾 |
| 宮廷 | 禮部侍郎服(粉)+名冊+玉佩、粉紅束冠 | 女官服(粉)+名冊+珍珠步搖、粉紅高髻 |
| 仙俠 | 傳功長老袍(粉)+弟子名冊+鶴羽扇、粉紅長髮 | 傳功長老裙(粉)+弟子名冊+鶴羽扇、粉紅飛仙髻 |
| 中世紀 | 大學士袍(粉)+羽毛筆+名冊、粉紅中長髮 | 女學士袍(粉)+羽毛筆+名冊、粉紅編花辮 |

### 3.8 CAO Aldric（INFJ 貓頭鷹）

| 主題 | 男版 | 女版 |
|------|------|------|
| 現代 | 深灰風衣+黃圍巾+放大鏡、後梳灰白油頭 | 深灰長大衣+黃絲巾+放大鏡、灰白低包頭 |
| 宮廷 | 御史大夫袍(深灰+黃帶)+密奏匣、灰白長鬚 | 女御史服(深灰+黃帶)+密奏匣、灰白高髻 |
| 仙俠 | 執法堂主袍(灰黃)+法印+慧眼符、灰白散髮 | 執法堂主裙(灰黃)+法印+慧眼符、灰白單辮 |
| 中世紀 | 密探長黑斗篷+黃徽章+放大鏡、灰白兜帽 | 女密探長黑斗篷+黃徽章+放大鏡、灰白兜帽長髮 |

---

## 4. 環境資產規格

### 4.1 背景底圖

| 主題 | 尺寸 | 內容 |
|------|------|------|
| 現代辦公室 | 1920×1080 | 等距地板（灰藍磁磚）+ 玻璃隔間牆 + 天花板燈 + 窗戶夜景 |
| 中國宮廷 | 1920×1080 | 紅木地板 + 朱紅柱樑 + 琉璃瓦簷 + 庭院假山遠景 |
| 仙俠 | 1920×1080 | 青石地面 + 竹木樓閣 + 雲霧遠山 + 仙鶴飛過 |
| 中世紀 | 1920×1080 | 石板地面 + 城堡石牆 + 火炬壁燈 + 拱窗星空 |

### 4.2 家具 Sprite（12 種 × 4 主題 = 48 個）

| 類別 | 物件 | 現代 | 宮廷 | 仙俠 | 中世紀 |
|------|------|------|------|------|--------|
| 工作類 | 辦公桌 | 現代辦公桌 | 紅木書案 | 修煉石台 | 橡木長桌 |
| | 電腦螢幕 | LCD 螢幕 | 竹簡架 | 仙鏡 | 羊皮卷架 |
| | 辦公椅 | 黑色轉椅 | 官帽椅 | 蒲團 | 高背木椅 |
| 董事長專屬 | 監控牆 | 多螢幕牆 | 太和殿屏風 | 仙鏡陣 | 掛毯地圖 |
| | 大桌 | 行政大桌 | 龍案 | 宗主案 | 王座桌 |
| | 書架 | 玻璃書櫃 | 藏書閣架 | 仙典架 | 古書架 |
| 休息區 | 沙發 | 皮沙發 | 貴妃椅 | 竹榻 | 木長凳 |
| | 咖啡機 | 咖啡機 | 茶爐 | 丹爐 | 酒桶 |
| | 販賣機 | 自動販賣機 | 小販攤 | 靈丹櫃 | 酒館吧台 |
| 裝飾類 | 盆栽 | 綠植盆栽 | 盆景 | 靈草 | 藤蔓 |
| | 隔板 | 辦公隔板 | 木屏風 | 竹簾 | 石柱 |
| | 地毯 | 灰色地毯 | 紅毯 | 雲紋毯 | 毛皮毯 |

---

## 5. Sprite Sheet 格式規範

### 5.1 檔案命名

所有素材放在各主題目錄內（與現有 Phase A 結構一致）：

```
stage/themes/{theme}/sprites/characters/{gender}/{role}-{pose}.png
stage/themes/{theme}/sprites/furniture/{item}.png
stage/themes/{theme}/background.png
```

範例：
```
stage/themes/modern-office/sprites/characters/male/chairman-idle.png
stage/themes/modern-office/sprites/characters/female/ceo-working.png
stage/themes/palace/sprites/characters/male/cto-dispatching.png
```

> **{role} 對應 agents.json 的 `role` 欄位**（chairman/ceo/cfo/cio/cto/coo/chro/cao），不是 `id` 欄位（cc-ceo 等）。

### 5.2 Sprite Sheet 佈局

每個 PNG 為 **192×64**（4 幀 × 48px 橫排），統一左到右播放順序。

```
┌──────┬──────┬──────┬──────┐
│ F1   │ F2   │ F3   │ F4   │  ← 48×64 每幀
│48×64 │48×64 │48×64 │48×64 │
└──────┴──────┴──────┴──────┘
         192×64 總尺寸
```

### 5.3 家具 Sprite 規格

```
stage/themes/{theme}/sprites/furniture/{item}.png
```

| 類別 | 物件 | 建議尺寸 |
|------|------|---------|
| 辦公桌 | desk | 96×64 |
| 電腦螢幕 | monitor | 32×32 |
| 辦公椅 | chair | 32×40 |
| 監控牆 | monitor-wall | 128×96 |
| 大桌 | big-desk | 128×80 |
| 書架 | bookshelf | 64×96 |
| 沙發 | sofa | 96×48 |
| 咖啡機 | coffee-machine | 32×48 |
| 販賣機 | vending-machine | 48×64 |
| 盆栽 | plant | 24×32 |
| 隔板 | partition | 64×80 |
| 地毯 | carpet | 96×64 |

### 5.4 背景命名

```
stage/themes/{theme}/background.png    # 1920×1080
```

---

## 6. 總量估算

| 類別 | 計算 | 數量 |
|------|------|------|
| 角色 sprite sheet | 8 角色 × 2 性別 × 4 主題 × 7 姿勢 | **448 個 PNG** |
| 角色幀總數 | 448 × 4 幀 | **1,792 幀** |
| 背景底圖 | 4 主題 | **4 張** |
| 家具 sprite | 12 種 × 4 主題 | **48 個** |
| **合計素材檔案** | | **~500 個 PNG** |

> offline 姿勢不需獨立 sprite（程式端用 alpha 0.4 處理），故 7 姿勢而非 8。

---

## 7. 與 Phase A 程式碼的對接

### 7.1 agents.json 擴展

新增 `personality` 和 `gender` 欄位，保留現有 `appearance` 結構向後相容：

```json
{
  "chairman": {
    "id": "chairman",
    "role": "chairman",
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

> **gender 欄位**：`"male"` | `"female"`，決定載入哪套 sprite。可在 `runtime-config.json` 設全局預設值 `"defaultGender": "male"`，agents.json 可逐角色覆蓋。

### 7.2 theme.json 擴展

路徑相對於主題根目錄，使用 `{role}`、`{gender}`、`{pose}` 佔位符：

```json
{
  "name": "modern-office",
  "characterPattern": "sprites/characters/{gender}/{role}-{pose}.png",
  "furniture": {
    "desk": "sprites/furniture/desk.png",
    "monitor": "sprites/furniture/monitor.png",
    "chair": "sprites/furniture/chair.png"
  },
  "background": "background.png",
  "animationFps": 8
}
```

> **{role}** 對應 agents.json 的 `role` 欄位（chairman/ceo/cfo...），不是 `id`（cc-ceo...）。

### 7.3 動態 Preloader

不硬編碼 448 個 load 呼叫，改為根據當前主題 + 性別動態載入：

```javascript
// game.js preload — 只載入當前主題的素材
const poses = ['idle','working','researching','executing','dispatching','awaiting','error'];
const theme = themeManager.current; // e.g. 'modern-office'
const agents = Object.values(agentsConfig);

for (const agent of agents) {
  const gender = agent.gender || runtimeConfig.defaultGender || 'male';
  for (const pose of poses) {
    const key = `${agent.role}-${gender}-${pose}`;
    const path = theme.characterPattern
      .replace('{gender}', gender)
      .replace('{role}', agent.role)
      .replace('{pose}', pose);
    this.load.spritesheet(key, `themes/${theme.name}/${path}`, {
      frameWidth: 48, frameHeight: 64
    });
  }
}

// 載入家具
for (const [name, path] of Object.entries(theme.furniture)) {
  this.load.image(`furniture-${name}`, `themes/${theme.name}/${path}`);
}

// 載入背景
this.load.image('background', `themes/${theme.name}/${theme.background}`);
```

> 切換主題時需重新載入素材（Phaser `scene.restart()` 或動態 texture replace）。

---

## 8. 設計參考

- **風格樣圖**：`stage/docs/design-references/sprite-style-comparison.pen`（A/B/C 對比）
- **主題概念圖**：`stage/docs/design-references/themes-male/` + `themes-female/`
- **韓國遊戲參考**：`stage/docs/design-references/view-comparison/topdown34.png`
- **MBTI 團隊概念**：完美戰隊 + 老板想要的團隊（性格驅動視覺設計）
