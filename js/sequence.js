// sequence.js — expand schedule.json's daily_structure into a flat, navigable
// list of steps for a given day. Honors phase-based closing prayer.

import { clampDay } from "./store.js";

// Returns { day, phase, dayInfo, steps:[ stepObj, ... ] }
// stepObj shapes:
//   { kind:"prayer", prayerId, reps, section, decadeIndex?, mysteryId? }
//   { kind:"intention", prayerId:"intention_prompt", section:"opening" }
//   { kind:"mystery", mysteryId, decadeIndex, section:"mystery" }
export function buildDay(data, dayNumber) {
  const day = clampDay(dayNumber);
  const dayInfo = data.schedule.days[day - 1];
  const closingPrayerId = dayInfo.closing_prayer_id;
  const phase = data.schedule.phases[dayInfo.phase];
  const structure = data.schedule.daily_structure;
  const mysteries = data.mysteries;

  const steps = [];
  let section = "opening";
  let decadeIndex = 0;

  for (const item of structure) {
    if (item.action === "mysteries_loop") {
      section = "mystery";
      const count = item.mysteries_count || mysteries.length;
      for (let i = 0; i < count && i < mysteries.length; i++) {
        const m = mysteries[i];
        decadeIndex = i + 1;
        steps.push({
          kind: "mystery",
          mysteryId: m.id,
          decadeIndex,
          section: "mystery",
        });
        for (const sub of item.per_mystery) {
          if (sub.action === "prayer") {
            steps.push({
              kind: "prayer",
              prayerId: sub.prayer_id,
              reps: sub.repetitions || 1,
              section: "mystery",
              decadeIndex,
              mysteryId: m.id,
            });
          }
          // display_* actions are folded into the mystery card above
        }
      }
      section = "closing";
      continue;
    }

    if (item.action === "prayer") {
      const prayerId = item.prayer_id_dynamic ? closingPrayerId : item.prayer_id;
      if (prayerId === "intention_prompt") {
        steps.push({ kind: "intention", prayerId, section });
      } else {
        steps.push({
          kind: "prayer",
          prayerId,
          reps: item.repetitions || 1,
          section,
        });
      }
    }
  }

  return { day, phase, dayInfo, closingPrayerId, steps };
}
