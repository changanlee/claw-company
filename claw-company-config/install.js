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

/** Safely parse JSON from CLI output that may contain log lines mixed into stdout. */
function parseJsonFromOutput(raw) {
  // Find first [ or { — skip any log lines before the JSON payload
  const arrStart = raw.indexOf('[');
  const objStart = raw.indexOf('{');
  let start = -1;
  if (arrStart >= 0 && objStart >= 0) start = Math.min(arrStart, objStart);
  else if (arrStart >= 0) start = arrStart;
  else if (objStart >= 0) start = objStart;
  return JSON.parse(start >= 0 ? raw.slice(start) : raw);
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

  const autoYes = process.argv.includes('--yes') || process.argv.includes('-y');
  if (!autoYes) {
    const rl = createRl();
    const confirmAnswer = await ask(rl, '\nConfirm? (y/N): ');
    rl.close();
    if (confirmAnswer.toLowerCase() !== 'y') {
      log('Cancelled.');
      process.exit(0);
    }
  }

  // Remove injected settings from native json
  if (fs.existsSync(nativeJsonPath)) {
    try {
      const nativeJson = readJsonc(nativeJsonPath);
      // Remove claw-company injected sections
      // Read injected model keys from install metadata
      const metaPath = path.join(INSTALL_DIR, '.install-meta.json');
      let injectedModels = [];
      try {
        if (fs.existsSync(metaPath)) {
          injectedModels = JSON.parse(fs.readFileSync(metaPath, 'utf-8')).injectedModels || [];
        }
      } catch (_) {}

      if (nativeJson.agents && nativeJson.agents.defaults) {
        // Only remove the exact model keys we injected, preserve user-added ones
        if (nativeJson.agents.defaults.models && injectedModels.length > 0) {
          for (const key of injectedModels) {
            delete nativeJson.agents.defaults.models[key];
          }
          if (Object.keys(nativeJson.agents.defaults.models).length === 0) {
            delete nativeJson.agents.defaults.models;
          }
        }
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
        // Only remove the key we inject; preserve user entries
        delete nativeJson.hooks.internal.enabled;
        if (Object.keys(nativeJson.hooks.internal).length === 0) {
          delete nativeJson.hooks.internal;
        }
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

  // Remove agents via CLI (correct verb is 'delete', not 'remove')
  for (const agent of AGENTS) {
    tryExec(['openclaw', 'agents', 'delete', `${AGENT_PREFIX}${agent}`, '--force']);
  }
  log('[INFO] Removed agents via CLI');

  // Remove cron jobs via CLI — try --json first, fall back to text parsing
  const uninstallCronNames = new Set([
    'morning-briefing', 'investment-monitor', 'memory-cleanup',
    'weekly-org-review', 'security-scan', 'cto-memory-cleanup',
  ]);
  let uninstallCronDone = false;
  const cronJsonRes = tryExec(['openclaw', 'cron', 'list', '--json']);
  if (cronJsonRes.ok && cronJsonRes.stdout) {
    try {
      const entries = parseJsonFromOutput(cronJsonRes.stdout);
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          if (entry.name && uninstallCronNames.has(entry.name) && entry.id) {
            tryExec(['openclaw', 'cron', 'remove', entry.id]);
          }
        }
        uninstallCronDone = true;
      }
    } catch (_) { /* fall through */ }
  }
  if (!uninstallCronDone) {
    const cronListRes = tryExec(['openclaw', 'cron', 'list']);
    if (cronListRes.ok && cronListRes.stdout) {
      const UUID_RE = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/;
      for (const line of cronListRes.stdout.split('\n')) {
        const uuidMatch = line.match(UUID_RE);
        if (!uuidMatch) continue;
        for (const name of uninstallCronNames) {
          if (line.includes(name)) {
            tryExec(['openclaw', 'cron', 'remove', uuidMatch[1]]);
            break;
          }
        }
      }
    }
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
// Channel Binding Setup (shared by install + --update-channels)
// ============================================

/**
 * Detect channels and bind CEO/CAO.
 *
 * Routing rule: OpenClaw binds agents to **channel accounts** (e.g. "whatsapp",
 * "telegram:default", "discord:ceo"), NOT to guild channel IDs.
 * Discord per-channel routing requires separate bot accounts.
 *
 * Cron delivery (--to) is separate — it targets specific guild channels or phone numbers.
 *
 * @returns {{ ceoBind, caoBind, ceoDeliveryTarget, caoDeliveryTarget, primaryChannel, failedBindCmds }}
 */
async function setupChannelBindings(rl, nativeJson, nativeJsonPath, channelsFound) {
  logInfo('Binding channels...', '綁定通道...');

  const failedBindCmds = [];

  // Primary channel (non-Discord) for CEO — e.g. WhatsApp, Telegram
  const primaryChannel = channelsFound.find(ch => !ch.startsWith('discord')) || channelsFound[0] || null;

  // Defaults
  let ceoBind = primaryChannel;
  let caoBind = primaryChannel;
  let ceoDeliveryTarget = null;
  let caoDeliveryTarget = null;

  // ---- Discord account-based routing ----
  const discordConfig = nativeJson.channels?.discord;
  if (discordConfig && discordConfig.enabled !== false) {
    // P0 fix: remove top-level discord.token when accounts exist with same token
    // Having both creates two Discord clients competing for the same bot token
    if (discordConfig.token && discordConfig.accounts && Object.keys(discordConfig.accounts).length > 0) {
      const topToken = discordConfig.token;
      const accountTokens = Object.values(discordConfig.accounts)
        .map(acc => acc.token)
        .filter(Boolean);
      if (accountTokens.includes(topToken)) {
        logWarn(
          'Removing top-level discord.token (duplicates account token — would create conflicting clients)',
          '移除頂層 discord.token（與帳號 token 重複，會產生衝突的 client）'
        );
        delete discordConfig.token;
        // Write fix immediately so gateway doesn't hit this
        fs.writeFileSync(nativeJsonPath, JSON.stringify(nativeJson, null, 2) + '\n');
      }
    }

    // Collect Discord accounts from channelsFound (format: "discord" or "discord:accountName")
    const discordAccounts = channelsFound
      .filter(ch => ch.startsWith('discord'))
      .map(ch => {
        const parts = ch.split(':');
        return { binding: ch, account: parts[1] || 'default' };
      });

    if (discordAccounts.length > 0) {
      log('');
      log(msg(
        '  Discord multi-bot routing:',
        '  Discord 多 Bot 路由：'
      ));
      log(msg(
        '  Each claw-company agent (CEO/CAO) needs its own Discord bot.',
        '  每個 claw-company agent（CEO/CAO）需要獨立的 Discord Bot。'
      ));
      log(msg(
        '  Unassigned channels fall back to the native agent (default).',
        '  未分配的通道自動歸原生 Agent（default）。'
      ));
      log('');
      log(msg(
        '  Detected Discord bot accounts:',
        '  偵測到的 Discord Bot 帳號：'
      ));
      for (const acc of discordAccounts) {
        log(`    - ${acc.account} (bind as: ${acc.binding})`);
      }

      // Check existing bindings to exclude accounts claimed by non-claw-company agents
      const existingBindings = Array.isArray(nativeJson.bindings) ? nativeJson.bindings : [];
      const claimedAccounts = new Map(); // accountName -> agentId
      for (const b of existingBindings) {
        const agentId = b.agentId || '';
        if (agentId.startsWith(AGENT_PREFIX)) continue; // skip our own
        const bindType = b.match?.channel || '';
        const bindAccount = b.match?.accountId || '';
        if (bindType === 'discord') {
          claimedAccounts.set(bindAccount || 'default', agentId);
        }
      }

      const availableAccounts = discordAccounts.filter(acc => {
        const claimer = claimedAccounts.get(acc.account);
        if (claimer) {
          log(msg(
            `    ⊘ ${acc.account} — bound to ${claimer}`,
            `    ⊘ ${acc.account} — 已綁定 ${claimer}`
          ));
        }
        return !claimer;
      });

      // Guide: recommend creating more bots if only 1 account available
      if (availableAccounts.length === 1 && discordAccounts.length === 1) {
        log('');
        log(msg(
          '  Tip: For full multi-bot routing, create 3 Discord bots:',
          '  提示：完整的多 Bot 路由建議建立 3 個 Discord Bot：'
        ));
        log(msg(
          '    1) CEO bot — bound to CEO agent (main entry point)',
          '    1) CEO Bot — 綁定 CEO agent（主入口）'
        ));
        log(msg(
          '    2) CAO bot — bound to CAO agent (audit channel)',
          '    2) CAO Bot — 綁定 CAO agent（稽核專線）'
        ));
        log(msg(
          '    3) Native bot — default fallback (no binding needed)',
          '    3) 原生 Bot — 預設 fallback（不需要 binding）'
        ));
        log(msg(
          '  Register bots: openclaw channels add --channel discord --account <name> --token <TOKEN>',
          '  註冊 Bot：openclaw channels add --channel discord --account <name> --token <TOKEN>'
        ));
        log(msg(
          '  Then re-run: node install.js --update-channels',
          '  然後重新執行：node install.js --update-channels'
        ));
      }

      // Guide: remind about guild channel allowlist
      if (!discordConfig.guilds || Object.keys(discordConfig.guilds).length === 0) {
        log('');
        logWarn(
          'No Discord guild channels configured. Bots may not receive messages in server channels.',
          '未配置 Discord guild channel。Bot 可能無法在伺服器頻道中接收訊息。'
        );
        log(msg(
          '  Configure in openclaw.json → channels.discord.guilds.<guildId>.channels.<channelId>.allow: true',
          '  配置位置：openclaw.json → channels.discord.guilds.<guildId>.channels.<channelId>.allow: true'
        ));
      }

      if (availableAccounts.length >= 2) {
        // Multiple Discord accounts: interactive assignment
        log('');
        log(msg(
          '  Assign Discord bot accounts to agents:',
          '  分配 Discord 機器人帳號給 Agent：'
        ));
        log('');
        for (let i = 0; i < availableAccounts.length; i++) {
          log(`    ${i + 1}) ${availableAccounts[i].account}`);
        }
        log(`    0) ${msg('Skip (do not bind to Discord)', '跳過（不綁 Discord）')}`);
        log('');

        // CEO account
        let ceoIdx = -1;
        while (ceoIdx < 0 || ceoIdx > availableAccounts.length) {
          const input = await ask(rl, msg(
            `  CEO Discord account (0-${availableAccounts.length}): `,
            `  CEO Discord 帳號 (0-${availableAccounts.length})：`
          ));
          ceoIdx = parseInt(input, 10);
          if (isNaN(ceoIdx)) ceoIdx = -1;
        }
        if (ceoIdx > 0) {
          ceoBind = availableAccounts[ceoIdx - 1].binding;
        }

        // CAO account
        let caoIdx = -1;
        while (caoIdx < 0 || caoIdx > availableAccounts.length) {
          const input = await ask(rl, msg(
            `  CAO Discord account (0-${availableAccounts.length}): `,
            `  CAO Discord 帳號 (0-${availableAccounts.length})：`
          ));
          caoIdx = parseInt(input, 10);
          if (isNaN(caoIdx)) caoIdx = -1;
        }
        if (caoIdx > 0) {
          caoBind = availableAccounts[caoIdx - 1].binding;
        }

        log('');
      } else if (availableAccounts.length === 1) {
        if (primaryChannel && !primaryChannel.startsWith('discord')) {
          // CEO already has non-Discord primary, offer Discord for CAO
          log('');
          const useCao = await ask(rl, msg(
            `  Bind CAO to Discord account "${availableAccounts[0].account}"? (Y/n): `,
            `  將 CAO 綁定到 Discord 帳號「${availableAccounts[0].account}」？(Y/n)：`
          ));
          if (!useCao.trim() || useCao.trim().toLowerCase().startsWith('y')) {
            caoBind = availableAccounts[0].binding;
          }
        } else {
          // Only Discord available — CEO gets it
          ceoBind = availableAccounts[0].binding;
          log(msg(
            `  CEO → Discord account "${availableAccounts[0].account}"`,
            `  CEO → Discord 帳號「${availableAccounts[0].account}」`
          ));
          log(msg(
            '  To add CAO audit channel: openclaw channels add --channel discord --account audit --token <TOKEN>',
            '  若需 CAO 稽核專線：openclaw channels add --channel discord --account audit --token <TOKEN>'
          ));
        }
      }

      // Resolve Discord cron delivery targets (guild channel IDs, NOT account names)
      // Cron --to for Discord uses "channel:<guildChannelId>" to target a specific text channel
      // Use hint matching: "ceo" → prefer channel named "cc-ceo", "cao" → prefer "cc-cao"
      if (ceoBind && ceoBind.startsWith('discord') && !ceoDeliveryTarget) {
        const ceoAccount = ceoBind.split(':')[1] || 'ceo';
        const guildChannel = pickGuildChannel(discordConfig, ceoAccount);
        if (guildChannel) ceoDeliveryTarget = `channel:${guildChannel}`;
      }
      if (caoBind && caoBind.startsWith('discord') && !caoDeliveryTarget) {
        // CAO: prefer a different channel than CEO to avoid overlap
        const caoAccount = caoBind.split(':')[1] || 'cao';
        const ceoChannelId = ceoDeliveryTarget ? ceoDeliveryTarget.replace('channel:', '') : null;
        const guildChannel = pickGuildChannel(discordConfig, caoAccount, ceoChannelId ? [ceoChannelId] : []);
        if (guildChannel) caoDeliveryTarget = `channel:${guildChannel}`;
      }
    }
  }

  // Unbind ALL existing Discord bindings for CEO/CAO before re-binding
  // 'unbind --bind discord' only removes discord:default, NOT discord:ceo etc.
  // Must unbind each account-level binding individually.
  const discordAccountNames = Object.keys(discordConfig?.accounts || {});
  for (const agent of ['ceo', 'cao']) {
    // Always try base 'discord' (covers discord:default)
    tryExec(['openclaw', 'agents', 'unbind', '--agent', `${AGENT_PREFIX}${agent}`, '--bind', 'discord']);
    // Also unbind each named account (discord:ceo, discord:audit, etc.)
    for (const accName of discordAccountNames) {
      if (accName === 'default') continue; // already covered by bare 'discord'
      tryExec(['openclaw', 'agents', 'unbind', '--agent', `${AGENT_PREFIX}${agent}`, '--bind', `discord:${accName}`]);
    }
  }

  // Bind CEO
  if (ceoBind) {
    const cmdArgs = ['openclaw', 'agents', 'bind', '--agent', `${AGENT_PREFIX}ceo`, '--bind', ceoBind];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(`${AGENT_PREFIX}ceo -> ${ceoBind}`);
    } else {
      failedBindCmds.push(cmdToString(cmdArgs));
    }
  }

  // Bind CAO (separate channel if available)
  if (caoBind) {
    const cmdArgs = ['openclaw', 'agents', 'bind', '--agent', `${AGENT_PREFIX}cao`, '--bind', caoBind];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      const shared = caoBind === ceoBind ? ' (shared)' : '';
      logOk(`${AGENT_PREFIX}cao -> ${caoBind}${shared}`);
    } else {
      failedBindCmds.push(cmdToString(cmdArgs));
    }
  }

  if (failedBindCmds.length === 0 && (ceoBind || caoBind)) {
    log(msg(
      '  ⚠ Restart gateway for binding changes to take effect.',
      '  ⚠ 需要重啟 gateway 才能讓 binding 變更生效。'
    ));
  }

  log('');
  return { ceoBind, caoBind, ceoDeliveryTarget, caoDeliveryTarget, primaryChannel, failedBindCmds };
}

/**
 * Pick an allowed guild channel ID from Discord config (for cron delivery --to).
 * @param {object} discordConfig - channels.discord config object
 * @param {string} [hint] - optional channel name substring to prefer (e.g. "ceo", "cao")
 * @param {string[]} [exclude] - channel IDs to skip (avoid giving CEO and CAO the same channel)
 * @returns {string|null} guild channel ID or null
 */
function pickGuildChannel(discordConfig, hint, exclude) {
  if (!discordConfig?.guilds) return null;
  const allChannels = [];
  for (const [, guildObj] of Object.entries(discordConfig.guilds)) {
    if (!guildObj?.channels) continue;
    for (const [chId, chCfg] of Object.entries(guildObj.channels)) {
      if (chCfg && chCfg.allow !== false) {
        allChannels.push({ id: chId, name: chCfg.name || '' });
      }
    }
  }
  if (allChannels.length === 0) return null;
  const excludeSet = new Set(exclude || []);
  // Try hint match first (channel name contains hint, e.g. "cc-ceo" matches "ceo")
  if (hint) {
    const hintLower = hint.toLowerCase();
    const match = allChannels.find(ch => ch.name.toLowerCase().includes(hintLower) && !excludeSet.has(ch.id));
    if (match) return match.id;
  }
  // Fallback: first non-excluded channel
  const fallback = allChannels.find(ch => !excludeSet.has(ch.id));
  return fallback ? fallback.id : allChannels[0].id;
}

// Backward-compat alias
function pickFirstGuildChannel(discordConfig) {
  return pickGuildChannel(discordConfig);
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

  // --update-channels: lightweight mode — re-configure channel bindings (Discord accounts, WhatsApp, Telegram)
  // Also supports adding new Discord bot accounts interactively
  if (process.argv.includes('--update-channels')) {
    const nativeJsonPath = path.join(OPENCLAW_DIR, 'openclaw.json');
    if (!fs.existsSync(nativeJsonPath)) {
      console.error('[ERROR] openclaw.json not found. Run full install first.');
      process.exit(1);
    }
    const nativeJson = readJsonc(nativeJsonPath);
    const rl = createRl();

    // Offer to add new Discord bot accounts before detecting channels
    const discordConfig = nativeJson.channels?.discord;
    if (discordConfig && discordConfig.enabled !== false) {
      const existingAccounts = Object.keys(discordConfig.accounts || {});
      log(msg(
        `\n  Current Discord accounts: ${existingAccounts.length > 0 ? existingAccounts.join(', ') : '(none)'}`,
        `\n  目前的 Discord 帳號：${existingAccounts.length > 0 ? existingAccounts.join(', ') : '（無）'}`
      ));
      const addMore = await ask(rl, msg(
        '  Add a new Discord bot account? (y/N): ',
        '  新增 Discord Bot 帳號？(y/N)：'
      ));
      if (addMore.trim().toLowerCase().startsWith('y')) {
        let adding = true;
        while (adding) {
          const accName = await ask(rl, msg(
            '    Account name (e.g. ceo, audit): ',
            '    帳號名稱（例如 ceo、audit）：'
          ));
          const accToken = await ask(rl, msg(
            '    Bot token: ',
            '    Bot Token：'
          ));
          if (accName.trim() && accToken.trim()) {
            const result = tryExec([
              'openclaw', 'channels', 'add',
              '--channel', 'discord',
              '--account', accName.trim(),
              '--token', accToken.trim(),
            ]);
            if (result.ok) {
              logOk(`Discord account "${accName.trim()}" added`);
            } else {
              logWarn(
                `Failed to add account: ${result.stderr}`,
                `新增帳號失敗：${result.stderr}`
              );
            }
          }
          const more = await ask(rl, msg(
            '    Add another? (y/N): ',
            '    繼續新增？(y/N)：'
          ));
          adding = more.trim().toLowerCase().startsWith('y');
        }
        // Re-read json after adding accounts
        Object.assign(nativeJson, readJsonc(nativeJsonPath));
      }
    }

    // Detect channels (re-read after potential account additions)
    const channelsFound = [];
    if (nativeJson.channels) {
      for (const [chName, chConfig] of Object.entries(nativeJson.channels)) {
        if (typeof chConfig !== 'object' || chConfig === null) continue;
        if (chConfig.enabled === false) continue;
        if (chConfig.accounts && typeof chConfig.accounts === 'object') {
          for (const [accName, accConfig] of Object.entries(chConfig.accounts)) {
            if (typeof accConfig === 'object' && accConfig !== null && accConfig.enabled === false) continue;
            channelsFound.push(`${chName}:${accName}`);
          }
        } else {
          channelsFound.push(chName);
        }
      }
    }
    if (channelsFound.length === 0) {
      console.error(msg('[ERROR] No channels found.', '[ERROR] 找不到通道。'));
      rl.close();
      process.exit(1);
    }

    // Backup
    const backupPath = `${nativeJsonPath}.backup.${Date.now()}`;
    try { fs.copyFileSync(nativeJsonPath, backupPath); } catch (_) {}

    await setupChannelBindings(rl, nativeJson, nativeJsonPath, channelsFound);

    logOk(msg('Channel bindings updated.', '通道綁定已更新。'));
    log(msg('  Verify: openclaw agents bindings', '  驗證：openclaw agents bindings'));
    rl.close();
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

  // --setup-memory: lightweight mode — configure Jina API key for memory plugin
  if (process.argv.includes('--setup-memory')) {
    log(msg('=== Memory Plugin Setup ===', '=== 記憶插件配置 ==='));
    log('');

    // Check if plugin is installed
    const pluginPath = path.join(OPENCLAW_DIR, MEMORY_PLUGIN_DIR);
    if (!fs.existsSync(path.join(pluginPath, 'package.json'))) {
      console.error(msg(
        '[ERROR] memory-lancedb-pro not installed. Run full install first: node install.js',
        '[ERROR] memory-lancedb-pro 未安裝。請先執行完整安裝：node install.js'
      ));
      process.exit(1);
    }

    // Check JINA_API_KEY
    if (!process.env.JINA_API_KEY) {
      log(msg(
        '[INFO] JINA_API_KEY is not set in your environment.',
        '[INFO] 環境中未設定 JINA_API_KEY。'
      ));
      log('');
      log(msg('Steps to get your free Jina API key:', '取得免費 Jina API Key 的步驟：'));
      log(msg(
        '  1. Visit https://jina.ai and sign up (free tier available)',
        '  1. 前往 https://jina.ai 註冊帳號（有免費方案）'
      ));
      log(msg(
        '  2. Go to API Keys section and create a new key',
        '  2. 進入 API Keys 頁面，建立新的金鑰'
      ));
      log(msg(
        '  3. Set the environment variable:',
        '  3. 設定環境變數：'
      ));
      log('     export JINA_API_KEY=your_key_here');
      log('');
      log(msg(
        '  4. Run this command again:',
        '  4. 再次執行此指令：'
      ));
      log('     node install.js --setup-memory');
      log('');
      log(msg(
        'Tip: Add "export JINA_API_KEY=your_key" to ~/.bashrc or ~/.profile for persistence.',
        '提示：將 "export JINA_API_KEY=your_key" 加入 ~/.bashrc 或 ~/.profile 以永久生效。'
      ));
      return;
    }

    logOk(msg('JINA_API_KEY detected', 'JINA_API_KEY 已偵測到'));

    // Check service environment (systemd on Linux, launchd hint on macOS)
    let systemdFixed = false;
    if (process.platform === 'darwin') {
      logInfo(msg(
        'macOS detected — ensure JINA_API_KEY is available to the gateway process.',
        'macOS 環境 — 請確保 gateway 程序可存取 JINA_API_KEY。'
      ));
      log(msg(
        '  If using launchd: add EnvironmentVariables dict to your plist, or launch gateway from a shell with the env var set.',
        '  若使用 launchd：在 plist 中加入 EnvironmentVariables，或在已設定環境變數的 shell 中啟動 gateway。'
      ));
    } else {
      try {
        const svcCheck = tryExec(['systemctl', 'show', 'openclaw-gateway', '--property=Environment']);
        if (svcCheck.ok && svcCheck.stdout.includes('Environment=')) {
          if (svcCheck.stdout.includes('JINA_API_KEY')) {
            logOk(msg('systemd service already has JINA_API_KEY', 'systemd 服務已包含 JINA_API_KEY'));
          } else {
            logWarn(
              'systemd service is missing JINA_API_KEY. Fixing...',
              'systemd 服務缺少 JINA_API_KEY，修復中...'
            );
            const overrideDir = '/etc/systemd/system/openclaw-gateway.service.d';
            const overridePath = path.join(overrideDir, 'jina-env.conf');
            const overrideContent = `[Service]\nEnvironment=JINA_API_KEY=${process.env.JINA_API_KEY}\n`;
            const mkdirResult = tryExec(['sudo', 'mkdir', '-p', overrideDir]);
            if (mkdirResult.ok) {
              const writeResult = spawnSync('sudo', ['tee', overridePath], { input: overrideContent, encoding: 'utf-8', timeout: 10000 });
              if (writeResult.status === 0) {
                tryExec(['sudo', 'systemctl', 'daemon-reload']);
                logOk(msg(
                  'JINA_API_KEY added to systemd service',
                  'JINA_API_KEY 已加入 systemd 服務'
                ));
                systemdFixed = true;
              } else {
                logWarn(
                  'Failed to write systemd override. Fix manually:',
                  '寫入 systemd override 失敗，請手動修復：'
                );
                log(`  sudo systemctl edit openclaw-gateway`);
                log(`  ${msg('Add:', '加入：')} Environment=JINA_API_KEY=${process.env.JINA_API_KEY}`);
              }
            }
          }
        }
      } catch (e) {
        logInfo(msg('Not running under systemd, skipping', '非 systemd 環境，跳過'));
      }
    }

    // Verify by reindexing (use longer timeout for large memory stores)
    log('');
    log(msg('Reindexing memory...', '重建記憶索引...'));
    const reindexResult = spawnSync('openclaw', ['memory', 'index', '--force'], { encoding: 'utf-8', timeout: 120000 });
    if (reindexResult.status === 0) {
      logOk(msg('Memory reindex complete', '記憶索引重建完成'));
    } else {
      logWarn(
        'Memory reindex failed or timed out. Run manually: openclaw memory index --force',
        '記憶索引重建失敗或超時。請手動執行：openclaw memory index --force'
      );
    }

    log('');
    if (systemdFixed) {
      // Ask user if they want to restart now
      const rl2 = createRl();
      const restart = await ask(rl2, msg(
        'Restart gateway now to apply? (Y/n): ',
        '立即重啟 gateway 生效？(Y/n)：'
      ));
      rl2.close();
      if (restart.toLowerCase() !== 'n') {
        const restartResult = tryExec(['sudo', 'systemctl', 'restart', 'openclaw-gateway']);
        if (restartResult.ok) {
          logOk(msg('Gateway restarted', 'Gateway 已重啟'));
        } else {
          logWarn(
            'Restart failed. Run manually: sudo systemctl restart openclaw-gateway',
            '重啟失敗，請手動執行：sudo systemctl restart openclaw-gateway'
          );
        }
      } else {
        log(msg(
          'Restart later: sudo systemctl restart openclaw-gateway',
          '稍後重啟：sudo systemctl restart openclaw-gateway'
        ));
      }
    }
    logOk(msg('Memory plugin setup complete!', '記憶插件配置完成！'));
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
      `Could not detect OpenClaw version from: ${(clawCheck.stdout || '').trim().slice(0, 80)}`,
      `無法從輸出偵測 OpenClaw 版本：${(clawCheck.stdout || '').trim().slice(0, 80)}`
    );
    log(msg(
      `  This installer requires OpenClaw >= ${REQUIRED_MIN_VERSION}. Incompatible versions may cause runtime errors.`,
      `  本安裝程式需要 OpenClaw >= ${REQUIRED_MIN_VERSION}，不相容的版本可能造成執行期錯誤。`
    ));
    const cont = await ask(rl, msg('  Continue anyway? (y/N): ', '  仍要繼續？(y/N)：'));
    if (cont.toLowerCase() !== 'y') {
      log(msg('Cancelled.', '已取消。'));
      rl.close();
      process.exit(0);
    }
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

  // Extract from models.providers (actual model definitions)
  if (nativeJson.models?.providers) {
    for (const [providerName, providerConfig] of Object.entries(nativeJson.models.providers)) {
      if (providerConfig.models && Array.isArray(providerConfig.models)) {
        for (const m of providerConfig.models) {
          if (m.id) modelsSet.add(`${providerName}/${m.id}`);
        }
      }
    }
  }

  // Extract from agents.defaults.models keys (alias mappings)
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
      if (typeof chConfig !== 'object' || chConfig === null) continue;
      // Skip explicitly disabled channels
      if (chConfig.enabled === false) continue;

      if (chConfig.accounts && typeof chConfig.accounts === 'object') {
        // Channels with accounts (like telegram) — recurse one level for sub-accounts
        for (const [accName, accConfig] of Object.entries(chConfig.accounts)) {
          if (typeof accConfig === 'object' && accConfig !== null && accConfig.enabled === false) continue;
          channelsFound.push(`${chName}:${accName}`);
        }
      } else {
        channelsFound.push(chName);
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

  if (availableModels.length === 1) {
    modelPrimary = modelLight = availableModels[0];
    logInfo(
      `Only one model available, using for both smart and fast: ${modelPrimary}`,
      `只有一個模型，smart 和 fast 皆使用：${modelPrimary}`
    );
  } else {
    modelPrimary = await pickModel('smart');
    modelLight = await pickModel('fast');
  }

  log('');
  logInfo(
    `Model aliases:\n       smart -> ${modelPrimary}\n       fast  -> ${modelLight}`,
    `模型別名：\n       smart -> ${modelPrimary}\n       fast  -> ${modelLight}`
  );
  if (availableModels.length > 1 && modelPrimary === modelLight) {
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

    // Extra config files (always overwrite — these are templates)
    for (const extra of ['briefing-template.md']) {
      const src = path.join(wsSrc, extra);
      if (!fs.existsSync(src)) continue;
      fs.writeFileSync(path.join(wsDst, extra), replaceInstallDir(fs.readFileSync(src, 'utf-8')));
    }

    // Runtime state files (preserve existing on overwrite install)
    for (const runtime of ['status.md', 'issues.md']) {
      const dst = path.join(wsDst, runtime);
      if (fs.existsSync(dst)) continue; // preserve existing runtime state
      const src = path.join(wsSrc, runtime);
      if (!fs.existsSync(src)) continue;
      fs.writeFileSync(dst, replaceInstallDir(fs.readFileSync(src, 'utf-8')));
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
      // Support both quoted (name: "Foo") and unquoted (name: Foo) YAML values
      const parseFmValue = (key) => {
        const quoted = fm.match(new RegExp(`^${key}:\\s*"(.*)"`, 'm'));
        if (quoted) return quoted[1];
        const unquoted = fm.match(new RegExp(`^${key}:\\s*(.+)`, 'm'));
        return unquoted ? unquoted[1].trim() : '';
      };
      const name = parseFmValue('name');
      const title = parseFmValue('title');
      const icon = parseFmValue('icon');
      if (name) {
        executives.push({ name, title, icon, id: `${AGENT_PREFIX}${agent}` });
      } else {
        logWarn(
          `workspace-${agent}/IDENTITY.md: name field is empty — will be missing from team-roster.md`,
          `workspace-${agent}/IDENTITY.md：name 欄位為空，將不會出現在 team-roster.md 中`
        );
      }
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
  // Deploy skill-allowlist.json to shared/
  // ----------------------------------------
  const skillAllowlistSrc = path.join(SCRIPT_DIR, 'skill-allowlist.json');
  if (fs.existsSync(skillAllowlistSrc)) {
    fs.copyFileSync(skillAllowlistSrc, path.join(sharedDst, 'skill-allowlist.json'));
    logOk('shared/skill-allowlist.json');
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
  // LEGACY: OpenClaw agents inherit auth from main agent automatically.
  // This section writes to INSTALL_DIR/agents/ which may not match the
  // actual agent dirs at ~/.openclaw/agents/cc-*/agent/. Kept as fallback.
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
        '  Get free API key: https://jina.ai → then run: node install.js --setup-memory',
        '  取得免費 API Key：https://jina.ai → 設定後執行：node install.js --setup-memory'
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
        // Fallback: npm install into a temp dir, then hoist to pluginPath
        // (npm puts the package under node_modules/ — OpenClaw plugin loader
        //  expects entry point at pluginPath root, matching git clone layout)
        const npmTmpDir = `${pluginPath}.__npm_tmp__`;
        try { fs.rmSync(npmTmpDir, { recursive: true, force: true }); } catch (_) {}
        fs.mkdirSync(npmTmpDir, { recursive: true });
        spawnSync('npm', ['init', '-y'], {
          encoding: 'utf-8', timeout: 30000, cwd: npmTmpDir,
        });
        const npmInstallResult = spawnSync('npm', ['install', `memory-lancedb-pro@${MEMORY_PLUGIN_VERSION}`], {
          encoding: 'utf-8', timeout: 120000, cwd: npmTmpDir,
        });
        if (npmInstallResult.status === 0) {
          // Hoist: move node_modules/memory-lancedb-pro/* → pluginPath/
          const hoistSrc = path.join(npmTmpDir, 'node_modules', 'memory-lancedb-pro');
          if (fs.existsSync(hoistSrc)) {
            fs.mkdirSync(pluginPath, { recursive: true });
            fs.cpSync(hoistSrc, pluginPath, { recursive: true });
            logOk('npm install + hoist (fallback)');
          } else {
            logWarn(
              'npm install succeeded but package not found in node_modules. Check package name.',
              'npm install 成功但 node_modules 中找不到套件，請確認套件名稱。'
            );
          }
          try { fs.rmSync(npmTmpDir, { recursive: true, force: true }); } catch (_) {}
        } else {
          try { fs.rmSync(npmTmpDir, { recursive: true, force: true }); } catch (_) {}
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

  // Save injected model keys for future pre-clean / uninstall
  const installMeta = { injectedModels: [modelPrimary, modelLight] };
  fs.writeFileSync(
    path.join(INSTALL_DIR, '.install-meta.json'),
    JSON.stringify(installMeta, null, 2) + '\n'
  );

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
        visibility: 'all',
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
              default: 'project:claw-company',
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

  // Pre-clean: remove only the specific keys we inject, to prevent array
  // duplication on re-install. Delete at leaf level so user-added keys under
  // the same parent (e.g. tools.customTool) are preserved.
  //
  // For objects that mix our keys with user keys (e.g. agents.defaults.models,
  // hooks.internal), we only remove the keys we will re-inject, not the whole
  // object. This preserves user-added model aliases and hook entries.
  const keysToPreClean = [
    'agents.defaults.subagents',
    'agents.defaults.heartbeat',
    'agents.defaults.model',
    'agents.defaults.compaction',
    'tools.agentToAgent',
    'tools.sessions',
    'tools.loopDetection',
    'cron.enabled',
    'cron.maxConcurrentRuns',
  ];
  for (const keyPath of keysToPreClean) {
    const parts = keyPath.split('.');
    let obj = nativeJson;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj || typeof obj !== 'object') break;
      obj = obj[parts[i]];
    }
    const lastKey = parts[parts.length - 1];
    if (obj && typeof obj === 'object' && obj[lastKey] !== undefined) {
      delete obj[lastKey];
    }
  }

  // Surgical pre-clean for agents.defaults.models: only remove the exact two
  // model keys we are about to inject. Do NOT match by alias — users may have
  // their own models aliased as 'smart' or 'fast'.
  if (nativeJson.agents?.defaults?.models) {
    delete nativeJson.agents.defaults.models[modelPrimary];
    delete nativeJson.agents.defaults.models[modelLight];
  }

  // Surgical pre-clean for hooks.internal: only remove 'enabled', preserve
  // user-added entries (boot-md, command-logger, etc.).
  if (nativeJson.hooks?.internal) {
    delete nativeJson.hooks.internal.enabled;
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

  // Skill allowlist injection is deferred to after agent registration (CLI overwrites json)

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

  // Pre-fetch existing agent workspaces (agents show doesn't exist, use agents list --json)
  const existingAgents = {};
  const listResult = tryExec(['openclaw', 'agents', 'list', '--json']);
  if (listResult.ok && listResult.stdout) {
    try {
      const agentList = parseJsonFromOutput(listResult.stdout);
      for (const a of agentList) {
        if (a.id && a.workspace) {
          existingAgents[a.id] = a.workspace;
        }
      }
    } catch (_) { /* ignore parse errors */ }
  }

  const failedAgentCmds = [];
  for (const def of agentDefs) {
    const agentId = `${AGENT_PREFIX}${def.id}`;
    const workspace = path.join(INSTALL_DIR, `workspace-${def.id}`);
    const cmdArgs = ['openclaw', 'agents', 'add', agentId, '--workspace', workspace, '--model', def.tier];
    const result = tryExec(cmdArgs);
    if (result.ok) {
      logOk(agentId);
    } else if (result.stderr.includes('already exists')) {
      // Agent exists — check if workspace path actually needs updating
      const currentWorkspace = existingAgents[agentId] || null;

      if (currentWorkspace === workspace) {
        // Workspace path is already correct — no need to re-register
        logOk(`${agentId} (already registered, workspace OK)`);
      } else {
        logInfo(
          `${agentId} workspace mismatch (${currentWorkspace || '?'} -> ${workspace}), re-registering...`,
          `${agentId} workspace 路徑不一致（${currentWorkspace || '?'} -> ${workspace}），重新註冊...`
        );
        // Backup workspace files before delete (OpenClaw may delete workspace dir on agent delete)
        const backupDir = `${workspace}.bak.${Date.now()}`;
        let backupOk = false;
        if (fs.existsSync(workspace)) {
          try {
            fs.cpSync(workspace, backupDir, { recursive: true });
            // Verify backup contains critical files
            const memoryBackup = path.join(backupDir, 'MEMORY.md');
            if (fs.existsSync(path.join(workspace, 'MEMORY.md')) && !fs.existsSync(memoryBackup)) {
              throw new Error('MEMORY.md not found in backup');
            }
            backupOk = true;
          } catch (backupErr) {
            logWarn(
              `Backup failed for ${agentId}: ${backupErr.message}. Skipping re-registration to protect data.`,
              `${agentId} 備份失敗：${backupErr.message}。跳過重新註冊以保護資料。`
            );
            failedAgentCmds.push(cmdToString(cmdArgs));
          }
        } else {
          backupOk = true; // No workspace yet, nothing to lose
        }

        if (backupOk) {
          const delResult = tryExec(['openclaw', 'agents', 'delete', agentId, '--force']);
          if (delResult.ok) {
            // Restore workspace from backup if it was deleted
            if (!fs.existsSync(workspace) && fs.existsSync(backupDir)) {
              fs.cpSync(backupDir, workspace, { recursive: true });
            }
            try { fs.rmSync(backupDir, { recursive: true, force: true }); } catch (_) {}
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
            // Delete failed — restore backup if workspace was damaged
            if (!fs.existsSync(workspace) && fs.existsSync(backupDir)) {
              try { fs.cpSync(backupDir, workspace, { recursive: true }); } catch (_) {}
            }
            try { fs.rmSync(backupDir, { recursive: true, force: true }); } catch (_) {}
            failedAgentCmds.push(cmdToString(cmdArgs));
            logWarn(
              `Failed to delete existing ${agentId}: ${delResult.stderr}`,
              `刪除已存在的 ${agentId} 失敗：${delResult.stderr}`
            );
          }
        }
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
  const channelResult = await setupChannelBindings(rl, nativeJson, nativeJsonPath, channelsFound);
  const { ceoBind, caoBind, ceoDeliveryTarget, caoDeliveryTarget, primaryChannel, failedBindCmds } = channelResult;

  log('');

  // ============================================
  // Register cron jobs
  // ============================================
  logInfo('Registering cron jobs...', '註冊排程任務...');

  // Remove existing cron jobs by UUID before re-adding (prevent duplicates on re-install)
  const managedCronNames = new Set([
    'morning-briefing', 'investment-monitor', 'memory-cleanup',
    'weekly-org-review', 'security-scan', 'cto-memory-cleanup',
  ]);

  // Try --json first (structured output, immune to format changes), fall back to text parsing
  let cronRemoved = false;
  const cronJsonResult = tryExec(['openclaw', 'cron', 'list', '--json']);
  if (cronJsonResult.ok && cronJsonResult.stdout) {
    try {
      const cronEntries = parseJsonFromOutput(cronJsonResult.stdout);
      if (Array.isArray(cronEntries)) {
        for (const entry of cronEntries) {
          if (entry.name && managedCronNames.has(entry.name) && entry.id) {
            tryExec(['openclaw', 'cron', 'remove', entry.id]);
          }
        }
        cronRemoved = true;
      }
    } catch (_) { /* not valid JSON, fall through to text parsing */ }
  }

  if (!cronRemoved) {
    // Fallback: text parsing with relaxed regex (tolerates leading whitespace, varying column order)
    const cronListResult = tryExec(['openclaw', 'cron', 'list']);
    if (cronListResult.ok && cronListResult.stdout) {
      const UUID_RE = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/;
      const lines = cronListResult.stdout.split('\n');
      for (const line of lines) {
        const uuidMatch = line.match(UUID_RE);
        if (!uuidMatch) continue;
        // Check if any managed cron name appears anywhere in the same line
        for (const name of managedCronNames) {
          if (line.includes(name)) {
            tryExec(['openclaw', 'cron', 'remove', uuidMatch[1]]);
            break;
          }
        }
      }
    }
  }

  // v2026.3.8: Cron tight isolation — cron jobs cannot use sessions_send or message tool.
  // Delivery modes: 'announce' (push to channel), 'none' (silent, no --channel).
  // For 'announce' jobs, results are delivered via --channel + --announce + --to.
  // For 'none' jobs, results are written to output/ files; CEO heartbeat picks them up.

  // Extract delivery target for non-Discord channels (WhatsApp, Telegram)
  function extractChannelTarget(channelName) {
    if (!nativeJson.channels || !channelName) return null;
    const parts = channelName.split(':');
    const baseName = parts[0];
    const account = parts[1];
    const config = nativeJson.channels[baseName];
    if (!config || typeof config !== 'object') return null;
    // Telegram-style with accounts
    if (account && config.accounts && config.accounts[account]) {
      const acc = config.accounts[account];
      return acc.to || acc.chatId || acc.chat_id || acc.target || null;
    }
    // Explicit target fields
    if (config.to || config.phoneNumber || config.phone || config.target) {
      return config.to || config.phoneNumber || config.phone || config.target;
    }
    // WhatsApp: use first allowFrom entry as delivery target
    if (baseName === 'whatsapp' && Array.isArray(config.allowFrom) && config.allowFrom.length > 0) {
      return config.allowFrom[0];
    }
    return null;
  }

  // Resolve cron delivery channel (base name), account, and target (--to destination)
  // --channel expects base name (e.g. "whatsapp", "discord"), --to expects destination
  // --account is needed for Discord multi-bot to specify which bot sends the delivery
  const ceoCronChannel = (ceoBind || primaryChannel || '').split(':')[0] || null;
  const caoCronChannel = (caoBind || primaryChannel || '').split(':')[0] || null;
  const ceoCronAccount = (ceoBind || '').includes(':') ? (ceoBind || '').split(':')[1] : null;
  const caoCronAccount = (caoBind || '').includes(':') ? (caoBind || '').split(':')[1] : null;
  const primaryTarget = ceoDeliveryTarget || extractChannelTarget(ceoCronChannel);
  const caoTarget = caoDeliveryTarget || extractChannelTarget(caoCronChannel);
  const missingTargets = [];

  // Auto-detect system timezone for cron --tz (IANA format)
  let cronTz = '';
  try {
    cronTz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch (_) {}
  if (!cronTz || cronTz === 'UTC' || cronTz === 'Etc/UTC') {
    // Fallback: read /etc/timezone or TZ env
    const envTz = process.env.TZ || '';
    if (envTz && envTz !== 'UTC' && envTz !== 'Etc/UTC') cronTz = envTz;
    if (!cronTz || cronTz === 'UTC' || cronTz === 'Etc/UTC') {
      try {
        const fileTz = fs.readFileSync('/etc/timezone', 'utf-8').trim();
        if (fileTz && fileTz !== 'UTC' && fileTz !== 'Etc/UTC') cronTz = fileTz;
      } catch (_) {}
    }
  }
  // If still UTC or empty, ask user for their timezone
  if (!cronTz || cronTz === 'UTC' || cronTz === 'Etc/UTC') {
    log(msg(
      '\n  Server timezone appears to be UTC. Cron jobs need your local timezone.',
      '\n  伺服器時區為 UTC。排程任務需要你的當地時區。'
    ));
    log(msg(
      '  Examples: Asia/Taipei, America/New_York, Europe/London',
      '  範例：Asia/Taipei, America/New_York, Europe/London'
    ));
    const tzInput = await ask(rl, msg('  Your timezone (Enter to skip): ', '  你的時區（Enter 跳過）：'));
    if (tzInput.trim()) {
      cronTz = tzInput.trim();
    } else {
      cronTz = ''; // Will use server time (UTC)
    }
  }
  if (cronTz && cronTz !== 'UTC') {
    logInfo(
      `Timezone for cron: ${cronTz}`,
      `排程時區：${cronTz}`
    );
  } else {
    logWarn(
      'Cron jobs will use server time (UTC). Schedules may not match your local time.',
      '排程將使用伺服器時間（UTC），可能與你的當地時間不同。'
    );
  }

  const cronJobs = [
    {
      name: 'morning-briefing',
      cron: '30 0 * * *',
      agent: `${AGENT_PREFIX}ceo`,
      model: tiers.CEO,
      message: 'Execute morning briefing: read MEMORY.md and recent output/ files from all executives (CFO, CIO, COO, CTO, CHRO, CAO) to collect latest status. Compile into briefing with action items for Chairman. Refer to briefing-template.md. Do NOT use sessions_send (unavailable in cron).',
      channel: ceoCronChannel,
      account: ceoCronAccount,
      to: primaryTarget,
    },
    {
      name: 'investment-monitor',
      cron: '0 9-16 * * 1-5',
      agent: `${AGENT_PREFIX}cio`,
      model: tiers.CIO,
      message: 'Check portfolio data. If any position moves >5%, write alert file to output/alerts/ with analysis. Otherwise silently log to memory/. Do NOT use sessions_send (unavailable in cron). CEO heartbeat will pick up alert files.',
      announce: false, // Silent: no --channel, no --announce, no --to
    },
    {
      name: 'memory-cleanup',
      cron: '0 3 1 * *',
      agent: `${AGENT_PREFIX}chro`,
      model: tiers.CHRO,
      message: 'Audit MEMORY.md health across all agents: check line counts vs 200-line limit, duplicates, stale entries, archive logs >30 days. Write health report to output/reports/. Do NOT use sessions_send (unavailable in cron).',
      channel: ceoCronChannel,
      account: ceoCronAccount,
      to: primaryTarget,
    },
    {
      name: 'weekly-org-review',
      cron: '0 8 * * 1',
      agent: `${AGENT_PREFIX}chro`,
      model: tiers.CHRO,
      message: 'Produce weekly org health report: agent performance summary, capability gaps, model config suggestions, skill usage stats. Write report to output/reports/. Do NOT use sessions_send (unavailable in cron).',
      channel: ceoCronChannel,
      account: ceoCronAccount,
      to: primaryTarget,
    },
    {
      name: 'security-scan',
      cron: '0 2 * * 3',
      agent: `${AGENT_PREFIX}cao`,
      model: tiers.CAO,
      message: 'Run full security scan: verify SOUL.md integrity, check recent session logs for anomalies, validate security rules compliance. Produce security scan report. Do NOT use sessions_send (unavailable in cron). Report is delivered via cron announce.',
      channel: caoCronChannel,
      account: caoCronAccount,
      to: caoTarget,
    },
    {
      name: 'cto-memory-cleanup',
      cron: '0 3 * * 0',
      agent: `${AGENT_PREFIX}cto`,
      model: tiers.CTO,
      message: 'Execute weekly memory cleanup: remove stale entries, promote recurring patterns to principles, archive completed tasks >7 days in status.md, ensure MEMORY.md <=200 lines, check for contradictions. Write cleanup summary to memory/ log',
      announce: false, // Silent: no --channel, no --announce, no --to
    },
  ];

  const failedCronCmds = [];
  for (const job of cronJobs) {
    // Build args with --message LAST — some CLI parsers treat it as greedy
    const cmdArgs = ['openclaw', 'cron', 'add', '--name', job.name, '--cron', job.cron, '--agent', job.agent, '--model', job.model];
    // Add timezone if detected
    if (cronTz) {
      cmdArgs.push('--tz', cronTz);
    }
    // Add channel delivery args BEFORE --message for announce jobs
    if (job.announce !== false && job.channel) {
      cmdArgs.push('--channel', job.channel, '--announce');
      // Discord multi-bot: --account specifies which bot delivers the message
      if (job.account) {
        cmdArgs.push('--account', job.account);
      }
      if (job.to) {
        cmdArgs.push('--to', job.to);
      } else {
        missingTargets.push(job.name);
      }
    }
    // --message always last
    cmdArgs.push('--message', job.message);
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

  if (missingTargets.length > 0) {
    logWarn(
      `Could not auto-detect --to for cron jobs: ${missingTargets.join(', ')}. These jobs will fail at delivery.`,
      `無法自動偵測 --to 參數：${missingTargets.join(', ')}。這些排程推送時會失敗。`
    );
    log(msg(
      '  Fix: openclaw cron remove <id> && openclaw cron add ... --to <target>',
      '  修法：openclaw cron remove <id> && openclaw cron add ... --to <target>'
    ));
    log(msg(
      '  WhatsApp: --to +886912345678  |  Discord: --to channel:123456789',
      '  WhatsApp: --to +886912345678  |  Discord: --to channel:123456789'
    ));
  }

  log('');

  // ============================================
  // Inject per-agent skill allowlist (after all CLI ops that modify openclaw.json)
  // ============================================
  const skillAllowlistPath = path.join(SCRIPT_DIR, 'skill-allowlist.json');
  if (fs.existsSync(skillAllowlistPath)) {
    try {
      // Re-read json since CLI commands (agents add, cron add) may have modified it
      const freshJson = JSON.parse(stripJsonComments(fs.readFileSync(nativeJsonPath, 'utf-8')));
      const skillAllowlist = JSON.parse(fs.readFileSync(skillAllowlistPath, 'utf-8'));

      if (!freshJson.agents) freshJson.agents = {};
      if (!freshJson.agents.list) freshJson.agents.list = [];

      for (const agent of AGENTS) {
        const agentId = `${AGENT_PREFIX}${agent}`;
        const allowedSkills = skillAllowlist[agentId];
        if (allowedSkills === undefined) continue;

        let entry = freshJson.agents.list.find(a => a.id === agentId);
        if (!entry) {
          entry = { id: agentId };
          freshJson.agents.list.push(entry);
        }
        entry.skills = allowedSkills;
      }

      fs.writeFileSync(nativeJsonPath, JSON.stringify(freshJson, null, 2) + '\n');

      // Verify: re-read and confirm skills survived the write
      try {
        const verifyJson = JSON.parse(fs.readFileSync(nativeJsonPath, 'utf-8'));
        const verifyList = verifyJson.agents?.list || [];
        const missing = AGENTS.filter(a => {
          const agentId = `${AGENT_PREFIX}${a}`;
          if (skillAllowlist[agentId] === undefined) return false;
          const entry = verifyList.find(e => e.id === agentId);
          return !entry || !Array.isArray(entry.skills);
        });
        if (missing.length > 0) {
          logWarn(msg(
            `Skill allowlist verification failed for: ${missing.map(a => `${AGENT_PREFIX}${a}`).join(', ')}. File may have been overwritten by another process.`,
            `Skill allowlist 驗證失敗：${missing.map(a => `${AGENT_PREFIX}${a}`).join(', ')}。檔案可能被其他程序覆蓋。`
          ));
        } else {
          logOk(msg('skill allowlist injected and verified (post-CLI)', 'Skill allowlist 已注入並驗證（CLI 操作後）'));
        }
      } catch (_) {
        logOk(msg('skill allowlist injected (post-CLI)', 'Skill allowlist 已注入（CLI 操作後）'));
      }
    } catch (e) {
      logWarn(msg(
        `Failed to inject skill allowlist: ${e.message}`,
        `注入 Skill allowlist 失敗：${e.message}`
      ));
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
  log(msg('  1. Verify config: openclaw channels list && openclaw agents bindings', '  1. 驗證配置：openclaw channels list && openclaw agents bindings'));
  log(msg('  2. Run "openclaw doctor --fix" to migrate any legacy cron config', '  2. 執行 "openclaw doctor --fix" 遷移舊版 cron 配置'));
  log(msg('  3. Restart gateway (required for binding changes to take effect)', '  3. 重啟 gateway（binding 變更需要重啟才生效）'));
  log(msg('     pkill -f openclaw; sleep 3 && nohup openclaw gateway &', '     pkill -f openclaw; sleep 3 && nohup openclaw gateway &'));
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
    log(`  - ${msg('Rerank: cross-encoder (Jina) — JINA_API_KEY required (no fallback without it)', 'Rerank：cross-encoder（Jina）— 必須設定 JINA_API_KEY（缺失時 plugin 不載入）')}`);
    log(`  - ${msg('Scope isolation: main isolated, cc-* share project:claw-company', 'Scope 隔離：main 獨立，cc-* 共享 project:claw-company')}`);
    if (!process.env.JINA_API_KEY) {
      log(`  - ${msg('⚠ Set JINA_API_KEY before starting gateway', '⚠ 啟動 gateway 前請設定 JINA_API_KEY')}`);
    }
    log('');
  }

  log(msg('Next steps:', '下一步：'));
  if (!process.env.JINA_API_KEY && memoryPluginInstalled) {
    log(msg(
      '  1. Get free Jina API key: https://jina.ai',
      '  1. 申請免費 Jina API Key：https://jina.ai'
    ));
    log(msg(
      '  2. export JINA_API_KEY=your_key && echo \'export JINA_API_KEY=your_key\' >> ~/.bashrc',
      '  2. export JINA_API_KEY=your_key && echo \'export JINA_API_KEY=your_key\' >> ~/.bashrc'
    ));
    log(msg(
      '  3. node install.js --setup-memory  (auto-configure systemd + verify)',
      '  3. node install.js --setup-memory  （自動配置 systemd + 驗證）'
    ));
    log(msg(
      '  4. openclaw gateway start (or: sudo systemctl restart openclaw-gateway)',
      '  4. openclaw gateway start（或：sudo systemctl restart openclaw-gateway）'
    ));
    log(msg(
      '  5. Send a test message to CEO Bot via your configured platform',
      '  5. 透過已配置的平台發送測試訊息給 CEO Bot'
    ));
  } else {
    log('  1. openclaw gateway start');
    log(msg(
      '  2. Send a test message to CEO Bot via your configured platform',
      '  2. 透過已配置的平台發送測試訊息給 CEO Bot'
    ));
  }
  // Check if gateway runs under systemd and JINA_API_KEY is missing from service env
  if (memoryPluginInstalled && !skipMemoryPlugin && process.env.JINA_API_KEY) {
    try {
      const svcCheck = tryExec(['systemctl', 'show', 'openclaw-gateway', '--property=Environment']);
      if (svcCheck.ok && svcCheck.stdout.includes('Environment=') && !svcCheck.stdout.includes('JINA_API_KEY')) {
        logWarn(
          'JINA_API_KEY is set in your shell but NOT in the systemd service. The gateway will not have access to it.',
          'JINA_API_KEY 已設定在 shell 中，但 systemd 服務未包含此變數。gateway 將無法使用 embedding 功能。'
        );
        // Auto-fix: create systemd override
        const overrideDir = '/etc/systemd/system/openclaw-gateway.service.d';
        const overridePath = path.join(overrideDir, 'jina-env.conf');
        if (!fs.existsSync(overridePath)) {
          try {
            const overrideContent = `[Service]\nEnvironment=JINA_API_KEY=${process.env.JINA_API_KEY}\n`;
            // Try writing directly (may need sudo)
            const writeResult = tryExec(['sudo', 'mkdir', '-p', overrideDir]);
            if (writeResult.ok) {
              const writeFile = spawnSync('sudo', ['tee', overridePath], { input: overrideContent, encoding: 'utf-8', timeout: 10000 });
              if (writeFile.status === 0) {
                tryExec(['sudo', 'systemctl', 'daemon-reload']);
                logOk(msg(
                  'Auto-configured JINA_API_KEY in systemd service. Restart gateway to apply: sudo systemctl restart openclaw-gateway',
                  '已自動配置 JINA_API_KEY 到 systemd 服務。重啟 gateway 生效：sudo systemctl restart openclaw-gateway'
                ));
              }
            }
          } catch (e) {
            log(msg(
              `  Fix manually: sudo systemctl edit openclaw-gateway → add: Environment=JINA_API_KEY=${process.env.JINA_API_KEY}`,
              `  手動修復：sudo systemctl edit openclaw-gateway → 加入：Environment=JINA_API_KEY=${process.env.JINA_API_KEY}`
            ));
          }
        }
      }
    } catch (e) {
      // Not running systemd, skip
    }
  }

  log('');
  log(msg('Management:', '管理指令：'));
  log(`  ${msg('Uninstall', '卸載')}：node install.js --uninstall`);
  log(`  ${msg('Reinstall', '重新安裝')}：node install.js`);
  log(`  ${msg('Skip memory plugin', '跳過記憶插件')}：node install.js --skip-memory-plugin`);
  log(`  ${msg('Update channel bindings', '更新通道綁定')}：node install.js --update-channels`);
  log(`  ${msg('Update skill allowlist only', '僅更新 Skill 白名單')}：node install.js --update-skills`);
  log(`  ${msg('Setup memory plugin (Jina key)', '配置記憶插件（Jina Key）')}：node install.js --setup-memory`);
  log('');
  rl.close();
}

main().catch((err) => {
  console.error(`[FATAL] ${err.message}`);
  process.exit(1);
});
