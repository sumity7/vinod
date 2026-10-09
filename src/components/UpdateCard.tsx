import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { updateCategories, type Update } from "@/content/updates";
import { localePath, tr, type Lang } from "@/lib/i18n";

export function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function UpdateCard({
  update,
  lang,
  readMore,
  variant = "card",
  featuredLabel,
  headingLevel = "h3",
}: {
  update: Update;
  lang: Lang;
  readMore: string;
  /** "feature" puts the photograph beside the text on wide screens. */
  variant?: "card" | "feature";
  /** When given, an update marked `featured` shows this tag. */
  featuredLabel?: string;
  /** Use "h2" where the card sits directly under the page's h1. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = localePath(lang, `/updates/${update.slug}`);
  const feature = variant === "feature";
  // Tall or very small photographs stay on the article page; they would look soft when stretched into a card.
  const cover =
    update.image && update.image.width >= 500 && update.image.height <= update.image.width * 1.4
      ? update.image
      : null;
  const split = feature && Boolean(cover);
  if (!feature) {
    // Card, as in the reference site's blog list: bordered white box, the date on a saffron tag over the photograph.
    return (
      <article className="group flex h-full flex-col border border-line bg-white">
        {cover ? (
          <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-sand">
            <Image
              src={cover.src}
              alt=""
              width={cover.width}
              height={cover.height}
              sizes="(min-width: 1024px) 30vw, 90vw"
              style={cover.position ? { objectPosition: cover.position } : undefined}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
            {update.date && (
              <time
                dateTime={update.date}
                className="absolute left-0 top-0 bg-[#f69005] px-3 py-2 text-sm font-semibold text-white"
              >
                {formatDate(update.date, lang)}
              </time>
            )}
          </Link>
        ) : (
          update.date && (
            <time dateTime={update.date} className="bg-[#f69005] px-3 py-2 text-sm font-semibold text-white">
              {formatDate(update.date, lang)}
            </time>
          )
        )}
        <div className="flex flex-1 flex-col p-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {featuredLabel && update.featured && (
              <span className="bg-saffron px-2 py-0.5 text-[0.8125rem] font-semibold text-white">
                {featuredLabel}
              </span>
            )}
            <span className="font-semibold text-saffron-deep">{tr(updateCategories[update.category], lang)}</span>
          </p>
          <Heading className="h-card mt-2">
            <Link href={href} className="hover:text-saffron-deep">
              {tr(update.title, lang)}
            </Link>
          </Heading>
          <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{tr(update.summary, lang)}</p>
          <Link href={href} className="link-arrow mt-4 self-start">
            {readMore}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }
  return (
    <article
      className={`group ${
        split
          ? "grid items-center gap-8 border-t border-ink/60 pt-8 lg:grid-cols-12 lg:gap-14"
          : feature
            ? "border-t border-ink/60 pt-8"
            : "flex h-full flex-col border-t border-ink/60 pt-5"
      }`}
    >
      {cover && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block overflow-hidden bg-sand ${feature ? "lg:col-span-7" : "mb-5"}`}
        >
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, 90vw"}
            style={cover.position ? { objectPosition: cover.position } : undefined}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className={split ? "lg:col-span-5" : feature ? "max-w-3xl" : "flex flex-1 flex-col"}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {featuredLabel && update.featured && (
            <span className="bg-saffron px-2 py-0.5 text-[0.8125rem] font-semibold text-ink">
              {featuredLabel}
            </span>
          )}
          <span className="font-semibold text-saffron-deep">
            {tr(updateCategories[update.category], lang)}
          </span>
          {update.date && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <time dateTime={update.date} className="text-muted">
                {formatDate(update.date, lang)}
              </time>
            </>
          )}
          {update.location && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <span className="text-muted">{tr(update.location, lang)}</span>
            </>
          )}
        </p>
        <Heading className={`h-card mt-3 ${feature ? "text-[1.65rem] leading-snug" : ""}`}>
          <Link href={href} className="hover:text-saffron-deep">
            {tr(update.title, lang)}
          </Link>
        </Heading>
        <p className={`mt-3 leading-relaxed text-ink-2 ${feature ? "" : "flex-1"}`}>
          {tr(update.summary, lang)}
        </p>
        <Link href={href} className="link-arrow mt-6 self-start">
          {readMore}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/**
 * One event as a full-width row: photograph on the left, text on the right. Rows stack one
 * after another in the order given, so the Events page has no gaps or half-empty grid cells.
 */
export function UpdateRow({
  update,
  lang,
  readMore,
  featuredLabel,
}: {
  update: Update;
  lang: Lang;
  readMore: string;
  featuredLabel?: string;
}) {
  const href = localePath(lang, `/updates/${update.slug}`);
  const img = update.image;
  return (
    <article className="group grid border border-line bg-white md:grid-cols-12">
      {img && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[3/2] overflow-hidden bg-sand md:col-span-5 md:aspect-auto md:min-h-[17rem]"
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 92vw"
            style={img.position ? { objectPosition: img.position } : undefined}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {update.date && (
            <time
              dateTime={update.date}
              className="absolute left-0 top-0 bg-[#f69005] px-3 py-2 text-sm font-semibold text-white"
            >
              {formatDate(update.date, lang)}
            </time>
          )}
        </Link>
      )}
      <div className={`flex flex-col justify-center p-5 sm:p-7 ${img ? "md:col-span-7" : "md:col-span-12"}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {featuredLabel && update.featured && (
            <span className="bg-saffron px-2 py-0.5 text-[0.8125rem] font-semibold text-white">{featuredLabel}</span>
          )}
          <span className="font-semibold text-saffron-deep">{tr(updateCategories[update.category], lang)}</span>
          {update.location && <span className="text-muted">· {tr(update.location, lang)}</span>}
        </p>
        <h2 className="h-card mt-2 text-[1.4rem]">
          <Link href={href} className="hover:text-saffron-deep">
            {tr(update.title, lang)}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-ink-2">{tr(update.summary, lang)}</p>
        <Link href={href} className="link-arrow mt-5 self-start">
          {readMore}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
