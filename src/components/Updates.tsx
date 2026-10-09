import Link from "next/link";
import { publishedUpdates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { UpdateCard } from "./UpdateCard";

/**
 * Events for the home page, laid out like the blog band on the reference site: light-grey field,
 * saffron heading, a "View All" button, and bordered cards. Renders nothing until an update exists.
 */
export function Updates({ lang }: { lang: Lang }) {
  const latest = publishedUpdates().slice(0, 3);
  if (latest.length === 0) return null;
  const d = getDict(lang);
  return (
    <section id="updates" aria-labelledby="updates-title" className="section bg-paper">
      <div className="shell">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="updates-title" className="h-section text-saffron-deep">
            {d.sections.events}
          </h2>
          <Link href={localePath(lang, "/updates")} className="btn btn-solid">
            {d.sections.viewAll}
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {latest.map((u) => (
            <Reveal key={u.slug} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <UpdateCard
                update={u}
                lang={lang}
                readMore={d.sections.readMore}
                featuredLabel={d.updates.featured}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
