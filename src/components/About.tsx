import Image from "next/image";
import Link from "next/link";
import { aboutPreview } from "@/content/profile";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Biography band: portrait with a white frame on the left, heading, justified text and a
 * "Read More" button on the right.
 */
export function About({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-sand">
      <div className="shell grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="mx-auto w-full max-w-sm border-[5px] border-white bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] lg:max-w-none">
            <div className="relative aspect-[5/6] w-full bg-white">
              <Image
                src="/images/about-portrait.webp"
                alt={d.hero.portraitAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.08}>
          <h2 id="about-title" className="h-section border-l-[6px] border-saffron pl-4 text-black">
            {d.nav.biography}
          </h2>
          <div className="mt-6 max-w-[68ch] space-y-4 text-ink-2 [text-wrap:pretty]">
            {aboutPreview.map((p) => (
              <p key={p.en}>{tr(p, lang)}</p>
            ))}
          </div>
          <Link href={localePath(lang, "/about")} className="btn btn-solid mt-7">
            {d.sections.readMore}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
