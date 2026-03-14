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
});
