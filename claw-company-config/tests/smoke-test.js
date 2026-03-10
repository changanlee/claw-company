#!/usr/bin/env node
// ============================================
// Claw Company — OpenClaw Smoke Test
// 驗證安裝完整性和基本功能
// 來源：2026-03-09 Party Mode 架構審查
// 更新：2026-03-10 Skill 管理 + 屬性路徑修正
// ============================================

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

// ============================================
// Constants
// ============================================
const INSTALL_DIR = path.join(os.homedir(), '.openclaw', 'claw-company');
const AGENTS = ['ceo', 'cfo', 'cio', 'coo', 'cto', 'chro', 'cao'];
const AGENT_PREFIX = 'cc-';

let passed = 0;
let failed = 0;
let skipped = 0;

// ============================================
// Helpers
// ============================================
function ok(msg) {
  passed++;
  console.log(`  ✅ ${msg}`);
}

function fail(msg) {
  failed++;
  console.log(`  ❌ ${msg}`);
}

function skip(msg) {
  skipped++;
  console.log(`  ⏭️  ${msg}`);
}

function info(msg) {
  console.log(`  ℹ️  ${msg}`);
}

function heading(title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('='.repeat(60));
}

function runCmd(cmd, args = []) {
  const result = spawnSync(cmd, args, {
    encoding: 'utf-8',
    timeout: 10000,
    shell: true,
  });
  return {
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
    status: result.status,
    ok: result.status === 0,
  };
}

// ============================================
// Test 1: Install Paths (T3)
// ============================================
function testInstallPaths() {
  heading('Test 1: 安裝完整性 — {{INSTALL_DIR}} 替換驗證');

  // Check install directory exists
  if (!fs.existsSync(INSTALL_DIR)) {
    fail(`安裝目錄不存在: ${INSTALL_DIR}`);
    info('請先執行 node install.js');
    return;
  }
  ok(`安裝目錄存在: ${INSTALL_DIR}`);

  // Detect language (check which lang dirs exist)
  const langs = [];
  if (fs.existsSync(path.join(INSTALL_DIR, 'zh'))) langs.push('zh');
  if (fs.existsSync(path.join(INSTALL_DIR, 'en'))) langs.push('en');

  if (langs.length === 0) {
    fail('找不到語言目錄 (zh/ 或 en/)');
    return;
  }
  ok(`語言目錄: ${langs.join(', ')}`);

  // Check for unreplaced {{INSTALL_DIR}} placeholders
  const langDir = langs[0]; // Test with first available lang
  const workspaceDir = path.join(INSTALL_DIR, langDir);
  let unreplacedCount = 0;
  let checkedFiles = 0;

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'output' || entry.name === 'memory' || entry.name === '.git') continue;
        scanDir(fullPath);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.yaml') || entry.name.endsWith('.json')) {
        checkedFiles++;
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(/\{\{INSTALL_DIR\}\}/g);
        if (matches) {
          unreplacedCount += matches.length;
          fail(`未替換的 {{INSTALL_DIR}}: ${path.relative(INSTALL_DIR, fullPath)} (${matches.length} 處)`);
        }
      }
    }
  }

  scanDir(workspaceDir);
  info(`掃描了 ${checkedFiles} 個檔案`);

  if (unreplacedCount === 0) {
    ok(`所有 {{INSTALL_DIR}} 已成功替換 (${checkedFiles} 個檔案)`);
  } else {
    fail(`發現 ${unreplacedCount} 處未替換的 {{INSTALL_DIR}}`);
  }

  // Verify referenced paths exist
  const agentsFiles = AGENTS.map(a => path.join(workspaceDir, `workspace-${a}`, 'AGENTS.md'));
  let referencedPathsOk = 0;
  let referencedPathsFail = 0;

  for (const agentFile of agentsFiles) {
    if (!fs.existsSync(agentFile)) {
      fail(`Agent 檔案不存在: ${path.relative(INSTALL_DIR, agentFile)}`);
      referencedPathsFail++;
      continue;
    }

    const content = fs.readFileSync(agentFile, 'utf-8');
    // Extract absolute paths referenced in the file
    const pathMatches = content.match(/(?:\/[^\s)]+\.(?:md|csv|yaml|json))/g) || [];
    for (const refPath of pathMatches) {
      if (!fs.existsSync(refPath)) {
        fail(`引用路徑不存在: ${refPath} (in ${path.basename(agentFile)})`);
        referencedPathsFail++;
      } else {
        referencedPathsOk++;
      }
    }
  }

  if (referencedPathsFail === 0 && referencedPathsOk > 0) {
    ok(`所有引用路徑可存取 (${referencedPathsOk} 個路徑)`);
  } else if (referencedPathsOk === 0) {
    info('沒有找到絕對路徑引用（可能未安裝或使用相對路徑）');
  }

  // Check shared files
  const sharedFiles = [
    path.join(workspaceDir, 'shared', 'company-rules.md'),
    path.join(workspaceDir, 'shared', 'tools-policy.md'),
    path.join(workspaceDir, 'shared', 'USER.md'),
    path.join(workspaceDir, 'shared', 'brain-methods.csv'),
  ];

  for (const f of sharedFiles) {
    if (fs.existsSync(f)) {
      ok(`共用檔案存在: ${path.basename(f)}`);
    } else {
      fail(`共用檔案缺失: ${path.basename(f)}`);
    }
  }
}

// ============================================
// Test 2: Agent Registration
// ============================================
function testAgentRegistration() {
  heading('Test 2: Agent 註冊驗證');

  // Check if openclaw CLI is available
  const clawCheck = runCmd('openclaw', ['--version']);
  if (!clawCheck.ok) {
    skip('openclaw CLI 不可用，跳過此測試');
    info('請確認 openclaw 已安裝並在 PATH 中');
    return;
  }
  ok(`openclaw CLI 可用: ${clawCheck.stdout}`);

  // Check registered agents
  const agentsList = runCmd('openclaw', ['agents', 'list']);
  if (!agentsList.ok) {
    skip('無法取得 Agent 列表');
    return;
  }

  for (const agent of AGENTS) {
    const agentId = `${AGENT_PREFIX}${agent}`;
    if (agentsList.stdout.includes(agentId)) {
      ok(`Agent 已註冊: ${agentId}`);
    } else {
      fail(`Agent 未註冊: ${agentId}`);
    }
  }
}

// ============================================
// Test 3: Cron Jobs
// ============================================
function testCronJobs() {
  heading('Test 3: Cron 排程驗證');

  const cronList = runCmd('openclaw', ['cron', 'list']);
  if (!cronList.ok) {
    skip('無法取得 Cron 列表（openclaw CLI 不可用或無 cron 功能）');
    return;
  }

  const expectedCrons = [
    'morning-briefing',
    'investment-monitor',
    'memory-cleanup',
    'weekly-org-review',
    'security-scan',
    'cto-memory-cleanup',
  ];

  for (const cron of expectedCrons) {
    if (cronList.stdout.includes(cron)) {
      ok(`Cron 已註冊: ${cron}`);
    } else {
      fail(`Cron 未註冊: ${cron}`);
    }
  }
}

// ============================================
// Test 4: Channel Bindings
// ============================================
function testChannelBindings() {
  heading('Test 4: 通道綁定驗證');

  const bindings = runCmd('openclaw', ['agents', 'bindings']);
  if (!bindings.ok) {
    skip('無法取得通道綁定資訊');
    return;
  }

  // CEO should be bound to main channel
  if (bindings.stdout.includes('cc-ceo')) {
    ok('CEO 已綁定通道');
  } else {
    fail('CEO 未綁定通道');
  }

  // CAO should be bound to audit channel
  if (bindings.stdout.includes('cc-cao')) {
    ok('CAO 已綁定通道');
  } else {
    fail('CAO 未綁定通道');
  }

  info(`完整綁定資訊:\n${bindings.stdout}`);
}

// ============================================
// Test 5: Workspace File Completeness
// ============================================
function testWorkspaceFiles() {
  heading('Test 5: Workspace 檔案完整性');

  const langs = [];
  if (fs.existsSync(path.join(INSTALL_DIR, 'zh'))) langs.push('zh');
  if (fs.existsSync(path.join(INSTALL_DIR, 'en'))) langs.push('en');

  if (langs.length === 0) {
    skip('安裝目錄不存在');
    return;
  }

  const langDir = langs[0];
  const requiredFiles = ['AGENTS.md', 'IDENTITY.md', 'SOUL.md', 'HEARTBEAT.md', 'MEMORY.md', 'TOOLS.md'];

  for (const agent of AGENTS) {
    const wsDir = path.join(INSTALL_DIR, langDir, `workspace-${agent}`);
    if (!fs.existsSync(wsDir)) {
      fail(`Workspace 不存在: workspace-${agent}`);
      continue;
    }

    const missing = requiredFiles.filter(f => !fs.existsSync(path.join(wsDir, f)));
    if (missing.length === 0) {
      ok(`workspace-${agent}: 全部 ${requiredFiles.length} 個必要檔案存在`);
    } else {
      fail(`workspace-${agent}: 缺少 ${missing.join(', ')}`);
    }
  }

  // CTO-specific files
  const ctoDir = path.join(INSTALL_DIR, langDir, 'workspace-cto');
  const ctoSpecific = [
    'engineers/roster.md',
    'engineers/dev.md',
    'engineers/code-reviewer.md',
    'rules/tdd-iron-law.md',
    'rules/sdd-iron-law.md',
    'rules/debugging-iron-law.md',
    'rules/verification.md',
    'skills/cto-dev-dispatch/SKILL.md',
  ];

  for (const f of ctoSpecific) {
    const fullPath = path.join(ctoDir, f);
    if (fs.existsSync(fullPath)) {
      ok(`CTO 專屬: ${f}`);
    } else {
      fail(`CTO 專屬缺失: ${f}`);
    }
  }
}

// ============================================
// Test 6: OpenClaw JSON Injection
// ============================================
function testOpenclawJson() {
  heading('Test 6: openclaw.json 注入驗證');

  const jsonPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
  if (!fs.existsSync(jsonPath)) {
    skip('openclaw.json 不存在');
    return;
  }

  let config;
  try {
    // Strip JSONC comments
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const stripped = raw.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    config = JSON.parse(stripped);
  } catch (e) {
    fail(`openclaw.json 解析失敗: ${e.message}`);
    return;
  }
  ok('openclaw.json 解析成功');

  // Check key injected settings
  const checks = [
    {
      path: 'agents.defaults.subagents.maxSpawnDepth',
      expected: 2,
      get: () => config?.agents?.defaults?.subagents?.maxSpawnDepth,
    },
    {
      path: 'agents.defaults.subagents.maxChildrenPerAgent',
      expected: 10,
      get: () => config?.agents?.defaults?.subagents?.maxChildrenPerAgent,
    },
    {
      path: 'agents.defaults.subagents.runTimeoutSeconds',
      expected: 900,
      get: () => config?.agents?.defaults?.subagents?.runTimeoutSeconds,
    },
    {
      path: 'tools.loopDetection.enabled',
      expected: true,
      get: () => config?.tools?.loopDetection?.enabled,
    },
    {
      path: 'tools.agentToAgent.enabled',
      expected: true,
      get: () => config?.tools?.agentToAgent?.enabled,
    },
    {
      path: 'hooks.internal.enabled',
      expected: true,
      get: () => config?.hooks?.internal?.enabled,
    },
    {
      path: 'cron.enabled',
      expected: true,
      get: () => config?.cron?.enabled,
    },
    {
      path: 'plugins.slots.memory',
      expected: 'memory-lancedb-pro',
      get: () => config?.plugins?.slots?.memory,
    },
    {
      path: 'plugins.entries.memory-lancedb-pro.enabled',
      expected: true,
      get: () => config?.plugins?.entries?.['memory-lancedb-pro']?.enabled,
    },
    {
      path: 'plugins.entries.memory-lancedb-pro.config.autoCapture',
      expected: true,
      get: () => config?.plugins?.entries?.['memory-lancedb-pro']?.config?.autoCapture,
    },
    {
      path: 'plugins.entries.memory-lancedb-pro.config.autoRecall',
      expected: true,
      get: () => config?.plugins?.entries?.['memory-lancedb-pro']?.config?.autoRecall,
    },
  ];

  for (const check of checks) {
    const actual = check.get();
    if (actual === check.expected) {
      ok(`${check.path} = ${actual}`);
    } else if (actual === undefined) {
      fail(`${check.path} 未設定（預期: ${check.expected}）`);
    } else {
      fail(`${check.path} = ${actual}（預期: ${check.expected}）`);
    }
  }

  // Check model aliases
  if (config?.models) {
    const hasSmartAlias = Object.values(config.models).some(m =>
      typeof m === 'object' && m.alias === 'smart'
    );
    if (hasSmartAlias) {
      ok('模型別名 smart 已設定');
    } else {
      info('模型別名 smart 未找到（可能使用不同格式）');
    }
  }
}

// ============================================
// Test 7: Sub-Agent Context Size Estimation
// ============================================
function testContextSize() {
  heading('Test 7: Sub-Agent Context 大小估算');

  const langs = [];
  if (fs.existsSync(path.join(INSTALL_DIR, 'zh'))) langs.push('zh');
  if (fs.existsSync(path.join(INSTALL_DIR, 'en'))) langs.push('en');

  if (langs.length === 0) {
    skip('安裝目錄不存在');
    return;
  }

  const langDir = langs[0];
  const ctoDir = path.join(INSTALL_DIR, langDir, 'workspace-cto');

  // Files auto-injected to Sub-Agent (promptMode=minimal)
  // 研究結論：只注入 AGENTS.md + TOOLS.md，SOUL/IDENTITY/USER/HEARTBEAT/MEMORY 不注入
  const autoInjected = {
    'AGENTS.md': path.join(ctoDir, 'AGENTS.md'),
    'TOOLS.md': path.join(ctoDir, 'TOOLS.md'),
  };

  let autoTotal = 0;
  console.log('\n  自動注入檔案（promptMode=minimal，僅 AGENTS.md + TOOLS.md）:');
  for (const [name, filePath] of Object.entries(autoInjected)) {
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      autoTotal += size;
      console.log(`    ${name}: ${size.toLocaleString()} bytes`);
    }
  }
  console.log(`    ────────────────────────`);
  console.log(`    合計: ${autoTotal.toLocaleString()} bytes`);

  if (autoTotal <= 20000) {
    ok(`自動注入合計 ${autoTotal.toLocaleString()} bytes，未超過 20,000 上限`);
  } else {
    fail(`自動注入合計 ${autoTotal.toLocaleString()} bytes，超過 20,000 上限！`);
  }

  // Runtime read files (for Dev engineer as example)
  const runtimeRead = {
    'engineers/dev.md': path.join(ctoDir, 'engineers', 'dev.md'),
    'rules/tdd-iron-law.md': path.join(ctoDir, 'rules', 'tdd-iron-law.md'),
    'rules/verification.md': path.join(ctoDir, 'rules', 'verification.md'),
    'rules/sdd-iron-law.md': path.join(ctoDir, 'rules', 'sdd-iron-law.md'),
  };

  let runtimeTotal = 0;
  console.log('\n  Runtime Read 檔案（Dev Sub-Agent 範例）:');
  for (const [name, filePath] of Object.entries(runtimeRead)) {
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      runtimeTotal += size;
      console.log(`    ${name}: ${size.toLocaleString()} bytes`);
    }
  }
  console.log(`    ────────────────────────`);
  console.log(`    合計: ${runtimeTotal.toLocaleString()} bytes`);

  const grandTotal = autoTotal + runtimeTotal;
  const estimatedTokens = Math.ceil(grandTotal / 4);
  console.log(`\n  總計: ${grandTotal.toLocaleString()} bytes ≈ ${estimatedTokens.toLocaleString()} tokens`);
  ok(`Sub-Agent context 預估 ${estimatedTokens.toLocaleString()} tokens（合理範圍）`);
}

// ============================================
// Test 8: Post-Compaction Heading Validation
// ============================================
function testPostCompactionHeadings() {
  heading('Test 8: Post-Compaction Heading 驗證');

  const langConfigs = {
    zh: {
      sections: ['啟動必讀', '安全紅線'],
      configSections: ['啟動必讀 — 公司規範', '安全紅線'],
    },
    en: {
      sections: ['Session Startup', 'Red Lines'],
      configSections: ['Session Startup', 'Red Lines'],
    },
  };

  const MAX_CHARS = 3000;

  for (const [lang, cfg] of Object.entries(langConfigs)) {
    const langBase = path.join(INSTALL_DIR, lang);
    if (!fs.existsSync(langBase)) {
      // Also check source dir (pre-install)
      const srcBase = path.join(__dirname, '..', lang);
      if (!fs.existsSync(srcBase)) {
        skip(`${lang}/ 目錄不存在，跳過`);
        continue;
      }
    }

    // Use installed dir if available, fall back to source
    const baseDir = fs.existsSync(langBase)
      ? langBase
      : path.join(__dirname, '..', lang);

    for (const agent of AGENTS) {
      const agentsFile = path.join(baseDir, `workspace-${agent}`, 'AGENTS.md');
      if (!fs.existsSync(agentsFile)) {
        fail(`${lang}/workspace-${agent}/AGENTS.md 不存在`);
        continue;
      }

      const content = fs.readFileSync(agentsFile, 'utf-8');

      for (const section of cfg.sections) {
        // Match ## or ### heading containing the section name
        const headingPattern = new RegExp(`^#{2,3}\\s+.*${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
        const match = content.match(headingPattern);

        if (!match) {
          fail(`${lang}/workspace-${agent}: 缺少 "${section}" heading`);
          continue;
        }

        // Extract section content (from heading to next ## heading or EOF)
        const startIdx = match.index;
        const afterHeading = content.slice(startIdx);
        const nextHeadingMatch = afterHeading.match(/\n#{2}\s+/);
        const sectionContent = nextHeadingMatch && nextHeadingMatch.index > 0
          ? afterHeading.slice(0, nextHeadingMatch.index)
          : afterHeading;

        if (sectionContent.length <= MAX_CHARS) {
          ok(`${lang}/workspace-${agent}: "${section}" (${sectionContent.length} chars <= ${MAX_CHARS})`);
        } else {
          fail(`${lang}/workspace-${agent}: "${section}" 超過 ${MAX_CHARS} chars (${sectionContent.length})`);
        }
      }
    }
  }

  // Check openclaw.json compaction config
  const jsonPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const stripped = raw.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      const config = JSON.parse(stripped);
      const pcs = config?.agents?.defaults?.compaction?.postCompactionSections;
      if (Array.isArray(pcs) && pcs.length >= 2) {
        ok(`compaction.postCompactionSections = [${pcs.map(s => `"${s}"`).join(', ')}]`);
      } else if (pcs) {
        fail(`compaction.postCompactionSections 格式不正確: ${JSON.stringify(pcs)}`);
      } else {
        fail('compaction.postCompactionSections 未設定');
      }

      const cm = config?.agents?.defaults?.compaction?.model;
      if (cm === 'fast') {
        ok('compaction.model = "fast"');
      } else if (cm) {
        info(`compaction.model = "${cm}"（非預設 "fast"）`);
      } else {
        fail('compaction.model 未設定');
      }
    } catch (e) {
      skip(`openclaw.json 解析失敗: ${e.message}`);
    }
  } else {
    skip('openclaw.json 不存在，跳過 compaction 配置檢查');
  }
}

// ============================================
// Test 9: Per-Agent Skill Allowlist Validation
// ============================================
function testSkillAllowlist() {
  heading('Test 9: Skill Allowlist 驗證');

  // Check skill-allowlist.json source file
  const skillAllowlistPath = path.join(__dirname, '..', 'skill-allowlist.json');
  if (!fs.existsSync(skillAllowlistPath)) {
    fail('skill-allowlist.json 不存在');
    return;
  }

  let allowlist;
  try {
    allowlist = JSON.parse(fs.readFileSync(skillAllowlistPath, 'utf-8'));
  } catch (e) {
    fail(`skill-allowlist.json 解析失敗: ${e.message}`);
    return;
  }
  ok('skill-allowlist.json 解析成功');

  // Validate all agents are covered
  for (const agent of AGENTS) {
    const agentId = `${AGENT_PREFIX}${agent}`;
    if (allowlist[agentId] === undefined) {
      fail(`${agentId} 未在 skill-allowlist.json 中定義`);
    } else if (Array.isArray(allowlist[agentId])) {
      ok(`${agentId}: ${allowlist[agentId].length === 0 ? '[] (封鎖)' : allowlist[agentId].join(', ')}`);
    } else {
      fail(`${agentId} 的值不是陣列`);
    }
  }

  // Validate CHRO and CAO are blocked (empty array)
  if (Array.isArray(allowlist['cc-chro']) && allowlist['cc-chro'].length === 0) {
    ok('cc-chro 正確封鎖（空陣列）');
  } else {
    fail('cc-chro 應為空陣列（完全封鎖）');
  }

  if (Array.isArray(allowlist['cc-cao']) && allowlist['cc-cao'].length === 0) {
    ok('cc-cao 正確封鎖（空陣列）');
  } else {
    fail('cc-cao 應為空陣列（完全封鎖）');
  }

  // Check injection into openclaw.json
  const jsonPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
  if (!fs.existsSync(jsonPath)) {
    skip('openclaw.json 不存在，跳過注入驗證');
    return;
  }

  try {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const stripped = raw.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const config = JSON.parse(stripped);
    const agentList = config?.agents?.list || [];

    let injectedCount = 0;
    for (const agent of AGENTS) {
      const agentId = `${AGENT_PREFIX}${agent}`;
      const entry = agentList.find(a => a.id === agentId);
      if (entry && Array.isArray(entry.skills)) {
        injectedCount++;
      }
    }

    if (injectedCount === AGENTS.length) {
      ok(`openclaw.json 中 ${injectedCount}/${AGENTS.length} 個 Agent 已注入 skills`);
    } else if (injectedCount > 0) {
      fail(`openclaw.json 中只有 ${injectedCount}/${AGENTS.length} 個 Agent 已注入 skills`);
    } else {
      fail('openclaw.json 中沒有 Agent 被注入 skills（未執行 install.js？）');
    }
  } catch (e) {
    skip(`openclaw.json 解析失敗: ${e.message}`);
  }
}

// ============================================
// Main
// ============================================
function main() {
  const args = process.argv.slice(2);
  const testFlag = args.find(a => a.startsWith('--test=') || a.startsWith('--test '));
  const testName = testFlag ? testFlag.split('=')[1] || args[args.indexOf('--test') + 1] : null;

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     Claw Company — OpenClaw Smoke Test                  ║');
  console.log('║     架構審查驗證 (2026-03-10)                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\n安裝目錄: ${INSTALL_DIR}`);
  console.log(`測試時間: ${new Date().toISOString()}`);

  const tests = {
    'install-paths': testInstallPaths,
    'agent-boot': testAgentRegistration,
    'cron-jobs': testCronJobs,
    'channel-bindings': testChannelBindings,
    'workspace-files': testWorkspaceFiles,
    'openclaw-json': testOpenclawJson,
    'context-size': testContextSize,
    'bootstrap-read': () => {
      heading('Test: 啟動必讀行為（需手動驗證）');
      info('此測試需要在 OpenClaw gateway 運行時手動執行');
      info('');
      info('步驟 1: 向 CEO 發送「你的 Agent ID 是什麼？」');
      info('  → 預期回答: cc-ceo');
      info('');
      info('步驟 2: 向 CEO 發送「目前公司有幾個 Agent？列出 Agent ID」');
      info('  → 預期回答: 7 個 Agent (cc-ceo ~ cc-cao)');
      info('');
      info('步驟 3: 向 CTO 發送「Sub-Agent 的執行時間上限是多少？」');
      info('  → 預期回答: 15 分鐘');
      skip('手動測試 — 請在 gateway 運行時執行以上步驟');
    },
    'memory-plugin': () => {
      heading('Test: memory-lancedb-pro Scope 隔離（需手動驗證）');
      info('此測試需要在 OpenClaw gateway 運行時手動執行');
      info('');
      info('步驟 1: 對 main 說「記住我喜歡喝咖啡」');
      info('  → 執行 memory list，確認只有 agent:main scope');
      info('');
      info('步驟 2: 對 cc-ceo 說「記住董事長偏好早上開會」');
      info('  → 執行 memory list，確認有 agent:cc-ceo + project:claw-company scope');
      info('');
      info('步驟 3: 對 cc-cfo 說「查詢記憶」');
      info('  → 確認 cc-cfo 看不到 main 的咖啡記憶');
      info('  → 確認 cc-cfo 可看到 project:claw-company 的公司記憶');
      info('');
      info('步驟 4: 確認 autoRecall 在新 session 時注入冷層記憶');
      skip('手動測試 — 請在 gateway 運行時執行以上步驟');
    },
    'compaction-headings': testPostCompactionHeadings,
    'skill-allowlist': testSkillAllowlist,
    'subagent-spawn': () => {
      heading('Test: Sub-Agent Spawn 全流程（需手動驗證）');
      info('此測試需要在 OpenClaw gateway 運行時手動執行');
      info('');
      info('向 CTO 發送:');
      info('  「幫我建立一個最簡單的 hello world Node.js 專案。');
      info('   只需要一個 index.js 輸出 "Hello World"，加一個測試。');
      info('   使用精簡流程，直接拆解和派發。」');
      info('');
      info('觀察要點:');
      info('  1. CTO 是否啟動 dev-dispatch skill');
      info('  2. CTO 是否 spawn Dev (Ivy) Sub-Agent');
      info('  3. Ivy 是否讀取 engineers/dev.md（看回報是否提到 Ivy）');
      info('  4. Ivy 是否用 TDD 流程（看是否先寫測試）');
      info('  5. Ivy 是否用標準回報格式（任務結果/問題/建議）');
      info('  6. CTO 是否 spawn Code Reviewer (Knox)');
      info('  7. 最終是否回報給董事長');
      skip('手動測試 — 請在 gateway 運行時執行以上步驟');
    },
  };

  if (testName) {
    if (tests[testName]) {
      tests[testName]();
    } else {
      console.error(`未知測試: ${testName}`);
      console.error(`可用測試: ${Object.keys(tests).join(', ')}`);
      process.exit(1);
    }
  } else {
    // Run all tests
    for (const [name, testFn] of Object.entries(tests)) {
      testFn();
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  測試摘要');
  console.log('='.repeat(60));
  console.log(`  ✅ 通過: ${passed}`);
  console.log(`  ❌ 失敗: ${failed}`);
  console.log(`  ⏭️  跳過: ${skipped}`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\n  ⚠️  有失敗項目，請檢查上方詳細資訊');
    process.exit(1);
  } else {
    console.log('\n  🎉 所有自動化測試通過！');
    console.log('  📋 請按 VERIFICATION-PLAN.md 執行手動測試項目');
  }
}

main();
