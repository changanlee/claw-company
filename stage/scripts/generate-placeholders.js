// Generates minimal placeholder PNGs using raw binary data (no dependencies)
const fs = require('node:fs');
const path = require('node:path');

// Minimal 1x1 PNG generator with solid color
function createPng(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0); // length
  ihdr.write('IHDR', 4);
  ihdr.writeUInt32BE(width, 8);
  ihdr.writeUInt32BE(height, 12);
  ihdr[16] = 8; // bit depth
  ihdr[17] = 2; // color type (RGB)
  ihdr[18] = 0; // compression
  ihdr[19] = 0; // filter
  ihdr[20] = 0; // interlace

  // CRC for IHDR
  const crc32 = crc(ihdr.subarray(4, 21));
  ihdr.writeUInt32BE(crc32, 21);

  // IDAT chunk - raw image data with zlib
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0; // filter none
    for (let x = 0; x < width; x++) {
      const offset = y * (1 + width * 3) + 1 + x * 3;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
    }
  }

  const { deflateSync } = require('node:zlib');
  const compressed = deflateSync(raw);

  const idat = Buffer.alloc(compressed.length + 12);
  idat.writeUInt32BE(compressed.length, 0);
  idat.write('IDAT', 4);
  compressed.copy(idat, 8);
  const idatCrc = crc(Buffer.concat([Buffer.from('IDAT'), compressed]));
  idat.writeUInt32BE(idatCrc, compressed.length + 8);

  // IEND chunk
  const iend = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// CRC32 implementation
function crc(buf) {
  let c = 0xFFFFFFFF;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let v = n;
    for (let k = 0; k < 8; k++) v = v & 1 ? 0xEDB88320 ^ (v >>> 1) : v >>> 1;
    table[n] = v;
  }
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

const themeDir = path.join(__dirname, '..', 'themes', 'modern-office');

const assets = [
  { path: 'background.png', w: 1920, h: 1080, r: 30, g: 30, b: 50 },
  { path: 'sprites/characters/default.png', w: 128, h: 128, r: 100, g: 150, b: 200 },
  { path: 'sprites/furniture/desk.png', w: 64, h: 48, r: 120, g: 90, b: 60 },
  { path: 'sprites/furniture/sofa.png', w: 96, h: 48, r: 80, g: 60, b: 100 },
  { path: 'sprites/effects/document.png', w: 16, h: 20, r: 240, g: 240, b: 240 },
];

for (const asset of assets) {
  const fullPath = path.join(themeDir, asset.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const png = createPng(asset.w, asset.h, asset.r, asset.g, asset.b);
  fs.writeFileSync(fullPath, png);
  console.log(`Created ${asset.path} (${asset.w}x${asset.h})`);
}

console.log('Done — all placeholder assets generated.');
