import { defineField, defineType } from "sanity";

const dayOptions = [
  { title: "Pondělí", value: "mon" },
  { title: "Úterý", value: "tue" },
  { title: "Středa", value: "wed" },
  { title: "Čtvrtek", value: "thu" },
  { title: "Pátek", value: "fri" },
  { title: "Sobota", value: "sat" },
  { title: "Neděle", value: "sun" },
];

export const openingHours = defineType({
  name: "openingHours",
  title: "Otevírací doba",
  type: "document",
  fields: [
    defineField({
      name: "days",
      title: "Dny",
      type: "array",
      description: "Vyplňte otevírací dobu pro jednotlivé dny v týdnu.",
      validation: (Rule) => Rule.required().length(7),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Den",
              type: "string",
              options: { list: dayOptions },
              validation: (Rule) => Rule.required(),
              description: "Vyberte den v týdnu.",
            }),
            defineField({
              name: "closed",
              title: "Zavřeno",
              type: "boolean",
              initialValue: false,
              description: "Zapněte, pokud je v tento den zavřeno.",
            }),
            defineField({
              name: "open",
              title: "Otevírá",
              type: "string",
              description: "Čas otevření ve formátu HH:MM (např. 08:00).",
              hidden: ({ parent }) => Boolean(parent?.closed),
            }),
            defineField({
              name: "close",
              title: "Zavírá",
              type: "string",
              description: "Čas zavření ve formátu HH:MM (např. 20:00).",
              hidden: ({ parent }) => Boolean(parent?.closed),
            }),
          ],
          preview: {
            select: {
              day: "day",
              closed: "closed",
              open: "open",
              close: "close",
            },
            prepare({ day, closed, open, close }) {
              const label = dayOptions.find((option) => option.value === day)?.title ?? day;
              return {
                title: label,
                subtitle: closed ? "Zavřeno" : `${open || "--:--"}–${close || "--:--"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "note",
      title: "Poznámka",
      type: "string",
      description: "Volitelně: například O svátcích může být změna.",
    }),
  ],
});
