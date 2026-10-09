import type { Metadata } from "next";
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { JourneyBand } from "@/components/JourneyBand";
import { StayConnected } from "@/components/StayConnected";
import { Updates } from "@/components/Updates";
import { getLang, type LangParams } from "@/lib/page";
import { homeSeo } from "@/content/seo";
import { buildMetadata, profilePageLd } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: "",
    absoluteTitle: true,
    title: homeSeo.title[lang],
    description: homeSeo.description[lang],
  });
}

/**
 * Home follows the reference site's order: banner, biography, journey, events, then Stay
 * Connected (YouTube and the official pages on the left, Facebook posts on the right). The
 * photographs live in Gallery, in the navigation.
 */
export default async function HomePage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <JourneyBand lang={lang} />
      <Updates lang={lang} />
      <StayConnected lang={lang} />
      <JsonLd data={profilePageLd(lang, "", homeSeo.title[lang], homeSeo.description[lang])} />
    </>
  );
}
