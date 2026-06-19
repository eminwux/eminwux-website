import React, { createContext, useContext, useState, useCallback } from 'react';
import { en, es } from './translations';

const translations = { en, es };
const SUPPORTED_LANGS = ['en', 'es'];
const STORAGE_KEY = 'eminwux-lang';

function detectLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch (e) { /* ignore localStorage errors */ }

  try {
    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en')
      .split('-')[0]
      .toLowerCase();
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
  } catch (e) {
    return 'en';
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => detectLanguage());

  const setLang = useCallback((newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch (e) { /* ignore */ }
    setLangState(newLang);
  }, []);

  const t = useCallback((key) => {
    const value = getNestedValue(translations[lang], key);
    if (value !== undefined) return value;
    // Fallback to English
    const fallback = getNestedValue(translations.en, key);
    return fallback !== undefined ? fallback : key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
