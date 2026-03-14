// Main Phaser scene — wires everything together
(async function () {
  // Load config from server
  const configRes = await fetch('/api/config');
  const config = await configRes.json();

  // Override locale from ?lang= query parameter
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang) config.locale = urlLang;

  // Load theme manifest (with correct locale)
  const themeRes = await fetch(`/api/theme?lang=${config.locale}`);
  const themeManifest = await themeRes.json();

  // Load i18n
  await I18n.load(config.locale, themeManifest.locale);

  // Update UI elements with i18n
  document.getElementById('panel-title').textContent = I18n.t('panel.title');
  document.getElementById('panel-events-title').textContent = I18n.t('panel.events');
  document.getElementById('lang-switch').textContent = I18n.t('lang.switch');
  document.getElementById('lang-switch').onclick = () => {
    const next = I18n.lang() === 'en' ? 'zh-TW' : 'en';
    location.search = '?lang=' + next;
  };

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

    // Chairman controller
    chairmanCtrl = new ChairmanController(this, agentManager, themeManifest.idleBehaviors);

    // Interaction manager
    interactionMgr = new InteractionManager(this, agentManager, themeManifest.animations);

    // Data panel
    dataPanel = new DataPanel(config.agents);

    // Easter eggs
    if (config.easterEggs) {
      // Cat visitor: random interval 30-60 min
      const scheduleCat = () => {
        const delay = (30 + Math.random() * 30) * 60 * 1000;
        scene.time.delayedCall(delay, () => {
          const cat = scene.add.rectangle(0, 950, 20, 15, 0xffa500);
          cat.setDepth(LAYOUT.depth.effects + 50);
          scene.tweens.add({
            targets: cat,
            x: 1920,
            duration: 12000,
            onComplete: () => { cat.destroy(); scheduleCat(); }
          });
        });
      };
      scheduleCat();

      // Night owl: check every minute, add candle to working agents after midnight
      scene.time.addEvent({
        delay: 60000,
        loop: true,
        callback: () => {
          const hour = new Date().getHours();
          if (hour >= 0 && hour < 6) {
            for (const [id, entry] of Object.entries(agentManager.sprites)) {
              if (entry.state === 'working' || entry.state === 'executing') {
                if (!entry._nightOwl) {
                  const candle = scene.add.circle(
                    entry.container.x + 25, entry.container.y - 30,
                    4, 0xffa500
                  );
                  candle.setDepth(LAYOUT.depth.effects);
                  scene.tweens.add({
                    targets: candle, alpha: { from: 0.6, to: 1 },
                    yoyo: true, repeat: -1, duration: 500
                  });
                  entry._nightOwl = candle;
                }
              } else if (entry._nightOwl) {
                entry._nightOwl.destroy();
                entry._nightOwl = null;
              }
            }
          }
        }
      });
    }

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
          dataPanel.updateAgents(msg.data.agents);
          break;

        case 'event':
          handleEvent(msg.data);
          break;

        case 'chairman_update':
          chairmanCtrl.updateState(msg.data.state, msg.data);
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
    // Update data panel
    dataPanel.addEvent(event);
    if (agentManager && agentManager.sprites) {
      const agentsState = {};
      for (const [id, s] of Object.entries(agentManager.sprites)) {
        agentsState[id] = { state: s.state };
      }
      dataPanel.updateAgents(agentsState);
    }

    switch (event.type) {
      case 'status_change':
        agentManager.updateState(event.agent, event.state, event.detail);
        break;
      case 'dispatch':
        agentManager.updateState(event.to, 'working');
        interactionMgr.playDispatch(event.from, event.to);
        break;
      case 'report':
        interactionMgr.playDispatch(event.from, event.to || 'cc-ceo');
        break;
      case 'approve':
        interactionMgr.playApprove('chairman');
        agentManager.updateState('chairman', 'approving');
        break;
      case 'reject':
        interactionMgr.playReject();
        break;
      case 'alert':
        interactionMgr.playAlert(event.agent);
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
