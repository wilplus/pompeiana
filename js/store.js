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
  startDate: null,     // ISO yyyy-mm-dd of day the novena began
  currentDay: 1,       // 1..54, the day currently being prayed
  finished: false,     // whole novena complete
  progress: { stepIndex: 0, rep: 0 }, // exact resume position within the current day
  scripture: {},       // { mysteryId: { langKey: userText } }
  // ephemeral
  view: "home",        // "home" | "pray" | "day-done"
};

function detectLang() {
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const c of candidates) {
    if (!c) continue;
    const base = c.toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "pl";
}

export function save() {
  const payload = {
    lang: state.lang,
    showTranslit: state.showTranslit,
    intention: state.intention,
    startDate: state.startDate,
    currentDay: state.currentDay,
    finished: state.finished,
    progress: state.progress,
    scripture: state.scripture,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Could not persist state:", e);
  }
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
    if (typeof p.startDate === "string") state.startDate = p.startDate;
    if (Number.isInteger(p.currentDay)) state.currentDay = clampDay(p.currentDay);
    if (typeof p.finished === "boolean") state.finished = p.finished;
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
  };

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
  state.intention = (text || "").trim();
  save();
}

export function beginNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
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

export function startNewNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
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
