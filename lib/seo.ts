import type { Metadata } from "next";

// Next merges metadata shallowly, so every page passes its Open Graph and Twitter fields through here
// to keep the shared image and card type.
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Precision Home Services LLC. Home remodeling in Pasadena, MD.",
};

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Precision Home Services",
      locale: "en_US",
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
