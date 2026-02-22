import { defineField, defineType } from "sanity";

export const cafeMenu = defineType({
  name: "cafeMenu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulek",
      type: "string",
      initialValue: "Menu",
      description: "Titulek lze nechat jako Menu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sekce menu",
      type: "array",
      description: "Sekce můžete přetahovat pro změnu pořadí.",
      of: [{ type: "menuSection" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "currency",
      title: "Měna",
      type: "string",
      initialValue: "CZK",
      description: "Technické pole, standardně CZK.",
    }),
  ],
});
