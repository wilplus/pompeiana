// store.js — app state, persistence (localStorage), and data loading.

const STORAGE_KEY = "pompeiana.v1";
const SUPPORTED = ["pl", "it", "fr", "es", "de", "la", "ru", "uk", "be", "zh"];

export const state = {
  // loaded data
  data: null,
  // session/preferences (persisted)
  lang: "pl",
  showTranslit: true,
  intention: "",
  intentionAt: null,   // ISO stamp of the last intention edit (sync tie-break)
  startDate: null,     // ISO yyyy-mm-dd of day the novena began
  currentDay: 1,       // 1..54, the day currently being prayed
  finished: false,     // whole novena complete
  progress: { stepIndex: 0, rep: 0 }, // exact resume position within the current day
  rev: 0,              // explicit position overrides (set-day / new novena) — see js/sync.js
  scripture: {},       // { mysteryId: { langKey: userText } }
  // ephemeral
  view: "home",        // "home" | "pray" | "day-done"
  user: null,          // signed-in WillpowerLab user (from Supabase), or null
};

// Anyone who wants to know the persisted state changed (js/sync.js does).
// Kept as a subscription rather than a direct import so store.js stays
// unaware of the network and the app still runs with sync.js absent.
const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function detectLang() {
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const c of candidates) {
    if (!c) continue;
    const base = c.toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "pl";
}

// `silent` suppresses the change notification — used when we are writing state
// that CAME from the server, so adopting a remote update doesn't bounce
// straight back as a push.
export function save({ silent = false } = {}) {
  const payload = {
    lang: state.lang,
    showTranslit: state.showTranslit,
    intention: state.intention,
    intentionAt: state.intentionAt,
    startDate: state.startDate,
    currentDay: state.currentDay,
    finished: state.finished,
    progress: state.progress,
    rev: state.rev,
    scripture: state.scripture,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Could not persist state:", e);
  }
  if (silent) return;
  for (const fn of listeners) {
    try { fn(); } catch (e) { console.warn("sync listener failed:", e); }
  }
}

// The synced slice of the state — what js/sync.js reads and writes.
// `scripture` is absent on purpose and must stay absent: the user's own Bible
// text never leaves the device.
export function snapshot() {
  return {
    rev: state.rev | 0,
    currentDay: state.currentDay,
    finished: state.finished,
    progress: { stepIndex: state.progress.stepIndex | 0, rep: state.progress.rep | 0 },
    startDate: state.startDate,
    intention: state.intention,
    intentionAt: state.intentionAt,
  };
}

// Write server-won fields in without re-notifying (see `save({silent})`).
export function applyRemote(patch) {
  if (Number.isInteger(patch.rev)) state.rev = patch.rev;
  if (Number.isInteger(patch.currentDay)) state.currentDay = clampDay(patch.currentDay);
  if (typeof patch.finished === "boolean") state.finished = patch.finished;
  if (patch.progress) {
    state.progress = { stepIndex: patch.progress.stepIndex | 0, rep: patch.progress.rep | 0 };
  }
  if (typeof patch.startDate === "string") state.startDate = patch.startDate;
  if (typeof patch.intention === "string") state.intention = patch.intention;
  if (typeof patch.intentionAt === "string") state.intentionAt = patch.intentionAt;
  save({ silent: true });
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state.lang = detectLang();
      return;
    }
    const p = JSON.parse(raw);
    if (p.lang && SUPPORTED.includes(p.lang)) state.lang = p.lang;
    else state.lang = detectLang();
    if (typeof p.showTranslit === "boolean") state.showTranslit = p.showTranslit;
    if (typeof p.intention === "string") state.intention = p.intention;
    if (typeof p.intentionAt === "string") state.intentionAt = p.intentionAt;
    if (typeof p.startDate === "string") state.startDate = p.startDate;
    if (Number.isInteger(p.currentDay)) state.currentDay = clampDay(p.currentDay);
    if (typeof p.finished === "boolean") state.finished = p.finished;
    if (Number.isInteger(p.rev)) state.rev = p.rev;
    if (p.progress && Number.isInteger(p.progress.stepIndex)) {
      state.progress = { stepIndex: p.progress.stepIndex, rep: p.progress.rep || 0 };
    }
    if (p.scripture && typeof p.scripture === "object") state.scripture = p.scripture;
  } catch (e) {
    console.warn("Could not restore state:", e);
    state.lang = detectLang();
  }
}

export function clampDay(n) {
  return Math.min(54, Math.max(1, n));
}

export async function loadData() {
  const files = ["languages.json", "common_prayers.json", "mysteries.json", "schedule.json"];
  const [languages, commonPrayers, mysteries, schedule] = await Promise.all(
    files.map((f) => fetch(f).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${f}: ${r.status}`);
      return r.json();
    }))
  );

  const languagesByCode = {};
  for (const l of languages.languages) languagesByCode[l.code] = l;

  const mysteriesById = {};
  for (const m of mysteries.mysteries) mysteriesById[m.id] = m;

  state.data = {
    languages: languages.languages,
    languagesByCode,
    prayers: commonPrayers.prayers,
    mysteries: mysteries.mysteries,
    mysteriesById,
    schedule,
    scriptureLinks: {},
    scriptureDefaults: {},
  };

  // Optional overlays (non-fatal): per-mystery reference + YouVersion link,
  // and bundled public-domain default texts (e.g. French LSG 1910).
  try {
    const links = await fetch("scripture_links.json").then((r) => (r.ok ? r.json() : null));
    if (links?.links) state.data.scriptureLinks = links.links;
  } catch { /* non-fatal */ }
  try {
    const defs = await fetch("scripture_defaults.json").then((r) => (r.ok ? r.json() : null));
    if (defs?.defaults) state.data.scriptureDefaults = defs.defaults;
  } catch { /* non-fatal */ }

  restore();
  return state.data;
}

// --- mutators -------------------------------------------------------------

export function setLang(code) {
  state.lang = code;
  save();
}

export function setTranslit(on) {
  state.showTranslit = !!on;
  save();
}

export function setIntention(text) {
  const next = (text || "").trim();
  if (next === state.intention) return;
  state.intention = next;
  state.intentionAt = new Date().toISOString();
  save();
}

export function beginNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
  state.rev = (state.rev | 0) + 1;
  save();
}

export function setProgress(stepIndex, rep = 0) {
  state.progress = { stepIndex, rep };
  save();
}

export function completeDay() {
  if (state.currentDay >= 54) {
    state.finished = true;
  } else {
    state.currentDay = clampDay(state.currentDay + 1);
  }
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

export function resetDay() {
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

// Hidden set-day (no visible control): jump the current day. Starts the
// novena if it hasn't been started yet. Triggered via ?setday=N.
export function setDay(n) {
  if (!state.startDate) state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = clampDay(n);
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
  // Deliberately moving the day — including BACKWARDS. Sync's default rule is
  // "furthest position wins" so an offline device can never rewind you; the
  // bumped rev is how an intentional move overrules that.
  state.rev = (state.rev | 0) + 1;
  save();
}

export function startNewNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
  state.rev = (state.rev | 0) + 1;
  save();
}

export function getScripture(mysteryId, langKey) {
  return state.scripture?.[mysteryId]?.[langKey] || "";
}

export function setScripture(mysteryId, langKey, text) {
  if (!state.scripture[mysteryId]) state.scripture[mysteryId] = {};
  state.scripture[mysteryId][langKey] = text;
  save();
}
