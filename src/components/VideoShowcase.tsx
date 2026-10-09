"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export type ShowcaseVideo = { id: string; title: string; date: string; thumbnail: string };

/**
 * A player with the latest videos listed under it, built to fill a box of fixed height: the list
 * scrolls inside it. The player stays a poster until it is clicked, so no YouTube code loads with
 * the page. The poster is YouTube's full-size (maxres) frame, with the standard one as fallback.
 */
export function VideoShowcase({
  videos,
  labels,
}: {
  videos: ShowcaseVideo[];
  labels: { play: string; nowPlaying: string; more: string };
}) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [noMax, setNoMax] = useState<Record<string, boolean>>({});
  const main = videos[selected];
  const poster = noMax[main.id]
    ? main.thumbnail
    : `https://i.ytimg.com/vi/${main.id}/maxresdefault.jpg`;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black">
        {playing ? (
          <iframe
            key={main.id}
            src={`https://www.youtube-nocookie.com/embed/${main.id}?autoplay=1&rel=0&hd=1`}
            title={main.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${labels.play}: ${main.title}`}
            className="group absolute inset-0 block h-full w-full"
          >
            <Image
              key={poster}
              src={poster}
              alt=""
              fill
              quality={90}
              sizes="(min-width: 1024px) 640px, 92vw"
              onError={() => setNoMax((m) => ({ ...m, [main.id]: true }))}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-saffron text-white shadow-lg transition-transform group-hover:scale-110">
              <Play aria-hidden="true" className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="shrink-0 px-4 pb-3 pt-3">
        <p className="text-xs font-semibold text-saffron-deep">{labels.nowPlaying}</p>
        <h4 className="mt-0.5 line-clamp-2 text-[1.05rem] font-semibold leading-snug text-black">{main.title}</h4>
        <p className="mt-0.5 text-xs text-muted">{main.date}</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col border-t border-line">
        <p className="shrink-0 px-4 py-2 text-sm font-semibold text-black">{labels.more}</p>
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
          {videos.map((v, i) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(i);
                  setPlaying(true);
                }}
                aria-current={i === selected}
                className={`flex w-full gap-3 border p-1.5 text-left transition-colors hover:border-saffron ${
                  i === selected ? "border-saffron bg-peach/50" : "border-line bg-white"
                }`}
              >
                <span className="relative block aspect-video w-24 shrink-0 overflow-hidden bg-black">
                  <Image src={v.thumbnail} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 block text-[0.8125rem] font-medium leading-snug text-black">
                    {v.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{v.date}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
