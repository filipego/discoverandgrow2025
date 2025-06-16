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

  // Fetch settings data
  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const settingsData = await client.getSingle("settings");
      setSettings(settingsData);
    };
    
    fetchSettings();
  }, []);

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
  }, [lastScrollY, isVisible]);

  // Handle nav item hover animations (now just a placeholder)
  const handleNavItemHover = (e: React.MouseEvent<HTMLLIElement>, isEnter: boolean) => {
    // No animations - just using the moving line effect now
  };

  if (!settings) return null;

  return (
    <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <Bounded as="header" padding="smaller padding" className="scrolled-header-container">
        <div className="grid grid-cols-[230px_1fr_230px] w-full items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <LongLogo treeColor="#29285D" className="text-[#29285D] h-[55]" />
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
      </Bounded>
    </div>
  );
}

// Export the original component as default for backward compatibility
export function Header() {
  return <HeaderWrapper />;
}

export default Header;
