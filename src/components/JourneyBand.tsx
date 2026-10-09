import Link from "next/link";
import { steps } from "@/content/journey";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * "Journey" on the saffron field, like the reference site: a white heading with a bordered
 * "View All" button, and a vertical line of dots, each beside a white box. The biodata gives no
 * dates, so steps are numbered; the current responsibility is marked.
 */
export function JourneyBand({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="section bg-orange-band text-white"
    >
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <h2 id="journey-title" className="h-section text-white">
            {d.sections.journey}
          </h2>
          <p className="mt-4 max-w-sm text-[1.05rem] leading-relaxed text-white">
            {d.sections.journeyLead}
          </p>
          <Link href={localePath(lang, "/about#journey")} className="btn btn-light mt-7 border-2">
            {d.sections.viewAll}
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.08}>
          <ol className="relative ml-3 border-l-[3px] border-white pl-8">
            {steps.map((s, i) => (
              <li key={s.id} className="relative pb-3 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.6rem] top-4 h-4 w-4 rounded-full border-[3px] border-white ${
                    s.current ? "bg-burnt" : "bg-white"
                  }`}
                />
                <p
                  className={`rounded-[5px] bg-white px-4 py-2.5 text-black ${
                    s.current ? "font-semibold" : ""
                  }`}
                >
                  <span className="mr-3 font-display font-semibold text-saffron-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {tr(s.title, lang)}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
