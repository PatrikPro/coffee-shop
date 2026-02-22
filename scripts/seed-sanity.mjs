/**
 * Seed script – populates initial content into Sanity for the demo.
 *
 * Prerequisites:
 *   1. Add SANITY_WRITE_TOKEN to .env.local
 *      → https://www.sanity.io/manage/project/pl16phi2/api → Tokens → Add API Token
 *      → Choose "Editor" permissions
 *   2. Run: npm run studio:seed
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env.local") });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!PROJECT_ID) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local");
  process.exit(1);
}
if (!TOKEN) {
  console.error("❌  SANITY_WRITE_TOKEN is missing in .env.local");
  console.error(
    "   Create one at: https://www.sanity.io/manage/project/" +
      PROJECT_ID +
      "/api"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2025-02-19",
  token: TOKEN,
  useCdn: false,
});

// ─── Seed data ────────────────────────────────────────────────────────────────

const cafeMenuDoc = {
  _id: "cafeMenuSingleton",
  _type: "cafeMenu",
  title: "Menu",
  currency: "CZK",
  sections: [
    {
      _type: "menuSection",
      _key: "espresso",
      name: "Espresso",
      note: "Krátké, intenzivní, přesné. Pro milovníky čisté kávy.",
      items: [
        {
          _type: "menuItem",
          _key: "espresso-single",
          name: "Espresso",
          description: "Čistá dávka chuti, připravená z aktuálního roastu.",
          price: 55,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "doppio",
          name: "Doppio",
          description: "Dvojitá porce pro pomalé ráno i rychlý sprint.",
          price: 65,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "ristretto",
          name: "Ristretto",
          description: "Kratší, koncentrovanější, intenzivnější.",
          price: 55,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "lungo",
          name: "Lungo",
          description: "Delší tah, jemnější profil. Káva na pomalé ráno.",
          price: 60,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "bez-kofeinu-espresso",
          name: "Bez kofeinu (espresso)",
          description: "Chuť zůstává, tempo si řídíš ty.",
          price: 65,
          available: true,
          badge: "bez kofeinu",
        },
      ],
    },
    {
      _type: "menuSection",
      _key: "mlecne",
      name: "Mléčné",
      note: "Krémové klasiky i ovesné varianty – jemné a vyvážené.",
      items: [
        {
          _type: "menuItem",
          _key: "cappuccino",
          name: "Cappuccino",
          description: "Hedvábná mikropěna, vyvážená sladkost.",
          price: 79,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "flat-white",
          name: "Flat white",
          description: "Silnější káva, hladší mléko. Oblíbené u nomádů.",
          price: 85,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "latte-klasicke",
          name: "Latte (klasické)",
          description: "Jemné, dlouhé, ideální k práci.",
          price: 89,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "latte-ovesne",
          name: "Latte (ovesné)",
          description: "Jemné, dlouhé, ideální k práci. S ovesným mlékem.",
          price: 99,
          available: true,
          badge: "vegan",
        },
        {
          _type: "menuItem",
          _key: "bez-kofeinu-mlecne",
          name: "Bez kofeinu (cappuccino)",
          description: "Chuť zůstává, tempo si řídíš ty. S mlékem.",
          price: 89,
          available: true,
          badge: "bez kofeinu",
        },
      ],
    },
    {
      _type: "menuSection",
      _key: "filtr",
      name: "Filtr & Batch",
      note: "Lehčí profil, víc chutí. Ideál na dlouhé sezení.",
      items: [
        {
          _type: "menuItem",
          _key: "batch-brew",
          name: "Batch brew",
          description: "Filtr v konvici, lehčí profil a delší drink.",
          price: 69,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "v60",
          name: "V60 pour-over",
          description: "Ruční příprava, plnější tělo, víc aromatu.",
          price: 89,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "cold-brew",
          name: "Cold brew",
          description: "24 hodin louhovaná, hladká a osvěžující.",
          price: 79,
          available: true,
          badge: "sezónní",
        },
      ],
    },
    {
      _type: "menuSection",
      _key: "caj",
      name: "Čaj & Matcha",
      note: "Když chceš pauzu od kofeinu – nebo jiný druh energie.",
      items: [
        {
          _type: "menuItem",
          _key: "matcha-latte",
          name: "Matcha latte",
          description: "Jemná matcha, krémové mléko, čistá energie.",
          price: 109,
          available: true,
          badge: "vegan",
        },
        {
          _type: "menuItem",
          _key: "caj-syp",
          name: "Čaj (sypaný)",
          description: "Výběr podle nálady: černý, zelený, bylinky.",
          price: 69,
          available: true,
          badge: "bez kofeinu",
        },
        {
          _type: "menuItem",
          _key: "chai-latte",
          name: "Chai latte",
          description: "Kořeněný, hřejivý, voňavý. S ovesným mlékem.",
          price: 99,
          available: true,
          badge: "vegan",
        },
      ],
    },
    {
      _type: "menuSection",
      _key: "sladke",
      name: "Sladké",
      note: "Pečeme po malých várkách. Každý den něco jiného.",
      items: [
        {
          _type: "menuItem",
          _key: "croissant",
          name: "Croissant (máslový)",
          description: "Křupavý okraj, měkké vrstvy.",
          price: 59,
          available: true,
        },
        {
          _type: "menuItem",
          _key: "banana-bread",
          name: "Banana bread",
          description: "Vláčný, ořechový, perfektní ke kávě.",
          price: 69,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "cheesecake",
          name: "Cheesecake",
          description: "Krémový, ne příliš sladký.",
          price: 89,
          available: true,
        },
      ],
    },
    {
      _type: "menuSection",
      _key: "snidane",
      name: "Snídaně & brunch",
      note: "Jednoduše, sytě, čerstvě.",
      items: [
        {
          _type: "menuItem",
          _key: "avokadovy-toast",
          name: "Avokádový toast",
          description: "Kváskový chléb, avokádo, sezónní topping.",
          price: 149,
          available: true,
          badge: "oblíbené",
        },
        {
          _type: "menuItem",
          _key: "jogurtova-miska",
          name: "Jogurtová miska",
          description: "Granola, ovoce, med (volitelně).",
          price: 119,
          available: true,
          badge: "bezlepkové",
        },
        {
          _type: "menuItem",
          _key: "polevka-dne",
          name: "Polévka dne",
          description: "Rychlý oběd bez kompromisů.",
          price: 79,
          available: true,
          badge: "vegan",
        },
      ],
    },
  ],
};

const openingHoursDoc = {
  _id: "openingHoursSingleton",
  _type: "openingHours",
  note: "O svátcích může být změna otevírací doby.",
  days: [
    { _type: "object", _key: "mon", day: "mon", closed: false, open: "08:00", close: "20:00" },
    { _type: "object", _key: "tue", day: "tue", closed: false, open: "08:00", close: "20:00" },
    { _type: "object", _key: "wed", day: "wed", closed: false, open: "08:00", close: "20:00" },
    { _type: "object", _key: "thu", day: "thu", closed: false, open: "08:00", close: "20:00" },
    { _type: "object", _key: "fri", day: "fri", closed: false, open: "08:00", close: "21:00" },
    { _type: "object", _key: "sat", day: "sat", closed: false, open: "09:00", close: "21:00" },
    { _type: "object", _key: "sun", day: "sun", closed: false, open: "09:00", close: "18:00" },
  ],
};

const promoDoc = {
  _id: "promoSingleton",
  _type: "promo",
  isActive: false,
  headline: "Nový podzimní roast je tady!",
  text: "Vyzkoušejte naši sezónní kávu z Etiopie – k dispozici od října.",
  ctaLabel: "Zjistit více",
  ctaHref: "/menu",
};

// ─── Runner ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🌱  Seeding Sanity project: ${PROJECT_ID} / ${DATASET}\n`);

  const docs = [
    { label: "Menu (cafeMenu)", doc: cafeMenuDoc },
    { label: "Otevírací doba (openingHours)", doc: openingHoursDoc },
    { label: "Promo banner", doc: promoDoc },
  ];

  for (const { label, doc } of docs) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅  ${label}`);
    } catch (err) {
      console.error(`  ❌  ${label}: ${err.message}`);
    }
  }

  console.log("\n✨  Done! Open Sanity Studio to review or edit the content.\n");
}

seed();
