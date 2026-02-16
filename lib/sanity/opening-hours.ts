import { DAY_LABELS, DAY_ORDER } from "./constants";
import type { OpeningHoursDay } from "./types";

function formatTime(time?: string) {
  return time ?? "--:--";
}

export function normalizeOpeningHours(days: OpeningHoursDay[]) {
  return [...days].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );
}

export function openingHoursToRows(days: OpeningHoursDay[]) {
  return normalizeOpeningHours(days).map((day) => ({
    key: day._key,
    label: DAY_LABELS[day.day],
    value: day.closed
      ? "Zavřeno"
      : `${formatTime(day.open)}–${formatTime(day.close)}`,
  }));
}
