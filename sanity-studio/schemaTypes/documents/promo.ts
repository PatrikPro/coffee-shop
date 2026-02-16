import { defineField, defineType } from "sanity";

export const promo = defineType({
  name: "promo",
  title: "Promo",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "Aktivní promo",
      type: "boolean",
      initialValue: false,
      description: "Když je vypnuto, promo se na webu nezobrazí.",
    }),
    defineField({
      name: "headline",
      title: "Nadpis",
      type: "string",
      description: "Hlavní text promo sdělení.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      description: "Volitelný doplňující text.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Text tlačítka",
      type: "string",
      description: "Volitelně: např. Zjistit více.",
    }),
    defineField({
      name: "ctaHref",
      title: "Odkaz tlačítka",
      type: "url",
      description: "Volitelně: URL, kam má tlačítko vést.",
    }),
    defineField({
      name: "image",
      title: "Obrázek",
      type: "image",
      description: "Volitelný obrázek pro promo blok.",
      options: { hotspot: true },
    }),
    defineField({
      name: "validFrom",
      title: "Platné od",
      type: "datetime",
      description: "Volitelně: datum a čas začátku kampaně.",
    }),
    defineField({
      name: "validTo",
      title: "Platné do",
      type: "datetime",
      description: "Volitelně: datum a čas konce kampaně.",
    }),
  ],
});
