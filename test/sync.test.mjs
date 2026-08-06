// Node test for the sync merge rule. Run: node --test test/
// Stubs the browser (localStorage / navigator / window / document / fetch) so
// js/sync.js can be imported and driven for real — the merge rule is the one
// piece here that can silently lose a user's progress, so it gets tested.
import test from "node:test";
import assert from "node:assert/strict";

// ── browser stubs, installed before the modules are imported ──────────────
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
globalThis.navigator = { onLine: true, language: "pl", languages: ["pl"] };
const noop = () => {};
globalThis.window = { addEventListener: noop, removeEventListener: noop };
globalThis.document = { addEventListener: noop, removeEventListener: noop, visibilityState: "visible" };

// A signed-in session for auth.js's getStored().
localStorage.setItem("pompeiana.auth", JSON.stringify({
  access_token: "test-token",
  refresh_token: "test-refresh",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: { id: "11111111-1111-1111-1111-111111111111", email: "artur@willonski.com" },
}));

let remoteRow = null;      // what GET returns
let pushed = [];           // bodies POSTed
globalThis.fetch = async (url, opts = {}) => {
  const method = opts.method || "GET";
  if (method === "GET") {
    return { ok: true, status: 200, json: async () => (remoteRow ? [remoteRow] : []) };
  }
  pushed.push(JSON.parse(opts.body)[0]);
  return { ok: true, status: 200, json: async () => ({}) };
};

const { state } = await import("../js/store.js");
const sync = await import("../js/sync.js");

state.user = { id: "11111111-1111-1111-1111-111111111111", email: "artur@willonski.com" };

function setLocal({ rev = 0, day = 1, step = 0, rep = 0, finished = false, intention = "", intentionAt = null, startDate = "2026-08-01" }) {
  state.rev = rev;
  state.currentDay = day;
  state.progress = { stepIndex: step, rep };
  state.finished = finished;
  state.intention = intention;
  state.intentionAt = intentionAt;
  state.startDate = startDate;
}

function row({ rev = 0, day = 1, step = 0, rep = 0, finished = false, intention = "", intention_at = null, start_date = "2026-08-01" }) {
  return {
    user_id: state.user.id, rev, current_day: day, step_index: step, rep,
    finished, intention, intention_at, start_date,
  };
}

function reset() {
  pushed = [];
  remoteRow = null;
  sync.stopSync();
}

// startSync() pulls immediately; await lets the pull settle.
async function syncOnce({ canAdopt = () => true } = {}) {
  sync.startSync({ onAdopt: () => {}, canAdopt });
  await new Promise((r) => setTimeout(r, 20));
}

test("a fresh device adopts the day the account is actually on", async () => {
  reset();
  setLocal({ day: 1, step: 0 });
  remoteRow = row({ day: 12, step: 40, rep: 3 });
  await syncOnce();
  assert.equal(state.currentDay, 12);
  assert.equal(state.progress.stepIndex, 40);
  assert.equal(state.progress.rep, 3);
});

test("a stale device can never rewind the one that has been praying", async () => {
  reset();
  setLocal({ day: 20, step: 5 });
  remoteRow = row({ day: 5, step: 0 });
  await syncOnce();
  assert.equal(state.currentDay, 20, "local day must survive a stale remote row");
  assert.equal(pushed.at(-1).current_day, 20, "and the further position is pushed up");
});

test("a deliberate set-day overrules furthest-wins, exactly once", async () => {
  reset();
  setLocal({ rev: 0, day: 30 });
  remoteRow = row({ rev: 1, day: 4 });   // other device did ?setday=4
  await syncOnce();
  assert.equal(state.currentDay, 4);
  assert.equal(state.rev, 1);

  // Same row seen again must not fight the local state any more.
  reset();
  remoteRow = row({ rev: 1, day: 4 });
  await syncOnce();
  assert.equal(state.currentDay, 4);
});

test("finishing the novena outranks sitting on day 54", async () => {
  reset();
  setLocal({ day: 54, step: 90 });
  remoteRow = row({ day: 54, step: 0, finished: true });
  await syncOnce();
  assert.equal(state.finished, true);
});

test("a remote update mid-prayer is parked, not applied under the user", async () => {
  reset();
  setLocal({ day: 3, step: 10 });
  remoteRow = row({ day: 9, step: 0 });
  // Mirrors the real guard `() => state.view !== "pray"`, which goHome() flips
  // to home BEFORE draining the parked row.
  let praying = true;
  await syncOnce({ canAdopt: () => !praying });
  assert.equal(state.currentDay, 3, "must not move while the prayer screen is open");

  praying = false;
  const adopted = sync.applyDeferred();
  assert.equal(adopted, true);
  assert.equal(state.currentDay, 9, "and lands once the user is back home");
});

test("the newer intention wins on its own clock", async () => {
  reset();
  setLocal({ day: 5, intention: "old", intentionAt: "2026-08-01T10:00:00.000Z" });
  remoteRow = row({ day: 5, intention: "new", intention_at: "2026-08-02T10:00:00.000Z" });
  await syncOnce();
  assert.equal(state.intention, "new");

  reset();
  setLocal({ day: 5, intention: "mine", intentionAt: "2026-08-03T10:00:00.000Z" });
  remoteRow = row({ day: 5, intention: "theirs", intention_at: "2026-08-02T10:00:00.000Z" });
  await syncOnce();
  assert.equal(state.intention, "mine", "an older remote intention must not overwrite");
});

test("scripture never leaves the device", async () => {
  reset();
  setLocal({ day: 7 });
  state.scripture = { "joyful-1": { pl: "moj wlasny tekst z Biblii" } };
  remoteRow = null;                       // no row yet -> first push
  await syncOnce();
  assert.ok(pushed.length > 0, "expected a push");
  const body = JSON.stringify(pushed);
  assert.equal(body.includes("scripture"), false);
  assert.equal(body.includes("wlasny tekst"), false);
  assert.equal(body.includes("lang"), false, "language is a device preference, not synced");
});

test("an empty server takes this device's position as the starting point", async () => {
  reset();
  setLocal({ day: 15, step: 3, intention: "za zdrowie" });
  remoteRow = null;
  await syncOnce();
  assert.equal(pushed.at(-1).current_day, 15);
  assert.equal(pushed.at(-1).intention, "za zdrowie");
});

test("praying forward pushes the new position", async () => {
  reset();
  setLocal({ day: 2, step: 0 });
  remoteRow = row({ day: 2, step: 0 });
  await syncOnce();
  const before = pushed.length;

  const { setProgress } = await import("../js/store.js");
  setProgress(7, 2);
  await new Promise((r) => setTimeout(r, 1700));   // past the push debounce
  assert.ok(pushed.length > before, "a change must reach the server");
  assert.equal(pushed.at(-1).step_index, 7);
  assert.equal(pushed.at(-1).rep, 2);
});
