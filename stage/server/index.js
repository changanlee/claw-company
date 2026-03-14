const express = require('express');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { WebSocketServer } = require('ws');
const ThemeManager = require('./theme-manager');
const Simulator = require('./simulator');

function createServer(opts = {}) {
  const configPath = path.join(__dirname, '..', 'config', 'runtime-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const port = opts.port || config.port || 19100;
  const mode = opts.mode || config.mode || 'simulator';

  const agentsPath = path.join(__dirname, '..', 'config', 'agents.json');
  const agentDefs = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));

  const themesDir = path.join(__dirname, '..', 'themes');
  const themeManager = new ThemeManager(themesDir);

  const app = express();
  const server = http.createServer(app);

  // Static files
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/themes', express.static(themesDir));
  app.use('/locales', express.static(path.join(__dirname, '..', 'locales')));

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mode, timestamp: new Date().toISOString() });
  });

  app.get('/api/config', (req, res) => {
    res.json({
      agents: agentDefs,
      theme: config.theme,
      locale: config.locale,
      easterEggs: config.easterEggs || false
    });
  });

  app.get('/api/theme', (req, res) => {
    try {
      const manifest = themeManager.getManifest(config.theme, config.locale);
      res.json(manifest);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // WebSocket
  const wss = new WebSocketServer({ server, path: '/ws' });
  const clients = new Set();

  let simulator = null;
  if (mode === 'simulator') {
    simulator = new Simulator(agentDefs);
  }

  wss.on('connection', (ws) => {
    clients.add(ws);

    // Send full state on connect
    if (simulator) {
      ws.send(JSON.stringify({ type: 'full_state', data: simulator.getFullState() }));
    }

    // Start simulator if first client
    if (simulator && clients.size === 1) {
      simulator.start((event) => {
        const msg = JSON.stringify({ type: 'event', data: event });
        for (const client of clients) {
          if (client.readyState === 1) client.send(msg);
        }
        // Also send chairman update if state changed
        const chairmanMsg = JSON.stringify({ type: 'chairman_update', data: simulator.chairman });
        for (const client of clients) {
          if (client.readyState === 1) client.send(chairmanMsg);
        }
      });
    }

    ws.on('close', () => {
      clients.delete(ws);
      // Pause simulator if no clients
      if (simulator && clients.size === 0) {
        simulator.pause();
      }
    });

    ws.on('message', (data) => {
      // Handle ping keepalive
      try {
        const msg = JSON.parse(data);
        if (msg.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch (e) { /* ignore invalid messages */ }
    });
  });

  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Stage running at http://localhost:${port} (mode: ${mode})`);
      resolve(server);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Exiting.`);
        process.exit(1);
      }
      reject(err);
    });
  });
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mode' && args[i + 1]) opts.mode = args[++i];
    if (args[i] === '--port' && args[i + 1]) opts.port = parseInt(args[++i], 10);
    if (args[i] === '--data-dir' && args[i + 1]) opts.dataDir = args[++i];
  }
  createServer(opts);
}

module.exports = { createServer };
