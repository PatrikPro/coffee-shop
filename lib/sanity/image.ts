import type { SanityImage } from "./types";

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
}

function parseAssetRef(ref: string) {
  const match = /^image-([a-zA-Z0-9]+)-(\d+x\d+)-([a-zA-Z0-9]+)$/.exec(ref);
  if (!match) return null;
  return {
    id: match[1],
    dimensions: match[2],
    format: match[3],
  };
}

export function getImageUrl(image?: SanityImage, options: ImageOptions = {}) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!image) {
    return null;
  }

  if (image.asset?.url) {
    return image.asset.url;
  }

  if (!projectId || !dataset || !image.asset?._ref) {
    return null;
  }

  const parsed = parseAssetRef(image.asset._ref);
  if (!parsed) {
    return null;
  }

  const search = new URLSearchParams({ auto: "format" });

  if (options.width) search.set("w", String(options.width));
  if (options.height) search.set("h", String(options.height));
  if (options.fit) search.set("fit", options.fit);

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${parsed.id}-${parsed.dimensions}.${parsed.format}?${search.toString()}`;
}
