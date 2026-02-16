import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Položka menu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Název",
      type: "string",
      description: "Název položky, který uvidí návštěvník na webu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "string",
      description: "Krátký popis položky (volitelné).",
    }),
    defineField({
      name: "price",
      title: "Cena",
      type: "number",
      description: "Cena v Kč. Zadávejte pouze číslo (např. 89).",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Fotka",
      type: "image",
      description: "Volitelná fotka položky.",
      options: { hotspot: true },
    }),
    defineField({
      name: "badge",
      title: "Badge / štítek",
      type: "string",
      description: "Volitelně: například Novinka nebo Doporučujeme.",
    }),
    defineField({
      name: "available",
      title: "Dostupné",
      type: "boolean",
      description: "Když vypnete, položka se na webu nezobrazí.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} Kč` : "Bez ceny",
        media,
      };
    },
  },
});
