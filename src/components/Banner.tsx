"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type BannerSlide = {
  id: string;
  title: string[];
  subtitle?: string;
  description: string;
  href: string;
  cta: string;
  image: { src: string; width: number; height: number; alt: string; position: string };
};

const INTERVAL = 6500;

/**
 * Full-width home banner, as on the reference site: a bold white caption on a deep-orange field,
 * the photograph clean beside it, round previous/next buttons at the sides, and a "read more" link.
 */
export function Banner({
  slides,
  labels,
}: {
  slides: BannerSlide[];
  labels: { region: string; prev: string; next: string; goTo: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(t);
  }, [count, paused]);

  const go = (n: number) => setIndex((n + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative overflow-hidden bg-burnt text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[42rem] sm:h-[46rem] lg:h-[38rem] xl:h-[42rem]">
        {slides.map((s, i) => {
          const active = i === index;
          // One h1 per page: the first slide carries it, the others are h2.
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* Text on the solid field, the photograph clean beside it: no wash over the picture. */}
              <div className="absolute inset-0 flex flex-col lg:block">
                <div className="relative h-[22rem] shrink-0 overflow-hidden bg-burnt sm:h-[27rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[46%]">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    // The first slide is the largest paint of the page: fetch it first. The others load lazily.
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    style={{ objectPosition: s.image.position }}
                    className={`h-full w-full object-cover ${active ? "slow-zoom" : ""}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-burnt to-transparent lg:block"
                  />
                </div>
                <div className="shell relative flex flex-1 items-center lg:h-full">
                  <div
                    className={`max-w-xl py-5 transition-[opacity,transform] delay-150 duration-700 ease-[var(--ease-out)] lg:max-w-[48%] lg:py-0 lg:pl-8 ${
                      active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <Heading className="text-[clamp(1.75rem,1.15rem+2.7vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.015em] [:lang(hi)_&]:leading-[1.3] [:lang(hi)_&]:tracking-normal">
                      {s.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </Heading>
                    {s.subtitle && <p className="mt-2 text-lg font-semibold sm:text-2xl">{s.subtitle}</p>}
                    <p className="mt-3 max-w-md text-base leading-relaxed text-white sm:text-[1.05rem]">
                      {s.description}
                    </p>
                    <Link
                      href={s.href}
                      className="group/cta mt-5 inline-flex items-center gap-2 border-b border-white/70 pb-0.5 text-[1.05rem] font-medium transition-colors hover:border-white hover:text-peach"
                    >
                      {s.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={labels.prev}
              className="absolute left-2 top-[11rem] z-10 grid h-11 w-11 -translate-y-1/2 sm:top-[13.5rem] lg:top-1/2 place-items-center rounded-full text-white transition-colors duration-200 hover:bg-black/40 lg:left-4"
            >
              <ChevronLeft aria-hidden="true" className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={labels.next}
              className="absolute right-2 top-[11rem] z-10 grid h-11 w-11 -translate-y-1/2 sm:top-[13.5rem] lg:top-1/2 place-items-center rounded-full text-white transition-colors duration-200 hover:bg-black/40 lg:right-4"
            >
              <ChevronRight aria-hidden="true" className="h-8 w-8" />
            </button>
            <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${labels.goTo} ${i + 1}`}
                  aria-current={i === index}
                  className="grid h-6 w-6 place-items-center"
                >
                  <span className={`block h-2.5 w-2.5 rounded-full border border-white ${i === index ? "bg-white" : ""}`} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
