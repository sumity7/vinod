import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { SocialLinks } from "./SocialLinks";

/** Saffron strip above the header: a short line on the left and the official social links on the right. */
export function TopStrip({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div className="bg-saffron text-white">
      <div className="shell flex min-h-10 items-center justify-between gap-4 py-0.5 text-[0.8125rem]">
        <p className="truncate">{d.topStrip}</p>
        <SocialLinks
          className="gap-0.5"
          iconClassName="h-3.5 w-3.5"
          linkClassName="!h-8 !w-8 rounded-full border border-white/90 text-white hover:!bg-white hover:!text-saffron"
        />
      </div>
    </div>
  );
}
