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

  // Chairman is human — only has idle/working/dispatching/awaiting poses
  static CHAIRMAN_POSES = new Set(['idle', 'working', 'dispatching', 'awaiting']);

  stateToPose(state, agentId) {
    const pose = STATE_TO_POSE[state] || 'idle';
    if (agentId === 'chairman' && !AgentManager.CHAIRMAN_POSES.has(pose)) {
      return 'idle';
    }
    return pose;
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

    // Flip characters on the right side of screen to face center
    const zoneX = LAYOUT.zones[def.area] ? LAYOUT.zones[def.area].position.x : 960;
    if (zoneX > 960) {
      sprite.setFlipX(true);
    }

    container.add([sprite, nameTag, statusDot, bubble]);
    this.sprites[agentId] = {
      container, sprite, nameTag, statusDot, bubble,
      state: 'idle',
      role: def.role,
      gender,
      hasSpritesheet,
      faceLeft: zoneX > 960
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
      const pose = this.stateToPose(newState, agentId);
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
      // In break room: face right (default)
      entry.sprite.setFlipX(false);
    } else if (prevState === 'idle' && newState !== 'idle' && agentId !== 'chairman') {
      const deskPos = LAYOUT.getSlotPosition(def.area, 0);
      this._moveTo(entry.container, deskPos.x, deskPos.y);
      // Back at desk: restore original facing
      entry.sprite.setFlipX(entry.faceLeft || false);
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
