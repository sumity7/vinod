import type { Metadata, Viewport } from "next";
import { Poppins, Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDict } from "@/content/ui";
import { isLang, locales, type Lang } from "@/lib/i18n";
import { homeSeo } from "@/content/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { personLd, websiteLd } from "@/lib/seo";
import { TopStrip } from "@/components/TopStrip";
import { Navbar } from "@/components/Navbar";
import { Assistant } from "@/components/Assistant";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { markJsScript, reloadToTopScript } from "@/lib/scrollScript";

// Poppins for headings and Public Sans for body text, as on the reference site. Poppins also
// covers Devanagari, so Hindi falls back to it for both.
// Three weights each (400 text, 500 section heads, 600 titles and buttons) keep the font
// download small; anything asked to be bolder renders at 600.
const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600"],
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const name = site.name[lang];
  return {
    metadataBase: new URL(site.url),
    title: {
      default: homeSeo.title[lang],
      template: `%s | ${name}`,
    },
    description: homeSeo.description[lang],
    applicationName: name,
    authors: [{ name }],
    robots: { index: true, follow: true },
    // Set GOOGLE_SITE_VERIFICATION to the token Search Console gives for the "HTML tag" method.
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f47216",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const d = getDict(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${publicSans.variable}`}
      // The inline script below adds data-js to <html> before hydration.
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: markJsScript + reloadToTopScript }} />
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {d.skip}
        </a>
        <TopStrip lang={lang} />
        <Navbar lang={lang} />
        <main id="main" className="page-in">
          {children}
        </main>
        <Footer lang={lang} />
        <Assistant lang={lang} />
        <JsonLd data={[websiteLd(lang, homeSeo.description[lang]), personLd(lang, d.biography.lead)]} />
      </body>
    </html>
  );
}
