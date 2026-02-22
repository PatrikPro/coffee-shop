import menuJson from "@/content/menu.json";
import type { CafeMenuDocument, OpeningHoursDocument, PromoDocument, WeekDay } from "./types";

interface LegacyMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface LegacyMenuCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}

interface LegacyMenuData {
  categories: LegacyMenuCategory[];
  items: LegacyMenuItem[];
}

const legacyMenu = menuJson as LegacyMenuData;

export const fallbackCafeMenu: CafeMenuDocument = {
  _id: "fallback-cafe-menu",
  title: "Menu",
  currency: "CZK",
  sections: legacyMenu.categories
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      _key: category.id,
      name: category.name,
      note: category.description,
      items: legacyMenu.items
        .filter((item) => item.category === category.id)
        .map((item) => ({
          _key: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          available: true,
          image: item.image
            ? {
                asset: {
                  url: item.image,
                },
              }
            : undefined,
        })),
    })),
};

const weekTemplate: { day: WeekDay; open: string; close: string }[] = [
  { day: "mon", open: "08:00", close: "20:00" },
  { day: "tue", open: "08:00", close: "20:00" },
  { day: "wed", open: "08:00", close: "20:00" },
  { day: "thu", open: "08:00", close: "20:00" },
  { day: "fri", open: "08:00", close: "20:00" },
  { day: "sat", open: "09:00", close: "21:00" },
  { day: "sun", open: "09:00", close: "18:00" },
];

export const fallbackOpeningHours: OpeningHoursDocument = {
  _id: "fallback-opening-hours",
  note: "",
  days: weekTemplate.map((d) => ({
    _key: d.day,
    day: d.day,
    closed: false,
    open: d.open,
    close: d.close,
  })),
};

export const fallbackPromo: PromoDocument = {
  _id: "fallback-promo",
  isActive: false,
  headline: "",
};
