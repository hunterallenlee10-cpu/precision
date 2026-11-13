import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PlannerProvider } from "@/components/ProjectPlanner/PlannerContext";
import { IS_LIVE, SITE_URL } from "@/lib/site";
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
  applicationName: "Precision Home Services",
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
      <body>
        <PlannerProvider>{children}</PlannerProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
