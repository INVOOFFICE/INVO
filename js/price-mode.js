// ═══════════════════════════════════════════
//  price-mode.js — Mode de saisie PU factures (TTC / HT)
//  Stockage global : localStorage priceMode ("TTC" | "HT").
//  Le moteur document reste en HT (line.price) ; ce module ne fait que la préférence UI.
// ═══════════════════════════════════════════

const PRICE_MODE_LS_KEY = 'priceMode';

/**
 * @param {unknown} v
 * @returns {'TTC'|'HT'|null}
 */
function normalizePriceMode(v) {
  if (v === 'HT' || v === 'TTC') return v;
  return null;
}

/**
 * Préférence globale (paramètres). Défaut : "TTC" (comportement historique).
 * @returns {'TTC'|'HT'}
 */
function getGlobalPriceMode() {
  try {
    const raw = localStorage.getItem(PRICE_MODE_LS_KEY);
    return normalizePriceMode(raw) || 'TTC';
  } catch {
    return 'TTC';
  }
}

/**
 * @param {unknown} mode
 * @returns {'TTC'|'HT'}
 */
function setGlobalPriceMode(mode) {
  const m = normalizePriceMode(mode) || 'TTC';
  try {
    localStorage.setItem(PRICE_MODE_LS_KEY, m);
  } catch (_) {
    /* ignore quota / private mode */
  }
  return m;
}

/**
 * Mode effectif pour la ligne en cours d’édition : priorité au document (APP.docPriceMode),
 * sinon préférence globale.
 * @returns {'TTC'|'HT'}
 */
function getEffectiveDocPriceMode() {
  const app = typeof window !== 'undefined' ? window.APP : null;
  const d = app && app.docPriceMode;
  if (d === 'TTC' || d === 'HT') return d;
  return getGlobalPriceMode();
}

window.normalizePriceMode = normalizePriceMode;
window.getGlobalPriceMode = getGlobalPriceMode;
window.setGlobalPriceMode = setGlobalPriceMode;
window.getEffectiveDocPriceMode = getEffectiveDocPriceMode;
