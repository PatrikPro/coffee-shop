import { SANITY_SINGLETON_IDS } from "./constants";

export const cafeMenuQuery = `*[_type == "cafeMenu" && _id == $documentId][0]{
  _id,
  title,
  currency,
  sections[]{
    _key,
    name,
    note,
    items[]{
      _key,
      name,
      description,
      price,
      badge,
      available,
      image{
        asset->{
          _ref,
          url
        }
      }
    }
  }
}`;

export const openingHoursQuery = `*[_type == "openingHours" && _id == $documentId][0]{
  _id,
  note,
  days[]{
    _key,
    day,
    closed,
    open,
    close
  }
}`;

export const promoQuery = `*[_type == "promo" && _id == $documentId][0]{
  _id,
  isActive,
  headline,
  text,
  ctaLabel,
  ctaHref,
  validFrom,
  validTo,
  image{
    asset->{
      _ref,
      url
    }
  }
}`;

export const singletonParams = {
  cafeMenu: { documentId: SANITY_SINGLETON_IDS.cafeMenu },
  openingHours: { documentId: SANITY_SINGLETON_IDS.openingHours },
  promo: { documentId: SANITY_SINGLETON_IDS.promo },
} as const;
