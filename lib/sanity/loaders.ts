import { fetchSanityQuery } from "./client";
import { fallbackCafeMenu, fallbackOpeningHours, fallbackPromo } from "./fallbacks";
import { cafeMenuQuery, openingHoursQuery, promoQuery, singletonParams } from "./queries";
import type { CafeMenuDocument, OpeningHoursDocument, PromoDocument } from "./types";

export async function loadCafeMenu(): Promise<CafeMenuDocument> {
  const menu = await fetchSanityQuery<CafeMenuDocument>(
    cafeMenuQuery,
    singletonParams.cafeMenu,
    120
  );

  if (!menu?.sections?.length) {
    return fallbackCafeMenu;
  }

  return {
    ...menu,
    currency: menu.currency || "CZK",
    sections: menu.sections.map((section) => ({
      ...section,
      items: (section.items ?? []).filter((item) => item.available !== false),
    })),
  };
}

export async function loadOpeningHours(): Promise<OpeningHoursDocument> {
  const openingHours = await fetchSanityQuery<OpeningHoursDocument>(
    openingHoursQuery,
    singletonParams.openingHours,
    120
  );

  if (!openingHours?.days?.length) {
    return fallbackOpeningHours;
  }

  return openingHours;
}

function isPromoDateValid(promo: PromoDocument) {
  const now = new Date();

  if (promo.validFrom && now < new Date(promo.validFrom)) {
    return false;
  }

  if (promo.validTo && now > new Date(promo.validTo)) {
    return false;
  }

  return true;
}

export async function loadPromo(): Promise<PromoDocument | null> {
  const promo =
    (await fetchSanityQuery<PromoDocument>(promoQuery, singletonParams.promo, 60)) ??
    fallbackPromo;

  if (!promo.isActive || !promo.headline || !isPromoDateValid(promo)) {
    return null;
  }

  return promo;
}
