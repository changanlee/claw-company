#!/usr/bin/env node
/**
 * generate-ai-sprites.js
 *
 * Uses Nano Banana Pro (Google Generative AI) img2img to generate
 * consistent sprite poses from idle reference sprites.
 *
 * Usage:
 *   node scripts/generate-ai-sprites.js --pose working --theme modern-office --gender male
 *   node scripts/generate-ai-sprites.js --pose working --theme modern-office --gender male --role chairman
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const STAGE_DIR = path.join(__dirname, '..');
const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = 'nano-banana-pro-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

if (!API_KEY) {
  console.error('Error: NANO_BANANA_API_KEY not set. Add to ~/.zshrc or export it.');
  process.exit(1);
}

// ── Pose definitions per character (from sprite design spec) ──
// ── Pose action prompts ──
// RULES:
//   - Describe BODY POSTURE + HAND ACTIONS only
//   - Held items (coffee, pen, phone, clipboard, magnifying glass) = part of character
//   - NEVER mention furniture (desk, chair, table, keyboard, screen, monitor)
//   - Each pose must be visually DISTINCT from other poses
//   - 4-frame loop must be smooth and logical
const POSE_ACTIONS = {
  idle: {
    chairman: 'standing posture relaxed and confident, holding coffee cup RIGHT hand casually, smirking with head slightly tilted, 4-frame loop: stand-smirk then sip-coffee then look-around then stand-smirk',
    ceo: 'standing posture upright and decisive, holding phone RIGHT hand at side ready, 4-frame loop: stand-firm then glance-at-phone then look-up then stand-firm',
    cfo: 'standing posture neat and proper, holding small notebook LEFT hand pen RIGHT hand at rest, 4-frame loop: stand then adjust-glasses then glance-at-notes then stand',
    cio: 'standing posture calm and observant, arms at sides or hand on chin thinking, 4-frame loop: stand then chin-rest then look-side then stand',
    cto: 'standing posture sleepy and drowsy, both hands in hoodie kangaroo pocket, headphones around neck, half-closed droopy eyes, 4-frame loop: hands-in-pocket-drowsy then yawn-mouth-open then rub-eye-with-one-hand then hands-in-pocket-half-closed-eyes',
    coo: 'standing posture energetic ready to move, holding clipboard LEFT hand, 4-frame loop: stand then bounce then check-clipboard then look-forward',
    chro: 'standing posture elegant and warm, holding clipboard LEFT hand pen RIGHT hand, gentle smile, 4-frame loop: stand-smile then write-note then look-up then stand-smile',
    cao: 'standing posture watchful and still, holding magnifying glass RIGHT hand at side, 4-frame loop: stand then raise-magnifier then inspect then lower-magnifier',
  },
  working: {
    chairman: 'sitting posture with knees bent body leaning back relaxed, RIGHT hand holding coffee cup sipping while LEFT hand rests on lap, looking forward, 4-frame loop: look-forward then sip-coffee then set-cup-down then type-one-hand-gesture',
    ceo: 'sitting posture with knees bent body upright, phone wedged between RIGHT ear and shoulder while both hands typing gesture in front of body, 4-frame loop: type-gesture then tilt-head-listen then type-gesture then speak-into-phone',
    cfo: 'sitting posture with knees bent very upright and proper, both hands typing gesture in front of body precisely, 4-frame loop: type-gesture then pause then push-up-glasses then type-gesture',
    cio: 'sitting posture with knees bent leaning back, RIGHT hand on chin analyzing LEFT hand resting, looking forward thoughtfully, 4-frame loop: stare then lean-forward then point-forward then lean-back-think',
    cto: 'sitting posture with knees bent hunched far forward intensely, both hands typing gesture rapidly in front of body, headphones ON ears, 4-frame loop: rapid-type-gesture then squint then rapid-type-gesture then scratch-head',
    coo: 'sitting posture with knees bent upright and energetic, both hands typing gesture in front of body, professional orange suit, 4-frame loop: type-gesture then check-note then type-gesture then nod',
    chro: 'sitting posture with knees bent elegantly, RIGHT hand using mouse gesture LEFT hand supporting chin, warm expression, 4-frame loop: click-gesture then read then smile then type-briefly',
    cao: 'standing posture walking around, holding magnifying glass RIGHT hand examining paper LEFT hand closely during inspection rounds, 4-frame loop: walk-inspect then stop-examine then squint-closely then write-note',
  },
  researching: {
    // chairman: not applicable — chairman is human, doesn't research
    ceo: 'standing posture arms crossed listening attentively, 4-frame loop: listen then nod then unfold-arms-ask then cross-arms-again',
    cfo: 'sitting posture focused forward, holding papers LEFT hand marking with pen RIGHT hand, 4-frame loop: scan then circle-number then compare then check-mark',
    cio: 'sitting posture leaning forward, right hand pointing forward at data left hand holding notes, 4-frame loop: study then trace-line then think then jot-note',
    cto: 'sitting posture hunched forward intensely focused, both hands typing gesture rapidly in front of body, headphones ON ears, 4-frame loop: rapid-type-gesture then squint then scratch-head then rapid-type-gesture',
    coo: 'walking posture moving between spots, holding clipboard checking things, 4-frame loop: walk-step then stop-check then write-note then walk-step',
    chro: 'sitting posture warm and attentive, flipping through folder both hands, 4-frame loop: read then flip then think-smile then nod',
    cao: 'standing posture meticulous, holding two documents side by side both hands comparing, 4-frame loop: compare then flip-one then squint then write-note',
  },
  executing: {
    // chairman: not applicable — chairman is human, doesn't execute
    ceo: 'standing posture commanding, pointing forward RIGHT hand giving orders decisively, 4-frame loop: point then speak then open-palm-gesture then nod-confirm',
    cfo: 'sitting posture precise, RIGHT hand tapping calculator gesture LEFT hand writing numbers, 4-frame loop: calculate then write then verify then nod',
    cio: 'sitting posture focused, both hands tapping and swiping in air executing operations, 4-frame loop: tap then swipe then confirm-gesture then thumbs-up',
    cto: 'sitting posture intense, both hands hovering then dramatic single press gesture deploying, 4-frame loop: type-command then hover-finger then press then fist-pump',
    coo: 'standing posture efficient, holding clipboard writing and tearing page to hand out, 4-frame loop: write then tear-page then extend-arm then check-off',
    chro: 'standing posture professional, signing document RIGHT hand then distributing forward, 4-frame loop: sign then stamp then hold-up then extend-forward',
    cao: 'standing posture authoritative, holding magnifying glass RIGHT hand stamping with LEFT, 4-frame loop: examine then write then stamp then present-forward',
  },
  dispatching: {
    chairman: 'standing posture, extending RIGHT hand forward handing document to someone, 4-frame loop: hold-paper then extend-arm then release then return-hand',
    ceo: 'walking posture purposeful stride, carrying document RIGHT hand approaching, 4-frame loop: walk-step1 then walk-step2 then reach-out then hand-over',
    cfo: 'standing posture careful, extending ledger book forward with both hands, 4-frame loop: hold-close then extend then release then step-back',
    cio: 'standing posture, presenting report forward RIGHT hand explaining, 4-frame loop: hold-report then extend then gesture-explain then hand-over',
    cto: 'sitting posture as if on invisible chair knees bent at 90 degrees thighs horizontal feet flat on ground, casual and relaxed, holding document RIGHT hand extending forward to hand it over, headphones around neck, 4-frame loop: hold-paper then lean-forward then extend-arm-hand-over then sit-back-relaxed',
    coo: 'running posture energetic, carrying package with both hands rushing, 4-frame loop: run-step1 then run-step2 then arrive-slow then hand-over',
    chro: 'standing posture graceful, holding stack of papers peeling one off to give, 4-frame loop: hold-stack then peel-one then extend-arm then smile',
    cao: 'standing posture formal, presenting document forward with both hands officially, 4-frame loop: hold-report then slight-bow then present then step-back',
  },
  awaiting: {
    chairman: 'sitting posture impatient, checking wristwatch RIGHT hand tapping knee LEFT hand, 4-frame loop: check-watch then tap then sigh then check-watch-again',
    ceo: 'standing posture firm, arms crossed slight foot tap waiting, 4-frame loop: cross-arms then tap-foot then glance-side then cross-arms',
    cfo: 'sitting posture tidy, straightening papers in hands while waiting, 4-frame loop: straighten then align then fold-hands then tap-finger',
    cio: 'sitting posture patient, chin resting on hand staring forward waiting, 4-frame loop: stare then chin-rest then blink then lean-forward',
    cto: 'sitting posture relaxed, headphones ON ears eyes closed nodding to music, 4-frame loop: nod-right then nod-left then head-bob then tap-knee',
    coo: 'standing posture anxious, pacing and checking clipboard nervously, 4-frame loop: pace-right then check-clipboard then pace-left then look-around',
    chro: 'standing posture calm, holding tea cup both hands sipping peacefully, 4-frame loop: sip then hold-cup-smile then blow-steam then sip',
    cao: 'standing posture still, hands clasped behind back observing silently, 4-frame loop: stand-still then slight-shift then observe-squint then stand-still',
  },
  error: {
    // chairman: not applicable — chairman is human, doesn't error
    ceo: 'standing posture angry, slamming fist down in air then pointing accusingly, 4-frame loop: fist-slam then point then speak-firmly then cross-arms',
    cfo: 'sitting posture stressed, pushing up glasses then frowning holding document, 4-frame loop: squint then push-glasses then frown then shake-head',
    cio: 'sitting posture tense, frowning forward with concerned expression hands on knees, 4-frame loop: frown then lean-forward then rub-chin then shake-head',
    cto: 'sitting posture calm-focused, hands in typing position debugging intensely, 4-frame loop: read-error then think-scratch then type-fix then test-watch',
    coo: 'standing posture panicked, spinning and looking around flustered, 4-frame loop: gasp then spin-left then check-clipboard then hands-on-head',
    chro: 'standing posture worried, clasping hands together looking concerned, 4-frame loop: hear-news then worry-face then clasp-hands then look-away',
    cao: 'standing posture disappointed, sighing with shoulders dropping slowly, 4-frame loop: sigh then drop-shoulders then shake-head then compose-straighten',
  },
};

// ── Character visual descriptions (must match idle sprites exactly) ──
const CHARACTER_VISUALS = {
  chairman: 'male East-Asian chairman in red suit gold tie, side-parted black hair swept to right, V-shaped jawline oval face, clean-shaven no glasses, confident smirk',
  ceo: 'male CEO in blue suit white shirt, undercut dark-brown short hair, decisive professional expression',
  cfo: 'male CFO in amber vest white shirt tie, round glasses, neat gold short hair, meticulous expression',
  cio: 'male CIO in purple turtleneck sweater, curly silver-purple fluffy hair, calm analytical expression',
  cto: 'male CTO in green hoodie, headphones around neck, messy green spiky hair, focused intense expression',
  coo: 'male COO in orange double-breasted suit jacket black shirt, short side-parted layered brown hair with volume on top, sharp executive sophisticated look, energetic confident expression',
  chro: 'male CHRO in pink blazer with ornate details GDragon style, messy pink-salmon short hair, edgy fashionable androgynous look, confident expression',
  cao: 'male CAO in dark gray trenchcoat yellow scarf, magnifying glass, slicked-back gray-white hair, scrutinizing expression',
};

const STYLE_PREFIX = 'pixel art sprite sheet, 4 frames in a row 192x64, each 48x64, chibi 2-head ratio, isometric 3/4 view, CHARACTER ONLY on solid pure white background no furniture, bright vivid saturated cheerful palette, visible pixel grid texture, soft dark outlines not pure black, minimal frame-to-frame difference smooth looping animation';
const STYLE_SUFFIX = 'same outfit same colors all frames';

// ── Parse CLI args ──
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}

const pose = getArg('pose');
const theme = getArg('theme') || 'modern-office';
const gender = getArg('gender') || 'male';
const singleRole = getArg('role');
const forceRef = getArg('ref'); // Override reference: e.g. --ref working → use {role}-working.png
const dryRun = args.includes('--dry-run');

if (!pose || !POSE_ACTIONS[pose]) {
  console.error(`Usage: node generate-ai-sprites.js --pose <${Object.keys(POSE_ACTIONS).join('|')}> [--theme <theme>] [--gender <gender>] [--role <role>] [--dry-run]`);
  process.exit(1);
}

const roles = singleRole ? [singleRole] : Object.keys(CHARACTER_VISUALS);

// ── API call function ──
function callNanoBanana(idleImageBase64, promptText) {
  return new Promise((resolve, reject) => {
    const parts = idleImageBase64
      ? [
          { inlineData: { mimeType: 'image/png', data: idleImageBase64 } },
          { text: promptText }
        ]
      : [{ text: promptText }];
    const body = JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
    });

    const url = new URL(`${API_URL}?key=${API_KEY}`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          if (data.error) {
            reject(new Error(`API error: ${data.error.message}`));
            return;
          }
          const parts = data.candidates?.[0]?.content?.parts || [];
          const imgPart = parts.find(p => p.inlineData);
          if (!imgPart) {
            reject(new Error('No image in response'));
            return;
          }
          resolve(Buffer.from(imgPart.inlineData.data, 'base64'));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body);
    req.end();
  });
}

// ── Image processing (resize + flood-fill bg removal) ──
function processSprite(rawBuffer) {
  const tmpRaw = `/tmp/nano-sprite-raw-${Date.now()}.png`;
  const tmpOut = `/tmp/nano-sprite-out-${Date.now()}.png`;
  fs.writeFileSync(tmpRaw, rawBuffer);

  const { execSync } = require('child_process');
  // Step 1: Resize to 192x64
  execSync(`python3 -c "
from PIL import Image
Image.open('${tmpRaw}').convert('RGBA').resize((192, 64), Image.NEAREST).save('${tmpOut}')
"`, { timeout: 10000 });

  // Step 2: Flood-fill bg removal on resized image
  execSync(`python3 -c "
from PIL import Image
import numpy as np
from collections import deque

img = Image.open('${tmpOut}').convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]

# Sample bg from all 4 edges
edge_px = []
for x in range(w):
    edge_px.append(arr[0, x, :3])
    edge_px.append(arr[h-1, x, :3])
for y in range(h):
    edge_px.append(arr[y, 0, :3])
    edge_px.append(arr[y, w-1, :3])
bg = np.median(np.array(edge_px, dtype=int), axis=0).astype(int)

# Edge flood-fill
visited = np.zeros((h, w), dtype=bool)
queue = deque()
for x in range(w):
    queue.append((0, x))
    queue.append((h-1, x))
for y in range(h):
    queue.append((y, 0))
    queue.append((y, w-1))
while queue:
    cy, cx = queue.popleft()
    if cy < 0 or cy >= h or cx < 0 or cx >= w or visited[cy, cx]:
        continue
    visited[cy, cx] = True
    ri, gi, bi = int(arr[cy,cx,0]), int(arr[cy,cx,1]), int(arr[cy,cx,2])
    dr, dg, db = abs(ri-int(bg[0])), abs(gi-int(bg[1])), abs(bi-int(bg[2]))
    if dr < 35 and dg < 35 and db < 35:
        arr[cy, cx, 3] = 0
        for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
            ny, nx = cy+dy, cx+dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                queue.append((ny, nx))

Image.fromarray(arr).save('${tmpOut}')
"`, { timeout: 30000 });

  const output = fs.readFileSync(tmpOut);
  try { fs.unlinkSync(tmpRaw); } catch {}
  try { fs.unlinkSync(tmpOut); } catch {}
  return output;
}

// ── Main ──
async function main() {
  console.log(`\n🎨 Generating ${pose} sprites for ${theme}/${gender}`);
  console.log(`   Roles: ${roles.join(', ')}\n`);

  for (const role of roles) {
    const idlePath = path.join(STAGE_DIR, 'themes', theme, 'sprites', 'characters', gender, `${role}-idle.png`);
    const outPath = path.join(STAGE_DIR, 'themes', theme, 'sprites', 'characters', gender, `${role}-${pose}.png`);

    const actionDesc = POSE_ACTIONS[pose][role];
    if (!actionDesc) {
      console.log(`  ✗ ${role}: no action description for pose "${pose}"`);
      continue;
    }

    // Always use img2img — reference priority depends on role
    // Chairman uses existing sprites (user's likeness), others use Pencil reference first
    // --ref flag overrides all reference selection logic
    const penRefDir = path.join(STAGE_DIR, 'docs', 'design-references', 'pen-exports');
    const baseDir = path.join(STAGE_DIR, 'themes', theme, 'sprites', 'characters', gender);
    let refPath = null;

    if (forceRef) {
      // Manual override: --ref working → use {role}-working.png as reference
      const forced = path.join(baseDir, `${role}-${forceRef}.png`);
      if (fs.existsSync(forced)) {
        refPath = forced;
      } else {
        console.log(`  ✗ ${role}: --ref ${forceRef} not found at ${forced}`);
        continue;
      }
    } else {
      const SKIP_PENCIL_REF = ['chairman']; // These roles need existing sprites, not Pencil ref
      const penRef = path.join(penRefDir, `${role}-ref.png`);

      if (!SKIP_PENCIL_REF.includes(role) && fs.existsSync(penRef)) {
        // 1st priority for non-chairman: Pencil reference sprite (style standard)
        refPath = penRef;
      } else {
        // Chairman or no Pencil ref: use existing generated sprites
        const allPoses = ['idle', 'working', 'researching', 'executing', 'dispatching', 'awaiting', 'error'];
        const refOrder = pose === 'idle'
          ? allPoses.filter(p => p !== 'idle')
          : ['idle', ...allPoses.filter(p => p !== 'idle' && p !== pose)];
        for (const rp of refOrder) {
          const candidate = path.join(baseDir, `${role}-${rp}.png`);
          if (fs.existsSync(candidate)) { refPath = candidate; break; }
        }
      }
    }

    let refBase64 = null;
    let prompt;
    if (refPath) {
      refBase64 = fs.readFileSync(refPath).toString('base64');
      prompt = `Using this pixel art sprite sheet as character reference (KEEP THE EXACT SAME character design, outfit, hair, colors, pixel art style and quality), generate a NEW sprite sheet in the EXACT same format: 4 frames in a row 192x64 pixels, each frame 48x64. ${STYLE_PREFIX}, ${CHARACTER_VISUALS[role]}, ${actionDesc}, ${STYLE_SUFFIX}`;
    } else {
      // Fallback: text-only (only if zero sprites exist for this character)
      prompt = `${STYLE_PREFIX}, ${CHARACTER_VISUALS[role]}, ${actionDesc}, ${STYLE_SUFFIX}`;
    }

    if (dryRun) {
      console.log(`  ⏭ ${role}: [dry-run] ${refPath ? 'img2img ref=' + path.basename(refPath) : 'text-only'} prompt:`);
      console.log(`    ${prompt.substring(0, 120)}...\n`);
      continue;
    }

    process.stdout.write(`  ⏳ ${role} (${refPath ? 'ref=' + path.basename(refPath) : 'text-only'})...`);
    try {
      const rawImage = await callNanoBanana(refBase64, prompt);
      const processed = processSprite(rawImage);
      fs.writeFileSync(outPath, processed);
      console.log(` ✓ saved (${processed.length} bytes)`);
    } catch (err) {
      console.log(` ✗ ${err.message}`);
    }

    // Rate limit: wait 2s between calls
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
