import { defineField, defineType } from "sanity";

export const menuSection = defineType({
  name: "menuSection",
  title: "Sekce menu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Název sekce",
      type: "string",
      description: "Např. Káva, Dezerty, Snídaně.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Poznámka",
      type: "string",
      description: "Volitelná poznámka pod názvem sekce.",
    }),
    defineField({
      name: "items",
      title: "Položky",
      type: "array",
      description: "Položky můžete přetahovat pro změnu pořadí.",
      of: [{ type: "menuItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      items: "items",
    },
    prepare({ title, items = [] }) {
      return {
        title,
        subtitle: `${items.length} položek`,
      };
    },
  },
});
