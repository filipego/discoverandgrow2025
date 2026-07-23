"use client";

import { useRef, useState } from "react";
import { asLink, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ButtonLink } from "./ButtonLink";

interface NavigationItem {
  link: LinkField;
}

interface NavigationProps {
  navigation: NavigationItem[];
  navRef?: React.RefObject<HTMLUListElement | null>;
  onNavItemHover?: (
    e: React.MouseEvent<HTMLLIElement>,
    isEnter: boolean,
  ) => void;
  mobile?: boolean;
  onNavigate?: () => void;
  secondaryLink?: LinkField;
}

const normalizePath = (path: string) => {
  const pathWithoutQuery = path.split(/[?#]/)[0] || "/";
  return pathWithoutQuery.replaceAll("_", "-").replace(/\/+$/, "") || "/";
};

const isNavigationItemActive = (pathname: string, link: LinkField) => {
  const href = asLink(link);

  if (typeof href !== "string" || !href.startsWith("/")) return false;

  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  return (
    currentPath === targetPath ||
    (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
  );
};

export function Navigation({
  navigation,
  navRef,
  onNavItemHover,
  mobile = false,
  onNavigate,
  secondaryLink,
}: NavigationProps) {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const [isLineVisible, setIsLineVisible] = useState(false);

  const handleItemHover = (
    e: React.MouseEvent<HTMLLIElement>,
    isEnter: boolean,
  ) => {
    const target = e.currentTarget;

    if (isEnter) {
      // Show and position the line
      const rect = target.getBoundingClientRect();
      const navRect = navRef?.current?.getBoundingClientRect();

      if (lineRef.current && navRect) {
        const leftOffset = rect.left - navRect.left;

        setIsLineVisible(true);
        gsap.to(lineRef.current, {
          x: leftOffset,
          width: rect.width,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      // Check if we're not hovering over any nav item
      setTimeout(() => {
        const isHoveringNav = navRef?.current?.matches(":hover");
        if (!isHoveringNav) {
          setIsLineVisible(false);
        }
      }, 10);
    }

    // Call the original hover handler
    onNavItemHover?.(e, isEnter);
  };

  const handleNavLeave = () => {
    setIsLineVisible(false);
  };

  if (mobile) {
    return (
      <nav aria-label="Main">
        <ul className="flex flex-col gap-1">
          {navigation.map((item, index) => {
            const isActive = isNavigationItemActive(pathname, item.link);

            return (
              <li key={index}>
                <PrismicNextLink
                  field={item.link}
                  className="block rounded-2xl px-3 py-3.5 font-secondary text-lg font-semibold text-brand-blue transition-colors hover:bg-brand-blue/5"
                  aria-current={isActive ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.link.text}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
        {secondaryLink && (
          <div className="mt-3 border-t border-brand-blue/10 pt-4">
            <ButtonLink
              field={secondaryLink}
              color="Secondary"
              onClick={onNavigate}
            >
              {secondaryLink.text}
            </ButtonLink>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav aria-label="Main" className="grid place-items-center w-full">
      <div className="relative">
        <ul
          ref={navRef}
          className="flex items-center gap-8"
          onMouseLeave={handleNavLeave}
        >
          {navigation.map((item, index) => {
            const isActive = isNavigationItemActive(pathname, item.link);

            return (
              <li
                key={index}
                className="text-base relative transition-transform duration-200 ease-out"
                onMouseEnter={(e) => handleItemHover(e, true)}
                onMouseLeave={(e) => handleItemHover(e, false)}
              >
                <PrismicNextLink
                  field={item.link}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block py-2 transition-colors duration-200 ease-out ${
                    isActive
                      ? "after:absolute after:bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue"
                      : ""
                  }`}
                >
                  {item.link.text}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
        {/* Moving line indicator */}
        <div
          ref={lineRef}
          className={`absolute bottom-1 h-[2px] bg-brand-blue transition-opacity duration-200 ${
            isLineVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: 0 }}
        />
      </div>
    </nav>
  );
}
