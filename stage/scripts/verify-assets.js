// Scans theme directories and reports missing/extra/wrong-size sprite assets
const fs = require('node:fs');
const path = require('node:path');

const ROLES = ['chairman', 'ceo', 'cfo', 'cio', 'cto', 'coo', 'chro', 'cao'];
const POSES = ['idle', 'working', 'researching', 'executing', 'dispatching', 'awaiting', 'error'];
const GENDERS = ['male', 'female'];
const EXPECTED_SHEET = { w: 192, h: 64 };

// Read PNG dimensions from IHDR chunk (bytes 16-23)
function readPngSize(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf[0] !== 137 || buf[1] !== 80) return null; // not PNG
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    return { w, h };
  } catch { return null; }
}

function verifyTheme(themeName, themesDir) {
  const report = { theme: themeName, missing: [], wrongSize: [], extra: [], ok: 0 };
  const themeDir = path.join(themesDir, themeName);

  if (!fs.existsSync(themeDir)) {
    report.missing.push(`Theme directory: ${themeName}/`);
    return report;
  }

  // Check characters
  for (const gender of GENDERS) {
    for (const role of ROLES) {
      for (const pose of POSES) {
        const relPath = `sprites/characters/${gender}/${role}-${pose}.png`;
        const fullPath = path.join(themeDir, relPath);
        if (!fs.existsSync(fullPath)) {
          report.missing.push(relPath);
        } else {
          const size = readPngSize(fullPath);
          if (size && (size.w !== EXPECTED_SHEET.w || size.h !== EXPECTED_SHEET.h)) {
            report.wrongSize.push({ file: relPath, actual: size, expected: EXPECTED_SHEET });
          } else {
            report.ok++;
          }
        }
      }
    }
  }

  // Check background
  const bgPath = path.join(themeDir, 'background.png');
  if (!fs.existsSync(bgPath)) {
    report.missing.push('background.png');
  } else {
    report.ok++;
  }

  // Check furniture (from theme.json)
  const themeJsonPath = path.join(themeDir, 'theme.json');
  if (fs.existsSync(themeJsonPath)) {
    const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, 'utf-8'));
    const checked = new Set();
    for (const [name, relPath] of Object.entries(themeJson.furniture || {})) {
      if (checked.has(relPath)) continue;
      checked.add(relPath);
      const fullPath = path.join(themeDir, relPath);
      if (!fs.existsSync(fullPath)) {
        report.missing.push(relPath);
      } else {
        report.ok++;
      }
    }
  }

  return report;
}

// CLI
const themesDir = path.join(__dirname, '..', 'themes');
const themes = process.argv[2]
  ? [process.argv[2]]
  : fs.readdirSync(themesDir).filter(f => fs.statSync(path.join(themesDir, f)).isDirectory());

const allReports = [];
for (const theme of themes) {
  const report = verifyTheme(theme, themesDir);
  allReports.push(report);

  console.log(`\n=== ${theme} ===`);
  console.log(`  OK: ${report.ok}`);
  console.log(`  Missing: ${report.missing.length}`);
  console.log(`  Wrong size: ${report.wrongSize.length}`);
  if (report.missing.length > 0 && report.missing.length <= 10) {
    report.missing.forEach(f => console.log(`    ✗ ${f}`));
  } else if (report.missing.length > 10) {
    report.missing.slice(0, 5).forEach(f => console.log(`    ✗ ${f}`));
    console.log(`    ... and ${report.missing.length - 5} more`);
  }
  report.wrongSize.forEach(f => console.log(`    ⚠ ${f.file}: ${f.actual.w}×${f.actual.h} (expected ${f.expected.w}×${f.expected.h})`));
}

// JSON report
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(allReports, null, 2));
}
