// Simple i18n system — loads locale JSON, merges global + theme strings
const I18n = {
  _strings: {},
  _lang: 'en',

  async load(lang, themeLocale) {
    this._lang = lang;
    try {
      const res = await fetch(`/locales/${lang}.json`);
      this._strings = await res.json();
    } catch (e) {
      console.warn(`Failed to load locale "${lang}", falling back to empty`);
      this._strings = {};
    }
    // Merge theme-specific strings (theme overrides global)
    if (themeLocale) {
      Object.assign(this._strings, themeLocale);
    }
  },

  t(key) {
    const val = this._strings[key];
    if (val === undefined) return key;
    // If value is an array, pick random
    if (Array.isArray(val)) return val[Math.floor(Math.random() * val.length)];
    return val;
  },

  lang() {
    return this._lang;
  }
};
