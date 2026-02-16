import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./structure/deskStructure";
import { singletonActions } from "./structure/singletons";

const singletonTypes = new Set(["cafeMenu", "openingHours", "promo"]);

export default defineConfig({
  name: "default",
  title: "Coffee Shop Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pl16phi2",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev,
  },
});
