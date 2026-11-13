import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PlannerProvider } from "@/components/ProjectPlanner/PlannerContext";
import { MobileBar } from "@/components/MobileBar";
import { BackToTop } from "@/components/BackToTop";
import { IS_LIVE, SITE_URL } from "@/lib/site";
import { ogImage } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Home Remodeling in Pasadena, MD | Precision Home Services",
    template: "%s",
  },
  applicationName: "Precision Home Services",
  openGraph: {
    type: "website",
    siteName: "Precision Home Services",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
  // The launch switch: demo stays out of Google, live is indexable.
  robots: IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F1EA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable}`}>
      <body id="top">
        <PlannerProvider>
          {children}
          <MobileBar />
          <BackToTop />
        </PlannerProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
