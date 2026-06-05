/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { BRAND_PHILOSOPHY, BRAND_TAGLINE } from "../data";

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visibleLines, setVisibleLines] = useState<boolean[]>([false, false, false]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate depth within section
      const top = rect.top;
      const height = rect.height;
      
      // Map Scroll progress (0 as it enters, 1 as it leaves viewport)
      const visibleHeight = viewportHeight + height;
      const currentScroll = 1 - (top + height) / visibleHeight;
      const clamped = Math.max(0, Math.min(1, currentScroll));
      setScrollPercent(clamped);
    };

    // Staggered intersection observer for the brand philosophy lines
    const lineObservers = BRAND_PHILOSOPHY.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleLines((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -100px 0px" }
      );
    });

    const lines = document.querySelectorAll(".philosophy-line");
    lines.forEach((line, index) => {
      if (line && lineObservers[index]) {
        lineObservers[index].observe(line);
      }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Execute early

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      lineObservers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Compute scale reduction for photo zoom out (from 1.2 to 1.0)
  const calculateScale = () => {
    if (isMobile) return 1.0;
    // Zoom out smoothly across viewport progress
    return 1.2 - scrollPercent * 0.2;
  };

  // Tagline vertical splits (A L W A Y S   P L A Y)
  const vertTaglineChars = BRAND_TAGLINE.replace(" ", "").split("");

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative min-h-screen w-full bg-[#0D0D0D] py-24 md:py-36 overflow-hidden flex items-center border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Decorative vertical coordinates */}
      <div className="absolute left-6 top-1/4 z-20 hidden md:block">
        <span className="text-[10px] font-mono tracking-widest text-[#444] rotate-90 inline-block origin-left">
          ONE8 ATHLETICS CORP // © 2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-20 items-center">
        
        {/* Left Column: Vertical Tagline Drawing Fill */}
        <div id="story-left-tagline" className="hidden lg:flex lg:col-span-3 xl:col-span-2 flex-col items-center justify-center relative">
          <div className="flex flex-col select-none items-center gap-2">
            <span className="text-[10px] font-mono text-gold mb-4 tracking-widest font-bold">TAGLINE</span>
            <div className="flex flex-col gap-1 text-center font-display font-black text-6xl xl:text-7xl leading-none">
              {vertTaglineChars.map((char, index) => {
                // Calculate individual threshold trigger sequence
                const individualThreshold = index / vertTaglineChars.length;
                const isFilled = scrollPercent > individualThreshold;

                return (
                  <span
                    key={index}
                    className={`transition-colors duration-500 ease-out ${
                      isFilled ? "text-gold" : "text-transparent"
                    }`}
                    style={{
                      WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
            <div className="h-20 w-[1px] bg-gradient-to-b from-gold/40 to-transparent mt-6" />
          </div>
        </div>

        {/* Right Column Content block (Image parallax zoom-out + text fade-in) */}
        <div id="story-right-content" className="lg:col-span-9 xl:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Parallax Zoom Out Frame */}
          <div className="relative aspect-square md:aspect-[3/4] xl:aspect-[4/5] bg-near-black border border-white/5 overflow-hidden z-20 shadow-2xl shadow-black">
            <div className="absolute inset-0 bg-gradient-to-t from-near-black/65 via-transparent to-transparent z-10" />
            
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200"
              alt="Virat Kohli Intense Fitness Redesign"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-50 will-change-transform"
              style={{
                transform: `scale(${calculateScale()})`,
                transition: isMobile ? "none" : "transform 0.1s ease-out",
              }}
              referrerPolicy="no-referrer"
            />

            {/* In-image overlays */}
            <div className="absolute bottom-6 left-6 z-20 space-y-1">
              <p className="text-[10px] font-mono tracking-widest text-gold font-semibold">
                CAMP. ARCHIVE
              </p>
              <h4 className="text-sm font-display font-bold text-white tracking-widest uppercase">
                VIRAT KOHLI STRENGTH ENGINE
              </h4>
            </div>
          </div>

          {/* Philosophy Text Area */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
                018 // PERFORMANCE COUTURE
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-none uppercase">
                THE UNCOMPROMISED SPIRIT
              </h2>
            </div>

            <div className="space-y-8">
              {BRAND_PHILOSOPHY.map((paragraph, index) => (
                <p
                  key={index}
                  className={`philosophy-line text-sm md:text-base text-white/70 leading-relaxed font-light transition-all duration-1000 transform will-change-transform ${
                    visibleLines[index]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-12">
              <div>
                <span className="text-[10px] font-mono text-white/40 block mb-1">FOUNDED BY</span>
                <span className="text-xs font-mono text-white tracking-widest font-bold">VIRAT KOHLI</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 block mb-1">DESIGN TIMELINE</span>
                <span className="text-xs font-mono text-gold font-bold uppercase tracking-widest">2026 SPEC</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
