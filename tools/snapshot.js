#!/usr/bin/env node

/**
 * snapshot.js — 通用專案快照產生器
 *
 * 丟進任何專案根目錄，執行 `node snapshot.js` 即可產生快照。
 * 零外部依賴，僅使用 Node.js 內建模組。
 *
 * 支援語言：JS/TS/Vue, Python, Go, Rust, Java/Kotlin, Ruby, PHP, C#
 * 產出內容：目錄結構 + 函式/類別清單 + 依賴清單
 *
 * Usage:
 *   node snapshot.js                    # 產生 SNAPSHOT.md
 *   node snapshot.js --out snapshot.txt # 自訂輸出檔名
 *   node snapshot.js --stdout           # 輸出到 stdout（方便 pipe）
 *   node snapshot.js --copy             # 同時複製到剪貼簿 (macOS)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── 設定區 ─────────────────────────────────────────────
const CONFIG = {
  // 排除的目錄名稱
  excludeDirs: new Set([
    "node_modules",
    ".git",
    ".svn",
    ".hg",
    "dist",
    "build",
    "out",
    ".next",
    ".nuxt",
    ".output",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".venv",
    "venv",
    "env",
    ".env",
    "target",        // Rust/Java
    "vendor",        // Go/PHP
    ".gradle",
    ".idea",
    ".vscode",
    "coverage",
    ".turbo",
    ".cache",
    ".parcel-cache",
    "tmp",
    ".tmp",
    ".DS_Store",
  ]),

  // 排除的檔案 pattern（正則）
  excludeFiles: [
    /^\.DS_Store$/,
    /^\.env/,
    /\.lock$/,
    /\.min\./,
    /\.map$/,
    /\.d\.ts$/,
    /\.snap$/,
    /\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$|\.ico$|\.webp$/,
    /\.woff$|\.woff2$|\.ttf$|\.eot$/,
    /\.mp3$|\.mp4$|\.wav$|\.avi$/,
    /\.pdf$|\.zip$|\.tar$|\.gz$/,
    /^package-lock\.json$/,
    /^yarn\.lock$/,
    /^pnpm-lock\.yaml$/,
    /^bun\.lockb$/,
  ],

  // 要掃描函式的副檔名
  scanExtensions: new Set([
    ".js", ".mjs", ".cjs",
    ".ts", ".mts", ".cts",
    ".tsx", ".jsx",
    ".vue", ".svelte",
    ".py",
    ".go",
    ".rs",
    ".java", ".kt", ".kts",
    ".rb",
    ".php",
    ".cs",
  ]),

  // 目錄樹最大深度
  maxTreeDepth: 6,

  // 輸出檔名
  outputFile: "SNAPSHOT.md",
};

// ─── CLI 參數解析 ────────────────────────────────────────
const args = process.argv.slice(2);
const flags = {
  stdout: args.includes("--stdout"),
  copy: args.includes("--copy"),
  out: null,
};
const outIdx = args.indexOf("--out");
if (outIdx !== -1 && args[outIdx + 1]) {
  flags.out = args[outIdx + 1];
}
const outputPath = flags.out || CONFIG.outputFile;

// ─── 工具函式 ────────────────────────────────────────────
const ROOT = process.cwd();

function shouldExcludeDir(name) {
  return CONFIG.excludeDirs.has(name) || name.startsWith(".");
}

function shouldExcludeFile(name) {
  return CONFIG.excludeFiles.some((re) => re.test(name));
}

// ─── 1. 目錄樹 ──────────────────────────────────────────
function buildTree(dir, prefix = "", depth = 0) {
  if (depth > CONFIG.maxTreeDepth) return prefix + "└── ...\n";

  let result = "";
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return result;
  }

  // 排序：目錄在前，檔案在後
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  // 過濾
  entries = entries.filter((e) => {
    if (e.isDirectory()) return !shouldExcludeDir(e.name);
    return !shouldExcludeFile(e.name);
  });

  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";

    if (entry.isDirectory()) {
      result += `${prefix}${connector}${entry.name}/\n`;
      result += buildTree(
        path.join(dir, entry.name),
        prefix + childPrefix,
        depth + 1
      );
    } else {
      result += `${prefix}${connector}${entry.name}\n`;
    }
  });

  return result;
}

// ─── 2. 函式解析器 ──────────────────────────────────────
const parsers = {
  // JavaScript / TypeScript
  js(content, filePath) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // 收集前面的 JSDoc 或 // 註解
      let comment = "";
      if (i > 0) {
        let j = i - 1;
        const commentLines = [];
        while (j >= 0) {
          const cl = lines[j].trim();
          if (cl.startsWith("//") || cl.startsWith("*") || cl.startsWith("/*") || cl.startsWith("*/")) {
            commentLines.unshift(cl.replace(/^\/\*\*?\s?|^\*\/?\s?|^\/\/\s?/g, "").trim());
            j--;
          } else {
            break;
          }
        }
        comment = commentLines.filter(Boolean).join(" ").slice(0, 120);
      }

      let match;

      // export function / export async function
      match = trimmed.match(
        /^export\s+(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
        continue;
      }

      // export const xxx = (...) => / function
      match = trimmed.match(
        /^export\s+(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(([^)]*)\)\s*(?:=>|:)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
        continue;
      }

      // function declaration (non-export)
      match = trimmed.match(
        /^(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/
      );
      if (match && !trimmed.startsWith("//")) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
        continue;
      }

      // class methods
      match = trimmed.match(
        /^(?:async\s+)?(\w+)\s*\(([^)]*)\)\s*\{/
      );
      if (match && !["if", "for", "while", "switch", "catch", "constructor"].includes(match[1])) {
        // 確認上下文是 class 內
        if (isInsideClass(lines, i)) {
          fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1, kind: "method" });
        }
        continue;
      }

      // class declaration
      match = trimmed.match(/^(?:export\s+)?(?:default\s+)?(?:abstract\s+)?class\s+(\w+)/);
      if (match) {
        fns.push({ name: match[1], params: "", comment, line: i + 1, kind: "class" });
      }
    }

    return fns;
  },

  // Python
  py(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let match;

      // docstring（下一行）
      let comment = "";
      if (i + 1 < lines.length) {
        const next = lines[i + 1].trim();
        if (next.startsWith('"""') || next.startsWith("'''")) {
          comment = next.replace(/^['"`]{3}\s?|['"`]{3}$/g, "").slice(0, 120);
        }
      }
      // 上一行 # 註解
      if (!comment && i > 0) {
        const prev = lines[i - 1].trim();
        if (prev.startsWith("#")) {
          comment = prev.replace(/^#\s?/, "").slice(0, 120);
        }
      }

      match = trimmed.match(/^(?:async\s+)?def\s+(\w+)\s*\(([^)]*)\)/);
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
        continue;
      }

      match = trimmed.match(/^class\s+(\w+)(?:\(([^)]*)\))?/);
      if (match) {
        fns.push({ name: match[1], params: match[2]?.trim() || "", comment, line: i + 1, kind: "class" });
      }
    }

    return fns;
  },

  // Go
  go(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let comment = "";
      if (i > 0 && lines[i - 1].trim().startsWith("//")) {
        comment = lines[i - 1].trim().replace(/^\/\/\s?/, "").slice(0, 120);
      }

      // func (receiver) Name(params) returns
      const match = trimmed.match(
        /^func\s+(?:\(\w+\s+\*?\w+\)\s+)?(\w+)\s*\(([^)]*)\)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
      }

      // type struct
      const structMatch = trimmed.match(/^type\s+(\w+)\s+struct\s*\{/);
      if (structMatch) {
        fns.push({ name: structMatch[1], params: "", comment, line: i + 1, kind: "struct" });
      }
    }

    return fns;
  },

  // Rust
  rs(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let comment = "";
      if (i > 0 && lines[i - 1].trim().startsWith("///")) {
        comment = lines[i - 1].trim().replace(/^\/\/\/\s?/, "").slice(0, 120);
      }

      const match = trimmed.match(
        /^(?:pub(?:\(crate\))?\s+)?(?:async\s+)?fn\s+(\w+)\s*(?:<[^>]*>)?\s*\(([^)]*)\)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
      }

      const structMatch = trimmed.match(/^(?:pub\s+)?struct\s+(\w+)/);
      if (structMatch) {
        fns.push({ name: structMatch[1], params: "", comment, line: i + 1, kind: "struct" });
      }
    }

    return fns;
  },

  // Java / Kotlin
  java(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let comment = "";
      if (i > 0) {
        const prev = lines[i - 1].trim();
        if (prev.startsWith("*") || prev.startsWith("//")) {
          comment = prev.replace(/^\*\s?|^\/\/\s?/g, "").slice(0, 120);
        }
      }

      // class / interface
      const classMatch = trimmed.match(
        /^(?:public\s+|private\s+|protected\s+)?(?:abstract\s+)?(?:class|interface|enum)\s+(\w+)/
      );
      if (classMatch) {
        fns.push({ name: classMatch[1], params: "", comment, line: i + 1, kind: "class" });
        continue;
      }

      // method
      const match = trimmed.match(
        /^(?:public|private|protected|static|final|abstract|synchronized|\s)+\s+\w+(?:<[^>]*>)?\s+(\w+)\s*\(([^)]*)\)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
      }
    }

    return fns;
  },

  // Ruby
  rb(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let comment = "";
      if (i > 0 && lines[i - 1].trim().startsWith("#")) {
        comment = lines[i - 1].trim().replace(/^#\s?/, "").slice(0, 120);
      }

      const match = trimmed.match(/^def\s+(\w+[?!]?)\s*(?:\(([^)]*)\))?/);
      if (match) {
        fns.push({ name: match[1], params: match[2]?.trim() || "", comment, line: i + 1 });
      }

      const classMatch = trimmed.match(/^class\s+(\w+)/);
      if (classMatch) {
        fns.push({ name: classMatch[1], params: "", comment, line: i + 1, kind: "class" });
      }
    }

    return fns;
  },

  // PHP
  php(content) {
    const fns = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      let comment = "";
      if (i > 0) {
        const prev = lines[i - 1].trim();
        if (prev.startsWith("*") || prev.startsWith("//")) {
          comment = prev.replace(/^\*\s?|^\/\/\s?/g, "").slice(0, 120);
        }
      }

      const match = trimmed.match(
        /^(?:public|private|protected|static|\s)*\s*function\s+(\w+)\s*\(([^)]*)\)/
      );
      if (match) {
        fns.push({ name: match[1], params: match[2].trim(), comment, line: i + 1 });
      }

      const classMatch = trimmed.match(/^(?:abstract\s+)?class\s+(\w+)/);
      if (classMatch) {
        fns.push({ name: classMatch[1], params: "", comment, line: i + 1, kind: "class" });
      }
    }

    return fns;
  },

  // C#
  cs(content) {
    return parsers.java(content); // 非常相似的語法
  },
};

// Vue/Svelte → 萃取 <script> 後用 JS parser
function extractScript(content) {
  const match = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  return match ? match[1] : "";
}

function isInsideClass(lines, index) {
  let braceCount = 0;
  for (let i = index - 1; i >= 0; i--) {
    const line = lines[i];
    for (const ch of line) {
      if (ch === "}") braceCount++;
      if (ch === "{") braceCount--;
    }
    if (/\bclass\s+\w+/.test(line) && braceCount < 0) return true;
  }
  return false;
}

function getParser(ext) {
  if ([".js", ".mjs", ".cjs", ".ts", ".mts", ".cts", ".tsx", ".jsx"].includes(ext)) return parsers.js;
  if ([".vue", ".svelte"].includes(ext)) return (content, fp) => parsers.js(extractScript(content), fp);
  if (ext === ".py") return parsers.py;
  if (ext === ".go") return parsers.go;
  if (ext === ".rs") return parsers.rs;
  if ([".java", ".kt", ".kts"].includes(ext)) return parsers.java;
  if (ext === ".rb") return parsers.rb;
  if (ext === ".php") return parsers.php;
  if (ext === ".cs") return parsers.cs;
  return null;
}

// ─── 3. 遞迴掃描檔案 ────────────────────────────────────
function scanFiles(dir) {
  const results = []; // { relativePath, functions[] }

  function walk(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!shouldExcludeDir(entry.name)) {
          walk(path.join(current, entry.name));
        }
      } else {
        if (shouldExcludeFile(entry.name)) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (!CONFIG.scanExtensions.has(ext)) continue;

        const parser = getParser(ext);
        if (!parser) continue;

        const fullPath = path.join(current, entry.name);
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          const fns = parser(content, fullPath);
          if (fns.length > 0) {
            results.push({
              relativePath: path.relative(ROOT, fullPath),
              functions: fns,
            });
          }
        } catch {
          // 跳過無法讀取的檔案
        }
      }
    }
  }

  walk(dir);
  return results;
}

// ─── 4. 依賴收集 ─────────────────────────────────────────
function collectDependencies() {
  const deps = {};

  // package.json (JS/TS)
  const pkgPath = path.join(ROOT, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.dependencies) deps["dependencies (npm)"] = Object.keys(pkg.dependencies);
      if (pkg.devDependencies) deps["devDependencies (npm)"] = Object.keys(pkg.devDependencies);
    } catch { /* ignore */ }
  }

  // requirements.txt (Python)
  const reqPath = path.join(ROOT, "requirements.txt");
  if (fs.existsSync(reqPath)) {
    try {
      const lines = fs.readFileSync(reqPath, "utf-8").split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"));
      if (lines.length) deps["dependencies (pip)"] = lines;
    } catch { /* ignore */ }
  }

  // pyproject.toml (Python) — 簡易解析
  const pyprojectPath = path.join(ROOT, "pyproject.toml");
  if (fs.existsSync(pyprojectPath)) {
    try {
      const content = fs.readFileSync(pyprojectPath, "utf-8");
      const match = content.match(/dependencies\s*=\s*\[([\s\S]*?)\]/);
      if (match) {
        const pkgs = match[1].match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];
        if (pkgs.length) deps["dependencies (pyproject)"] = pkgs;
      }
    } catch { /* ignore */ }
  }

  // go.mod (Go)
  const goModPath = path.join(ROOT, "go.mod");
  if (fs.existsSync(goModPath)) {
    try {
      const content = fs.readFileSync(goModPath, "utf-8");
      const requires = [];
      const reqBlock = content.match(/require\s*\(([\s\S]*?)\)/);
      if (reqBlock) {
        reqBlock[1].split("\n").forEach((line) => {
          const m = line.trim().match(/^(\S+)\s+/);
          if (m) requires.push(m[1]);
        });
      }
      if (requires.length) deps["dependencies (go)"] = requires;
    } catch { /* ignore */ }
  }

  // Cargo.toml (Rust)
  const cargoPath = path.join(ROOT, "Cargo.toml");
  if (fs.existsSync(cargoPath)) {
    try {
      const content = fs.readFileSync(cargoPath, "utf-8");
      const depSection = content.match(/\[dependencies\]([\s\S]*?)(?:\[|$)/);
      if (depSection) {
        const pkgs = [];
        depSection[1].split("\n").forEach((line) => {
          const m = line.trim().match(/^(\w[\w-]*)\s*=/);
          if (m) pkgs.push(m[1]);
        });
        if (pkgs.length) deps["dependencies (cargo)"] = pkgs;
      }
    } catch { /* ignore */ }
  }

  // Gemfile (Ruby)
  const gemfilePath = path.join(ROOT, "Gemfile");
  if (fs.existsSync(gemfilePath)) {
    try {
      const gems = [];
      fs.readFileSync(gemfilePath, "utf-8").split("\n").forEach((line) => {
        const m = line.trim().match(/^gem\s+['"](\w[\w-]*)['"]/);
        if (m) gems.push(m[1]);
      });
      if (gems.length) deps["dependencies (gem)"] = gems;
    } catch { /* ignore */ }
  }

  // composer.json (PHP)
  const composerPath = path.join(ROOT, "composer.json");
  if (fs.existsSync(composerPath)) {
    try {
      const composer = JSON.parse(fs.readFileSync(composerPath, "utf-8"));
      if (composer.require) deps["dependencies (composer)"] = Object.keys(composer.require);
    } catch { /* ignore */ }
  }

  return deps;
}

// ─── 5. 專案資訊偵測 ─────────────────────────────────────
function detectProjectInfo() {
  const info = { name: path.basename(ROOT), type: [], version: "" };

  const pkgPath = path.join(ROOT, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      info.name = pkg.name || info.name;
      info.version = pkg.version || "";
      if (pkg.dependencies?.next || pkg.dependencies?.["next"]) info.type.push("Next.js");
      else if (pkg.dependencies?.nuxt) info.type.push("Nuxt");
      else if (pkg.dependencies?.react) info.type.push("React");
      else if (pkg.dependencies?.vue) info.type.push("Vue");
      else if (pkg.dependencies?.svelte) info.type.push("Svelte");
      else if (pkg.dependencies?.express) info.type.push("Express");
      if (pkg.dependencies?.typescript || pkg.devDependencies?.typescript) info.type.push("TypeScript");
    } catch { /* ignore */ }
  }
  if (fs.existsSync(path.join(ROOT, "go.mod"))) info.type.push("Go");
  if (fs.existsSync(path.join(ROOT, "Cargo.toml"))) info.type.push("Rust");
  if (fs.existsSync(path.join(ROOT, "pyproject.toml")) || fs.existsSync(path.join(ROOT, "requirements.txt"))) info.type.push("Python");
  if (fs.existsSync(path.join(ROOT, "Gemfile"))) info.type.push("Ruby");
  if (fs.existsSync(path.join(ROOT, "composer.json"))) info.type.push("PHP");

  if (info.type.length === 0) info.type.push("Unknown");
  return info;
}

// ─── 6. 組裝輸出 ─────────────────────────────────────────
function generate() {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  const info = detectProjectInfo();

  let out = "";
  out += `# ${info.name} — Project Snapshot\n\n`;
  out += `> Generated: ${now}\n`;
  if (info.version) out += `> Version: ${info.version}\n`;
  out += `> Stack: ${info.type.join(", ")}\n\n`;

  // 目錄結構
  out += `## Directory Structure\n\n`;
  out += "```\n";
  out += `${path.basename(ROOT)}/\n`;
  out += buildTree(ROOT);
  out += "```\n\n";

  // 函式清單
  const files = scanFiles(ROOT);
  if (files.length > 0) {
    out += `## Functions & Classes\n\n`;

    // 依目錄分組
    const grouped = {};
    for (const file of files) {
      const dir = path.dirname(file.relativePath) || ".";
      if (!grouped[dir]) grouped[dir] = [];
      grouped[dir].push(file);
    }

    for (const [dir, dirFiles] of Object.entries(grouped).sort()) {
      out += `### ${dir === "." ? "(root)" : dir}/\n\n`;

      for (const file of dirFiles) {
        const fileName = path.basename(file.relativePath);
        out += `**${fileName}**\n\n`;
        out += `| # | Kind | Name | Params | Note |\n`;
        out += `|---|------|------|--------|------|\n`;

        file.functions.forEach((fn, idx) => {
          const kind = fn.kind || "fn";
          const params = fn.params ? `\`${fn.params.slice(0, 60)}\`` : "";
          const comment = fn.comment || "";
          out += `| ${idx + 1} | ${kind} | \`${fn.name}\` | ${params} | ${comment} |\n`;
        });
        out += "\n";
      }
    }
  } else {
    out += `## Functions & Classes\n\n_No scannable source files found._\n\n`;
  }

  // 依賴
  const deps = collectDependencies();
  const depEntries = Object.entries(deps);
  if (depEntries.length > 0) {
    out += `## Dependencies\n\n`;
    for (const [label, pkgs] of depEntries) {
      out += `**${label}** (${pkgs.length})\n\n`;
      out += pkgs.map((p) => `- ${p}`).join("\n") + "\n\n";
    }
  }

  // 統計
  const totalFns = files.reduce((sum, f) => sum + f.functions.length, 0);
  out += `---\n\n`;
  out += `*${files.length} files scanned · ${totalFns} functions/classes found*\n`;

  return out;
}

// ─── Main ────────────────────────────────────────────────
const snapshot = generate();

if (flags.stdout) {
  process.stdout.write(snapshot);
} else {
  const outPath = path.isAbsolute(outputPath) ? outputPath : path.join(ROOT, outputPath);
  fs.writeFileSync(outPath, snapshot, "utf-8");
  console.log(`✓ Snapshot saved to ${outputPath} (${(Buffer.byteLength(snapshot) / 1024).toFixed(1)} KB)`);
}

if (flags.copy) {
  try {
    execSync("pbcopy", { input: snapshot });
    console.log("✓ Copied to clipboard");
  } catch {
    // fallback for Linux
    try {
      execSync("xclip -selection clipboard", { input: snapshot });
      console.log("✓ Copied to clipboard");
    } catch {
      console.log("⚠ Could not copy to clipboard (pbcopy/xclip not found)");
    }
  }
}
