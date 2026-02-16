import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/image";
import { loadCafeMenu } from "@/lib/sanity/loaders";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Kompletní nabídka Zuzu Café – espresso, mléčné, filtrované, čaj, sladké i snídaně.",
};

export default async function MenuPage() {
  const menu = await loadCafeMenu();

  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-coffee mb-3">Naše menu</h1>
          <p className="text-coffee-600 font-serif text-lg max-w-xl mx-auto">
            Výběrová káva, domácí pečivo a jednoduché pokrmy. Vše čerstvé, každý den.
          </p>
        </div>

        <div className="space-y-12">
          {menu.sections.map((section) => (
            <section key={section._key} className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-coffee">{section.name}</h2>
                {section.note && <p className="text-coffee-500 font-serif mt-2">{section.note}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => {
                  const imageUrl = getImageUrl(item.image, { width: 900, height: 600, fit: "crop" });

                  return (
                    <Card key={item._key} hoverable>
                      {imageUrl && (
                        <div className="relative w-full h-44">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <CardBody>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="text-lg font-sans font-bold text-coffee">{item.name}</h3>
                          <span className="text-lg font-sans font-bold text-accent whitespace-nowrap ml-3">
                            {item.price}&nbsp;Kč
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-coffee-600 font-serif mb-3">{item.description}</p>
                        )}
                        {item.badge && <Badge variant="outline">{item.badge}</Badge>}
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
