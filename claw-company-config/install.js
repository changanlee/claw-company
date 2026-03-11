#!/usr/bin/env node
// ============================================
// One-Person Company — OpenClaw Supplement Pack Installer
// Version: v0.3 (cross-platform Node.js)
// Compatible with: OpenClaw >= 2026.3.8
// ============================================

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const readline = require('readline');

// ============================================
// Constants
// ============================================
const SCRIPT_DIR = __dirname;
const OPENCLAW_DIR = path.join(os.homedir(), '.openclaw');
const INSTALL_DIR = path.join(OPENCLAW_DIR, 'claw-company');
const AGENTS = ['ceo', 'cfo', 'cio', 'coo', 'cto', 'chro', 'cao'];
const AGENT_PREFIX = 'cc-';
const REQUIRED_MIN_VERSION = '2026.3.8';
const MEMORY_PLUGIN_REPO = 'https://github.com/win4r/memory-lancedb-pro.git';
const MEMORY_PLUGIN_VERSION = 'v1.0.32';
const MEMORY_PLUGIN_DIR = 'plugins/memory-lancedb-pro';

// State
let langDir = '';
let modelPrimary = '';
let modelLight = '';
const tiers = {
  CEO: 'smart', CFO: 'smart', CIO: 'smart', COO: 'fast',
  CTO: 'smart', CTO_SUB: 'fast', CHRO: 'fast', CAO: 'smart',
};

// ============================================
// Helpers
// ============================================

function msg(en, zh) {
  return langDir === 'zh' ? zh : en;
}

function log(text) {
  console.log(text);
}

function logInfo(en, zh) {
  log(`[INFO] ${msg(en, zh)}`);
}

function logWarn(en, zh) {
  log(`[WARN] ${msg(en, zh)}`);
}

function logError(en, zh) {
  log(`[ERROR] ${msg(en, zh)}`);
}

function logOk(text) {
  log(`  [OK] ${text}`);
}

/** Compare two dot-separated version strings. Returns true if a >= b. */
function versionGte(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < pb.length; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return true;
    if (na < nb) return false;
  }
  return true;
}

/** Strip JSONC comments (line and block) from a string, preserving strings. */
function stripJsonComments(text) {
  let result = '';
  let inString = false;
  let escape = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      result += ch;
      escape = false;
      continue;
    }
    if (ch === '\\' && inString) {
      result += ch;
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }
    if (!inString && ch === '/' && text[i + 1] === '/') {
      // Single-line comment: skip to end of line
      while (i < text.length && text[i] !== '\n') i++;
      result += '\n';
      continue;
    }
    if (!inString && ch === '/' && text[i + 1] === '*') {
      // Block comment: skip to closing */
      i += 2;
      while (i < text.length - 1 && !(text[i] === '*' && text[i + 1] === '/')) i++;
      i++; // skip past closing /
      continue;
    }
    result += ch;
  }
  // Also strip trailing commas before } or ]
  return result.replace(/,(\s*[}\]])/g, '$1');
}

/** Read and parse a JSONC file. */
function readJsonc(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(stripJsonComments(raw));
}

/** Deep merge source into target (mutates target). Arrays are merged as union (deduplicated). */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key]) &&
      typeof source[key] === 'object' && !Array.isArray(source[key])
    ) {
      deepMerge(target[key], source[key]);
    } else if (Array.isArray(target[key]) && Array.isArray(source[key])) {
      // Merge arrays as union (preserve existing + add new)
      const existing = new Set(target[key].map(v => typeof v === 'object' ? JSON.stringify(v) : v));
      for (const item of source[key]) {
        const k = typeof item === 'object' ? JSON.stringify(item) : item;
        if (!existing.has(k)) {
          target[key].push(item);
          existing.add(k);
        }
      }
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/** Execute a CLI command safely using spawnSync (no shell injection). Returns { ok, stdout, stderr }. */
function tryExec(args) {
  if (typeof args === 'string') args = args.split(/\s+/);
  const [cmd, ...rest] = args;
  const result = spawnSync(cmd, rest, { encoding: 'utf-8', timeout: 30000 });
  if (result.status === 0) {
    return { ok: true, stdout: (result.stdout || '').trim(), stderr: '' };
  }
  return { ok: false, stdout: '', stderr: (result.stderr || result.error?.message || '').trim() };
}

/** Build a display-friendly command string for fallback output. */
function cmdToString(args) {
  return args.map(a => (a.includes(' ') || a.includes('"')) ? `"${a.replace(/"/g, '\\"')}"` : a).join(' ');
}

/** Create a readline interface for interactive input. */
function createRl() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

/** Prompt user for input. Returns a promise. */
function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

/** Replace {{INSTALL_DIR}} in a string. */
function replaceInstallDir(text) {
  return text.replaceAll('{{INSTALL_DIR}}', INSTALL_DIR);
}

/** Try symlink, fallback to copy on Windows or permission errors. Warns once on first fallback. */
let symlinkFallbackWarned = false;
function symlinkOrCopy(target, linkPath) {
  try { if (fs.existsSync(linkPath) || fs.lstatSync(linkPath).isSymbolicLink()) fs.unlinkSync(linkPath); } catch (_) {}
  try {
    fs.symlinkSync(target, linkPath);
  } catch (_) {
    // Fallback: copy file instead of symlink
    fs.copyFileSync(target, linkPath);
    if (!symlinkFallbackWarned) {
      logWarn(
        'Symlinks not available, using file copies instead (shared file changes require reinstall)',
        '無法建立 symlink，改用檔案複製（共用檔案變更後需重新安裝）'
      );
      symlinkFallbackWarned = true;
    }
  }
}

/** Text file extensions that may contain {{INSTALL_DIR}} placeholders. */
const TEXT_EXTENSIONS = new Set(['.md', '.yaml', '.yml', '.json', '.jsonc', '.txt', '.csv']);

/** Copy directory recursively, with optional {{INSTALL_DIR}} substitution in text files. */
function deployDir(srcDir, dstDir, { substituteInstallDir = false, preserveExisting = false } = {}) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(dstDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const dstPath = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      deployDir(srcPath, dstPath, { substituteInstallDir, preserveExisting });
    } else {
      if (preserveExisting && fs.existsSync(dstPath)) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (substituteInstallDir && TEXT_EXTENSIONS.has(ext)) {
        const content = fs.readFileSync(srcPath, 'utf-8');
        fs.writeFileSync(dstPath, replaceInstallDir(content));
      } else {
        fs.copyFileSync(srcPath, dstPath);
      }
    }
  }
}

// ============================================
// Uninstall
// ============================================
async function uninstall() {
  log('');
  log('==========================================');
  log('  Uninstall claw-company');
  log('==========================================');
  log('');

  if (!fs.existsSync(INSTALL_DIR)) {
    log('claw-company is not installed.');
    process.exit(0);
  }

  log(`This will remove: ${INSTALL_DIR}`);

  // Read native json and check for injected settings
  const nativeJsonPath = path.join(OPENCLAW_DIR, 'openclaw.json');
  if (fs.existsSync(nativeJsonPath)) {
    log(`Will also clean injected settings from: ${nativeJsonPath}`);
  }

  const rl = createRl();
  const confirm = await ask(rl, '\nConfirm? (y/N): ');
  rl.close();

  if (confirm.toLowerCase() !== 'y') {
    log('Cancelled.');
    process.exit(0);
  }

  // Remove injected settings from native json
  if (fs.existsSync(nativeJsonPath)) {
    try {
      const nativeJson = readJsonc(nativeJsonPath);
      // Remove claw-company injected sections
      if (nativeJson.agents && nativeJson.agents.defaults) {
        delete nativeJson.agents.defaults.models;
        delete nativeJson.agents.defaults.subagents;
        delete nativeJson.agents.defaults.heartbeat;
        delete nativeJson.agents.defaults.model;
        delete nativeJson.agents.defaults.compaction;
        // Clean up empty objects
        if (Object.keys(nativeJson.agents.defaults).length === 0) {
          delete nativeJson.agents.defaults;
        }
        if (nativeJson.agents && Object.keys(nativeJson.agents).length === 0) {
          delete nativeJson.agents;
        }
      }
      if (nativeJson.plugins) {
        delete nativeJson.plugins;
      }
      if (nativeJson.tools) {
        delete nativeJson.tools.agentToAgent;
        delete nativeJson.tools.sessions;
        delete nativeJson.tools.loopDetection;
        if (Object.keys(nativeJson.tools).length === 0) delete nativeJson.tools;
      }
      if (nativeJson.hooks && nativeJson.hooks.internal) {
        delete nativeJson.hooks.internal;
        if (Object.keys(nativeJson.hooks).length === 0) delete nativeJson.hooks;
      }
      if (nativeJson.cron) {
        delete nativeJson.cron.enabled;
        delete nativeJson.cron.maxConcurrentRuns;
        if (Object.keys(nativeJson.cron).length === 0) delete nativeJson.cron;
      }
      fs.writeFileSync(nativeJsonPath, JSON.stringify(nativeJson, null, 2) + '\n');
      log('[INFO] Cleaned injected settings from native openclaw.json');
    } catch (err) {
      logWarn(
        `Could not clean native json: ${err.message}`,
        `無法清理原生 json：${err.message}`
      );
    }
  }

  // Remove agents via CLI
  for (const agent of AGENTS) {
    tryExec(['openclaw', 'agents', 'remove', `${AGENT_PREFIX}${agent}`]);
  }
  log('[INFO] Removed agents via CLI');

  // Remove cron jobs via CLI
  const cronNames = [
    'morning-briefing', 'investment-monitor', 'memory-cleanup',
    'weekly-org-review', 'security-scan', 'cto-memory-cleanup',
  ];
  for (const name of cronNames) {
    tryExec(['openclaw', 'cron', 'remove', '--name', name]);
  }
  log('[INFO] Removed cron jobs via CLI');

  // Remove symlink if it points to claw-company
  const nativeLink = path.join(OPENCLAW_DIR, 'openclaw.json');
  try {
    const stat = fs.lstatSync(nativeLink);
    if (stat.isSymbolicLink()) {
      const target = fs.readlinkSync(nativeLink);
      if (target.includes('claw-company')) {
        fs.unlinkSync(nativeLink);
        log('[INFO] Removed symlink');
      }
    }
  } catch (_) { /* no symlink */ }

  // Remove install directory
  fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
  log(`[INFO] Removed ${INSTALL_DIR}`);
  log('');
  log('Done. OpenClaw is back to its original state.');
  process.exit(0);
}

// ============================================
// Main Install Flow
// ============================================
async function main() {
  // --uninstall flag
  if (process.argv.includes('--uninstall') || process.argv.includes('uninstall')) {
    await uninstall();
    return;
  }

  // --update-skills: lightweight mode — only update skill allowlist in openclaw.json
  if (process.argv.includes('--update-skills')) {
    const nativeJsonPath = path.join(OPENCLAW_DIR, 'openclaw.json');
    if (!fs.existsSync(nativeJsonPath)) {
      console.error('[ERROR] openclaw.json not found. Run full install first.');
      process.exit(1);
    }
    const skillAllowlistPath = path.join(SCRIPT_DIR, 'skill-allowlist.json');
    if (!fs.existsSync(skillAllowlistPath)) {
      console.error('[ERROR] skill-allowlist.json not found.');
      process.exit(1);
    }
    const nativeJson = JSON.parse(fs.readFileSync(nativeJsonPath, 'utf-8'));
    const skillAllowlist = JSON.parse(fs.readFileSync(skillAllowlistPath, 'utf-8'));

    if (!nativeJson.agents) nativeJson.agents = {};
    if (!nativeJson.agents.list) nativeJson.agents.list = [];

    for (const agent of AGENTS) {
      const agentId = `${AGENT_PREFIX}${agent}`;
      const allowedSkills = skillAllowlist[agentId];
      if (allowedSkills === undefined) continue;
      let entry = nativeJson.agents.list.find(a => a.id === agentId);
      if (!entry) {
        entry = { id: agentId };
        nativeJson.agents.list.push(entry);
      }
      entry.skills = allowedSkills;
    }

    // Backup + write
    const backupPath = `${nativeJsonPath}.backup.${Date.now()}`;
    try { fs.copyFileSync(nativeJsonPath, backupPath); } catch (_) {}
    fs.writeFileSync(nativeJsonPath, JSON.stringify(nativeJson, null, 2) + '\n');
    console.log('[OK] Skill allowlist updated in openclaw.json');
    console.log(`  Backup: ${path.basename(backupPath)}`);
    return;
  }

  // Safety: no root on Linux
  if (process.platform === 'linux' && process.getuid && process.getuid() === 0) {
    console.error('[ERROR] Do not run as root. Please use a normal user account.');
    process.exit(1);
  }

  // Node.js version check (>= 16.7 for fs.cpSync)
  const nodeVersion = process.versions.node.split('.').map(Number);
  if (nodeVersion[0] < 16 || (nodeVersion[0] === 16 && nodeVersion[1] < 7)) {
    console.error(`[ERROR] Node.js >= 16.7 required (current: ${process.versions.node})`);
    process.exit(1);
  }

  log('');
  log('==========================================');
  log('  OpenClaw One-Person Company Installer');
  log('==========================================');
  log('');

  const rl = createRl();

  // ----------------------------------------
  // Step 1: Language selection
  // ----------------------------------------
  log('Please select your language / 請選擇語言：');
  log('');
  log('  1) English');
  log('  2) 繁體中文');
  log('');

  while (true) {
    const choice = await ask(rl, 'Enter 1 or 2 / 輸入 1 或 2: ');
    if (choice === '1') { langDir = 'en'; log('\n[INFO] Selected: English'); break; }
    if (choice === '2') { langDir = 'zh'; log('\n[INFO] 已選擇：繁體中文'); break; }
    log('Invalid input. Please enter 1 or 2. / 無效輸入，請輸入 1 或 2。');
  }

  const sourceDir = path.join(SCRIPT_DIR, langDir);
  if (!fs.existsSync(sourceDir)) {
    logError(
      `Language directory not found: ${sourceDir}`,
      `找不到語言目錄：${sourceDir}`
    );
    rl.close();
    process.exit(1);
  }
  log('');

  // ----------------------------------------
  // Step 2: Prerequisites — openclaw CLI
  // ----------------------------------------
  const clawCheck = tryExec(['openclaw', '--version']);
  if (!clawCheck.ok) {
    logError(
      'openclaw command not found. Please install OpenClaw first.',
      '找不到 openclaw 指令，請先安裝 OpenClaw。'
    );
    log('  https://github.com/openclaw/openclaw');
    rl.close();
    process.exit(1);
  }

  // ----------------------------------------
  // Step 3: Version check
  // ----------------------------------------
  const versionMatch = clawCheck.stdout.match(/(\d+\.\d+\.\d+)/);
  if (versionMatch) {
    const currentVersion = versionMatch[1];
    if (!versionGte(currentVersion, REQUIRED_MIN_VERSION)) {
      logError(
        `OpenClaw version too old: ${currentVersion} (requires >= ${REQUIRED_MIN_VERSION})`,
        `OpenClaw 版本過舊：${currentVersion}（需要 >= ${REQUIRED_MIN_VERSION}）`
      );
      log(msg('  Please upgrade: npm update -g openclaw', '  請先升級：npm update -g openclaw'));
      rl.close();
      process.exit(1);
    }
    logInfo(`OpenClaw version: ${currentVersion}`, `OpenClaw 版本：${currentVersion}`);
  } else {
    logWarn(
      `Could not detect version, proceeding (recommended >= ${REQUIRED_MIN_VERSION})`,
      `無法偵測版本，繼續安裝（建議 >= ${REQUIRED_MIN_VERSION}）`
    );
  }
  log('');

  // ----------------------------------------
  // Step 4: Check native openclaw.json
  // ----------------------------------------
  const nativeJsonPath = path.join(OPENCLAW_DIR, 'openclaw.json');

  // If it's a symlink to claw-company (from old install), resolve to backup or real file
  let configPath = nativeJsonPath;
  try {
    const stat = fs.lstatSync(nativeJsonPath);
    if (stat.isSymbolicLink()) {
      const target = fs.readlinkSync(nativeJsonPath);
      if (target.includes('claw-company')) {
        // Old symlink — look for backup
        const files = fs.readdirSync(OPENCLAW_DIR)
          .filter(f => f.startsWith('openclaw.json.backup.'))
          .sort()
          .reverse();
        if (files.length > 0) {
          configPath = path.join(OPENCLAW_DIR, files[0]);
          logInfo(
            `Found old symlink, using backup: ${configPath}`,
            `偵測到舊版 symlink，使用備份：${configPath}`
          );
        } else {
          logError(
            'Old claw-company symlink found but no backup. Please restore your original openclaw.json.',
            '偵測到舊版 claw-company symlink，但找不到備份檔。請手動恢復原生 openclaw.json。'
          );
          rl.close();
          process.exit(1);
        }
      }
    }
  } catch (_) { /* not a symlink or doesn't exist */ }

  if (!fs.existsSync(configPath)) {
    logError(
      `${OPENCLAW_DIR}/openclaw.json not found. Please run: openclaw onboard`,
      `找不到 ${OPENCLAW_DIR}/openclaw.json，請先執行：openclaw onboard`
    );
    rl.close();
    process.exit(1);
  }

  let nativeJson;
  try {
    nativeJson = readJsonc(configPath);
  } catch (err) {
    logError(
      `Failed to parse ${configPath}: ${err.message}`,
      `解析 ${configPath} 失敗：${err.message}`
    );
    rl.close();
    process.exit(1);
  }

  // ----------------------------------------
  // Step 5: Detect models
  // ----------------------------------------
  const modelsSet = new Set();

  // Extract from agents.defaults.models keys
  if (nativeJson.agents?.defaults?.models) {
    for (const key of Object.keys(nativeJson.agents.defaults.models)) {
      if (key.includes('/')) modelsSet.add(key);
    }
  }

  // Extract from agents.list[].model (if it looks like provider/model)
  if (nativeJson.agents?.list) {
    for (const agent of nativeJson.agents.list) {
      if (agent.model && agent.model.includes('/')) modelsSet.add(agent.model);
    }
  }

  // Extract from agents.defaults.model.primary
  if (nativeJson.agents?.defaults?.model?.primary) {
    const p = nativeJson.agents.defaults.model.primary;
    if (p.includes('/')) modelsSet.add(p);
  }

  // Fallback: try CLI
  if (modelsSet.size === 0) {
    const modelsCmd = tryExec(['openclaw', 'models', 'list']);
    if (modelsCmd.ok) {
      const lines = modelsCmd.stdout.split('\n');
      for (const line of lines) {
        const match = line.match(/([a-z][a-z0-9_-]*\/[a-z0-9._-]+)/i);
        if (match) modelsSet.add(match[1]);
      }
    }
  }

  const availableModels = [...modelsSet].sort();

  if (availableModels.length === 0) {
    logError(
      'No models found. Please configure at least one model: openclaw models set <model-id>',
      '找不到任何模型。請先配置至少一個模型：openclaw models set <model-id>'
    );
    rl.close();
    process.exit(1);
  }

  // ----------------------------------------
  // Step 6: Detect channels
  // ----------------------------------------
  const channelsFound = [];

  // From native json
  if (nativeJson.channels) {
    for (const [chName, chConfig] of Object.entries(nativeJson.channels)) {
      if (typeof chConfig === 'object' && chConfig !== null) {
        // Channels with accounts (like telegram)
        if (chConfig.accounts) {
          for (const accName of Object.keys(chConfig.accounts)) {
            channelsFound.push(`${chName}:${accName}`);
          }
        } else {
          channelsFound.push(chName);
        }
      }
    }
  }

  // Fallback: try CLI
  if (channelsFound.length === 0) {
    const chCmd = tryExec(['openclaw', 'channels', 'list']);
    if (chCmd.ok) {
      const lines = chCmd.stdout.split('\n').filter(l => l.trim());
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-')) {
          channelsFound.push(trimmed);
        }
      }
    }
  }

  if (channelsFound.length === 0) {
    logError(
      'No channels found. Please configure at least one channel first.',
      '找不到任何通道。請先配置至少一個通道。'
    );
    log(msg(
      '  Set up a channel (e.g. Telegram): openclaw channels add',
      '  設定通道（例如 Telegram）：openclaw channels add'
    ));
    rl.close();
    process.exit(1);
  }

  logInfo(
    `Found ${availableModels.length} model(s) and ${channelsFound.length} channel(s)`,
    `偵測到 ${availableModels.length} 個模型和 ${channelsFound.length} 個通道`
  );
  log('');

  // ----------------------------------------
  // Step 7: Check if already installed
  // ----------------------------------------
  if (fs.existsSync(INSTALL_DIR)) {
    logWarn(
      `Existing installation found: ${INSTALL_DIR}`,
      `偵測到已安裝版本：${INSTALL_DIR}`
    );
    log('');
    log(msg(
      '  1) Overwrite (keep memory/, output/ and auth data)\n  2) Clean reinstall\n  3) Cancel',
      '  1) 覆蓋安裝（保留 memory/、output/ 和驗證資料）\n  2) 全新安裝\n  3) 取消'
    ));
    log('');

    while (true) {
      const choice = await ask(rl, msg('Select: ', '請選擇：'));
      if (choice === '1') {
        logInfo('Overwriting...', '覆蓋安裝中...');
        break;
      }
      if (choice === '2') {
        logInfo(`Removing ${INSTALL_DIR}...`, `移除 ${INSTALL_DIR}...`);
        fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
        break;
      }
      if (choice === '3') {
        log(msg('Cancelled.', '已取消。'));
        rl.close();
        process.exit(0);
      }
      log(msg('Invalid input.', '無效輸入。'));
    }
    log('');
  }

  // ----------------------------------------
  // Step 8: Model selection (smart / fast)
  // ----------------------------------------
  log('==========================================');
  log(msg('  Model Configuration', '  模型配置'));
  log('==========================================');
  log('');
  log(msg('  Available models:', '  可用模型：'));
  log('');
  for (let i = 0; i < availableModels.length; i++) {
    log(`    ${i + 1}) ${availableModels[i]}`);
  }
  log('');
  log(msg(
    '  smart = high capability, fast = lightweight',
    '  smart = 高效能模型, fast = 輕量模型'
  ));
  log('');

  async function pickModel(aliasName) {
    log(msg(`  --- Select ${aliasName} model ---`, `  --- 選擇 ${aliasName} 模型 ---`));
    while (true) {
      const input = await ask(rl, msg(
        `  Enter number (1-${availableModels.length}): `,
        `  輸入編號 (1-${availableModels.length})：`
      ));
      const idx = parseInt(input, 10);
      if (idx >= 1 && idx <= availableModels.length) {
        log('');
        return availableModels[idx - 1];
      }
      log(msg('  Invalid input.', '  無效輸入。'));
    }
  }

  modelPrimary = await pickModel('smart');
  modelLight = await pickModel('fast');

  log('');
  logInfo(
    `Model aliases:\n       smart -> ${modelPrimary}\n       fast  -> ${modelLight}`,
    `模型別名：\n       smart -> ${modelPrimary}\n       fast  -> ${modelLight}`
  );
  if (modelPrimary === modelLight) {
    logWarn(
      'smart and fast point to the same model.',
      'smart 和 fast 指向同一個模型。'
    );
  }
  log('');

  // ----------------------------------------
  // Step 9: Per-agent tier selection
  // ----------------------------------------
  log('==========================================');
  log(msg('  Per-Agent Model Tier', '  各角色模型配置'));
  log('==========================================');
  log('');
  log(msg('  Default assignment:', '  預設配置：'));
  log('       CEO=smart  CFO=smart  CIO=smart  COO=fast');
  log('       CTO=smart  CTO_SUB=fast  CHRO=fast  CAO=smart');
  log('');
  log(msg(
    '  1) Use defaults\n  2) Customize',
    '  1) 使用預設\n  2) 自訂配置'
  ));
  log('');

  while (true) {
    const choice = await ask(rl, msg('Select 1 or 2: ', '請選擇 1 或 2：'));
    if (choice === '1') break;
    if (choice === '2') {
      log('');
      log(msg(
        '  Choose smart or fast for each agent:',
        '  為每個角色選擇 smart 或 fast：'
      ));
      log('');
      for (const role of ['CEO', 'CFO', 'CIO', 'COO', 'CTO', 'CTO_SUB', 'CHRO', 'CAO']) {
        while (true) {
          const input = await ask(rl, `  ${role} [${tiers[role]}]: `);
          const val = input || tiers[role];
          if (val === 'smart' || val === 'fast') {
            tiers[role] = val;
            break;
          }
          log(msg('    Please enter smart or fast', '    請輸入 smart 或 fast'));
        }
      }
      break;
    }
    log(msg('Invalid input.', '無效輸入。'));
  }

  log('');
  logInfo(
    'Agent model tiers:',
    '各角色模型配置：'
  );
  log(`       CEO=${tiers.CEO}  CFO=${tiers.CFO}  CIO=${tiers.CIO}  COO=${tiers.COO}`);
  log(`       CTO=${tiers.CTO}  CTO_SUB=${tiers.CTO_SUB}  CHRO=${tiers.CHRO}  CAO=${tiers.CAO}`);
  log('');

  rl.close();

  // ============================================
  // Deploy
  // ============================================
  logInfo(
    `Installing to ${INSTALL_DIR}...`,
    `安裝至 ${INSTALL_DIR}...`
  );
  log('');
  fs.mkdirSync(INSTALL_DIR, { recursive: true });

  // ----------------------------------------
  // Deploy shared/
  // ----------------------------------------
  const sharedSrc = path.join(sourceDir, 'shared');
  const sharedDst = path.join(INSTALL_DIR, 'shared');

  // company-rules, tools-policy, USER.md (with {{INSTALL_DIR}} substitution for .md)
  fs.mkdirSync(path.join(sharedDst, 'policies'), { recursive: true });
  for (const f of ['company-rules.md', 'tools-policy.md', 'USER.md']) {
    const src = path.join(sharedSrc, f);
    if (!fs.existsSync(src)) continue;
    if (f.endsWith('.md')) {
      fs.writeFileSync(path.join(sharedDst, f), replaceInstallDir(fs.readFileSync(src, 'utf-8')));
    } else {
      fs.copyFileSync(src, path.join(sharedDst, f));
    }
  }

  // policies/ (with {{INSTALL_DIR}} substitution)
  const policiesSrc = path.join(sharedSrc, 'policies');
  if (fs.existsSync(policiesSrc)) {
    deployDir(policiesSrc, path.join(sharedDst, 'policies'), { substituteInstallDir: true });
  }

  // setup-guides/ (with {{INSTALL_DIR}} substitution)
  deployDir(path.join(sharedSrc, 'setup-guides'), path.join(sharedDst, 'setup-guides'), { substituteInstallDir: true });

  // templates/
  deployDir(path.join(sharedSrc, 'templates'), path.join(sharedDst, 'templates'));

  // standards/ (with {{INSTALL_DIR}} substitution)
  deployDir(path.join(sharedSrc, 'standards'), path.join(sharedDst, 'standards'), { substituteInstallDir: true });

  // tasks/ (with {{INSTALL_DIR}} substitution)
  deployDir(path.join(sharedSrc, 'tasks'), path.join(sharedDst, 'tasks'), { substituteInstallDir: true });

  // principles/ (with {{INSTALL_DIR}} substitution)
  deployDir(path.join(sharedSrc, 'principles'), path.join(sharedDst, 'principles'), { substituteInstallDir: true });

  // brain-methods.csv
  const brainSrc = path.join(sharedSrc, 'brain-methods.csv');
  if (fs.existsSync(brainSrc)) fs.copyFileSync(brainSrc, path.join(sharedDst, 'brain-methods.csv'));

  logOk('shared/');

  // ----------------------------------------
  // Deploy workspaces
  // ----------------------------------------
  for (const agent of AGENTS) {
    const wsSrc = path.join(sourceDir, `workspace-${agent}`);
    const wsDst = path.join(INSTALL_DIR, `workspace-${agent}`);
    fs.mkdirSync(path.join(wsDst, 'memory'), { recursive: true });
    fs.mkdirSync(path.join(wsDst, 'policies'), { recursive: true });

    // Core files
    for (const f of ['SOUL.md', 'IDENTITY.md']) {
      const src = path.join(wsSrc, f);
      if (fs.existsSync(src)) fs.copyFileSync(src, path.join(wsDst, f));
    }

    // AGENTS.md with {{INSTALL_DIR}} substitution
    const agentsMdSrc = path.join(wsSrc, 'AGENTS.md');
    if (fs.existsSync(agentsMdSrc)) {
      const content = fs.readFileSync(agentsMdSrc, 'utf-8');
      fs.writeFileSync(path.join(wsDst, 'AGENTS.md'), replaceInstallDir(content));
    }

    // MEMORY.md — preserve existing on overwrite
    const memDst = path.join(wsDst, 'MEMORY.md');
    if (!fs.existsSync(memDst)) {
      const memSrc = path.join(wsSrc, 'MEMORY.md');
      if (fs.existsSync(memSrc)) fs.copyFileSync(memSrc, memDst);
    }

    // HEARTBEAT.md (with {{INSTALL_DIR}} substitution)
    const hbSrc = path.join(wsSrc, 'HEARTBEAT.md');
    if (fs.existsSync(hbSrc)) {
      fs.writeFileSync(path.join(wsDst, 'HEARTBEAT.md'), replaceInstallDir(fs.readFileSync(hbSrc, 'utf-8')));
    }

    // TOOLS.md with {{INSTALL_DIR}} substitution
    const toolsSrc = path.join(wsSrc, 'TOOLS.md');
    if (fs.existsSync(toolsSrc)) {
      const content = fs.readFileSync(toolsSrc, 'utf-8');
      fs.writeFileSync(path.join(wsDst, 'TOOLS.md'), replaceInstallDir(content));
    }

    // Extra files (with {{INSTALL_DIR}} substitution for .md)
    for (const extra of ['briefing-template.md', 'status.md', 'issues.md']) {
      const src = path.join(wsSrc, extra);
      if (!fs.existsSync(src)) continue;
      if (extra.endsWith('.md')) {
        fs.writeFileSync(path.join(wsDst, extra), replaceInstallDir(fs.readFileSync(src, 'utf-8')));
      } else {
        fs.copyFileSync(src, path.join(wsDst, extra));
      }
    }

    // Link or copy shared files into workspace
    symlinkOrCopy(path.join(sharedDst, 'USER.md'), path.join(wsDst, 'USER.md'));

    const policiesDstDir = path.join(sharedDst, 'policies');
    if (fs.existsSync(policiesDstDir)) {
      for (const pf of fs.readdirSync(policiesDstDir)) {
        symlinkOrCopy(path.join(policiesDstDir, pf), path.join(wsDst, 'policies', pf));
      }
    }

    // Subdirectories: engineers, rules, skills (all need {{INSTALL_DIR}} substitution in .md)
    for (const subdir of ['engineers', 'rules', 'skills']) {
      deployDir(path.join(wsSrc, subdir), path.join(wsDst, subdir), { substituteInstallDir: true });
    }

    // Templates
    deployDir(path.join(wsSrc, 'templates'), path.join(wsDst, 'templates'));

    // Workflows (with {{INSTALL_DIR}} substitution in .md files)
    deployDir(path.join(wsSrc, 'workflows'), path.join(wsDst, 'workflows'), { substituteInstallDir: true });

    // Output (preserve existing, only create structure)
    deployDir(path.join(wsSrc, 'output'), path.join(wsDst, 'output'), { preserveExisting: true });

    logOk(`workspace-${agent}`);
  }

  // ----------------------------------------
  // Generate shared/team-roster.md from IDENTITY.md + engineers/roster.md
  // ----------------------------------------
  {
    const executives = [];
    for (const agent of AGENTS) {
      const idFile = path.join(INSTALL_DIR, `workspace-${agent}`, 'IDENTITY.md');
      if (!fs.existsSync(idFile)) continue;
      const raw = fs.readFileSync(idFile, 'utf-8');
      const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
      if (!m) continue;
      const fm = m[1];
      const name = (fm.match(/^name:\s*"(.*)"/m) || [])[1] || '';
      const title = (fm.match(/^title:\s*"(.*)"/m) || [])[1] || '';
      const icon = (fm.match(/^icon:\s*"(.*)"/m) || [])[1] || '';
      if (name) executives.push({ name, title, icon, id: `${AGENT_PREFIX}${agent}` });
    }

    const engineers = [];
    const rosterFile = path.join(INSTALL_DIR, 'workspace-cto', 'engineers', 'roster.md');
    if (fs.existsSync(rosterFile)) {
      const rosterRaw = fs.readFileSync(rosterFile, 'utf-8');
      const lines = rosterRaw.split('\n');
      for (const line of lines) {
        const cols = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cols.length >= 4 && cols[2] && !cols[2].startsWith('名字') && !cols[2].startsWith('Name') && !cols[0].startsWith('---')) {
          engineers.push({ role: cols[0], name: cols[2], icon: cols[3] });
        }
      }
    }

    const isZh = langDir === 'zh';
    let roster = isZh
      ? '# 團隊名冊\n\n> 此檔案由 install.js 自動產生，修改名字請編輯 IDENTITY.md 或 engineers/roster.md 後重新安裝。\n\n'
      : '# Team Roster\n\n> Auto-generated by install.js. To change names, edit IDENTITY.md or engineers/roster.md and re-install.\n\n';

    roster += isZh ? '## 高管團隊\n\n' : '## Executive Team\n\n';
    roster += isZh
      ? '| 名字 | 職稱 | Icon | Agent ID |\n|------|------|------|----------|\n'
      : '| Name | Title | Icon | Agent ID |\n|------|-------|------|----------|\n';
    for (const e of executives) {
      roster += `| ${e.name} | ${e.title} | ${e.icon} | ${e.id} |\n`;
    }

    if (engineers.length > 0) {
      roster += isZh ? '\n## 工程師團隊（CTO Sub-Agent）\n\n' : '\n## Engineering Team (CTO Sub-Agents)\n\n';
      roster += isZh
        ? '| 名字 | 角色 | Icon |\n|------|------|------|\n'
        : '| Name | Role | Icon |\n|------|------|------|\n';
      for (const e of engineers) {
        roster += `| ${e.name} | ${e.role} | ${e.icon} |\n`;
      }
    }

    roster += isZh
      ? '\n## 稱呼規則\n\n提及同事時一律使用「名字（職稱）」格式，例如「Felix（COO）」。禁止只用職稱代稱。\n'
      : '\n## Naming Convention\n\nAlways refer to colleagues using "Name (Title)" format, e.g. "Felix (COO)". Never use title alone.\n';

    fs.writeFileSync(path.join(sharedDst, 'team-roster.md'), roster);
    logOk('shared/team-roster.md (auto-generated)');
  }

  // ----------------------------------------
  // Deploy skills
  // ----------------------------------------
  const skillsSrc = path.join(sourceDir, 'skills');
  if (fs.existsSync(skillsSrc)) {
    deployDir(skillsSrc, path.join(INSTALL_DIR, 'skills'), { substituteInstallDir: true });
    logOk('skills/');
  }

  // ----------------------------------------
  // Auth — copy existing auth-profiles.json
  // ----------------------------------------
  let existingAuthFile = '';
  // Search for existing auth profiles
  const authSearchPaths = [
    path.join(OPENCLAW_DIR, 'auth-profiles.json'),
  ];
  for (const ap of authSearchPaths) {
    if (fs.existsSync(ap)) { existingAuthFile = ap; break; }
  }
  // Also check inside existing agent dirs
  if (!existingAuthFile) {
    try {
      const agentsDir = path.join(OPENCLAW_DIR, 'agents');
      if (fs.existsSync(agentsDir)) {
        for (const d of fs.readdirSync(agentsDir)) {
          const ap = path.join(agentsDir, d, 'agent', 'auth-profiles.json');
          if (fs.existsSync(ap)) { existingAuthFile = ap; break; }
        }
      }
    } catch (_) {}
  }

  if (existingAuthFile) {
    logInfo('Copying existing auth config...', '複製現有驗證設定...');
    for (const agent of AGENTS) {
      const agentDir = path.join(INSTALL_DIR, 'agents', agent, 'agent');
      fs.mkdirSync(agentDir, { recursive: true });
      const dst = path.join(agentDir, 'auth-profiles.json');
      if (!fs.existsSync(dst)) {
        fs.copyFileSync(existingAuthFile, dst);
      }
    }
  } else {
    logWarn(
      'No auth-profiles.json found — agents will use default authentication. Run `openclaw auth` to configure.',
      '未找到 auth-profiles.json — Agent 將使用預設驗證。執行 `openclaw auth` 進行設定。'
    );
  }

  log('');

  // ============================================
  // Install memory-lancedb-pro plugin
  // ============================================
  const skipMemoryPlugin = process.argv.includes('--skip-memory-plugin');
  const pluginPath = path.join(OPENCLAW_DIR, MEMORY_PLUGIN_DIR);
  let memoryPluginInstalled = false;

  if (skipMemoryPlugin) {
    logInfo(
      'Skipping memory plugin installation (--skip-memory-plugin)',
      '跳過記憶插件安裝（--skip-memory-plugin）'
    );
  } else {
    // Check JINA_API_KEY
    if (!process.env.JINA_API_KEY) {
      logWarn(
        'JINA_API_KEY not set. Memory plugin will be installed but embedding will not work until you set it.',
        'JINA_API_KEY 未設定。記憶插件會被安裝，但 embedding 功能需設定 API Key 後才能使用。'
      );
      log(msg(
        '  Get free API key: https://jina.ai → set: export JINA_API_KEY=your_key',
        '  取得免費 API Key：https://jina.ai → 設定：export JINA_API_KEY=your_key'
      ));
      log('');
    }

    if (fs.existsSync(path.join(pluginPath, 'package.json'))) {
      logInfo(
        'memory-lancedb-pro already installed, skipping clone',
        'memory-lancedb-pro 已安裝，跳過下載'
      );
      memoryPluginInstalled = true;
    } else {
      logInfo(
        'Installing memory-lancedb-pro plugin...',
        '安裝 memory-lancedb-pro 記憶插件...'
      );

      // Try git clone first
      fs.mkdirSync(path.join(OPENCLAW_DIR, 'plugins'), { recursive: true });
      const cloneResult = tryExec([
        'git', 'clone', '--branch', MEMORY_PLUGIN_VERSION, '--depth', '1',
        MEMORY_PLUGIN_REPO, pluginPath,
      ]);

      if (cloneResult.ok) {
        logOk('git clone');
      } else {
        logWarn(
          `git clone failed: ${cloneResult.stderr}. Trying npm install...`,
          `git clone 失敗：${cloneResult.stderr}。嘗試 npm install...`
        );
        // Fallback: npm install into plugin directory
        fs.mkdirSync(pluginPath, { recursive: true });
        const npmInitResult = spawnSync('npm', ['init', '-y'], {
          encoding: 'utf-8', timeout: 30000, cwd: pluginPath,
        });
        const npmInstallResult = spawnSync('npm', ['install', `memory-lancedb-pro@${MEMORY_PLUGIN_VERSION}`], {
          encoding: 'utf-8', timeout: 120000, cwd: pluginPath,
        });
        if (npmInstallResult.status === 0) {
          logOk('npm install (fallback)');
        } else {
          logWarn(
            'Memory plugin installation failed. You can install it manually later.',
            '記憶插件安裝失敗，稍後可手動安裝。'
          );
          log(msg(
            `  Manual install: cd ${path.join(OPENCLAW_DIR, 'plugins')} && git clone ${MEMORY_PLUGIN_REPO}`,
            `  手動安裝：cd ${path.join(OPENCLAW_DIR, 'plugins')} && git clone ${MEMORY_PLUGIN_REPO}`
          ));
          log('');
        }
      }

      // npm install dependencies
      if (fs.existsSync(path.join(pluginPath, 'package.json'))) {
        logInfo('Installing plugin dependencies...', '安裝插件相依套件...');
        const depResult = spawnSync('npm', ['install', '--production'], {
          encoding: 'utf-8', timeout: 120000, cwd: pluginPath,
        });
        if (depResult.status === 0) {
          logOk('npm install (dependencies)');
          memoryPluginInstalled = true;
        } else {
          logWarn(
            `npm install failed: ${(depResult.stderr || '').slice(0, 200)}`,
            `npm install 失敗：${(depResult.stderr || '').slice(0, 200)}`
          );
        }
      }
    }
  }

  log('');

  // ============================================
  // Inject settings into native openclaw.json
  // ============================================
  logInfo(
    'Injecting settings into native openclaw.json...',
    '注入設定到原生 openclaw.json...'
  );

  // If configPath was a backup (old symlink scenario), restore it first
  if (configPath !== nativeJsonPath) {
    // Remove old symlink
    try {
      const stat = fs.lstatSync(nativeJsonPath);
      if (stat.isSymbolicLink()) fs.unlinkSync(nativeJsonPath);
    } catch (_) {}
    // Copy backup as the new native json
    fs.copyFileSync(configPath, nativeJsonPath);
    logInfo(
      'Restored native openclaw.json from backup',
      '已從備份恢復原生 openclaw.json'
    );
    nativeJson = readJsonc(nativeJsonPath);
  }

  // Build injection payload
  const injection = {
    agents: {
      defaults: {
        models: {
          [modelPrimary]: { alias: 'smart' },
          [modelLight]: { alias: 'fast' },
        },
        subagents: {
          maxSpawnDepth: 2,
          maxChildrenPerAgent: 10,
          maxConcurrent: 12,
          runTimeoutSeconds: 900,
        },
        heartbeat: {
          every: '30m',
          target: 'last',
          activeHours: { start: '06:00', end: '23:00' },
        },
        model: {
          primary: 'smart',
          fallbacks: ['fast'],
        },
        compaction: {
          postCompactionSections: langDir === 'zh'
            ? ['啟動必讀 — 公司規範', '安全紅線']
            : ['Session Startup', 'Red Lines'],
          model: 'fast',
        },
      },
    },
    tools: {
      agentToAgent: {
        enabled: true,
        allow: AGENTS.map(a => `${AGENT_PREFIX}${a}`),
      },
      sessions: {
        visibility: 'agent',
      },
      loopDetection: {
        enabled: true,
        historySize: 30,
        warningThreshold: 10,
        criticalThreshold: 20,
      },
    },
    hooks: {
      internal: { enabled: true },
    },
    cron: {
      enabled: true,
      maxConcurrentRuns: 3,
    },
  };

  // Inject memory plugin config if installed
  if (memoryPluginInstalled && !skipMemoryPlugin) {
    injection.plugins = {
      load: { paths: [pluginPath] },
      slots: { memory: 'memory-lancedb-pro' },
      entries: {
        'memory-lancedb-pro': {
          enabled: true,
          config: {
            embedding: {
              apiKey: '${JINA_API_KEY}',
              model: 'jina-embeddings-v5-text-small',
              baseURL: 'https://api.jina.ai/v1',
            },
            retrieval: {
              rerank: 'cross-encoder',
              rerankProvider: 'jina',
              rerankApiKey: '${JINA_API_KEY}',
            },
            autoCapture: true,
            autoRecall: true,
            autoRecallMinLength: 8,
            scopes: {
              definitions: {
                'agent:main': { description: 'OpenClaw default agent' },
                'project:claw-company': { description: 'Claw Company shared' },
                'agent:cc-ceo': { description: 'CEO private' },
                'agent:cc-cfo': { description: 'CFO private' },
                'agent:cc-cio': { description: 'CIO private' },
                'agent:cc-coo': { description: 'COO private' },
                'agent:cc-cto': { description: 'CTO private' },
                'agent:cc-chro': { description: 'CHRO private' },
                'agent:cc-cao': { description: 'CAO private' },
              },
              agentAccess: {
                main: ['agent:main'],
                'cc-ceo': ['project:claw-company', 'agent:cc-ceo'],
                'cc-cfo': ['project:claw-company', 'agent:cc-cfo'],
                'cc-cio': ['project:claw-company', 'agent:cc-cio'],
                'cc-coo': ['project:claw-company', 'agent:cc-coo'],
                'cc-cto': ['project:claw-company', 'agent:cc-cto'],
                'cc-chro': ['project:claw-company', 'agent:cc-chro'],
                'cc-cao': ['project:claw-company', 'agent:cc-cao'],
              },
            },
          },
        },
      },
    };
    logOk(msg('memory-lancedb-pro config injected', 'memory-lancedb-pro 配置已注入'));
  }

  // If skip-memory-plugin, remove any leftover memory plugin config from native json
  if (skipMemoryPlugin && nativeJson.plugins) {
    delete nativeJson.plugins.slots;
    delete nativeJson.plugins.load;
    if (nativeJson.plugins.entries) {
      delete nativeJson.plugins.entries['memory-lancedb-pro'];
    }
  }

  // Deep merge — preserves channels, gateway, session, bindings
  deepMerge(nativeJson, injection);

  // v2026.3.8 breaking change: gateway.auth.mode must be explicit when both token and password are configured
  const gwAuth = nativeJson.gateway?.auth;
  if (gwAuth) {
    const hasToken = gwAuth.token != null && gwAuth.token !== '';
    const hasPassword = gwAuth.password != null && gwAuth.password !== '';
    const hasMode = typeof gwAuth.mode === 'string' && gwAuth.mode.trim().length > 0;
    if (hasToken && hasPassword && !hasMode) {
      logWarn(msg(
        'gateway.auth has both token and password but no explicit mode — OpenClaw v2026.3.8 requires gateway.auth.mode ("token" | "password" | "trusted-proxy" | "none"). Set it in your openclaw.json before running gateway start.',
        'gateway.auth 同時有 token 和 password 但未設定 mode — OpenClaw v2026.3.8 要求明確設定 gateway.auth.mode（"token" | "password" | "trusted-proxy" | "none"）。請在 openclaw.json 中設定後再啟動 gateway。'
      ));
    }
  }

  // ----------------------------------------
  // Inject per-agent skill allowlist
  // ----------------------------------------
  const skillAllowlistPath = path.join(SCRIPT_DIR, 'skill-allowlist.json');
  if (fs.existsSync(skillAllowlistPath)) {
    try {
      const skillAllowlist = JSON.parse(fs.readFileSync(skillAllowlistPath, 'utf-8'));
      // Ensure agents.list exists
      if (!nativeJson.agents) nativeJson.agents = {};
      if (!nativeJson.agents.list) nativeJson.agents.list = [];

      for (const agent of AGENTS) {
        const agentId = `${AGENT_PREFIX}${agent}`;
        const allowedSkills = skillAllowlist[agentId];
        if (allowedSkills === undefined) continue; // skip if not in allowlist config

        // Find or create agent entry in list
        let entry = nativeJson.agents.list.find(a => a.id === agentId);
        if (!entry) {
          entry = { id: agentId };
          nativeJson.agents.list.push(entry);
        }
        entry.skills = allowedSkills;
      }
      logOk(msg('skill allowlist injected', 'Skill allowlist 已注入'));
    } catch (e) {
      logWarn(msg(
        `Failed to read skill-allowlist.json: ${e.message}`,
        `讀取 skill-allowlist.json 失敗：${e.message}`
      ));
    }
  }

  // Backup original before writing
  const backupPath = `${nativeJsonPath}.backup.${Date.now()}`;
  try {
    fs.copyFileSync(nativeJsonPath, backupPath);
    logInfo(
      `Backed up -> ${path.basename(backupPath)}`,
      `已備份 -> ${path.basename(backupPath)}`
    );
  } catch (_) {}

  fs.writeFileSync(nativeJsonPath, JSON.stringify(nativeJson, null, 2) + '\n');
  logOk(msg('native openclaw.json updated', '原生 openclaw.json 已更新'));
  log('');

  // ============================================
  // Register agents via CLI
  // ============================================
  logInfo('Registering agents...', '註冊 Agent...');

  const agentDefs = [
    { id: 'ceo', tier: tiers.CEO },
    { id: 'cfo', tier: tiers.CFO },
    { id: 'cio', tier: tiers.CIO },
    { id: 'coo', tier: tiers.COO },
    { id: 'cto', tier: tiers.CTO },
    { id: 'chro', tier: tiers.CHRO },
    { id: 'cao', tier: tiers.CAO },
  ];

  const failedAgentCmds = [];
  for (const def of agentDefs) {
    const agentId = `${AGENT_PREFIX}${def.id}`;
    const workspace = path.join(INSTALL_DIR, `workspace-${def.id}`);
    const cmdArgs = ['openclaw', 'agents', 'add', agentId, '--workspace', workspace, '--model', def.tier];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(agentId);
    } else if (result.stderr.includes('already exists')) {
      // Agent exists — check if workspace path needs updating via delete + re-add
      logInfo(
        `${agentId} already exists, re-registering with correct workspace...`,
        `${agentId} 已存在，重新註冊以修正 workspace 路徑...`
      );
      // Backup workspace files before delete (OpenClaw deletes workspace dir on agent delete)
      const backupDir = `${workspace}.bak`;
      if (fs.existsSync(workspace)) {
        try {
          if (fs.existsSync(backupDir)) fs.rmSync(backupDir, { recursive: true });
          fs.cpSync(workspace, backupDir, { recursive: true });
        } catch (_) {}
      }
      const delResult = tryExec(['openclaw', 'agents', 'delete', agentId, '--force']);
      if (delResult.ok) {
        // Restore workspace from backup if it was deleted
        if (!fs.existsSync(workspace) && fs.existsSync(backupDir)) {
          fs.cpSync(backupDir, workspace, { recursive: true });
        }
        if (fs.existsSync(backupDir)) {
          try { fs.rmSync(backupDir, { recursive: true }); } catch (_) {}
        }
        const reAddResult = tryExec(cmdArgs);
        if (reAddResult.ok) {
          logOk(`${agentId} (re-registered)`);
        } else {
          failedAgentCmds.push(cmdToString(cmdArgs));
          logWarn(
            `Failed to re-register ${agentId}: ${reAddResult.stderr}`,
            `重新註冊 ${agentId} 失敗：${reAddResult.stderr}`
          );
        }
      } else {
        failedAgentCmds.push(cmdToString(cmdArgs));
        logWarn(
          `Failed to delete existing ${agentId}: ${delResult.stderr}`,
          `刪除已存在的 ${agentId} 失敗：${delResult.stderr}`
        );
      }
    } else {
      failedAgentCmds.push(cmdToString(cmdArgs));
      logWarn(
        `Failed to register ${agentId}: ${result.stderr}`,
        `註冊 ${agentId} 失敗：${result.stderr}`
      );
    }
  }

  log('');

  // ============================================
  // Bind channels
  // ============================================
  logInfo('Binding channels...', '綁定通道...');

  const failedBindCmds = [];
  // Bind CEO to all detected channels
  for (const ch of channelsFound) {
    const cmdArgs = ['openclaw', 'agents', 'bind', '--agent', `${AGENT_PREFIX}ceo`, '--bind', ch];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(`${AGENT_PREFIX}ceo -> ${ch}`);
    } else {
      failedBindCmds.push(cmdToString(cmdArgs));
      // Non-blocking: channel binding failure doesn't stop install
    }
  }

  // Bind CAO to telegram:audit if it exists
  if (channelsFound.includes('telegram:audit')) {
    const cmdArgs = ['openclaw', 'agents', 'bind', '--agent', `${AGENT_PREFIX}cao`, '--bind', 'telegram:audit'];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(`${AGENT_PREFIX}cao -> telegram:audit`);
    } else {
      failedBindCmds.push(cmdToString(cmdArgs));
    }
  }

  log('');

  // ============================================
  // Register cron jobs
  // ============================================
  logInfo('Registering cron jobs...', '註冊排程任務...');

  // Remove existing cron jobs by name before re-adding (prevent duplicates on re-install)
  const cronNames = [
    'morning-briefing', 'investment-monitor', 'memory-cleanup',
    'weekly-org-review', 'security-scan', 'cto-memory-cleanup',
  ];
  for (const name of cronNames) {
    tryExec(['openclaw', 'cron', 'remove', '--name', name]);
  }

  // v2026.3.8: Cron tight isolation — cron jobs cannot use sessions_send or message tool.
  // Delivery modes: 'announce' (push to channel), 'none' (silent, file-based relay).
  // For 'announce' jobs, results are delivered to the agent's bound channel via cron runner.
  // For 'none' jobs, results are written to output/ files; CEO heartbeat picks them up.
  const primaryChannel = channelsFound[0] || null;
  const caoChannel = channelsFound.includes('telegram:audit') ? 'telegram:audit' : primaryChannel;

  const cronJobs = [
    {
      name: 'morning-briefing',
      cron: '30 0 * * *',
      agent: `${AGENT_PREFIX}ceo`,
      model: tiers.CEO,
      message: 'Execute morning briefing: read MEMORY.md and recent output/ files from all executives (CFO, CIO, COO, CTO, CHRO, CAO) to collect latest status. Compile into briefing with action items for Chairman. Refer to briefing-template.md. Do NOT use sessions_send (unavailable in cron).',
      target: primaryChannel,
    },
    {
      name: 'investment-monitor',
      cron: '0 9-16 * * 1-5',
      agent: `${AGENT_PREFIX}cio`,
      model: tiers.CIO,
      message: 'Check portfolio data. If any position moves >5%, write alert file to output/alerts/ with analysis. Otherwise silently log to memory/. Do NOT use sessions_send (unavailable in cron). CEO heartbeat will pick up alert files.',
      target: primaryChannel,
      announce: false,
    },
    {
      name: 'memory-cleanup',
      cron: '0 3 1 * *',
      agent: `${AGENT_PREFIX}chro`,
      model: tiers.CHRO,
      message: 'Audit MEMORY.md health across all agents: check line counts vs 200-line limit, duplicates, stale entries, archive logs >30 days. Write health report to output/reports/. Do NOT use sessions_send (unavailable in cron).',
      target: primaryChannel,
    },
    {
      name: 'weekly-org-review',
      cron: '0 8 * * 1',
      agent: `${AGENT_PREFIX}chro`,
      model: tiers.CHRO,
      message: 'Produce weekly org health report: agent performance summary, capability gaps, model config suggestions, skill usage stats. Write report to output/reports/. Do NOT use sessions_send (unavailable in cron).',
      target: primaryChannel,
    },
    {
      name: 'security-scan',
      cron: '0 2 * * 3',
      agent: `${AGENT_PREFIX}cao`,
      model: tiers.CAO,
      message: 'Run full security scan: verify SOUL.md integrity, check recent session logs for anomalies, validate security rules compliance. Produce security scan report. Do NOT use sessions_send (unavailable in cron). Report is delivered via cron announce.',
      target: caoChannel,
    },
    {
      name: 'cto-memory-cleanup',
      cron: '0 3 * * 0',
      agent: `${AGENT_PREFIX}cto`,
      model: tiers.CTO,
      message: 'Execute weekly memory cleanup: remove stale entries, promote recurring patterns to principles, archive completed tasks >7 days in status.md, ensure MEMORY.md <=200 lines, check for contradictions. Write cleanup summary to memory/ log',
      target: primaryChannel,
      announce: false,
    },
  ];

  const failedCronCmds = [];
  for (const job of cronJobs) {
    const cmdArgs = ['openclaw', 'cron', 'add', '--name', job.name, '--cron', job.cron, '--agent', job.agent, '--model', job.model, '--message', job.message];
    if (job.target) {
      cmdArgs.push('--channel', job.target);
      if (job.announce !== false) {
        cmdArgs.push('--announce');
      }
    }
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(job.name);
    } else {
      failedCronCmds.push(cmdToString(cmdArgs));
      logWarn(
        `Failed: ${job.name}`,
        `失敗：${job.name}`
      );
    }
  }

  log('');

  // ============================================
  // Summary
  // ============================================
  log('==========================================');
  log(msg('  Installation complete!', '  安裝完成！'));
  log('==========================================');
  log('');
  log(`  ${msg('Installed to', '安裝路徑')}：${INSTALL_DIR}`);
  log(`  ${msg('Compatible with', '相容版本')}：OpenClaw >= ${REQUIRED_MIN_VERSION}`);
  log('');
  log(msg('  Architecture:', '  架構：'));
  log(`  - ${msg('Company rules', '公司規範')}：${path.join(INSTALL_DIR, 'shared', 'company-rules.md')}`);
  log(`  - ${msg('Tool policies', '工具策略')}：${path.join(INSTALL_DIR, 'shared', 'tools-policy.md')}`);
  log(`  - ${msg('Each Agent loads rules at session start (runtime read)', '每個 Agent 在 session 啟動時載入規範（運行時讀取）')}`);
  log(`  - ${msg('Settings injected into native openclaw.json (no symlink)', '設定已注入原生 openclaw.json（無 symlink）')}`);
  log(`  - ${msg('Cron delivery: announce mode for briefings/reports, silent for monitors', 'Cron 推送：簡報/報告用 announce 模式，監控用靜默模式')}`);
  log('');
  log(msg('  Post-install:', '  安裝後步驟：'));
  log(msg('  Run "openclaw doctor --fix" to migrate any legacy cron config', '  執行 "openclaw doctor --fix" 遷移舊版 cron 配置'));
  log('');

  // Show failed commands for manual execution
  const allFailed = [...failedAgentCmds, ...failedBindCmds, ...failedCronCmds];
  if (allFailed.length > 0) {
    log(msg(
      '  Some CLI commands failed. Run them manually:',
      '  部分 CLI 指令執行失敗，請手動執行：'
    ));
    log('');
    for (const cmd of allFailed) {
      log(`  ${cmd}`);
    }
    log('');
  }

  // Unbound channels warning
  const unboundChannels = channelsFound.filter(ch => {
    // CEO should be bound to all, CAO to telegram:audit
    return failedBindCmds.some(cmd => cmd.includes(ch));
  });
  if (unboundChannels.length > 0) {
    logWarn(
      `Some channels could not be auto-bound: ${unboundChannels.join(', ')}`,
      `部分通道無法自動綁定：${unboundChannels.join(', ')}`
    );
    log(msg(
      '  Bind manually: openclaw agents bind --agent <id> --bind <channel>',
      '  手動綁定：openclaw agents bind --agent <id> --bind <channel>'
    ));
    log('');
  }

  if (memoryPluginInstalled && !skipMemoryPlugin) {
    log(msg('  Memory plugin:', '  記憶插件：'));
    log(`  - memory-lancedb-pro ${MEMORY_PLUGIN_VERSION} ${msg('installed', '已安裝')}`);
    log(`  - ${msg('Rerank: cross-encoder (Jina) with lightweight fallback', 'Rerank：cross-encoder（Jina）+ lightweight 自動降級')}`);
    log(`  - ${msg('Scope isolation: main isolated, cc-* share project:claw-company', 'Scope 隔離：main 獨立，cc-* 共享 project:claw-company')}`);
    if (!process.env.JINA_API_KEY) {
      log(`  - ${msg('⚠ Set JINA_API_KEY before starting gateway', '⚠ 啟動 gateway 前請設定 JINA_API_KEY')}`);
    }
    log('');
  }

  log(msg('Next steps:', '下一步：'));
  if (!process.env.JINA_API_KEY && memoryPluginInstalled) {
    log(msg(
      '  1. export JINA_API_KEY=your_key  (get free key: https://jina.ai)',
      '  1. export JINA_API_KEY=your_key  （取得免費 Key：https://jina.ai）'
    ));
    log('  2. openclaw gateway start');
    log(msg(
      '  3. Send a test message to CEO Bot via your configured platform',
      '  3. 透過已配置的平台發送測試訊息給 CEO Bot'
    ));
  } else {
    log('  1. openclaw gateway start');
    log(msg(
      '  2. Send a test message to CEO Bot via your configured platform',
      '  2. 透過已配置的平台發送測試訊息給 CEO Bot'
    ));
  }
  log('');
  log(msg('Management:', '管理指令：'));
  log(`  ${msg('Uninstall', '卸載')}：node install.js --uninstall`);
  log(`  ${msg('Reinstall', '重新安裝')}：node install.js`);
  log(`  ${msg('Skip memory plugin', '跳過記憶插件')}：node install.js --skip-memory-plugin`);
  log(`  ${msg('Update skill allowlist only', '僅更新 Skill 白名單')}：node install.js --update-skills`);
  log('');
}

main().catch((err) => {
  console.error(`[FATAL] ${err.message}`);
  process.exit(1);
});
