// scripture.js — shared Bible texts stored in Supabase.
// Everyone READS the same texts; only ADMIN_EMAILS may write (RLS-enforced
// server-side too). Reads are cached in localStorage so texts show offline.

import { SUPABASE_URL, SUPABASE_ANON_KEY, ADMIN_EMAILS } from "./config.js";
import { getStored } from "./auth.js";

const REST = `${SUPABASE_URL}/rest/v1/pompeiana_scripture`;
const CACHE_KEY = "pompeiana.shared_scripture";

let shared = loadCache(); // { mysteryId: { lang: text } }

function loadCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch { return {}; }
}
function saveCache() {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(shared)); } catch { /* ignore */ }
}

export function isAdmin(user) {
  const email = (user?.email || "").toLowerCase();
  return !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email);
}

export function getShared(mysteryId, lang) {
  return shared?.[mysteryId]?.[lang] || "";
}

// Pull all shared texts from Supabase (anon-readable). Falls back to cache offline.
export async function fetchShared() {
  try {
    const res = await fetch(`${REST}?select=mystery_id,lang,text`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    });
    if (!res.ok) return shared;
    const rows = await res.json();
    const map = {};
    for (const r of rows) {
      if (!map[r.mystery_id]) map[r.mystery_id] = {};
      map[r.mystery_id][r.lang] = r.text;
    }
    shared = map;
    saveCache();
    return shared;
  } catch {
    return shared; // offline — keep cache
  }
}

// Admin-only upsert of one (mystery, lang) text. Throws on failure.
export async function saveShared(mysteryId, lang, text, user) {
  const s = getStored();
  if (!s?.access_token) throw new Error("Not signed in");
  const res = await fetch(`${REST}?on_conflict=mystery_id,lang`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${s.access_token}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([{ mystery_id: mysteryId, lang, text, updated_by: user?.email || null }]),
  });
  if (!res.ok) throw new Error(`Save failed (${res.status})`);
  if (!shared[mysteryId]) shared[mysteryId] = {};
  shared[mysteryId][lang] = text;
  saveCache();
}
