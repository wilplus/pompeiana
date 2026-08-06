// sync.js — cross-device continuity for signed-in users.
//
// One row per user in `pompeiana_progress` (see supabase/pompeiana_progress.sql),
// reached through PostgREST with the public anon key exactly like scripture.js.
// RLS is the access control: you can only ever read and write your own row.
//
// What travels: which day you are on, where inside that day you stopped, the
// start date and the intention. That is all.
// What NEVER travels: `scripture` — your own Bible text stays on the device.
//
// Sync is additive. Offline, signed out, or with Supabase down, every call here
// fails quietly and the app keeps working from localStorage, because a novena
// you cannot pray in a basement is a broken novena.
//
// ── The merge rule ────────────────────────────────────────────────────────
// Position is the tuple (rev, day, stepIndex, rep) compared left to right, and
// the FURTHEST position wins. That is what makes the sync safe by default: a
// laptop that has been closed for a week comes back with a stale row and cannot
// rewind the phone that has been praying.
//
// `rev` sits in front precisely because "furthest wins" is wrong for the one
// case where you move deliberately — ?setday=N, or starting a new novena. Those
// bump rev, so the intended position beats the further one exactly once.
//
// `intention` is text, not a position, so it merges on its own last-write-wins
// clock (`intention_at`) instead.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { getStored, refresh } from "./auth.js";
import { state, snapshot, applyRemote, subscribe } from "./store.js";

const REST = `${SUPABASE_URL}/rest/v1/pompeiana_progress`;
const PUSH_DEBOUNCE_MS = 1500;   // bead taps fire fast; don't POST on every one
const PULL_THROTTLE_MS = 10000;  // tab-focus pulls, at most this often

let started = false;
let unsubscribe = null;
let pushTimer = null;
let inFlight = false;
let pushAgain = false;         // a change landed mid-request
let lastPullAt = 0;
let lastPushed = null;         // JSON of the last snapshot the server accepted

// Set by app.js: re-render after we adopt a remote position, and tell us when
// adopting would be rude (mid-prayer).
let onAdopt = () => {};
let canAdopt = () => true;
let deferredRow = null;        // remote row parked until the user is back home

// ── plumbing ──────────────────────────────────────────────────────────────

async function authFetch(url, opts = {}, retry = true) {
  const s = getStored();
  if (!s?.access_token) throw new Error("signed out");
  const res = await fetch(url, {
    ...opts,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${s.access_token}`,
      ...(opts.headers || {}),
    },
  });
  // An expired access token is the normal case on a device you open once a
  // day, so spend one refresh on it before giving up.
  if (res.status === 401 && retry) {
    const refreshed = await refresh();
    if (refreshed) return authFetch(url, opts, false);
  }
  return res;
}

function usable() {
  return started && !!state.user?.id && navigator.onLine && !!getStored()?.access_token;
}

function rowToSnapshot(row) {
  return {
    rev: row.rev | 0,
    currentDay: Number.isInteger(row.current_day) ? row.current_day : 1,
    finished: !!row.finished,
    progress: { stepIndex: row.step_index | 0, rep: row.rep | 0 },
    startDate: row.start_date || null,
    intention: row.intention || "",
    intentionAt: row.intention_at || null,
  };
}

// (rev, day, stepIndex, rep). `finished` reads as day 55 so completing the
// novena outranks being on day 54.
function positionOf(s) {
  return [s.rev | 0, s.finished ? 55 : (s.currentDay | 0), s.progress.stepIndex | 0, s.progress.rep | 0];
}

function comparePositions(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

function isNewer(a, b) {
  if (!a) return false;
  if (!b) return true;
  return Date.parse(a) > Date.parse(b);
}

function sameSyncedState(a, b) {
  return comparePositions(positionOf(a), positionOf(b)) === 0 &&
    (a.startDate || null) === (b.startDate || null) &&
    (a.intention || "") === (b.intention || "");
}

// ── merge ─────────────────────────────────────────────────────────────────

function merge(row) {
  const remote = rowToSnapshot(row);
  const local = snapshot();
  const patch = {};
  let adopted = false;

  if (comparePositions(positionOf(remote), positionOf(local)) > 0) {
    // Mid-prayer we do not yank the screen out from under the user; park the
    // row and adopt it when they are back at the home screen.
    if (!canAdopt()) {
      deferredRow = row;
      return false;
    }
    patch.rev = remote.rev;
    patch.currentDay = remote.currentDay;
    patch.finished = remote.finished;
    patch.progress = remote.progress;
    if (remote.startDate) patch.startDate = remote.startDate;
    adopted = true;
  }

  if (remote.intention !== local.intention && isNewer(remote.intentionAt, local.intentionAt)) {
    patch.intention = remote.intention;
    patch.intentionAt = remote.intentionAt;
    adopted = true;
  }

  // First sign-in on a fresh device: nothing local to defend, take the server's.
  if (!local.startDate && remote.startDate) {
    patch.startDate = remote.startDate;
    adopted = true;
  }

  if (adopted) {
    applyRemote(patch);
    onAdopt();
  }

  // Whatever the server still doesn't know about, send it. No debounce: we have
  // just proved there is a delta, and the likely next event is the user picking
  // up the other device.
  if (!sameSyncedState(snapshot(), remote)) push({ immediate: true });
  return adopted;
}

// ── pull / push ───────────────────────────────────────────────────────────

export async function pull() {
  if (!usable()) return false;
  lastPullAt = Date.now();
  try {
    const res = await authFetch(`${REST}?select=*&user_id=eq.${encodeURIComponent(state.user.id)}`);
    if (!res.ok) return false;
    const rows = await res.json();
    if (!rows.length) {
      // No row yet — this device is the first to report in.
      await push({ immediate: true });
      return false;
    }
    return merge(rows[0]);
  } catch {
    return false; // offline or blocked; localStorage is still the truth
  }
}

export function push({ immediate = false } = {}) {
  if (!usable()) return;
  clearTimeout(pushTimer);
  if (immediate) return doPush();
  pushTimer = setTimeout(doPush, PUSH_DEBOUNCE_MS);
}

async function doPush() {
  if (!usable()) return;
  if (inFlight) { pushAgain = true; return; }

  const s = snapshot();
  const body = JSON.stringify(s);
  // Language and translit changes also call save(); skip the round trip when
  // nothing that actually syncs has moved.
  if (body === lastPushed) return;

  inFlight = true;
  try {
    const res = await authFetch(`${REST}?on_conflict=user_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([{
        user_id: state.user.id,
        start_date: s.startDate,
        current_day: s.currentDay,
        finished: s.finished,
        step_index: s.progress.stepIndex,
        rep: s.progress.rep,
        intention: s.intention,
        intention_at: s.intentionAt,
        rev: s.rev,
        updated_at: new Date().toISOString(),
      }]),
    });
    if (res.ok) lastPushed = body;
  } catch {
    /* offline — the next change or the next online event retries */
  } finally {
    inFlight = false;
    if (pushAgain) { pushAgain = false; push({ immediate: true }); }
  }
}

// ── lifecycle ─────────────────────────────────────────────────────────────

export function startSync({ onAdopt: adopt, canAdopt: guard } = {}) {
  if (adopt) onAdopt = adopt;
  if (guard) canAdopt = guard;
  if (started) return;
  started = true;

  unsubscribe = subscribe(() => push());
  window.addEventListener("online", onOnline);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", flush);

  pull();
}

export function stopSync() {
  if (!started) return;
  started = false;
  clearTimeout(pushTimer);
  unsubscribe?.();
  unsubscribe = null;
  window.removeEventListener("online", onOnline);
  document.removeEventListener("visibilitychange", onVisibility);
  window.removeEventListener("pagehide", flush);
  lastPushed = null;
  deferredRow = null;
}

// A parked remote update, applied once the user leaves the prayer screen.
export function applyDeferred() {
  if (!deferredRow) return false;
  const row = deferredRow;
  deferredRow = null;
  return merge(row);
}

function onOnline() {
  pull();
}

function onVisibility() {
  if (document.visibilityState === "hidden") { flush(); return; }
  if (Date.now() - lastPullAt > PULL_THROTTLE_MS) pull();
}

// Backgrounding the tab is the moment most likely to be followed by picking up
// the other device, so get the position out now rather than on a debounce that
// may never fire.
function flush() {
  clearTimeout(pushTimer);
  doPush();
}
