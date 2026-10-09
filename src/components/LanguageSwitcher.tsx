"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Lang } from "@/lib/i18n";

const labels: Record<Lang, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  hi: { short: "हिं", full: "हिन्दी" },
};

/**
 * Swaps the language segment of the current path, so the visitor stays on the same page.
 * "segment" is the two-button toggle used in the navigation bar; "dark" is for dark backgrounds.
 */
export function LanguageSwitcher({
  lang,
  label,
  variant = "segment",
}: {
  lang: Lang;
  label: string;
  variant?: "segment" | "dark";
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|hi)(?=\/|$)/, "");

  return (
    <nav
      aria-label={label}
      className={`inline-flex items-stretch overflow-hidden border text-sm font-semibold ${
        variant === "dark" ? "border-white/40" : "border-saffron"
      }`}
    >
      {locales.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={`flex min-h-9 items-center px-3 transition-colors ${
              active
                ? "bg-saffron text-white"
                : variant === "dark"
                  ? "text-white/80 hover:bg-white/15"
                  : "text-saffron-deep hover:bg-peach"
            }`}
          >
            <span className="xl:hidden">{labels[l].short}</span>
            <span className="hidden xl:inline">{labels[l].full}</span>
          </Link>
        );
      })}
    </nav>
  );
}
