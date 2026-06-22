# Nowenna Pompejańska — baza danych dla aplikacji PWA

**Offline-first.** Wszystko w plikach JSON, zero zewnętrznych wywołań.

## Pliki paczki

| Plik | Zawartość |
|---|---|
| `manifest.json` | metadane wersji, lista plików |
| `languages.json` | 10 języków + reguły transliteracji |
| `common_prayers.json` | 11 modlitw stałych (Wierzę, Ojcze nasz, Zdrowaś, Chwała, Pod Twoją obronę, błagalna i dziękczynna bł. Bartolo Longo, akty strzeliste, znak krzyża, intencja) |
| `mysteries.json` | 20 tajemnic różańca (5 radosnych + 5 światła + 5 bolesnych + 5 chwalebnych) |
| `schedule.json` | 54-dniowy harmonogram + struktura dnia |

## Języki

`pl` polski · `it` włoski · `fr` francuski · `es` hiszpański · `de` niemiecki · `la` łacina · `ru` rosyjski · `uk` ukraiński · `be` białoruski · `zh` chiński (mandaryński)

Cyrylica i chiński mają dodatkowo klucz `*_translit` z łacińską transliteracją (ALA-LC dla rosyjskiego, BGN/PCGN dla ukraińskiego, Łacinka dla białoruskiego, Hanyu Pinyin z tonami dla chińskiego).

## Wzór pola wielojęzycznego

```json
"text": {
  "pl": "...",
  "it": "...",
  "fr": "...",
  "es": "...",
  "de": "...",
  "la": "...",
  "ru": "...", "ru_translit": "...",
  "uk": "...", "uk_translit": "...",
  "be": "...", "be_translit": "...",
  "zh": "...", "zh_translit": "..."
}
```

## Biblia — model bez tekstu

Paczka **nie zawiera** tekstu Pisma Świętego. Każda tajemnica ma:

```json
"scripture": {
  "reference_canonical": "Lk 1,26-38",
  "reference_localized": { "pl": "Łk 1,26-38", "it": "Lc 1,26-38", ... },
  "text_user": { "pl": "", "it": "", ... }
}
```

Aplikacja powinna:
- pokazać referencję,
- umożliwić użytkownikowi wklejenie własnego tekstu z legalnie posiadanej Biblii do `text_user[lang]`,
- przechowywać te wklejone teksty w `localStorage` / `IndexedDB` per tajemnica per język.

## Logika dnia (z `schedule.json` → `daily_structure`)

```
1.  Znak krzyża
2.  Akt strzelisty otwarcia
3.  Intencja użytkownika (z localStorage, ta sama na całą nowennę)
4.  Wierzę
5.  Ojcze nasz
6.  3× Zdrowaś Maryjo
7.  Chwała Ojcu
8.  Pętla po 20 tajemnicach:
       — Tytuł
       — (opcj.) Referencja + tekst użytkownika
       — Rozważanie
       — Ojcze nasz
       — 10× Zdrowaś Maryjo
       — Chwała Ojcu
9.  Pod Twoją obronę
10. Modlitwa zamykająca:
       — dni 1-27: prayer_supplicatory (błagalna bł. Bartolo Longo)
       — dni 28-54: prayer_thanksgiving (dziękczynna bł. Bartolo Longo)
11. 3× akt strzelisty końcowy
12. Znak krzyża
```

Fazę dnia odczytuj z `schedule.days[day_number-1].phase` lub bezpośrednio z `closing_prayer_id`.

## Stan praw autorskich

- Modlitwy tradycyjne (Credo, Pater, Ave, Gloria, Sub Tuum) — domena publiczna od stuleci.
- Modlitwy bł. Bartolo Longo (†1926) — domena publiczna od 1996.
- Rozważania tajemnic — autorstwa Claude (Anthropic), 1-2 zdania per tajemnica, można je modyfikować.
- Tekst Pisma Świętego — **nie jest częścią paczki**; wkleja użytkownik z własnych legalnie posiadanych źródeł, lokalnie u siebie.

## Wersja

`1.0` — 22 czerwca 2026
