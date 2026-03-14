const { describe, it } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const ThemeManager = require('../server/theme-manager');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

describe('ThemeManager', () => {
  it('loads a valid theme', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    assert.strictEqual(theme.name, 'modern-office');
    assert.ok(theme.background);
    assert.ok(theme.furniture);
    assert.ok(theme.characters);
  });

  it('resolves sprite paths to URL paths', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    const url = tm.resolveUrl('modern-office', theme.furniture.desk);
    assert.strictEqual(url, '/themes/modern-office/sprites/furniture/desk.png');
  });

  it('throws on missing theme', () => {
    const tm = new ThemeManager(THEMES_DIR);
    assert.throws(() => tm.load('nonexistent'), /not found/i);
  });

  it('loads animation definitions', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const anims = tm.loadAnimations('modern-office');
    assert.ok(anims.dispatch);
    assert.strictEqual(anims.dispatch.object, 'document');
  });

  it('loads idle behaviors', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const behaviors = tm.loadIdleBehaviors('modern-office');
    assert.ok(behaviors.chairman);
    assert.ok(Array.isArray(behaviors.chairman));
    assert.ok(behaviors.chairman.length > 0);
  });

  it('loads theme locale', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const locale = tm.loadLocale('modern-office', 'en');
    assert.ok(locale['bubble.idle']);
    assert.ok(Array.isArray(locale['bubble.idle']));
  });

  it('loads characterPattern for spritesheet themes', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    assert.ok(theme.characterPattern, 'theme should have characterPattern');
    assert.ok(theme.characterPattern.includes('{role}'), 'pattern should contain {role} placeholder');
    assert.ok(theme.characterPattern.includes('{pose}'), 'pattern should contain {pose} placeholder');
    assert.ok(theme.characterPattern.includes('{gender}'), 'pattern should contain {gender} placeholder');
  });

  it('has animationFps defined', () => {
    const tm = new ThemeManager(THEMES_DIR);
    const theme = tm.load('modern-office');
    assert.strictEqual(typeof theme.animationFps, 'number');
    assert.ok(theme.animationFps > 0 && theme.animationFps <= 30);
  });
});
