import { heroSlides } from "@/content/heroSlides";
import { tr, type Lang } from "@/lib/i18n";
import { Banner } from "./Banner";

/** Home banner. The slides themselves live in content/heroSlides.ts. */
export function Hero({ lang }: { lang: Lang }) {
  const slides = heroSlides.map((s) => ({
    id: s.id,
    title: s.title[lang],
    subtitle: s.subtitle ? tr(s.subtitle, lang) : undefined,
    description: tr(s.description, lang),
    href: s.primary.href,
    cta: tr(s.primary.label, lang),
    image: {
      src: s.person.src,
      width: s.person.width,
      height: s.person.height,
      alt: tr(s.person.alt, lang),
      position: s.person.position,
    },
  }));
  const labels =
    lang === "hi"
      ? { region: "मुख्य बैनर", prev: "पिछली स्लाइड", next: "अगली स्लाइड", goTo: "स्लाइड" }
      : { region: "Featured banner", prev: "Previous slide", next: "Next slide", goTo: "Go to slide" };
  return <Banner slides={slides} labels={labels} />;
}
