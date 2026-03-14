# Stage Phase C — Spritesheet Pipeline + Asset Production

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace colored rectangles with animated pixel-art spritesheets, build the full loading pipeline, and produce ~500 AI-generated assets across 4 themes.

**Architecture:** Config-driven spritesheet loading via `characterPattern` in theme.json. Client-side game.js dynamically loads spritesheets per theme/gender/role/pose. Graceful fallback to colored rectangles when sprites are missing. Programmatic sprite generator as safety net.

**Tech Stack:** Phaser 3.80 (spritesheet + animation API), Node.js (scripts), Nano Banana Pro (AI asset generation)

**Spec:** `docs/superpowers/specs/2026-03-14-stage-phase-c-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `config/agents.json` | Modify | Add `gender` + `personality` fields (keep all existing) |
| `config/runtime-config.json` | Modify | Add `defaultGender` field |
| `themes/modern-office/theme.json` | Modify | Add `characterPattern` + `animationFps` |
| `server/index.js` | Modify | Expose `defaultGender` in `/api/config` |
| `public/js/agents.js` | Modify | Spritesheet sprite + animation + state-to-pose |
| `public/js/game.js` | Modify | Dynamic spritesheet preload with fallback |
| `scripts/generate-sprites.js` | Create | Programmatic RGBA spritesheet generator |
| `scripts/verify-assets.js` | Create | Asset completeness checker |
| `tests/theme-manager.test.js` | Modify | Add characterPattern test |
| `themes/palace/` | Create | Theme directory + theme.json + shared configs |
| `themes/xianxia/` | Create | Theme directory + theme.json + shared configs |
| `themes/medieval/` | Create | Theme directory + theme.json + shared configs |

---

## Chunk 1: Config + Server Foundation

### Task 1: Update agents.json schema

**Files:**
- Modify: `stage/config/agents.json`

- [ ] **Step 1: Add gender and personality to all agents**

```json
{
  "chairman": {
    "id": "chairman",
    "role": "chairman",
    "name": "漆黑的收割者",
    "icon": "👑",
    "area": "chairman-office",
    "sprite": "chairman",
    "color": "#e11d48",
    "gender": "male",
    "personality": { "mbti": "ENTP", "archetype": "lion" },
    "appearance": {
      "base": "default",
      "color": "#e11d48",
      "accessory": null,
      "outfit": "executive"
    }
  },
  "cc-ceo": {
    "id": "cc-ceo",
    "role": "ceo",
    "area": "ceo-zone",
    "sprite": "ceo",
    "color": "#3b82f6",
    "gender": "male",
    "personality": { "mbti": "ESTJ", "archetype": "tiger" },
    "appearance": {
      "base": "default",
      "color": "#3b82f6",
      "accessory": "phone",
      "outfit": "suit"
    }
  },
  "cc-cfo": {
    "id": "cc-cfo",
    "role": "cfo",
    "area": "cfo-zone",
    "sprite": null,
    "color": "#fbbf24",
    "gender": "male",
    "personality": { "mbti": "ISTJ", "archetype": "ox" },
    "appearance": {
      "base": "default",
      "color": "#fbbf24",
      "accessory": "calculator",
      "outfit": "formal"
    }
  },
  "cc-cio": {
    "id": "cc-cio",
    "role": "cio",
    "area": "cio-zone",
    "sprite": null,
    "color": "#a78bfa",
    "gender": "male",
    "personality": { "mbti": "INTJ", "archetype": "eagle" },
    "appearance": {
      "base": "default",
      "color": "#a78bfa",
      "accessory": "chart",
      "outfit": "formal"
    }
  },
  "cc-cto": {
    "id": "cc-cto",
    "role": "cto",
    "area": "cto-zone",
    "sprite": null,
    "color": "#34d399",
    "gender": "male",
    "personality": { "mbti": "ISTP", "archetype": "wolf" },
    "appearance": {
      "base": "default",
      "color": "#34d399",
      "accessory": "headphones",
      "outfit": "hoodie"
    }
  },
  "cc-coo": {
    "id": "cc-coo",
    "role": "coo",
    "area": "coo-zone",
    "sprite": null,
    "color": "#fb923c",
    "gender": "male",
    "personality": { "mbti": "ESFJ", "archetype": "dog" },
    "appearance": {
      "base": "default",
      "color": "#fb923c",
      "accessory": null,
      "outfit": "casual"
    }
  },
  "cc-chro": {
    "id": "cc-chro",
    "role": "chro",
    "area": "chro-zone",
    "sprite": null,
    "color": "#f472b6",
    "gender": "male",
    "personality": { "mbti": "ENFJ", "archetype": "crane" },
    "appearance": {
      "base": "default",
      "color": "#f472b6",
      "accessory": "clipboard",
      "outfit": "formal"
    }
  },
  "cc-cao": {
    "id": "cc-cao",
    "role": "cao",
    "area": "cao-zone",
    "sprite": null,
    "color": "#facc15",
    "gender": "male",
    "personality": { "mbti": "INFJ", "archetype": "owl" },
    "appearance": {
      "base": "default",
      "color": "#facc15",
      "accessory": "magnifying-glass",
      "outfit": "formal"
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add stage/config/agents.json
git commit -m "feat(stage): add gender + personality to agents.json"
```

---

### Task 2: Update runtime-config.json and theme.json

**Files:**
- Modify: `stage/config/runtime-config.json`
- Modify: `stage/themes/modern-office/theme.json`

- [ ] **Step 1: Add defaultGender to runtime-config.json**

```json
{
  "mode": "simulator",
  "theme": "modern-office",
  "locale": "zh-TW",
  "defaultGender": "male",
  "port": 19100,
  "dataDir": null,
  "pollInterval": 30,
  "easterEggs": true
}
```

- [ ] **Step 2: Add characterPattern and animationFps to theme.json**

Add these two fields to the existing `themes/modern-office/theme.json`, keeping all other fields:

```json
{
  "name": "modern-office",
  "displayName": { "en": "Modern Office", "zh-TW": "現代辦公室" },
  "version": "1.0.0",
  "background": "background.png",
  "characterPattern": "sprites/characters/{gender}/{role}-{pose}.png",
  "animationFps": 8,
  "furniture": {
    "desk": "sprites/furniture/desk.png",
    "big-desk": "sprites/furniture/desk.png",
    "monitor-wall": "sprites/furniture/desk.png",
    "sofa": "sprites/furniture/sofa.png",
    "coffee-machine": "sprites/furniture/desk.png",
    "bookshelf": "sprites/furniture/desk.png",
    "chair": "sprites/furniture/desk.png",
    "phone": "sprites/furniture/desk.png",
    "vending-machine": "sprites/furniture/desk.png"
  },
  "characters": {
    "default": "sprites/characters/default.png",
    "chairman": "sprites/characters/default.png",
    "ceo": "sprites/characters/default.png"
  },
  "effects": {
    "document": "sprites/effects/document.png",
    "stamp": "sprites/effects/document.png",
    "green-sparkle": "sprites/effects/document.png"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add stage/config/runtime-config.json stage/themes/modern-office/theme.json
git commit -m "feat(stage): add characterPattern to theme.json, defaultGender to runtime-config"
```

---

### Task 3: Expose defaultGender in /api/config

**Files:**
- Modify: `stage/server/index.js:111-116`

- [ ] **Step 1: Read runtime-config.json and include defaultGender in response**

In `server/index.js`, the `/api/config` handler already reads `config` from runtime-config.json at startup. Add `defaultGender` to the response object.

Find this block (line ~111):
```javascript
    res.json({
      agents: liveAgents,
      theme: config.theme,
      locale: config.locale,
      easterEggs: config.easterEggs || false
    });
```

Replace with:
```javascript
    res.json({
      agents: liveAgents,
      theme: config.theme,
      locale: config.locale,
      defaultGender: config.defaultGender || 'male',
      easterEggs: config.easterEggs || false
    });
```

- [ ] **Step 2: Verify**

Run: `cd stage && node -e "const s = require('./server/index'); s.createServer({port:19199}).then(srv => { fetch('http://localhost:19199/api/config').then(r=>r.json()).then(j=>{console.log('defaultGender:', j.defaultGender); srv.close(); process.exit(0)})})"`

Expected: `defaultGender: male`

- [ ] **Step 3: Commit**

```bash
git add stage/server/index.js
git commit -m "feat(stage): expose defaultGender in /api/config"
```

---

### Task 4: Add characterPattern test

**Files:**
- Modify: `stage/tests/theme-manager.test.js`

- [ ] **Step 1: Add test for characterPattern field**

Append after the existing tests (before the closing `});`):

```javascript
  it('loads characterPattern for spritesheet themes', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    assert.ok(theme.characterPattern, 'theme should have characterPattern');
    assert.ok(theme.characterPattern.includes('{role}'), 'pattern should contain {role} placeholder');
    assert.ok(theme.characterPattern.includes('{pose}'), 'pattern should contain {pose} placeholder');
    assert.ok(theme.characterPattern.includes('{gender}'), 'pattern should contain {gender} placeholder');
  });

  it('has animationFps defined', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    assert.strictEqual(typeof theme.animationFps, 'number');
    assert.ok(theme.animationFps > 0 && theme.animationFps <= 30);
  });
```

- [ ] **Step 2: Run tests**

Run: `cd stage && node --test tests/theme-manager.test.js`

Expected: All 8 tests pass (6 existing + 2 new).

- [ ] **Step 3: Commit**

```bash
git add stage/tests/theme-manager.test.js
git commit -m "test(stage): add characterPattern + animationFps tests"
```

---

## Chunk 2: Client-Side Spritesheet Pipeline

### Task 5: Rewrite agents.js for spritesheet support

**Files:**
- Modify: `stage/public/js/agents.js`

This is the largest single change. Replace the entire file.

- [ ] **Step 1: Rewrite agents.js**

```javascript
// AgentManager — creates, updates, removes agent sprites in Phaser scene
// Supports spritesheet animations with fallback to colored rectangles

const POSES = ['idle','working','researching','executing','dispatching','awaiting','error'];

const STATE_TO_POSE = {
  idle: 'idle',
  working: 'working',
  researching: 'researching',
  executing: 'executing',
  dispatching: 'dispatching',
  awaiting: 'awaiting',
  error: 'error',
  approving: 'executing'
};

const DOT_COLORS = {
  idle: 0x22c55e,
  working: 0x3b82f6,
  researching: 0x8b5cf6,
  executing: 0xf59e0b,
  dispatching: 0x06b6d4,
  awaiting: 0xfbbf24,
  error: 0xef4444,
  offline: 0x64748b,
  approving: 0xf59e0b
};

class AgentManager {
  constructor(scene, agentDefs, themeManifest, defaultGender) {
    this.scene = scene;
    this.agentDefs = agentDefs;
    this.themeManifest = themeManifest;
    this.defaultGender = defaultGender || 'male';
    this.sprites = {}; // agentId → { container, sprite, nameTag, statusDot, bubble, state, role, gender, hasSpritesheet }
  }

  stateToPose(state) {
    return STATE_TO_POSE[state] || 'idle';
  }

  createAgent(agentId) {
    const def = this.agentDefs[agentId];
    if (!def || this.sprites[agentId]) return;

    const pos = LAYOUT.getSlotPosition(def.area, 0);
    const container = this.scene.add.container(pos.x, pos.y);
    container.setDepth(LAYOUT.depth.characters + (agentId === 'chairman' ? 100 : 0));

    const gender = def.gender || this.defaultGender;
    const fps = (this.themeManifest.theme && this.themeManifest.theme.animationFps) || 8;

    // Check if spritesheet is available for this agent
    const idleKey = `${def.role}-${gender}-idle`;
    const hasSpritesheet = this.scene.textures.exists(idleKey);

    let sprite;
    if (hasSpritesheet) {
      sprite = this.scene.add.sprite(0, 0, idleKey);
      sprite.setOrigin(0.5, 1);

      // Create animations for all available poses
      for (const pose of POSES) {
        const key = `${def.role}-${gender}-${pose}`;
        if (this.scene.textures.exists(key) && !this.scene.anims.exists(key)) {
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
      // Fallback: colored rectangle (original behavior)
      const color = parseInt((def.color || '#888888').replace('#', ''), 16);
      sprite = this.scene.add.rectangle(0, 0, 40, 60, color);
      sprite.setOrigin(0.5, 1);
    }

    // Name tag: "Name (Role)" or just "Role" if no name
    const roleText = I18n.t(`role.${def.role}`);
    const displayName = def.name
      ? `${def.name}(${roleText})`.trim()
      : roleText;
    const nameTag = this.scene.add.text(0, -70, displayName, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 }
    });
    nameTag.setOrigin(0.5, 1);

    // Status dot
    const statusDot = this.scene.add.circle(25, -65, 5, 0x22c55e);

    // Bubble text (hidden by default)
    const bubble = this.scene.add.text(0, -90, '', {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: '#1e293bcc',
      padding: { x: 6, y: 3 },
      wordWrap: { width: 140 }
    });
    bubble.setOrigin(0.5, 1);
    bubble.setVisible(false);

    container.add([sprite, nameTag, statusDot, bubble]);
    this.sprites[agentId] = {
      container, sprite, nameTag, statusDot, bubble,
      state: 'idle',
      role: def.role,
      gender,
      hasSpritesheet
    };
  }

  createAll() {
    for (const id of Object.keys(this.agentDefs)) {
      this.createAgent(id);
    }
  }

  updateState(agentId, newState, detail) {
    const entry = this.sprites[agentId];
    if (!entry) return;

    const prevState = entry.state;
    entry.state = newState;

    // Update status dot color
    entry.statusDot.setFillStyle(DOT_COLORS[newState] || 0x64748b);

    // Play spritesheet animation
    if (entry.hasSpritesheet && newState !== 'offline') {
      const pose = this.stateToPose(newState);
      const key = `${entry.role}-${entry.gender}-${pose}`;
      if (this.scene.anims.exists(key)) {
        entry.sprite.play(key);
      }
    }

    // Offline: reduce alpha
    if (newState === 'offline') {
      entry.container.setAlpha(0.4);
    } else {
      entry.container.setAlpha(1);
    }

    // Error: flash
    if (newState === 'error') {
      this.scene.tweens.add({
        targets: entry.sprite,
        alpha: { from: 1, to: 0.5 },
        yoyo: true,
        repeat: 3,
        duration: 200
      });
    }

    // Move to break room if idle
    const def = this.agentDefs[agentId];
    if (newState === 'idle' && agentId !== 'chairman') {
      const breakPos = LAYOUT.getSlotPosition('break-room', this._getBreakRoomSlot(agentId));
      this._moveTo(entry.container, breakPos.x, breakPos.y);
    } else if (prevState === 'idle' && newState !== 'idle' && agentId !== 'chairman') {
      const deskPos = LAYOUT.getSlotPosition(def.area, 0);
      this._moveTo(entry.container, deskPos.x, deskPos.y);
    }

    // Show bubble
    if (detail) {
      this.showBubble(agentId, detail);
    }
  }

  showBubble(agentId, text, duration = 4000) {
    const entry = this.sprites[agentId];
    if (!entry) return;
    entry.bubble.setText(text);
    entry.bubble.setVisible(true);
    this.scene.time.delayedCall(duration, () => {
      if (entry.bubble) entry.bubble.setVisible(false);
    });
  }

  _moveTo(container, x, y, duration = 600) {
    this.scene.tweens.add({
      targets: container,
      x, y,
      duration,
      ease: 'Power2'
    });
  }

  _breakRoomCounter = 0;
  _getBreakRoomSlot(agentId) {
    return this._breakRoomCounter++ % LAYOUT.zones['break-room'].maxSlots;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add stage/public/js/agents.js
git commit -m "feat(stage): spritesheet support in AgentManager with pose animations"
```

---

### Task 6: Rewrite game.js preload for dynamic spritesheet loading

**Files:**
- Modify: `stage/public/js/game.js`

- [ ] **Step 1: Replace preload function**

Replace the existing `preload` function (lines 31-41) with:

```javascript
  function preload() {
    // Background
    this.load.image('background', `/themes/${config.theme}/background.png`);

    // Furniture — load each key from theme manifest
    // Multiple keys may point to the same file (e.g. big-desk → desk.png);
    // Phaser handles duplicate URLs gracefully, each key gets its own texture reference
    const furniture = (themeManifest.theme && themeManifest.theme.furniture) || {};
    for (const [name, relPath] of Object.entries(furniture)) {
      this.load.image(name, `/themes/${config.theme}/${relPath}`);
    }

    // Effects
    this.load.image('document', `/themes/${config.theme}/sprites/effects/document.png`);

    // Character spritesheets (dynamic loading based on characterPattern)
    const pattern = themeManifest.theme && themeManifest.theme.characterPattern;
    if (pattern) {
      const poses = ['idle','working','researching','executing','dispatching','awaiting','error'];
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
    } else {
      // Fallback: old single-image mode
      this.load.image('char_default', `/themes/${config.theme}/sprites/characters/default.png`);
    }

    // Graceful handling of missing assets during incremental production
    this.load.on('loaderror', (file) => {
      console.warn(`Asset not found: ${file.key} — will use fallback`);
    });
  }
```

- [ ] **Step 2: Update AgentManager constructor call in create()**

Find line 84:
```javascript
    agentManager = new AgentManager(this, config.agents, themeManifest);
```

Replace with:
```javascript
    agentManager = new AgentManager(this, config.agents, themeManifest, config.defaultGender);
```

- [ ] **Step 3: Commit**

```bash
git add stage/public/js/game.js
git commit -m "feat(stage): dynamic spritesheet preload with loaderror fallback"
```

---

### Task 7: Create theme directories for palace, xianxia, medieval

**Files:**
- Create: `stage/themes/palace/theme.json`
- Create: `stage/themes/xianxia/theme.json`
- Create: `stage/themes/medieval/theme.json`
- Copy: `animations.json`, `idle-behaviors.json`, `locales/` to each

- [ ] **Step 1: Create palace theme**

`stage/themes/palace/theme.json`:
```json
{
  "name": "palace",
  "displayName": { "en": "Chinese Palace", "zh-TW": "中國宮廷" },
  "version": "1.0.0",
  "background": "background.png",
  "characterPattern": "sprites/characters/{gender}/{role}-{pose}.png",
  "animationFps": 8,
  "furniture": {
    "desk": "sprites/furniture/desk.png",
    "big-desk": "sprites/furniture/desk.png",
    "monitor-wall": "sprites/furniture/desk.png",
    "sofa": "sprites/furniture/sofa.png",
    "coffee-machine": "sprites/furniture/desk.png",
    "bookshelf": "sprites/furniture/desk.png",
    "chair": "sprites/furniture/desk.png",
    "phone": "sprites/furniture/desk.png",
    "vending-machine": "sprites/furniture/desk.png"
  },
  "characters": {
    "default": "sprites/characters/default.png"
  },
  "effects": {
    "document": "sprites/effects/document.png",
    "stamp": "sprites/effects/document.png",
    "green-sparkle": "sprites/effects/document.png"
  }
}
```

Copy `animations.json`, `idle-behaviors.json`, `locales/en.json`, `locales/zh-TW.json` from modern-office.

Create placeholder subdirectories: `sprites/characters/male/`, `sprites/characters/female/`, `sprites/furniture/`, `sprites/effects/`, `sprites/decorations/`.

- [ ] **Step 2: Create xianxia theme**

Same structure as palace. `theme.json` with `"name": "xianxia"`, `"displayName": { "en": "Xianxia", "zh-TW": "仙俠" }`.

- [ ] **Step 3: Create medieval theme**

Same structure. `"name": "medieval"`, `"displayName": { "en": "Medieval", "zh-TW": "中世紀" }`.

- [ ] **Step 4: Copy placeholder PNGs from modern-office to new themes**

```bash
cd stage
for theme in palace xianxia medieval; do
  cp themes/modern-office/background.png "themes/${theme}/background.png"
  cp themes/modern-office/sprites/characters/default.png "themes/${theme}/sprites/characters/default.png"
  cp themes/modern-office/sprites/furniture/desk.png "themes/${theme}/sprites/furniture/desk.png"
  cp themes/modern-office/sprites/furniture/sofa.png "themes/${theme}/sprites/furniture/sofa.png"
  cp themes/modern-office/sprites/effects/document.png "themes/${theme}/sprites/effects/document.png"
done
```

This ensures themes can be loaded without errors. Character sprite directories (`male/`, `female/`) will get `.gitkeep` files to track empty dirs:

```bash
for theme in palace xianxia medieval; do
  touch "themes/${theme}/sprites/characters/male/.gitkeep"
  touch "themes/${theme}/sprites/characters/female/.gitkeep"
  touch "themes/${theme}/sprites/decorations/.gitkeep"
done
```

- [ ] **Step 5: Run tests**

Run: `cd stage && node --test`

Expected: All tests pass (new themes should not break existing tests since tests only check modern-office).

- [ ] **Step 6: Commit**

```bash
git add stage/themes/palace/ stage/themes/xianxia/ stage/themes/medieval/
git commit -m "feat(stage): add palace, xianxia, medieval theme directories"
```

---

## Chunk 3: Scripts

### Task 8: Create generate-sprites.js

**Files:**
- Create: `stage/scripts/generate-sprites.js`

This script generates identifiable pixel-art character spritesheets using pure Node.js (no dependencies). Each character gets their main color as body fill, a distinct head shape hinting at their animal archetype, and their key accessory. Output is 192×64 RGBA PNG (4 frames × 48×64).

- [ ] **Step 1: Write generate-sprites.js**

```javascript
// Generates identifiable character spritesheets (192×64 RGBA PNGs)
// Zero dependencies — extends generate-placeholders.js approach with RGBA support
const fs = require('node:fs');
const path = require('node:path');
const { deflateSync } = require('node:zlib');

// ─── PNG Encoder (RGBA, color type 6) ───

// CRC32 table — computed once at module scope
const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let v = n;
  for (let k = 0; k < 8; k++) v = v & 1 ? 0xEDB88320 ^ (v >>> 1) : v >>> 1;
  CRC_TABLE[n] = v;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function encodePng(width, height, pixelData) {
  // pixelData: Buffer of RGBA (width * height * 4 bytes)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0);
  ihdr.write('IHDR', 4);
  ihdr.writeUInt32BE(width, 8);
  ihdr.writeUInt32BE(height, 12);
  ihdr[16] = 8;  // bit depth
  ihdr[17] = 6;  // color type 6 = RGBA
  ihdr[18] = 0; ihdr[19] = 0; ihdr[20] = 0;
  ihdr.writeUInt32BE(crc32(ihdr.subarray(4, 21)), 21);

  // IDAT: add filter byte (0) at start of each row
  const rowLen = width * 4;
  const raw = Buffer.alloc(height * (1 + rowLen));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + rowLen)] = 0; // filter: none
    pixelData.copy(raw, y * (1 + rowLen) + 1, y * rowLen, (y + 1) * rowLen);
  }
  const compressed = deflateSync(raw);
  const idat = Buffer.alloc(compressed.length + 12);
  idat.writeUInt32BE(compressed.length, 0);
  idat.write('IDAT', 4);
  compressed.copy(idat, 8);
  idat.writeUInt32BE(crc32(Buffer.concat([Buffer.from('IDAT'), compressed])), compressed.length + 8);

  // IEND
  const iend = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// ─── Pixel Drawing Helpers ───

function createCanvas(w, h) {
  return { w, h, data: Buffer.alloc(w * h * 4) }; // RGBA, init transparent
}

function setPixel(canvas, x, y, r, g, b, a = 255) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= canvas.w || y < 0 || y >= canvas.h) return;
  const i = (y * canvas.w + x) * 4;
  canvas.data[i] = r; canvas.data[i+1] = g; canvas.data[i+2] = b; canvas.data[i+3] = a;
}

function fillRect(canvas, x, y, w, h, r, g, b, a = 255) {
  for (let dy = 0; dy < h; dy++)
    for (let dx = 0; dx < w; dx++)
      setPixel(canvas, x + dx, y + dy, r, g, b, a);
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF];
}

function darken(rgb, factor = 0.7) {
  return rgb.map(c => Math.round(c * factor));
}

function lighten(rgb, factor = 1.3) {
  return rgb.map(c => Math.min(255, Math.round(c * factor)));
}

// ─── Character Drawing ───

const FRAME_W = 48;
const FRAME_H = 64;
const SHEET_W = FRAME_W * 4; // 192
const SHEET_H = FRAME_H;     // 64
const SKIN = [235, 200, 170];

// Draw a single character frame onto a sheet canvas at frameIndex (0-3)
function drawCharacterFrame(canvas, frameIndex, color, archetype, accessory, poseOffset) {
  const ox = frameIndex * FRAME_W; // x offset for this frame
  const [cr, cg, cb] = hexToRgb(color);
  const [dr, dg, db] = darken([cr, cg, cb]);
  const [sr, sg, sb] = SKIN;
  const breathOffset = [0, -1, 0, 1][frameIndex]; // breathing animation

  // Body (torso) — 16×20 at center
  const bx = ox + 16;
  const by = 30 + breathOffset + poseOffset.bodyY;
  fillRect(canvas, bx, by, 16, 20, cr, cg, cb);
  // Dark side edge
  fillRect(canvas, bx, by, 2, 20, dr, dg, db);

  // Head — 14×14 at center
  const hx = ox + 17;
  const hy = 14 + breathOffset;
  fillRect(canvas, hx, hy, 14, 14, sr, sg, sb);

  // Hair (archetype-specific)
  const [hr, hg, hb] = darken([cr, cg, cb], 0.5);
  switch (archetype) {
    case 'lion': // fluffy mane
      fillRect(canvas, hx - 2, hy - 3, 18, 5, hr, hg, hb);
      fillRect(canvas, hx - 2, hy, 3, 12, hr, hg, hb);
      fillRect(canvas, hx + 13, hy, 3, 12, hr, hg, hb);
      break;
    case 'tiger': // short sharp
      fillRect(canvas, hx, hy - 2, 14, 4, hr, hg, hb);
      break;
    case 'ox': // flat top
      fillRect(canvas, hx, hy - 2, 14, 3, hr, hg, hb);
      fillRect(canvas, hx + 1, hy - 3, 12, 2, hr, hg, hb);
      break;
    case 'eagle': // slicked back
      fillRect(canvas, hx, hy - 2, 14, 3, hr, hg, hb);
      fillRect(canvas, hx + 10, hy, 6, 8, hr, hg, hb);
      break;
    case 'wolf': // spiky
      fillRect(canvas, hx, hy - 3, 14, 4, hr, hg, hb);
      fillRect(canvas, hx + 2, hy - 5, 3, 3, hr, hg, hb);
      fillRect(canvas, hx + 9, hy - 5, 3, 3, hr, hg, hb);
      break;
    case 'dog': // short and neat
      fillRect(canvas, hx, hy - 2, 14, 3, hr, hg, hb);
      break;
    case 'crane': // ponytail
      fillRect(canvas, hx, hy - 2, 14, 3, hr, hg, hb);
      fillRect(canvas, hx + 12, hy, 3, 16, hr, hg, hb);
      break;
    case 'owl': // slicked back gray
      fillRect(canvas, hx, hy - 2, 14, 3, 160, 160, 170);
      fillRect(canvas, hx + 10, hy, 5, 6, 160, 160, 170);
      break;
  }

  // Eyes (2 dots)
  setPixel(canvas, hx + 4, hy + 6, 30, 30, 30);
  setPixel(canvas, hx + 9, hy + 6, 30, 30, 30);

  // Legs — 2 columns
  const ly = by + 20;
  const legOffset = [0, 1, 0, -1][frameIndex]; // walking animation
  fillRect(canvas, bx + 3, ly, 4, 12 + poseOffset.legH, dr, dg, db);
  fillRect(canvas, bx + 9, ly + legOffset, 4, 12 + poseOffset.legH, dr, dg, db);

  // Arms
  const armY = by + 2;
  fillRect(canvas, bx - 4 + poseOffset.armLX, armY + poseOffset.armLY, 4, 10, cr, cg, cb);
  fillRect(canvas, bx + 16 + poseOffset.armRX, armY + poseOffset.armRY, 4, 10, cr, cg, cb);

  // Accessory (simplified)
  const [lr, lg, lb] = lighten([cr, cg, cb]);
  switch (accessory) {
    case 'phone':
      fillRect(canvas, bx + 20 + poseOffset.armRX, armY + poseOffset.armRY + 6, 3, 5, 60, 60, 60);
      break;
    case 'calculator':
      fillRect(canvas, bx + 20 + poseOffset.armRX, armY + poseOffset.armRY + 4, 4, 5, 220, 220, 220);
      break;
    case 'chart':
      fillRect(canvas, bx + 20 + poseOffset.armRX, armY + poseOffset.armRY + 2, 5, 6, 220, 220, 240);
      break;
    case 'headphones':
      fillRect(canvas, hx - 1, hy + 2, 2, 8, 60, 60, 60);
      fillRect(canvas, hx + 13, hy + 2, 2, 8, 60, 60, 60);
      fillRect(canvas, hx, hy - 1, 14, 2, 60, 60, 60);
      break;
    case 'clipboard':
      fillRect(canvas, bx - 6 + poseOffset.armLX, armY + poseOffset.armLY + 2, 5, 7, 200, 180, 150);
      break;
    case 'magnifying-glass':
      fillRect(canvas, bx + 20 + poseOffset.armRX, armY + poseOffset.armRY, 4, 4, lr, lg, lb);
      fillRect(canvas, bx + 22 + poseOffset.armRX, armY + poseOffset.armRY + 4, 2, 4, 120, 100, 60);
      break;
    case 'coffee-cup':
      fillRect(canvas, bx + 20 + poseOffset.armRX, armY + poseOffset.armRY + 4, 3, 4, 180, 120, 60);
      break;
    case 'hat': // COO cap
      fillRect(canvas, hx - 1, hy - 4, 16, 3, cr, cg, cb);
      fillRect(canvas, hx + 2, hy - 6, 10, 3, cr, cg, cb);
      break;
  }
}

// Pose offsets — differentiates body position per pose
const POSE_OFFSETS = {
  idle:        { bodyY: 0,  legH: 0, armLX: 0, armLY: 0, armRX: 0, armRY: 0 },
  working:     { bodyY: 2,  legH: -2, armLX: 2, armLY: -2, armRX: -2, armRY: -2 },
  researching: { bodyY: 1,  legH: 0, armLX: -1, armLY: 2, armRX: 1, armRY: 2 },
  executing:   { bodyY: -1, legH: 0, armLX: 3, armLY: -3, armRX: 3, armRY: -3 },
  dispatching: { bodyY: 0,  legH: 0, armLX: -2, armLY: 0, armRX: 5, armRY: -2 },
  awaiting:    { bodyY: 0,  legH: 0, armLX: 1, armLY: 4, armRX: 1, armRY: 4 },
  error:       { bodyY: 1,  legH: 0, armLX: 3, armLY: -1, armRX: -3, armRY: -1 }
};

// ─── Main Generation ───

function generateAllSprites(themeName, gender) {
  const agentsPath = path.join(__dirname, '..', 'config', 'agents.json');
  const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));
  const outBase = path.join(__dirname, '..', 'themes', themeName, 'sprites', 'characters', gender);

  fs.mkdirSync(outBase, { recursive: true });
  let count = 0;

  for (const agent of Object.values(agents)) {
    const role = agent.role;
    const color = agent.color || '#888888';
    const archetype = (agent.personality && agent.personality.archetype) || 'dog';
    const accessory = (agent.appearance && agent.appearance.accessory) || null;

    for (const pose of Object.keys(POSE_OFFSETS)) {
      const canvas = createCanvas(SHEET_W, SHEET_H);
      const offsets = POSE_OFFSETS[pose];

      for (let f = 0; f < 4; f++) {
        drawCharacterFrame(canvas, f, color, archetype, accessory, offsets);
      }

      const outFile = path.join(outBase, `${role}-${pose}.png`);
      fs.writeFileSync(outFile, encodePng(SHEET_W, SHEET_H, canvas.data));
      count++;
    }
  }

  return count;
}

// CLI
const args = process.argv.slice(2);
const theme = args[0] || 'modern-office';
const gender = args[1] || 'male';

if (args.includes('--all')) {
  const themes = ['modern-office', 'palace', 'xianxia', 'medieval'];
  const genders = ['male', 'female'];
  let total = 0;
  for (const t of themes) {
    for (const g of genders) {
      total += generateAllSprites(t, g);
    }
  }
  console.log(`Generated ${total} spritesheets across all themes.`);
} else {
  const count = generateAllSprites(theme, gender);
  console.log(`Generated ${count} spritesheets for ${theme}/${gender}.`);
}

// NOTE: Male and female fallback sprites are pixel-identical — the programmatic
// generator does not differentiate by gender. This is intentional: these are
// safety-net placeholders. AI-generated sprites (Chunk 5) will have distinct
// male/female designs per Phase B spec.
```

- [ ] **Step 2: Run it for modern-office male**

Run: `cd stage && node scripts/generate-sprites.js modern-office male`

Expected: `Generated 56 spritesheets for modern-office/male.`

Verify: `ls themes/modern-office/sprites/characters/male/ | wc -l` → 56

- [ ] **Step 3: Verify a PNG is valid**

Run: `cd stage && node -e "const fs=require('fs'); const b=fs.readFileSync('themes/modern-office/sprites/characters/male/chairman-idle.png'); console.log('Size:', b.length, 'bytes'); console.log('PNG signature:', b[0]===137 && b[1]===80 && b[2]===78 && b[3]===71)"`

Expected: `PNG signature: true`, size > 100 bytes

- [ ] **Step 4: Commit**

```bash
git add stage/scripts/generate-sprites.js
git commit -m "feat(stage): programmatic sprite generator — 48×64 RGBA spritesheets"
```

---

### Task 9: Create verify-assets.js

**Files:**
- Create: `stage/scripts/verify-assets.js`

- [ ] **Step 1: Write verify-assets.js**

```javascript
// Scans theme directories and reports missing/extra/wrong-size sprite assets
const fs = require('node:fs');
const path = require('node:path');

const ROLES = ['chairman', 'ceo', 'cfo', 'cio', 'cto', 'coo', 'chro', 'cao'];
const POSES = ['idle', 'working', 'researching', 'executing', 'dispatching', 'awaiting', 'error'];
const GENDERS = ['male', 'female'];
const EXPECTED_SHEET = { w: 192, h: 64 };

// Read PNG dimensions from IHDR chunk (bytes 16-23)
function readPngSize(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf[0] !== 137 || buf[1] !== 80) return null; // not PNG
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    return { w, h };
  } catch { return null; }
}

function verifyTheme(themeName, themesDir) {
  const report = { theme: themeName, missing: [], wrongSize: [], extra: [], ok: 0 };
  const themeDir = path.join(themesDir, themeName);

  if (!fs.existsSync(themeDir)) {
    report.missing.push(`Theme directory: ${themeName}/`);
    return report;
  }

  // Check characters
  for (const gender of GENDERS) {
    for (const role of ROLES) {
      for (const pose of POSES) {
        const relPath = `sprites/characters/${gender}/${role}-${pose}.png`;
        const fullPath = path.join(themeDir, relPath);
        if (!fs.existsSync(fullPath)) {
          report.missing.push(relPath);
        } else {
          const size = readPngSize(fullPath);
          if (size && (size.w !== EXPECTED_SHEET.w || size.h !== EXPECTED_SHEET.h)) {
            report.wrongSize.push({ file: relPath, actual: size, expected: EXPECTED_SHEET });
          } else {
            report.ok++;
          }
        }
      }
    }
  }

  // Check background
  const bgPath = path.join(themeDir, 'background.png');
  if (!fs.existsSync(bgPath)) {
    report.missing.push('background.png');
  } else {
    report.ok++;
  }

  // Check furniture (from theme.json)
  const themeJsonPath = path.join(themeDir, 'theme.json');
  if (fs.existsSync(themeJsonPath)) {
    const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, 'utf-8'));
    const checked = new Set();
    for (const [name, relPath] of Object.entries(themeJson.furniture || {})) {
      if (checked.has(relPath)) continue;
      checked.add(relPath);
      const fullPath = path.join(themeDir, relPath);
      if (!fs.existsSync(fullPath)) {
        report.missing.push(relPath);
      } else {
        report.ok++;
      }
    }
  }

  return report;
}

// CLI
const themesDir = path.join(__dirname, '..', 'themes');
const themes = process.argv[2]
  ? [process.argv[2]]
  : fs.readdirSync(themesDir).filter(f => fs.statSync(path.join(themesDir, f)).isDirectory());

const allReports = [];
for (const theme of themes) {
  const report = verifyTheme(theme, themesDir);
  allReports.push(report);

  console.log(`\n=== ${theme} ===`);
  console.log(`  OK: ${report.ok}`);
  console.log(`  Missing: ${report.missing.length}`);
  console.log(`  Wrong size: ${report.wrongSize.length}`);
  if (report.missing.length > 0 && report.missing.length <= 10) {
    report.missing.forEach(f => console.log(`    ✗ ${f}`));
  } else if (report.missing.length > 10) {
    report.missing.slice(0, 5).forEach(f => console.log(`    ✗ ${f}`));
    console.log(`    ... and ${report.missing.length - 5} more`);
  }
  report.wrongSize.forEach(f => console.log(`    ⚠ ${f.file}: ${f.actual.w}×${f.actual.h} (expected ${f.expected.w}×${f.expected.h})`));
}

// JSON report
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(allReports, null, 2));
}
```

- [ ] **Step 2: Run it**

Run: `cd stage && node scripts/verify-assets.js modern-office`

Expected: 56 OK (male sprites from Task 8), 56 missing (female sprites), background OK.

- [ ] **Step 3: Commit**

```bash
git add stage/scripts/verify-assets.js
git commit -m "feat(stage): asset verification script — checks completeness + dimensions"
```

---

## Chunk 4: Integration Test + Generate All Fallback Sprites

### Task 10: Generate fallback sprites for all themes and genders

**Files:**
- Generated output in `stage/themes/*/sprites/characters/`

- [ ] **Step 1: Generate all fallback sprites**

Run: `cd stage && node scripts/generate-sprites.js --all`

Expected: `Generated 448 spritesheets across all themes.`

- [ ] **Step 2: Verify with verify-assets.js**

Run: `cd stage && node scripts/verify-assets.js`

Expected: All 4 themes show OK counts for characters, no missing character sprites.

- [ ] **Step 3: Run all tests**

Run: `cd stage && node --test`

Expected: All tests pass.

- [ ] **Step 4: Start server and visually verify**

Run: `cd stage && node server/index.js`

Open: `http://localhost:19100`

Expected:
- 8 characters visible with distinct colors and body shapes
- Each character has a different head/hair style matching their archetype
- Characters animate (subtle breathing motion, 4-frame loop at 8 FPS)
- Status dots change color when simulator triggers state changes
- Characters move to break room when idle, return to desk when working

- [ ] **Step 5: Commit all generated sprites**

```bash
git add stage/themes/
git commit -m "feat(stage): generated fallback spritesheets — 448 PNGs across 4 themes"
```

---

### Task 11: End-to-end verification

- [ ] **Step 1: Test theme fallback**

Edit `stage/config/runtime-config.json`: change `"theme"` to `"palace"`. Restart server. Verify palace theme loads with the generated sprites.

Revert to `"modern-office"` after.

- [ ] **Step 2: Test missing sprite fallback**

Temporarily rename one spritesheet:
```bash
mv themes/modern-office/sprites/characters/male/ceo-idle.png themes/modern-office/sprites/characters/male/ceo-idle.png.bak
```

Restart server, open browser. Verify:
- CEO falls back to colored rectangle
- Console shows: `Asset not found: ceo-male-idle — will use fallback`
- All other characters still show sprites

Restore:
```bash
mv themes/modern-office/sprites/characters/male/ceo-idle.png.bak themes/modern-office/sprites/characters/male/ceo-idle.png
```

- [ ] **Step 3: Verify interactions.js visual alignment**

When simulator fires a `dispatch` event, check:
- The flying object starts from above the sender character (not inside/below)
- The flying object lands near the receiver character (not offset)
- If the y-offset looks wrong (because sprite is now 48×64 vs old 40×60), adjust `container.y - 40` in `interactions.js` as needed. The chairman.js should not need changes since it delegates to `agentManager.updateState()`.

- [ ] **Step 4: Test approve event**

In browser console, check that when simulator fires an `approve` event:
- Chairman's status dot turns amber (0xf59e0b)
- Chairman plays the `executing` pose animation (mapped from `approving`)

- [ ] **Step 5: Run full test suite**

Run: `cd stage && node --test`

Expected: All tests pass.

---

## Chunk 5: AI Asset Production (Nano Banana Pro)

> This chunk is executed interactively with the user. Each batch requires visual QA before proceeding.

### Task 12: Generate modern-office male idle sprites (8 PNGs)

**This is the style-defining batch.** Get these right before proceeding.

- [ ] **Step 1: Generate reference sprites for each character**

Use Nano Banana Pro to generate 8 character idle sprites. Each output should be a 192×64 transparent PNG with 4 frames of 48×64.

Prompt template (customize per character from Phase B spec Section 3):
```
48x64 pixel art sprite sheet, 4 frames side by side (192x64 total),
Q-style chibi 2-head ratio, isometric 3/4 view,
[character-specific clothing/hair/accessory from Phase B spec],
[pose: standing idle, slight breathing animation across 4 frames],
[animal archetype] inspired facial features,
[hex color] as dominant color scheme,
transparent background, clean pixel edges, no anti-aliasing,
each frame 48x64 pixels, subtle movement between frames
```

Characters to generate (in order):
1. Chairman — red suit, lion mane hair, coffee cup
2. CEO Adrian — blue suit, tiger sharp eyes, phone
3. CFO Sterling — amber vest, ox flat hair, glasses + calculator
4. CIO Archer — purple turtleneck, eagle slicked hair, chart
5. CTO Atlas — green hoodie, wolf spiky hair, headphones
6. COO Felix — orange polo, dog neat hair, cap
7. CHRO Sage — pink blazer, crane ponytail, clipboard
8. CAO Aldric — gray coat + yellow scarf, owl slicked hair, magnifying glass

- [ ] **Step 2: Visual QA each sprite**

For each generated sprite, verify:
- [ ] Correct dominant color
- [ ] Key accessory visible
- [ ] 4 frames consistent (same outline, ±2px tolerance)
- [ ] Transparent background clean
- [ ] Size is 192×64

- [ ] **Step 3: Save approved sprites**

Save each to: `stage/themes/modern-office/sprites/characters/male/{role}-idle.png`

- [ ] **Step 4: Start server and verify in-game**

Run: `cd stage && node server/index.js`

Verify the AI sprites load correctly and animate.

- [ ] **Step 5: Commit**

```bash
git add stage/themes/modern-office/sprites/characters/male/*-idle.png
git commit -m "feat(stage): AI-generated idle sprites — modern-office male (8 characters)"
```

---

### Task 13: Generate modern-office male remaining poses (48 PNGs)

- [ ] **Step 1: Generate 6 remaining poses for each character**

For each of the 8 characters, generate: working, researching, executing, dispatching, awaiting, error.

Use the approved idle sprite as visual reference for consistency. Adjust pose description per character (from Phase B spec Section 2.2).

- [ ] **Step 2: Visual QA — batch by character**

For each character, verify all 7 poses (including idle) look like the same character. Flag any that break consistency.

- [ ] **Step 3: Save and verify**

Save to: `stage/themes/modern-office/sprites/characters/male/{role}-{pose}.png`

Run: `cd stage && node scripts/verify-assets.js modern-office`

Expected: 56 OK for male, 56 missing for female.

- [ ] **Step 4: Commit**

```bash
git add stage/themes/modern-office/sprites/characters/male/
git commit -m "feat(stage): AI sprites — modern-office male all poses (56 PNGs)"
```

---

### Task 14: Generate remaining themes — male (168 PNGs)

- [ ] **Step 1: Generate palace male sprites**

All 8 characters × 7 poses = 56 PNGs. Use palace clothing/accessories from Phase B spec Section 3 (宮廷 column).

- [ ] **Step 2: Generate xianxia male sprites (56 PNGs)**

Use xianxia clothing from Phase B spec Section 3 (仙俠 column).

- [ ] **Step 3: Generate medieval male sprites (56 PNGs)**

Use medieval clothing from Phase B spec Section 3 (中世紀 column).

- [ ] **Step 4: Verify all themes**

Run: `cd stage && node scripts/verify-assets.js`

Expected: All 4 themes show 56 OK for male.

- [ ] **Step 5: Commit each theme separately**

```bash
git add stage/themes/palace/sprites/characters/male/
git commit -m "feat(stage): AI sprites — palace male (56 PNGs)"

git add stage/themes/xianxia/sprites/characters/male/
git commit -m "feat(stage): AI sprites — xianxia male (56 PNGs)"

git add stage/themes/medieval/sprites/characters/male/
git commit -m "feat(stage): AI sprites — medieval male (56 PNGs)"
```

---

### Task 15: Generate female sprites — all 4 themes (224 PNGs)

- [ ] **Step 1: Generate modern-office female (56 PNGs)**

Use female clothing/hair from Phase B spec Section 3 (女版 column).

- [ ] **Step 2: Generate palace female (56 PNGs)**
- [ ] **Step 3: Generate xianxia female (56 PNGs)**
- [ ] **Step 4: Generate medieval female (56 PNGs)**

- [ ] **Step 5: Verify all**

Run: `cd stage && node scripts/verify-assets.js`

Expected: All 4 themes show 112 OK (56 male + 56 female), 0 missing.

- [ ] **Step 6: Commit**

```bash
git add stage/themes/*/sprites/characters/female/
git commit -m "feat(stage): AI sprites — female versions all themes (224 PNGs)"
```

---

### Task 16: Generate furniture + backgrounds (52 PNGs)

- [ ] **Step 1: Generate 4 backgrounds (1920×1080)**

One per theme. Use Nano Banana Pro with prompts from Phase B spec Section 4.1:
- modern-office: isometric gray-blue tile floor + glass walls + ceiling lights + night city window
- palace: red wood floor + vermillion columns + glazed tile eaves + courtyard
- xianxia: stone floor + bamboo pavilion + misty mountains + flying cranes
- medieval: stone floor + castle walls + torch sconces + starry arched windows

- [ ] **Step 2: Generate furniture for modern-office (12 PNGs)**

From Phase B spec Section 4.2, modern column. Each at its specified size.

- [ ] **Step 3: Generate furniture for other 3 themes (36 PNGs)**

Same 12 furniture types, themed variants.

- [ ] **Step 4: Verify**

Run: `cd stage && node scripts/verify-assets.js`

- [ ] **Step 5: Commit**

```bash
git add stage/themes/*/background.png stage/themes/*/sprites/furniture/
git commit -m "feat(stage): AI backgrounds + furniture — all 4 themes (52 PNGs)"
```

---

## Chunk 6: Final Cleanup

### Task 17: Final verification and cleanup

- [ ] **Step 1: Run full test suite**

Run: `cd stage && node --test`

Expected: All tests pass.

- [ ] **Step 2: Run asset verification**

Run: `cd stage && node scripts/verify-assets.js`

Expected: All themes green, 0 missing, 0 wrong size.

- [ ] **Step 3: Visual test each theme**

For each theme, edit `runtime-config.json` to set that theme, restart server, open browser:
- [ ] modern-office: all 8 characters animate correctly
- [ ] palace: all 8 characters in palace outfits
- [ ] xianxia: all 8 characters in xianxia outfits
- [ ] medieval: all 8 characters in medieval outfits

- [ ] **Step 4: Test gender switch**

Edit one agent's `gender` in `agents.json` to `"female"`, restart, verify female sprite loads.

- [ ] **Step 5: Final commit if any cleanup needed**

```bash
git add stage/config/ stage/public/ stage/themes/ stage/scripts/ stage/tests/
git commit -m "feat(stage): Phase C complete — spritesheet pipeline + 500 assets"
```
