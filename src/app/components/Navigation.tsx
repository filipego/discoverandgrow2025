"use client";

import { useRef, useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface NavigationProps {
  navigation: any[];
  navRef: React.RefObject<HTMLUListElement | null>;
  onNavItemHover: (e: React.MouseEvent<HTMLLIElement>, isEnter: boolean) => void;
}

export function Navigation({ navigation, navRef, onNavItemHover }: NavigationProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [isLineVisible, setIsLineVisible] = useState(false);

  const handleItemHover = (e: React.MouseEvent<HTMLLIElement>, isEnter: boolean) => {
    const target = e.currentTarget;
    
    if (isEnter) {
      // Show and position the line
      const rect = target.getBoundingClientRect();
      const navRect = navRef.current?.getBoundingClientRect();
      
      if (lineRef.current && navRect) {
        const leftOffset = rect.left - navRect.left;
        
        setIsLineVisible(true);
        gsap.to(lineRef.current, {
          x: leftOffset,
          width: rect.width,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    } else {
      // Check if we're not hovering over any nav item
      setTimeout(() => {
        const isHoveringNav = navRef.current?.matches(':hover');
        if (!isHoveringNav) {
          setIsLineVisible(false);
        }
      }, 10);
    }
    
    // Call the original hover handler
    onNavItemHover(e, isEnter);
  };

  const handleNavLeave = () => {
    setIsLineVisible(false);
  };

  return (
    <nav aria-label="Main" className="grid place-items-center w-full">
      <div className="relative">
        <ul ref={navRef} className="flex items-center gap-8" onMouseLeave={handleNavLeave}>
          {navigation.map((item: any, index: number) => (
            <li 
              key={index} 
              className="text-base relative transition-transform duration-200 ease-out"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <PrismicNextLink 
                field={item.link}
                className="block py-2 transition-colors duration-200 ease-out"
              >
                {item.link.text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
        {/* Moving line indicator */}
        <div 
          ref={lineRef}
          className={`absolute bottom-1 h-[2px] bg-[#29285D] transition-opacity duration-200 ${
            isLineVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: 0 }}
        />
      </div>
    </nav>
  );
} 