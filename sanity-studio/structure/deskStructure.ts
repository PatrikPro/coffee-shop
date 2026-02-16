import type { StructureResolver } from "sanity/desk";

const singletonIds = {
  cafeMenu: "cafeMenuSingleton",
  openingHours: "openingHoursSingleton",
  promo: "promoSingleton",
};

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Obsah")
    .items([
      S.listItem()
        .title("Menu")
        .schemaType("cafeMenu")
        .child(S.document().schemaType("cafeMenu").documentId(singletonIds.cafeMenu)),
      S.listItem()
        .title("Otevírací doba")
        .schemaType("openingHours")
        .child(
          S.document().schemaType("openingHours").documentId(singletonIds.openingHours)
        ),
      S.listItem()
        .title("Promo")
        .schemaType("promo")
        .child(S.document().schemaType("promo").documentId(singletonIds.promo)),
    ]);
