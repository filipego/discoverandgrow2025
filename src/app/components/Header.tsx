"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ButtonLink } from "./ButtonLink";
import { Bounded } from "./Bounded";
import { createClient } from "@/prismicio";
import { LongLogo } from "./LongLogo";
import { Navigation } from "./Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

// Removed headerStyles - now using Tailwind with clsx

// Create a client component wrapper to handle animations
export function HeaderWrapper() {
  return (
    <HeaderContent />
  );
}

// Original Header component renamed to HeaderContent
function HeaderContent() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const [settings, setSettings] = useState<any>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch settings data
  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const settingsData = await client.getSingle("settings");
      setSettings(settingsData);
    };
    
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Setup GSAP animations
  useGSAP(() => {
    // Initial state - slightly translated up and invisible
    gsap.set(headerRef.current, { 
      yPercent: -100,
      opacity: 0
    });
    
    // Animate in on first load
    gsap.to(headerRef.current, { 
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2
    });

    // Animate nav items with stagger
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('li');
      gsap.from(navItems, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 100;
      
      // Update scrolled state
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
      
      // Determine if we should show or hide the header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        if (isVisible) {
          gsap.to(headerRef.current, { 
            yPercent: -100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
          });
          setIsVisible(false);
        }
      } else {
        // Scrolling up - show header with glass effect and rounded corners
        if (!isVisible) {
          gsap.to(headerRef.current, { 
            yPercent: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",

          });
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible, isScrolled]);

  // Handle nav item hover animations (now just a placeholder)
  const handleNavItemHover = (e: React.MouseEvent<HTMLLIElement>, isEnter: boolean) => {
    // No animations - just using the moving line effect now
  };

  if (!settings) return null;

  return (
    <>
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <Bounded
          as="header"
          padding="no padding"
          className={clsx(
            "py-2 lg:py-5",
            // Let the scrolled pill set its own side inset on mobile
            isScrolled && "max-lg:!px-0"
          )}
        >
          <div
            className={clsx("w-full transition-all duration-300", {
              // Glass effect and rounded corners when scrolled — inset from screen edges on mobile
              "mt-2.5 rounded-[50px] border border-white/90 bg-white/85 px-4 py-2 shadow-[0_4px_15px_rgba(0,0,0,0.05)] backdrop-blur-md max-lg:mx-4 max-lg:w-[calc(100%-2rem)] lg:mx-auto lg:max-w-6xl lg:px-6 lg:py-4":
                isScrolled,
            })}
          >
            <div className="hidden w-full grid-cols-[230px_1fr_230px] items-center lg:grid">
              <div className="flex-shrink-0">
                <Link href="/">
                  <LongLogo treeColor="#29285D" className="h-[55px] text-[#29285D]" />
                </Link>
              </div>
              <Navigation
                navigation={settings.data.navigation}
                navRef={navRef}
                onNavItemHover={handleNavItemHover}
              />
              <div className="flex justify-end">
                <ButtonLink field={settings.data.button} color="Secondary" size="md">
                  {settings.data.button.text}
                </ButtonLink>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 lg:hidden">
              <Link href="/" aria-label="Discover and Grow home">
                <LongLogo treeColor="#29285D" className="h-[40px] text-[#29285D]" />
              </Link>
              <button
                type="button"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-brand-green transition-colors hover:bg-brand-green/15 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
                aria-label="Open navigation menu"
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </Bounded>
      </div>

      {/* Outside header transform/backdrop so fixed positioning uses the viewport */}
      <button
        type="button"
        aria-label="Close navigation menu"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        onClick={() => setIsMobileMenuOpen(false)}
        className={clsx(
          "fixed inset-0 z-[55] bg-brand-blue/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        id="mobile-navigation"
        aria-hidden={!isMobileMenuOpen}
        className={clsx(
          "fixed top-3 right-3 bottom-3 z-[60] flex w-[min(16rem,70vw)] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/95 p-5 shadow-[0_8px_40px_rgba(41,40,93,0.18)] backdrop-blur-md transition-transform duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-[calc(100%+0.75rem)]"
        )}
      >
        {isMobileMenuOpen && (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="font-secondary text-sm font-semibold tracking-wide text-brand-blue/70 uppercase">
                Menu
              </p>
              <button
                type="button"
                className="-mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-blue/10 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                aria-label="Close navigation menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={22} strokeWidth={2.25} />
              </button>
            </div>
            <Navigation
              mobile
              navigation={settings.data.navigation}
              onNavigate={() => setIsMobileMenuOpen(false)}
              secondaryLink={settings.data.button}
            />
          </>
        )}
      </aside>
    </>
  );
}

// Export the original component as default for backward compatibility
export function Header() {
  return <HeaderWrapper />;
}

export default Header;
