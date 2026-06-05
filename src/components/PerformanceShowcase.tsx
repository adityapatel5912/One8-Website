/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { PERFORMANCE_STATS } from "../data";

export default function PerformanceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
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
      
      const scrollPosition = viewportHeight - rect.top;
      const progress = scrollPosition / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollFraction(clamped);

      // Trigger standard count-up when the top of the element hits the screen
      if (rect.top < viewportHeight - 150) {
        setHasScrolledIn(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Perform CountUp animations when Section is scrolled in
  useEffect(() => {
    if (!hasScrolledIn) return;

    const durations = [1500, 1500, 1500]; // total animation time in ms
    const frames = 60; // total steps
    const intervalTime = 1000 / 30; // 30fps is beautiful and lightweight

    const steps = PERFORMANCE_STATS.map((stat, index) => {
      const increment = stat.value / (durations[index] / intervalTime);
      return {
        target: stat.value,
        current: 0,
        increment,
      };
    });

    const timer = setInterval(() => {
      let active = false;
      setCounts((prevCounts) => {
        return prevCounts.map((count, index) => {
          const step = steps[index];
          if (count < step.target) {
            active = true;
            const nextVal = Math.min(step.target, count + step.increment);
            return Math.ceil(nextVal);
          }
          return count;
        });
      });

      if (!active) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasScrolledIn]);

  // Parallax backdrop positioning (translates slightly slower or faster relative to scroll)
  const calculateBgY = () => {
    if (isMobile) return "center";
    // Slide background up to 150px
    const offset = (scrollFraction - 0.5) * 120;
    return `${offset}px`;
  };

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative min-h-[90vh] w-full bg-near-black flex items-center overflow-hidden py-24 md:py-36 border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Parallax Athlete Backdrop with deep gradient masks */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-near-black via-near-black/75 to-near-black z-10" />
        <div className="absolute inset-0 bg-[#0A0A0A]/40 z-10" />
        
        <img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200"
          alt="Parallax Performance Background Athlete"
          className="w-full h-full object-cover object-center filter grayscale contrast-[1.4] brightness-[0.2]"
          style={{
            transform: isMobile ? "none" : `translateY(${calculateBgY()})`,
            transition: isMobile ? "none" : "transform 0.1s ease-out",
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-20">
        <div className="max-w-2xl text-left mb-16 md:mb-24 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
            018 // MECHANICAL AUDITS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-none">
            ENGINEERED METRICS
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
            Every specification represents a rigorous mechanical audit verified during the intense acceleration trials of elite athletic movement.
          </p>
        </div>

        {/* Dynamic Telemetry Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30">
          {PERFORMANCE_STATS.map((stat, index) => {
            return (
              <div
                key={stat.id}
                className="group relative bg-[#0D0D0D]/80 hover:bg-near-black backdrop-blur-md p-8 md:p-10 border border-white/5 hover:border-gold/30 transition-all duration-500 flex flex-col justify-between min-h-[300px]"
              >
                {/* SVG Technical Drawing / Icon that draws dynamically */}
                <div className="flex justify-between items-start mb-6">
                  {index === 0 && (
                    <svg className="w-10 h-10 text-gold/30 group-hover:text-gold transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Weight feather/speed icon */}
                      <path className={`transition-all duration-1000 ${hasScrolledIn ? "stroke-dashoffset-0" : "stroke-dashoffset-[100]"}`} strokeDasharray="100" strokeDashoffset="0" d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" y1="8" x2="2" y2="22" className="opacity-40" />
                      <line x1="17.5" y1="15" x2="9" y2="15" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-10 h-10 text-gold/30 group-hover:text-gold transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Energy lightning loop */}
                      <polygon className={`transition-all duration-1000 ${hasScrolledIn ? "stroke-dashoffset-0" : "stroke-dashoffset-[100]"}`} strokeDasharray="100" strokeDashoffset="0" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-10 h-10 text-gold/30 group-hover:text-gold transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Carbon plate diamond grid / molecular weave */}
                      <path className={`transition-all duration-1000 ${hasScrolledIn ? "stroke-dashoffset-0" : "stroke-dashoffset-[100]"}`} strokeDasharray="100" strokeDashoffset="0" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                  <span className="text-[10px] font-mono text-white/20 select-none">
                    SPEC // ACCELERATION
                  </span>
                </div>

                {/* Big numbers with count up values */}
                <div className="space-y-2 select-none">
                  <div className="flex items-baseline font-display font-black text-5xl sm:text-6xl text-white tracking-widest leading-none">
                    <span>{hasScrolledIn ? counts[index] : 0}</span>
                    <span className="text-gold text-2xl ml-1 font-mono font-medium">{stat.suffix}</span>
                  </div>
                  <h4 className="text-[11px] font-mono tracking-widest text-[#C9A84C] font-black uppercase">
                    {stat.label}
                  </h4>
                </div>

                {/* Technical stats descriptions */}
                <p className="text-xs text-white/50 leading-relaxed font-light mt-6 pt-6 border-t border-white/5">
                  {stat.description}
                </p>

                {/* Corner details */}
                <span className="absolute bottom-3 right-3 w-1 h-1 bg-white/10 group-hover:bg-gold rounded-full transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
