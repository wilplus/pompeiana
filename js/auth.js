// auth.js — WillpowerLab account gate via Supabase GoTrue REST (no SDK).
// Same Supabase project as willpowerlab.com, so these are the same accounts.
// Session is kept in localStorage; the prayer app stays usable offline once
// you've signed in, and refreshes the token in the background when online.

import { SUPABASE_URL, SUPABASE_ANON_KEY, WILLPOWERLAB_URL } from "./config.js";

const AUTH_KEY = "pompeiana.auth";
const AUTH_BASE = `${SUPABASE_URL}/auth/v1`;

function headers(extra = {}) {
  return { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, ...extra };
}

export function getStored() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function store(session) {
  // session from GoTrue: { access_token, refresh_token, expires_in, expires_at, user }
  const expires_at = session.expires_at || Math.floor(Date.now() / 1000) + (session.expires_in || 3600);
  const saved = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at,
    user: session.user || null,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(saved));
  return saved;
}

export function clearStored() {
  localStorage.removeItem(AUTH_KEY);
}

export function currentUser() {
  return getStored()?.user || null;
}

const nowSec = () => Math.floor(Date.now() / 1000);
const isExpired = (s, skew = 60) => !s || !s.expires_at || s.expires_at - nowSec() < skew;

// Sign in with email + password. Throws Error(message) on failure.
export async function signInPassword(email, password) {
  const res = await fetch(`${AUTH_BASE}/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email: email.trim(), password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error_description || data.msg || data.error || "Sign-in failed";
    throw new Error(msg);
  }
  return store(data).user;
}

// Try to refresh using the stored refresh token. Returns session or null.
export async function refresh() {
  const s = getStored();
  if (!s?.refresh_token) return null;
  try {
    const res = await fetch(`${AUTH_BASE}/token?grant_type=refresh_token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ refresh_token: s.refresh_token }),
    });
    if (!res.ok) {
      if (res.status === 400 || res.status === 401) clearStored(); // refresh token invalid
      return null;
    }
    const data = await res.json();
    return store(data);
  } catch {
    return null; // offline — keep stored session, caller decides
  }
}

// Resolve the current user for the gate.
// - valid unexpired token           -> user (no network)
// - expired but online + refreshable -> user
// - expired but OFFLINE, session present -> user (lenient: app is non-sensitive, works offline)
// - otherwise                        -> null (show login)
export async function resolveUser() {
  const s = getStored();
  if (!s) return null;
  if (!isExpired(s)) return s.user;

  if (navigator.onLine) {
    const refreshed = await refresh();
    return refreshed ? refreshed.user : (getStored() ? null : null);
  }
  // offline with a stored (expired) session: allow through so prayer works offline
  return s.user;
}

// Best-effort background validation/refresh when online (called after gate passes).
export async function revalidate() {
  const s = getStored();
  if (!s || !navigator.onLine) return;
  if (isExpired(s, 300)) await refresh();
}

export async function signOut() {
  const s = getStored();
  clearStored();
  if (s?.access_token && navigator.onLine) {
    try {
      await fetch(`${AUTH_BASE}/logout`, {
        method: "POST",
        headers: headers({ Authorization: `Bearer ${s.access_token}` }),
      });
    } catch {
      /* ignore */
    }
  }
}

// Links to the main site for account actions we intentionally don't duplicate.
export const signupUrl = `${WILLPOWERLAB_URL}/signup`;
export const resetPasswordUrl = `${WILLPOWERLAB_URL}/reset-password`;
