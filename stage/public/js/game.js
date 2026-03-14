// Main Phaser scene — wires everything together
(async function () {
  // Load config from server
  const configRes = await fetch('/api/config');
  const config = await configRes.json();

  // Load theme manifest
  const themeRes = await fetch('/api/theme');
  const themeManifest = await themeRes.json();

  // Load i18n
  await I18n.load(config.locale, themeManifest.locale);

  // Phaser scene — shared references (assigned in create, used in handleEvent)
  let agentManager, interactionMgr, chairmanCtrl, dataPanel;
  let scene; // captured reference to Phaser scene

  function preload() {
    // Background
    this.load.image('background', `/themes/${config.theme}/background.png`);
    // Character placeholder
    this.load.image('char_default', `/themes/${config.theme}/sprites/characters/default.png`);
    // Furniture
    this.load.image('desk', `/themes/${config.theme}/sprites/furniture/desk.png`);
    this.load.image('sofa', `/themes/${config.theme}/sprites/furniture/sofa.png`);
    // Effects
    this.load.image('document', `/themes/${config.theme}/sprites/effects/document.png`);
  }

  function create() {
    scene = this; // capture for use in handleEvent and easter eggs

    // Background
    this.add.image(960, 540, 'background').setDepth(LAYOUT.depth.background);

    // Draw zone outlines (debug, will be replaced by theme background)
    for (const [zoneId, zone] of Object.entries(LAYOUT.zones)) {
      const rect = this.add.rectangle(
        zone.position.x, zone.position.y,
        zone.size.w, zone.size.h
      );
      rect.setStrokeStyle(1, zoneId === 'cao-zone' ? 0xeab308 : 0x334155);
      rect.setDepth(LAYOUT.depth.background + 1);

      // Zone label
      const label = this.add.text(
        zone.position.x, zone.position.y - zone.size.h / 2 + 10,
        zoneId.replace('-zone', '').replace('-', ' ').toUpperCase(),
        { fontSize: '12px', fontFamily: 'monospace', color: '#64748b' }
      );
      label.setOrigin(0.5, 0);
      label.setDepth(LAYOUT.depth.ui);
    }

    // Place furniture placeholders
    for (const [zoneId, zone] of Object.entries(LAYOUT.zones)) {
      for (let i = 0; i < Math.min(zone.furniture.length, 2); i++) {
        const fKey = zone.furniture[i];
        const texKey = fKey === 'sofa' ? 'sofa' : 'desk';
        const fSprite = this.add.image(
          zone.position.x + (i * 70 - 35),
          zone.position.y + 40,
          texKey
        );
        fSprite.setDepth(LAYOUT.depth.furniture);
        fSprite.setScale(0.8);
      }
    }

    // Create agents
    agentManager = new AgentManager(this, config.agents, themeManifest);
    agentManager.createAll();

    // Connect WebSocket
    connectWebSocket();
  }

  function update() {
    // Phaser update loop — used for continuous animations if needed
  }

  // WebSocket connection with reconnect
  let ws;
  let reconnectDelay = 1000;
  let keepaliveInterval;

  function connectWebSocket() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${location.host}/ws`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      reconnectDelay = 1000; // reset backoff
      // Start keepalive (clear previous to prevent leak)
      if (keepaliveInterval) clearInterval(keepaliveInterval);
      keepaliveInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000);
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      switch (msg.type) {
        case 'full_state':
          // Initialize all agent states
          for (const [id, agent] of Object.entries(msg.data.agents)) {
            agentManager.updateState(id, agent.state);
          }
          break;

        case 'event':
          handleEvent(msg.data);
          break;

        case 'chairman_update':
          // Chairman state handled via agents.js
          agentManager.updateState('chairman', msg.data.state);
          break;
      }
    };

    ws.onclose = () => {
      console.log(`WebSocket closed, reconnecting in ${reconnectDelay}ms...`);
      if (keepaliveInterval) clearInterval(keepaliveInterval);
      setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, 30000);
        connectWebSocket();
      }, reconnectDelay);
    };
  }

  function handleEvent(event) {
    switch (event.type) {
      case 'status_change':
        agentManager.updateState(event.agent, event.state, event.detail);
        break;
      case 'dispatch':
        agentManager.updateState(event.to, 'working');
        agentManager.showBubble(event.to, I18n.t('status.dispatching'));
        // TODO: InteractionManager dispatch animation (Task 10)
        break;
      case 'report':
        agentManager.showBubble(event.from, I18n.t('status.working'));
        break;
      case 'approve':
        agentManager.updateState('chairman', 'approving');
        break;
      case 'reject':
        agentManager.updateState('chairman', 'idle');
        break;
      case 'alert':
        agentManager.updateState(event.agent, 'error');
        break;
    }
  }

  // Create Phaser game
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: LAYOUT.canvas.width,
    height: LAYOUT.canvas.height,
    parent: 'game-container',
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#0f0f23',
    scene: { preload, create, update }
  });
})();
