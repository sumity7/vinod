"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { localePath, type Lang } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";

type Props = {
  lang: Lang;
  items: NavItem[];
  labels: { menu: string; close: string };
  logo: ReactNode;
  /** Language toggle, shown at the right end of the row. */
  switcher: ReactNode;
};

const CLOSE_DELAY = 140;

/**
 * One sticky row: logo on the left, the saffron upper-case navigation, and the language toggle at
 * the right end. On phones the navigation collapses into a Menu button in the same row.
 */
export function NavbarClient({ lang, items, labels, logo, switcher }: Props) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState(96);
  const [seenPath, setSeenPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const stripRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = useCallback(
    (item: NavItem) => {
      const paths = item.href ? [item.href] : (item.children ?? []).map((c) => c.href);
      return paths.some((href) => {
        const target = localePath(lang, href.split("#")[0]);
        return href === "/" ? pathname === target : pathname.startsWith(target);
      });
    },
    [lang, pathname],
  );

  const cancelClose = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setDrawer(false);
    setOpen(null);
  }

  const closeAll = () => {
    setOpen(null);
    setDrawer(false);
  };

  // Scroll state: the bar keeps its height (so nothing below it moves) and only gains a shadow.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // While the mobile drawer is open the page behind it must not move. Only <html> is given
  // overflow: hidden (the document scroller on phones); <body> is left alone so the sticky strip
  // keeps working. Touch moves outside the drawer are cancelled for older iOS.
  useEffect(() => {
    if (!drawer) return;
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, overscroll: html.style.overscrollBehavior };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    const bottom = stripRef.current?.getBoundingClientRect().bottom;
    if (bottom) setDrawerTop(Math.round(bottom));

    const onTouchMove = (e: TouchEvent) => {
      const menu = document.getElementById("mobile-menu");
      const inside = menu?.contains(e.target as Node);
      if (!inside || (menu && menu.scrollHeight <= menu.clientHeight + 1)) {
        if (e.cancelable) e.preventDefault();
      }
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => mq.matches && setDrawer(false);
    mq.addEventListener("change", onWide);

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      mq.removeEventListener("change", onWide);
      html.style.overflow = prev.overflow;
      html.style.overscrollBehavior = prev.overscroll;
    };
  }, [drawer]);

  // Current page: the saffron fill. Other items: a saffron underline that draws in on hover.
  const itemClass = (active: boolean, open = false) =>
    `group/link relative flex h-full min-h-12 items-center gap-1.5 px-4 py-2 text-[0.9rem] font-semibold uppercase tracking-[0.06em] transition-colors duration-200 xl:px-5 [:lang(hi)_&]:text-[0.98rem] [:lang(hi)_&]:tracking-normal ${
      active ? "bg-saffron text-white" : open ? "text-ink" : "text-saffron-deep hover:text-ink"
    }`;
  const underline = (active: boolean, open = false) =>
    active ? null : (
      <span
        aria-hidden="true"
        className={`absolute inset-x-4 bottom-0 h-[3px] origin-left bg-saffron transition-transform duration-300 ease-[var(--ease-out)] group-hover/link:scale-x-100 xl:inset-x-5 ${
          open ? "scale-x-100" : "scale-x-0"
        }`}
      />
    );

  return (
    <>
      <header
        ref={stripRef}
        className={`sticky top-0 z-50 border-b border-line bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_20px_-14px_rgba(0,0,0,0.45)]" : "shadow-none"
        }`}
      >
        <div className="shell flex min-h-[4.5rem] items-stretch justify-between gap-4 lg:min-h-[5rem]">
          <div className="flex items-center py-2">{logo}</div>

          {/* Desktop navigation, on the same row as the logo */}
          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex h-full items-stretch divide-x divide-line border-l border-line">
              {items.map((item) => {
                const active = isActive(item);
                if (!item.children) {
                  return (
                    <li key={item.id}>
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={itemClass(active)}
                      >
                        {item.label}
                        {underline(active)}
                      </Link>
                    </li>
                  );
                }
                const isOpen = open === item.id;
                return (
                  <li
                    key={item.id}
                    className="relative h-full"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(item.id);
                    }}
                    onMouseLeave={scheduleClose}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
                    }}
                  >
                    <div className="flex h-full items-stretch">
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={`${itemClass(active, isOpen)} !pr-1.5`}
                      >
                        {item.label}
                        {underline(active, isOpen)}
                      </Link>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={`menu-${item.id}`}
                        aria-label={`${item.label}: ${labels.menu}`}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        className={`flex items-center pl-1 pr-4 transition-colors duration-200 xl:pr-5 ${
                          active ? "bg-saffron text-white" : isOpen ? "text-ink" : "text-saffron-deep hover:text-ink"
                        }`}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    <div
                      id={`menu-${item.id}`}
                      className={`absolute left-0 top-full z-50 w-[16.25rem] transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-out)] ${
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <ul className="border-t-[3px] border-saffron bg-white py-1 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.35)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={localePath(lang, child.href)}
                              onClick={closeAll}
                              className="block border-l-[3px] border-transparent px-5 py-2.5 text-[0.95rem] text-ink-2 transition-colors duration-200 hover:border-saffron hover:bg-sand hover:text-saffron-deep"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:border-l lg:border-line lg:pl-4">
            <div className="hidden sm:block">{switcher}</div>
            <button
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center gap-2 self-center border border-saffron px-2.5 font-semibold uppercase text-saffron-deep lg:hidden"
              aria-label={drawer ? labels.close : labels.menu}
              aria-expanded={drawer}
              aria-controls="mobile-menu"
              onClick={() => setDrawer((v) => !v)}
            >
              {drawer ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="hidden whitespace-nowrap text-sm sm:inline">{drawer ? labels.close : labels.menu}</span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawer && (
          <div
            id="mobile-menu"
            style={{ top: drawerTop, height: `calc(100dvh - ${drawerTop}px)` }}
            className="drawer-in fixed inset-x-0 z-40 overflow-y-auto overscroll-contain bg-white [-webkit-overflow-scrolling:touch] [touch-action:pan-y] lg:hidden"
          >
            <nav aria-label="Mobile" className="shell py-2">
              <div className="border-b border-line py-3 sm:hidden">{switcher}</div>
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const active = isActive(item);
                  const linkClass = `flex min-h-14 flex-1 items-center text-lg font-semibold uppercase ${
                    active ? "text-saffron" : "text-saffron-deep"
                  }`;
                  if (!item.children) {
                    return (
                      <li key={item.id}>
                        <Link
                          href={localePath(lang, item.href)}
                          onClick={closeAll}
                          aria-current={active ? "page" : undefined}
                          className={linkClass}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const isOpen = expanded === item.id;
                  return (
                    <li key={item.id}>
                      <div className="flex items-stretch">
                        <Link
                          href={localePath(lang, item.href)}
                          onClick={closeAll}
                          aria-current={active ? "page" : undefined}
                          className={linkClass}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`m-${item.id}`}
                          aria-label={`${item.label}: ${labels.menu}`}
                          onClick={() => setExpanded(isOpen ? null : item.id)}
                          className="flex w-14 items-center justify-center border-l border-line text-saffron-deep"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      {isOpen && (
                        <ul id={`m-${item.id}`} className="mb-3 border-l-[3px] border-saffron pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={localePath(lang, child.href)}
                                onClick={closeAll}
                                className="flex min-h-12 items-center text-base text-ink-2 hover:text-saffron-deep"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
