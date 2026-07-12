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
    <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <Bounded as="header" padding="smaller padding">
        <div className={clsx(
          "w-full transition-all duration-300",
          {
            // Glass effect and rounded corners when scrolled
            "backdrop-blur-md bg-white/70 rounded-[50px] mt-2.5 border border-white/90 shadow-[0_4px_15px_rgba(0,0,0,0.05)] max-w-6xl mx-auto py-4 px-6": isScrolled,
          }
        )}>
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
              <LongLogo treeColor="#29285D" className="h-[46px] text-[#29285D]" />
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-blue/10"
              aria-label="Open navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            aria-hidden={!isMobileMenuOpen}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={() => setIsMobileMenuOpen(false)}
            className={clsx(
              "fixed inset-0 z-50 bg-brand-blue/30 transition-opacity duration-300 lg:hidden",
              isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          />
          <aside
            id="mobile-navigation"
            aria-hidden={!isMobileMenuOpen}
            className={clsx(
              "fixed inset-y-0 right-0 z-[60] flex w-[min(24rem,88vw)] flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden",
              isMobileMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
            )}
          >
            {isMobileMenuOpen && (
              <>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-blue/10"
                    aria-label="Close navigation menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={28} />
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
        </div>
      </Bounded>
    </div>
  );
}

// Export the original component as default for backward compatibility
export function Header() {
  return <HeaderWrapper />;
}

export default Header;
