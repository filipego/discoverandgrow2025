"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NEWSLETTER_HASH = "#newsletter";
const SECTION_ID = "newsletter";
const INPUT_ID = "newsletter-email";

const getNewsletterTargets = () => {
  const section = document.getElementById(SECTION_ID);
  const input = document.getElementById(INPUT_ID);

  return {
    section,
    input: input instanceof HTMLElement ? input : null,
  };
};

const focusNewsletterInput = (input: HTMLElement | null) => {
  if (!input) return;
  input.focus({ preventScroll: true });
};

const focusNewsletterTarget = () => {
  const { section, input } = getNewsletterTargets();
  if (!section) return;

  // Focus now, then again after the click/navigation stack settles so
  // Next.js / link focus restoration cannot leave the <a> focused.
  focusNewsletterInput(input);
  section.scrollIntoView({ behavior: "smooth", block: "start" });

  window.requestAnimationFrame(() => {
    focusNewsletterInput(input);
  });

  window.setTimeout(() => {
    focusNewsletterInput(input);
  }, 100);
};

const isNewsletterHash = (hash: string) => hash === NEWSLETTER_HASH;

const getSamePageNewsletterAnchor = (event: MouseEvent) => {
  if (event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const target = event.target;
  if (!(target instanceof Element)) return null;

  const anchor = target.closest("a");
  if (!anchor) return null;

  const href = anchor.getAttribute("href");
  if (!href) return null;

  const url = new URL(href, window.location.href);
  if (!isNewsletterHash(url.hash)) return null;
  if (url.pathname !== window.location.pathname) return null;

  return anchor;
};

export const HashFocusHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isNewsletterHash(window.location.hash)) return;

    const frameId = window.requestAnimationFrame(() => {
      focusNewsletterTarget();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      if (!isNewsletterHash(window.location.hash)) return;
      focusNewsletterTarget();
    };

    // Capture phase so we run before Next.js Link / PrismicNextLink.
    const handleClick = (event: MouseEvent) => {
      const anchor = getSamePageNewsletterAnchor(event);
      if (!anchor) return;

      event.preventDefault();
      event.stopPropagation();

      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${NEWSLETTER_HASH}`,
      );
      focusNewsletterTarget();
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
};
