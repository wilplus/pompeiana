// app.js — rendering and interaction for the Pompeian Novena PWA.

import {
  state, loadData, save,
  setLang, setTranslit, setIntention,
  beginNovena, setProgress, completeDay, resetDay, startNewNovena, setDay,
  getScripture, setScripture,
} from "./store.js";
import { ui, pick, pickTranslit, formatDay, CATEGORY } from "./i18n.js";
import { buildDay } from "./sequence.js";
import { resolveUser, revalidate, signInPassword, signOut, currentUser, signupUrl, resetPasswordUrl } from "./auth.js";
import { isAdmin, getShared, fetchShared, saveShared } from "./scripture.js";

const root = document.getElementById("app");
let dayCtx = null;        // cached buildDay() result for state.currentDay
let sheetOpen = false;    // language sheet visible?

// --- tiny hyperscript helper ---------------------------------------------
function h(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (k === "dataset") Object.assign(e.dataset, v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

const L = () => state.lang;
const langMeta = () => state.data.languagesByCode[state.lang];

// --- top-level render ------------------------------------------------------
function render({ preserveScroll = false } = {}) {
  const y = preserveScroll ? window.scrollY : 0;
  root.replaceChildren();
  document.documentElement.lang = state.lang;

  let screen;
  if (!state.user) screen = renderLogin();
  else if (state.finished) screen = renderFinished();
  else if (state.view === "pray") screen = renderPray();
  else if (state.view === "day-done") screen = renderDayDone();
  else screen = renderHome();

  root.appendChild(screen);
  if (sheetOpen) root.appendChild(renderLangSheet());

  if (preserveScroll) window.scrollTo(0, y);
  else window.scrollTo(0, 0);
}

// --- shared bits -----------------------------------------------------------
function langButton() {
  return h("button", {
    class: "lang-btn",
    "aria-label": ui("language", L()),
    onclick: () => { sheetOpen = true; render({ preserveScroll: true }); },
  }, h("span", { class: "lang-globe", "aria-hidden": "true", html: GLOBE_SVG }),
     h("span", { class: "lang-code" }, state.lang.toUpperCase()));
}

function renderLangSheet() {
  const close = () => { sheetOpen = false; render({ preserveScroll: true }); };
  const list = state.data.languages.map((l) =>
    h("button", {
      class: "lang-row" + (l.code === state.lang ? " is-active" : ""),
      onclick: () => {
        setLang(l.code);
        sheetOpen = false;
        render({ preserveScroll: true }); // stay on the exact same step + scroll
      },
    },
      h("span", { class: "lang-row-native" }, l.name_native),
      h("span", { class: "lang-row-en" }, l.name_en),
      l.code === state.lang ? h("span", { class: "lang-check", html: CHECK_SVG }) : null,
    )
  );

  const rows = [h("div", { class: "lang-list" }, ...list)];

  if (langMeta().has_translit) {
    rows.push(
      h("label", { class: "translit-toggle" },
        h("span", {}, ui("show_translit", L())),
        h("input", {
          type: "checkbox",
          checked: state.showTranslit ? true : null,
          onchange: (ev) => { setTranslit(ev.target.checked); render({ preserveScroll: true }); },
        }),
        h("span", { class: "switch", "aria-hidden": "true" }),
      )
    );
  }

  if (state.user) {
    rows.push(
      h("div", { class: "sheet-account" },
        h("div", { class: "acct-line" },
          h("span", { class: "acct-label" }, ui("account", L())),
          h("span", { class: "acct-email" }, state.user.email || ""),
        ),
        h("button", { class: "btn btn-ghost btn-block", onclick: doSignOut }, ui("sign_out", L())),
      )
    );
  }

  return h("div", { class: "sheet-backdrop", onclick: (e) => { if (e.target.classList.contains("sheet-backdrop")) close(); } },
    h("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": ui("language", L()) },
      h("div", { class: "sheet-grab", "aria-hidden": "true" }),
      ...rows,
    )
  );
}

async function doSignOut() {
  sheetOpen = false;
  await signOut();
  state.user = null;
  state.view = "home";
  render();
}

// --- LOGIN GATE ------------------------------------------------------------
function renderLogin() {
  const wrap = h("div", { class: "screen login" });
  wrap.appendChild(h("header", { class: "home-top" }, h("span", { class: "home-top-spacer" }), langButton()));

  const card = h("div", { class: "login-card" });
  card.appendChild(h("div", { class: "login-mark", "aria-hidden": "true", html: MARK_SVG }));
  card.appendChild(h("h1", { class: "login-title" }, ui("signin_title", L())));
  card.appendChild(h("p", { class: "login-sub" }, ui("signin_sub", L())));

  const err = h("p", { class: "login-error", role: "alert", style: "display:none" });
  const email = h("input", { type: "email", class: "field", autocomplete: "email", inputmode: "email", placeholder: ui("email_label", L()), "aria-label": ui("email_label", L()) });
  const pass = h("input", { type: "password", class: "field", autocomplete: "current-password", placeholder: ui("password_label", L()), "aria-label": ui("password_label", L()) });
  const btn = h("button", { class: "btn btn-primary btn-block" }, ui("signin_btn", L()));

  const submit = async () => {
    const e = email.value.trim(), p = pass.value;
    if (!e || !p) return;
    err.style.display = "none";
    btn.disabled = true;
    btn.textContent = ui("signing_in", L());
    try {
      const user = await signInPassword(e, p);
      state.user = user || currentUser();
      revalidate();
      if (state.startDate && !state.finished) state.view = "home";
      render();
    } catch {
      err.textContent = ui("signin_error", L());
      err.style.display = "block";
      btn.disabled = false;
      btn.textContent = ui("signin_btn", L());
    }
  };
  btn.addEventListener("click", submit);
  email.addEventListener("keydown", (ev) => { if (ev.key === "Enter") pass.focus(); });
  pass.addEventListener("keydown", (ev) => { if (ev.key === "Enter") submit(); });

  card.appendChild(
    h("div", { class: "login-form" },
      h("label", { class: "field-label" }, ui("email_label", L())), email,
      h("label", { class: "field-label" }, ui("password_label", L())), pass,
      err, btn,
    )
  );
  card.appendChild(
    h("div", { class: "login-links" },
      h("a", { class: "linkish", href: resetPasswordUrl, target: "_blank", rel: "noopener" }, ui("forgot_password", L())),
      h("a", { class: "linkish", href: signupUrl, target: "_blank", rel: "noopener" }, ui("no_account", L())),
    )
  );
  wrap.appendChild(h("main", { class: "login-main" }, card));
  return wrap;
}

// --- HOME ------------------------------------------------------------------
function renderHome() {
  const firstRun = !state.startDate;
  const wrap = h("div", { class: "screen home" });

  wrap.appendChild(
    h("header", { class: "home-top" },
      h("span", { class: "home-top-spacer" }),
      langButton(),
    )
  );

  if (firstRun) {
    wrap.appendChild(renderWelcome());
    return wrap;
  }

  const day = state.currentDay;
  const info = state.data.schedule.days[day - 1];
  const phaseName = pick(state.data.schedule.phases[info.phase].name, L());
  const resuming = state.progress.stepIndex > 0;

  const center = h("div", { class: "home-main" });
  center.appendChild(h("p", { class: "home-eyebrow" }, pick({ pl:"Nowenna Pompejańska", it:"Novena Pompeiana", fr:"Neuvaine de Pompéi", es:"Novena de Pompeya", de:"Pompejanische Novene", la:"Novena Pompeiana", ru:"Помпейская новенна", uk:"Помпейська новена", be:"Пампейская навэна", zh:"龐貝聖母九日敬禮" }, L())));
  center.appendChild(h("h1", { class: "home-day" }, formatDay(day, 54, L())));
  center.appendChild(h("p", { class: "home-phase" }, phaseName));

  // progress bar across 54 days
  const pct = ((day - 1) / 54) * 100;
  center.appendChild(
    h("div", { class: "track track-novena", "aria-hidden": "true" },
      h("div", { class: "track-fill", style: `width:${pct}%` }),
    )
  );

  // intention card
  center.appendChild(renderIntentionCard());

  // actions
  const actions = h("div", { class: "home-actions" });
  actions.appendChild(
    h("button", { class: "btn btn-primary", onclick: startPraying },
      resuming ? ui("continue", L()) : ui("begin_day", L()))
  );
  if (resuming) {
    actions.appendChild(
      h("button", { class: "btn btn-ghost", onclick: () => { resetDay(); render(); } },
        ui("restart_day", L()))
    );
  }
  center.appendChild(actions);

  wrap.appendChild(center);

  wrap.appendChild(
    h("footer", { class: "home-foot" },
      h("button", { class: "linkish", onclick: confirmNewNovena }, ui("start_new", L())),
    )
  );
  return wrap;
}

function renderWelcome() {
  const box = h("div", { class: "screen-pad welcome" });
  box.appendChild(h("h1", { class: "welcome-title" }, ui("novena_title", L())));
  box.appendChild(h("p", { class: "welcome-sub" }, ui("subtitle", L())));
  box.appendChild(h("p", { class: "welcome-intro" }, ui("intro", L())));

  const intentionLabel = pick(state.data.prayers.intention_prompt.name, L());
  box.appendChild(h("label", { class: "field-label", for: "intention-input" }, intentionLabel));
  const ta = h("textarea", {
    id: "intention-input",
    class: "field",
    rows: "3",
    placeholder: ui("intention_placeholder", L()),
  });
  ta.value = state.intention || "";
  box.appendChild(ta);
  box.appendChild(h("p", { class: "field-note" }, ui("intention_note", L())));

  box.appendChild(
    h("button", {
      class: "btn btn-primary btn-block",
      onclick: () => {
        setIntention(ta.value);
        beginNovena();
        startPraying();
      },
    }, ui("begin_novena", L()))
  );
  return box;
}

function renderIntentionCard() {
  const card = h("div", { class: "intention-card" });
  const label = pick(state.data.prayers.intention_prompt.name, L());
  card.appendChild(
    h("div", { class: "intention-head" },
      h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
      h("span", { class: "intention-label" }, label),
      h("button", { class: "linkish small", onclick: editIntentionInline }, ui("edit", L())),
    )
  );
  card.appendChild(
    h("p", { class: "intention-text" + (state.intention ? "" : " is-empty") },
      state.intention || ui("intention_placeholder", L()))
  );
  return card;
}

function editIntentionInline() {
  const current = state.intention || "";
  const ta = h("textarea", { class: "field", rows: "3" });
  ta.value = current;
  const dialog = h("div", { class: "sheet-backdrop", onclick: (e) => { if (e.target.classList.contains("sheet-backdrop")) { sheetOpen = false; render({ preserveScroll: true }); } } },
    h("div", { class: "sheet", role: "dialog", "aria-modal": "true" },
      h("div", { class: "sheet-grab", "aria-hidden": "true" }),
      h("label", { class: "field-label" }, pick(state.data.prayers.intention_prompt.name, L())),
      ta,
      h("div", { class: "sheet-actions" },
        h("button", { class: "btn btn-ghost", onclick: () => { render({ preserveScroll: true }); } }, ui("cancel", L())),
        h("button", { class: "btn btn-primary", onclick: () => { setIntention(ta.value); render({ preserveScroll: true }); } }, ui("save", L())),
      ),
    )
  );
  root.appendChild(dialog);
  ta.focus();
}

// --- PRAY ------------------------------------------------------------------
function startPraying() {
  dayCtx = buildDay(state.data, state.currentDay);
  state.view = "pray";
  if (state.progress.stepIndex >= dayCtx.steps.length) setProgress(0, 0);
  render();
}

function renderPray() {
  if (!dayCtx || dayCtx.day !== state.currentDay) dayCtx = buildDay(state.data, state.currentDay);
  const steps = dayCtx.steps;
  const idx = Math.min(state.progress.stepIndex, steps.length - 1);
  const step = steps[idx];

  const wrap = h("div", { class: "screen pray" });

  // top bar
  wrap.appendChild(
    h("header", { class: "bar" },
      h("button", { class: "icon-btn", "aria-label": ui("back_home", L()), onclick: goHome },
        h("span", { html: HOME_SVG, "aria-hidden": "true" })),
      h("div", { class: "bar-day" }, formatDay(state.currentDay, 54, L())),
      langButton(),
    )
  );

  // step progress bar
  const pct = ((idx + 1) / steps.length) * 100;
  wrap.appendChild(
    h("div", { class: "track track-step", "aria-hidden": "true" },
      h("div", { class: "track-fill", style: `width:${pct}%` }),
    )
  );

  // intention follow-along strip
  if (state.intention) wrap.appendChild(renderIntentionStrip());

  // step card
  const card = renderStep(step);
  wrap.appendChild(h("main", { class: "stage" }, card));

  // bottom nav
  const isLast = idx >= steps.length - 1;
  wrap.appendChild(
    h("nav", { class: "navbar" },
      h("button", { class: "btn btn-ghost nav-back", onclick: prevStep },
        h("span", { html: ARROW_L, "aria-hidden": "true" }), h("span", {}, ui("back", L()))),
      h("button", { class: "btn btn-primary nav-next", onclick: nextStep },
        h("span", {}, isLast ? ui("finish_day", L()) : ui("next", L())),
        h("span", { html: ARROW_R, "aria-hidden": "true" })),
    )
  );

  return wrap;
}

function renderIntentionStrip() {
  const strip = h("button", {
    class: "intention-strip",
    "aria-expanded": "false",
    onclick: (ev) => {
      const btn = ev.currentTarget;
      const expanded = btn.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    },
  },
    h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
    h("span", { class: "intention-strip-text" }, state.intention),
  );
  return strip;
}

function eyebrowFor(step) {
  if (step.section === "opening") return ui("opening_section", L());
  if (step.section === "closing") return ui("closing_section", L());
  if (step.section === "mystery") {
    const m = state.data.mysteriesById[step.mysteryId];
    const cat = pick(CATEGORY[m.category], L());
    return `${ui("mystery_word", L())} ${step.decadeIndex} ${ui("of_word", L())} 20 · ${cat}`;
  }
  return "";
}

function renderStep(step) {
  if (step.kind === "intention") return renderIntentionStep(step);
  if (step.kind === "mystery") return renderMysteryStep(step);
  return renderPrayerStep(step);
}

function renderPrayerStep(step) {
  const prayer = state.data.prayers[step.prayerId];
  const meta = langMeta();
  const card = h("article", { class: "card" });
  card.appendChild(h("p", { class: "eyebrow" }, eyebrowFor(step)));
  card.appendChild(h("h2", { class: "card-title" }, pick(prayer.name, L())));
  const tname = pickTranslit(prayer.name, L(), meta);
  if (state.showTranslit && tname) card.appendChild(h("p", { class: "translit translit-title" }, tname));

  const body = h("div", { class: "card-body prayer-text" });
  body.appendChild(h("p", {}, pick(prayer.text, L())));
  const ttext = pickTranslit(prayer.text, L(), meta);
  if (state.showTranslit && ttext) body.appendChild(h("p", { class: "translit" }, ttext));
  card.appendChild(body);

  if (step.reps > 1) card.appendChild(renderCounter(step));
  return card;
}

function renderIntentionStep(step) {
  const prayer = state.data.prayers.intention_prompt;
  const card = h("article", { class: "card" });
  card.appendChild(h("p", { class: "eyebrow" }, ui("opening_section", L())));
  card.appendChild(h("h2", { class: "card-title" }, pick(prayer.name, L())));
  const body = h("div", { class: "card-body prayer-text" });
  body.appendChild(h("p", {}, pick(prayer.text, L())));
  card.appendChild(body);

  const box = h("div", { class: "intention-inline" });
  box.appendChild(h("p", { class: "intention-inline-text" + (state.intention ? "" : " is-empty") },
    state.intention || ui("intention_placeholder", L())));
  box.appendChild(h("button", { class: "linkish", onclick: editIntentionInline }, ui("edit", L())));
  card.appendChild(box);
  return card;
}

function renderMysteryStep(step) {
  const m = state.data.mysteriesById[step.mysteryId];
  const meta = langMeta();
  const card = h("article", { class: "card mystery" });
  card.appendChild(h("p", { class: "eyebrow" }, eyebrowFor(step)));
  card.appendChild(h("h2", { class: "card-title" }, pick(m.name, L())));
  const tname = pickTranslit(m.name, L(), meta);
  if (state.showTranslit && tname) card.appendChild(h("p", { class: "translit translit-title" }, tname));

  // scripture reference + optional YouVersion link + shared text (admin-editable)
  const ref = pick(m.scripture.reference_localized, L());
  const link = state.data.scriptureLinks?.[m.id];
  const scrip = h("div", { class: "scripture" });
  scrip.appendChild(h("p", { class: "scripture-ref" },
    h("span", { class: "scripture-ico", "aria-hidden": "true", html: BOOK_SVG }), ref));
  if (link?.url) {
    scrip.appendChild(h("a", { class: "scripture-link", href: link.url, target: "_blank", rel: "noopener" },
      `${ui("read_passage", L())} ↗${link.version ? " · " + link.version : ""}`));
  }
  scrip.appendChild(renderScriptureBody(m));
  card.appendChild(scrip);

  // meditation
  const med = h("div", { class: "meditation" });
  med.appendChild(h("p", { class: "med-label" }, ui("meditation", L())));
  med.appendChild(h("p", { class: "med-text" }, pick(m.meditation, L())));
  const tmed = pickTranslit(m.meditation, L(), meta);
  if (state.showTranslit && tmed) med.appendChild(h("p", { class: "translit" }, tmed));
  card.appendChild(med);
  return card;
}

// Text to show: admin-shared (Supabase) wins; else a bundled public-domain
// default for this language (e.g. French LSG); else empty.
function scriptureText(mysteryId, lang) {
  return getShared(mysteryId, lang) || state.data.scriptureDefaults?.[mysteryId]?.[lang] || "";
}

function renderScriptureBody(m) {
  const existing = scriptureText(m.id, state.lang);
  const admin = isAdmin(state.user);
  const container = h("div", { class: "scripture-user" });

  if (existing) {
    container.appendChild(h("p", { class: "scripture-text" }, existing));
    if (admin) {
      container.appendChild(h("button", { class: "linkish small", onclick: () => openScriptureEditor(m, container) }, ui("edit", L())));
    }
  } else if (admin) {
    container.appendChild(
      h("button", { class: "linkish small add-scripture", onclick: () => openScriptureEditor(m, container) },
        "+ " + ui("scripture_add", L()))
    );
  }
  return container;
}

// Admin-only editor: saves the passage to Supabase for ALL users.
function openScriptureEditor(m, container) {
  const ta = h("textarea", { class: "field", rows: "6", placeholder: ui("scripture_add", L()) });
  ta.value = scriptureText(m.id, state.lang);
  const err = h("p", { class: "login-error", style: "display:none" });
  const saveBtn = h("button", { class: "btn btn-primary" }, ui("save", L()));

  const doSave = async () => {
    err.style.display = "none";
    saveBtn.disabled = true;
    saveBtn.textContent = ui("saving", L());
    try {
      await saveShared(m.id, state.lang, ta.value.trim(), state.user);
      render({ preserveScroll: true });
    } catch {
      err.textContent = ui("save_failed", L());
      err.style.display = "block";
      saveBtn.disabled = false;
      saveBtn.textContent = ui("save", L());
    }
  };
  saveBtn.addEventListener("click", doSave);

  container.replaceChildren(
    h("p", { class: "field-note" }, ui("scripture_shared_note", L())),
    ta, err,
    h("div", { class: "sheet-actions tight" },
      h("button", { class: "btn btn-ghost", onclick: () => { container.replaceChildren(renderScriptureBody(m)); } }, ui("cancel", L())),
      saveBtn,
    ),
  );
  ta.focus();
}

// Bead counter for repeated prayers (3× or 10×).
function renderCounter(step) {
  const reps = step.reps;
  const wrap = h("div", { class: "counter" });
  const beads = h("div", { class: "beads" });
  for (let i = 0; i < reps; i++) {
    beads.appendChild(h("span", { class: "bead" + (i < state.progress.rep ? " on" : "") }));
  }
  const num = h("span", { class: "counter-num" }, `${state.progress.rep} / ${reps}`);
  const hint = h("span", { class: "counter-hint" }, ui("tap_to_count", L()));

  const tap = () => {
    const rep = Math.min(reps, state.progress.rep + 1);
    setProgress(state.progress.stepIndex, rep);
    // update in place to avoid scroll jump
    [...beads.children].forEach((b, i) => b.classList.toggle("on", i < rep));
    num.textContent = `${rep} / ${reps}`;
    if (rep >= reps) wrap.classList.add("done");
  };

  const btn = h("button", { class: "counter-tap", "aria-label": ui("tap_to_count", L()), onclick: tap },
    beads, num);
  wrap.appendChild(btn);
  wrap.appendChild(hint);
  if (state.progress.rep >= reps) wrap.classList.add("done");
  return wrap;
}

// --- navigation ------------------------------------------------------------
function nextStep() {
  const steps = dayCtx.steps;
  const idx = state.progress.stepIndex;
  if (idx >= steps.length - 1) {
    state.view = "day-done";
    render();
    return;
  }
  setProgress(idx + 1, 0);
  render();
}

function prevStep() {
  const idx = state.progress.stepIndex;
  if (idx <= 0) { goHome(); return; }
  setProgress(idx - 1, 0);
  render();
}

function goHome() {
  state.view = "home";
  render();
}

// --- DAY DONE --------------------------------------------------------------
function renderDayDone() {
  const wrap = h("div", { class: "screen day-done" });
  wrap.appendChild(
    h("header", { class: "bar" },
      h("button", { class: "icon-btn", "aria-label": ui("back_home", L()), onclick: () => { setProgress(dayCtx.steps.length - 1, 0); state.view = "pray"; render(); } },
        h("span", { html: ARROW_L, "aria-hidden": "true" })),
      h("div", { class: "bar-day" }, formatDay(state.currentDay, 54, L())),
      langButton(),
    )
  );
  const box = h("div", { class: "done-box" });
  box.appendChild(h("div", { class: "done-mark", "aria-hidden": "true", html: CHECK_BIG_SVG }));
  box.appendChild(h("h1", { class: "done-title" }, ui("day_done_title", L())));
  box.appendChild(h("p", { class: "done-body" }, ui("day_done_body", L())));
  if (state.intention) {
    box.appendChild(
      h("div", { class: "done-intention" },
        h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
        h("span", {}, state.intention)));
  }
  box.appendChild(
    h("button", { class: "btn btn-primary btn-block", onclick: () => { completeDay(); state.view = "home"; render(); } },
      ui("mark_complete", L()))
  );
  wrap.appendChild(box);
  return wrap;
}

// --- FINISHED --------------------------------------------------------------
function renderFinished() {
  const wrap = h("div", { class: "screen finished" });
  wrap.appendChild(h("header", { class: "home-top" }, h("span", { class: "home-top-spacer" }), langButton()));
  const box = h("div", { class: "done-box" });
  box.appendChild(h("div", { class: "done-mark crown", "aria-hidden": "true", html: CROWN_SVG }));
  box.appendChild(h("h1", { class: "done-title" }, ui("finished_title", L())));
  box.appendChild(h("p", { class: "done-body quote" }, ui("finished_body", L())));
  box.appendChild(
    h("button", { class: "btn btn-primary btn-block", onclick: confirmNewNovena }, ui("start_new", L()))
  );
  wrap.appendChild(box);
  return wrap;
}

function confirmNewNovena() {
  if (confirm(ui("confirm_restart_novena", L()))) {
    startNewNovena();
    state.view = "home";
    render();
  }
}

// --- keyboard --------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (sheetOpen && e.key === "Escape") { sheetOpen = false; render({ preserveScroll: true }); return; }
  if (state.view !== "pray") return;
  if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
  if (e.key === "ArrowRight") { e.preventDefault(); nextStep(); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); prevStep(); }
});

// --- swipe (touch) ---------------------------------------------------------
let touchX = null, touchY = null;
document.addEventListener("touchstart", (e) => {
  if (state.view !== "pray" || sheetOpen) return;
  touchX = e.changedTouches[0].clientX;
  touchY = e.changedTouches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  touchX = touchY = null;
  if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (dx < 0) nextStep(); else prevStep();
}, { passive: true });

// --- SVG icons -------------------------------------------------------------
const GLOBE_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
const CHECK_BIG_SVG = '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="24" cy="24" r="21" opacity="0.25"/><path d="M14 24.5l7 7L34 17"/></svg>';
const HOME_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>';
const ARROW_L = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg>';
const ARROW_R = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg>';
const FLAME_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2c1 3-2 4-2 7a2 2 0 104 0c0-1 0-1 .5-2 1.5 1.5 2.5 3.5 2.5 6a5 5 0 11-10 0c0-4 5-6 5-11z"/></svg>';
const BOOK_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 014 17.5z"/><path d="M20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5a1.5 1.5 0 001.5-1.5z"/></svg>';
const CROWN_SVG = '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 34h32M8 34l-2-16 9 7 9-13 9 13 9-7-2 16"/></svg>';
// pompeiana mark: the WillpowerLab small·big·small dots + a dot above & below
// the center dot, forming a Latin cross. Uses currentColor like the original.
const MARK_SVG = '<svg viewBox="0 0 22 24" width="26" height="28" fill="currentColor"><circle cx="3" cy="10.5" r="2.2"/><circle cx="11" cy="10.5" r="3.2"/><circle cx="19" cy="10.5" r="2.2"/><circle cx="11" cy="3" r="2.2"/><circle cx="11" cy="21" r="2.2"/></svg>';

// --- boot ------------------------------------------------------------------
(async function boot() {
  try {
    await loadData();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    state.user = await resolveUser();
    if (state.user) {
      revalidate();
      // Hidden set-day: ?setday=N jumps the current day, then cleans the URL.
      const sd = parseInt(new URLSearchParams(location.search).get("setday"), 10);
      if (Number.isInteger(sd)) {
        setDay(sd);
        try { history.replaceState(null, "", location.pathname); } catch { /* ignore */ }
      }
      if (state.startDate && !state.finished) state.view = "home";
      render();
      fetchShared().then(() => render({ preserveScroll: true }));
    } else {
      render();
    }
  } catch (e) {
    root.replaceChildren(h("div", { class: "screen-pad" },
      h("h1", {}, "Błąd / Error"),
      h("p", {}, String(e.message || e)),
      h("p", { class: "field-note" }, "Uruchom aplikację przez serwer HTTP (nie file://). / Serve the app over HTTP.")));
    console.error(e);
  }
})();
