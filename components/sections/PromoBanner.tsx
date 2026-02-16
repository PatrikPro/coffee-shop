import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { loadPromo } from "@/lib/sanity/loaders";
import { getImageUrl } from "@/lib/sanity/image";

export async function PromoBanner() {
  const promo = await loadPromo();

  if (!promo) {
    return null;
  }

  const imageUrl = getImageUrl(promo.image, { width: 1400, height: 600, fit: "crop" });

  return (
    <section className="py-8 md:py-10 bg-cream-50">
      <div className="container-main">
        <div className="rounded-2xl bg-coffee text-cream-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="p-6 md:p-10 space-y-4">
              <p className="text-xs uppercase tracking-widest text-accent font-sans">Promo</p>
              <h2 className="text-2xl md:text-3xl font-sans font-bold">{promo.headline}</h2>
              {promo.text && <p className="font-serif text-cream-200">{promo.text}</p>}
              {promo.ctaLabel && promo.ctaHref && (
                <Link href={promo.ctaHref}>
                  <Button variant="secondary">{promo.ctaLabel}</Button>
                </Link>
              )}
            </div>

            {imageUrl && (
              <div className="relative min-h-56">
                <Image src={imageUrl} alt={promo.headline ?? "Promo obrázek"} fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
