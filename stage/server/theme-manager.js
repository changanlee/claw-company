const fs = require('node:fs');
const path = require('node:path');

class ThemeManager {
  constructor(themesDir) {
    this.themesDir = themesDir;
  }

  load(themeName) {
    const themeDir = path.join(this.themesDir, themeName);
    if (!fs.existsSync(themeDir)) {
      throw new Error(`Theme "${themeName}" not found at ${themeDir}`);
    }
    const themeFile = path.join(themeDir, 'theme.json');
    if (!fs.existsSync(themeFile)) {
      throw new Error(`theme.json not found in "${themeName}"`);
    }
    return JSON.parse(fs.readFileSync(themeFile, 'utf-8'));
  }

  resolveUrl(themeName, relativePath) {
    return `/themes/${themeName}/${relativePath}`;
  }

  loadAnimations(themeName) {
    const file = path.join(this.themesDir, themeName, 'animations.json');
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }

  loadIdleBehaviors(themeName) {
    const file = path.join(this.themesDir, themeName, 'idle-behaviors.json');
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }

  loadLocale(themeName, lang) {
    const file = path.join(this.themesDir, themeName, 'locales', `${lang}.json`);
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }

  getManifest(themeName, lang) {
    const theme = this.load(themeName);
    const animations = this.loadAnimations(themeName);
    const idleBehaviors = this.loadIdleBehaviors(themeName);
    const locale = this.loadLocale(themeName, lang);
    return { theme, animations, idleBehaviors, locale };
  }
}

module.exports = ThemeManager;
