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
