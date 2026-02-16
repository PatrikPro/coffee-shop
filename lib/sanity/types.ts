export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface SanityImageAsset {
  _ref?: string;
  url?: string;
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
}

export interface CafeMenuItem {
  _key: string;
  name: string;
  description?: string;
  price: number;
  image?: SanityImage;
  badge?: string;
  available?: boolean;
}

export interface CafeMenuSection {
  _key: string;
  name: string;
  note?: string;
  items: CafeMenuItem[];
}

export interface CafeMenuDocument {
  _id: string;
  title?: string;
  currency?: string;
  sections: CafeMenuSection[];
}

export interface OpeningHoursDay {
  _key: string;
  day: WeekDay;
  closed?: boolean;
  open?: string;
  close?: string;
}

export interface OpeningHoursDocument {
  _id: string;
  days: OpeningHoursDay[];
  note?: string;
}

export interface PromoDocument {
  _id: string;
  isActive?: boolean;
  headline?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
  validFrom?: string;
  validTo?: string;
}
