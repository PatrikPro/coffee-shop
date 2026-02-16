import type { WeekDay } from "./types";

export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-02-19";

export const SANITY_SINGLETON_IDS = {
  cafeMenu: "cafeMenuSingleton",
  openingHours: "openingHoursSingleton",
  promo: "promoSingleton",
} as const;

export const DAY_LABELS: Record<WeekDay, string> = {
  mon: "Po",
  tue: "Út",
  wed: "St",
  thu: "Čt",
  fri: "Pá",
  sat: "So",
  sun: "Ne",
};

export const DAY_ORDER: WeekDay[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
