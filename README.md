# Nowenna Pompejańska — aplikacja PWA

Modlitewna aplikacja prowadząca przez **54-dniową nowennę pompejańską** (różaniec
codziennie: 27 dni próśb + 27 dni dziękczynienia). Offline-first, w 10 językach,
zero zewnętrznych wywołań — wszystko działa z lokalnych plików JSON.

## Jak uruchomić

Aplikacja to statyczne pliki, ale **musi być serwowana po HTTP** (moduły ES i
`fetch` nie działają z `file://`):

```bash
cd pompejanka-app
python3 -m http.server 8000
# otwórz http://localhost:8000
```

Każdy statyczny hosting też zadziała (GitHub Pages, Netlify, Cloudflare Pages…).
Po pierwszym otwarciu service worker zapisuje wszystko w cache → działa offline,
a na telefonie można „Dodaj do ekranu początkowego”.

## Co potrafi

- **Licznik dni** — duży „Dzień N / 54” + faza (błagalna / dziękczynna). Tempo
  **własne** (self-paced): dzień przechodzi dalej dopiero po jego ukończeniu,
  przerwy nie kasują postępu.
- **Intencja, która towarzyszy** — ustalasz ją na początku; widnieje na ekranie
  głównym, na kroku intencji i jako cienki, rozwijany pasek przez całą modlitwę.
- **Pełny przebieg dnia** wg `schedule.json` — 12 kroków rozwiniętych w 91 ekranów:
  znak krzyża → akt → intencja → Wierzę → Ojcze nasz → 3× Zdrowaś → Chwała →
  20 tajemnic (tytuł + Pismo + rozważanie + Ojcze nasz + 10× Zdrowaś + Chwała) →
  Pod Twoją obronę → modlitwa zamykająca (zależna od fazy) → 3× akt → znak krzyża.
- **Licznik paciorków** — przy 3× / 10× dotykasz, by liczyć; pozycja paciorka jest
  zapisywana (wznawiasz dokładnie tam, gdzie skończyłeś).
- **Panel języków** — minimalistyczny, dostępny w każdej chwili (przycisk w pasku
  górnym). Zmiana języka **nie gubi miejsca**: wracasz na ten sam krok, ten sam
  paciorek i tę samą pozycję przewijania. Dla rosyjskiego/ukraińskiego/białoruskiego/
  chińskiego dodatkowy przełącznik transliteracji łacińskiej.
- **Pismo Święte** — pokazujemy tylko referencję; własny tekst z legalnie posiadanej
  Biblii wklejasz sam, zapisywany lokalnie (per tajemnica, per język).
- Nawigacja: przyciski Dalej/Wstecz, strzałki ← → na klawiaturze, gesty przesunięcia.

## Struktura plików

```
index.html              # powłoka aplikacji
app.webmanifest         # manifest PWA (instalacja)
sw.js                   # service worker (cache offline)
css/app.css             # motyw „calm minimal” (jasny + ciemny)
js/
  app.js                # render + interakcje (główny plik)
  store.js              # stan + zapis w localStorage + wczytanie danych
  sequence.js           # rozwija daily_structure w listę kroków
  i18n.js               # teksty interfejsu + helpery językowe
icons/                  # ikony PWA (SVG)
languages.json          # ── \
common_prayers.json     #    │ paczka danych (źródło prawdy, nietknięte)
mysteries.json          #    │
schedule.json           # ── /
```

## Stan zapisywany (localStorage, klucz `pompeiana.v1`)

`lang`, `showTranslit`, `intention`, `startDate`, `currentDay`, `finished`,
`progress {stepIndex, rep}`, `scripture {mysteryId: {lang: tekst}}`.

## Uwagi

- Dane (`*.json`) traktowane są jako źródło prawdy i nie były modyfikowane —
  aplikacja w 100% z nich korzysta (`schedule.daily_structure`, fazy, tajemnice).
- Brak buildu/zależności — czysty HTML/CSS/JS (ES modules).
- Opis samej paczki danych: [`DATA_PACKAGE.md`](DATA_PACKAGE.md).

## Prawa autorskie

- Modlitwy tradycyjne (Wierzę, Ojcze nasz, Zdrowaś, Chwała, Pod Twoją obronę) —
  domena publiczna.
- Modlitwy bł. Bartolo Longo (†1926) — domena publiczna od 1996.
- Rozważania tajemnic — autorstwa Claude (Anthropic), 1–2 zdania na tajemnicę,
  można je swobodnie modyfikować.
- Tekst Pisma Świętego **nie jest częścią repozytorium** — wkleja go użytkownik
  z własnych, legalnie posiadanych źródeł; przechowywany tylko lokalnie.
- Kod aplikacji możesz dowolnie używać i modyfikować.
